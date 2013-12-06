<?php

require_once('../../config/config.php');
require_once('../../lib/ZabbixApiAbstract.class.php');
require_once('../../lib/ZabbixApi.class.php');
require_once('../../lib/RestServer.php');

class ProjectInfoData {

    /**
     * Starts a connection with the Zabbix overview of Topicus Onderwijs.
     * Followed by a function which gathers the desired information.
     * @return mixed
     */
    public static function main() {
        $historyToReturn = array();
        $searchFor = unserialize(SERVERPAGE_SOM_VALUES);
        $searchValues = unserialize(ZABBIX_SEARCH_VALUES);

        $api = self::connectToZabbix();

        for($x = 1; $x <= 7; $x++) {
            $hostid = self::getHostId($api, $x, ZABBIXHOST_SOM_START, ZABBIXHOST_SOM_END);

            for($i = 0; $i < count($searchValues); $i++) {
                $itemid = self::getItemId($api, $hostid, $searchValues[$searchFor[$i]][0]);
                $historyValue = self::getHistory($api, $searchValues[$searchFor[$i]][1], $itemid);
                $history = array($searchFor[$i] . $x => $historyValue);
                array_push($historyToReturn, $history);
            }
        }

        $additionalData = self::getAdditionalDataFromAtvos($api);
        $historyToReturn = self::pushEachRowOfGivenArrayInGivenArray($historyToReturn, $additionalData);
        $historyToReturn = self::createOneObjectFromArrayFilledWithObjects($historyToReturn);
        $historyToReturn = self::updateHistoryToReturnDataToDesiredFormat($historyToReturn);

        return $historyToReturn;
    }

    /**
     * Connection function to Zabbix.
     */
    private static function connectToZabbix() {
        return new ZabbixApi(ZABBIX_API_URL, ZABBIX_USER, ZABBIX_PASS);
    }

    private static function getHostId($api, $somHostId, $hostStart, $hostEnd) {
        global $host;
        $host = $api->hostGet( array(
            'output' => 'extend',
            'filter' => array('host' => $hostStart . $somHostId . $hostEnd)
        ));
        return $host[0]->hostid;
    }

    private static function getItemId($api, $hostid, $search) {
        $item = $api->itemGet(array(
            'output' => 'extend',
            'hostids' => $hostid,
            'filter' => array('name' => $search),
        ));
        return $item[0]->itemid;
    }

    private static function getHistory($api, $history, $itemid) {
        $history = $api->historyGet(array(
            'output' => 'extend',
            'history' => $history,
            'itemids' => $itemid,
            'sortfield' => 'clock',
            'sortorder' => 'DESC',
            'limit' => 1
        ));
        return $history[0]->value;
    }

    private static function pushEachRowOfGivenArrayInGivenArray($pushInArray, $array) {
        for($i = 0; $i < count($array); $i++) {
            array_push($pushInArray, $array[$i]);
        }

        return $pushInArray;
    }

    private static function createOneObjectFromArrayFilledWithObjects($array) {
        $arrayToReturn = array();

        foreach($array as $v) {
            $arrayToReturn[key($v)] = current($v);
        }

        return $arrayToReturn;
    }

    private static function calcUptime($time) {
        $t = round($time);
        $time = new DateTime();
        $mTime = $time->modify("-" . $t ." second");
        return $mTime->format('d-m-Y H:i ');
    }

    private static function calcBytesToGB($bytes) {
        return round($bytes/(1024*1024*1024), 2, PHP_ROUND_HALF_UP) . "G";
    }

    private static function calcSecondsToMS($seconds) {
        return round($seconds * 1000, 0, PHP_ROUND_HALF_UP) . " ms.";
    }

    private static function calcResultInSecondsToMinutes($result) {
        return round($result * 60, 0, PHP_ROUND_HALF_UP);
    }

    private static function calcLoadAverage($loadPerCore) {
        return (string) round($loadPerCore * 16, 2, PHP_ROUND_HALF_UP);
    }

    private static function updateHistoryToReturnDataToDesiredFormat($historyToReturn) {
        for($i = 1; $i <= AMOUNT_SOM_SERVERS; $i++) {
            $key = "Starttijd";
            if (array_key_exists($key . $i, $historyToReturn)) { $historyToReturn[$key . $i] = self::calcUptime($historyToReturn[$key . $i]); }

            $key = "Requests per minuut";
            if (array_key_exists($key . $i, $historyToReturn)) { $historyToReturn[$key . $i] = (string) self::calcResultInSecondsToMinutes($historyToReturn[$key . $i]); }

            $key = "Gem. request duur";
            if (array_key_exists($key . $i, $historyToReturn)) { $historyToReturn[$key . $i] = self::calcSecondsToMS($historyToReturn[$key . $i]); }

            $key = "Gebruikt geheugen";
            if (array_key_exists($key . $i, $historyToReturn)) { $historyToReturn[$key . $i] = self::calcBytesToGB($historyToReturn[$key . $i]); }

            $key = "Maximum geheugen";
            if (array_key_exists($key . $i, $historyToReturn)) { $historyToReturn[$key . $i] = self::calcBytesToGB($historyToReturn[$key . $i]); }

            $key = "Load average";
            if (array_key_exists($key . $i, $historyToReturn)) { $historyToReturn[$key . $i] = self::calcLoadAverage($historyToReturn[$key . $i]); }
        }

        return $historyToReturn;
    }

    private static function getAdditionalDataFromAtvos($api) {
        $history = array();
        $searchFor = ["Load average", "CPU's"];
        $searchValues = unserialize(ATVO_SEARCH_VALUES);

        for($x = 1; $x <= AMOUNT_ATVO_SERVERS; $x++) {
            $hostid = self::getHostId($api, $x, ATVO_SOM_START, ATVO_SOM_END);

            for($i = 0; $i <= 1; $i++) {
                $itemid = self::getItemId($api, $hostid, $searchValues[$searchFor[$i]][0]);
                $historyValue = self::getHistory($api, $searchValues[$searchFor[$i]][1], $itemid);
                $historyArray = array($searchFor[$i] . $x => (string) $historyValue);
                array_push($history, $historyArray);
            }
        }

        return self::splitAtvoInfoToServers($history);
    }

    private static function splitAtvoInfoToServers($history) {
        array_push($history, array("Load average7" => $history[2]["Load average2"]));
        array_push($history, array("CPU's7" => $history[3]["CPU's2"]));

        array_push($history, array("Load average5" => $history[4]["Load average3"]));
        array_push($history, array("CPU's5" => $history[5]["CPU's3"]));

        array_push($history, array("Load average6" => $history[6]["Load average4"]));
        array_push($history, array("CPU's6" => $history[7]["CPU's4"]));

        return $history;
    }
}

$rest = new RestServer('ProjectInfoData');
$rest->handle();