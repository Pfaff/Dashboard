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

    /**
     * Gets the host id.
     * @param $api
     * @param $somHostId
     * @param $hostStart
     * @param $hostEnd
     * @return mixed
     */
    private static function getHostId($api, $somHostId, $hostStart, $hostEnd) {
        global $host;
        $host = $api->hostGet( array(
            'output' => 'extend',
            'filter' => array('host' => $hostStart . $somHostId . $hostEnd)
        ));
        return $host[0]->hostid;
    }

    /**
     * Gets the item id.
     * @param $api
     * @param $hostid
     * @param $search
     * @return mixed
     */
    private static function getItemId($api, $hostid, $search) {
        $item = $api->itemGet(array(
            'output' => 'extend',
            'hostids' => $hostid,
            'filter' => array('name' => $search),
        ));
        return $item[0]->itemid;
    }

    /**
     * Gets the desired history.
     * @param $api
     * @param $history
     * @param $itemid
     * @return mixed
     */
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

    /**
     * Pushes each row of an array into a given array to avoid having a object containing arrays being pushed in.
     * @param $pushInArray
     * @param $array
     * @return mixed
     */
    private static function pushEachRowOfGivenArrayInGivenArray($pushInArray, $array) {
        for($i = 0; $i < count($array); $i++) {
            array_push($pushInArray, $array[$i]);
        }

        return $pushInArray;
    }

    /**
     * Creates a single object from an object filled with arrays.
     * @param $array
     * @return array
     */
    private static function createOneObjectFromArrayFilledWithObjects($array) {
        $arrayToReturn = array();

        foreach($array as $v) {
            $arrayToReturn[key($v)] = current($v);
        }

        return $arrayToReturn;
    }

    /**
     * Calculates and returns the uptime in the desired format.
     * @param $time
     * @return string
     */
    private static function calcUptime($time) {
        $t = round($time);
        $time = new DateTime();
        $mTime = $time->modify("-" . $t ." second");
        return $mTime->format('d-m-Y H:i ');
    }

    /**
     * Calculates given bytes to amount of GB.
     * @param $bytes
     * @return string
     */
    private static function calcBytesToGB($bytes) {
        return round($bytes/(1024*1024*1024), 2, PHP_ROUND_HALF_UP) . "G";
    }

    /**
     * Calculates the given seconds to ms.
     * @param $seconds
     * @return string
     */
    private static function calcSecondsToMS($seconds) {
        return round($seconds * 1000, 0, PHP_ROUND_HALF_UP) . " ms.";
    }

    /**
     * Calculates the results in seconds to minutes.
     * @param $result
     * @return float
     */
    private static function calcResultInSecondsToMinutes($result) {
        return round($result * 60, 0, PHP_ROUND_HALF_UP);
    }

    /**
     * Calculates the load average.
     * @param $loadPerCore
     * @return string
     */
    private static function calcLoadAverage($loadPerCore) {
        return (string) round($loadPerCore * 16, 2, PHP_ROUND_HALF_UP);
    }

    /**
     * Updates the history to return in its desired format.
     * @param $historyToReturn
     * @return mixed
     */
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

    /**
     * Gets the additional data from atvo1, 2, 3 and 4.
     * @param $api
     * @return mixed
     */
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

    /**
     * Adds the 5 6 and 7 value received from atvo 1, 2, 3 and 4.
     * @param $history
     * @return mixed
     */
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