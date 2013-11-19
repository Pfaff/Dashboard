<?php

require_once('../../config/config.php');
require_once('../../lib/ZabbixApiAbstract.class.php');
require_once('../../lib/ZabbixApi.class.php');
require_once('../../lib/RestServer.php');

class UserAmountHistory {

    /**
     * Starts a connection with the Zabbix overview of Topicus Onderwijs, then starts the function to gather the desired information.
     * @return mixed
     */
    public static function main() {
        global $historyToReturn;

        self::connectToZabbix();
        self::getUserAmountHistoryOfAllServers();

        return $historyToReturn;
    }

    /**
     * Connection function to Zabbix.
     */
    private static function connectToZabbix() {
        global $api;
        $api = new ZabbixApi(ZABBIX_API_URL, ZABBIX_USER, ZABBIX_PASS);
    }

    /**
     * Starts the function which gathers all history information of all servers.
     */
    private static function getUserAmountHistoryOfAllServers() {
        global $history, $historyToReturn;
        for($i = 1; $i <= AMOUNT_SOM_SERVERS; $i++) {
            self::getHostId($i);
            self::getItemId();
            self::getLatestEpochTime();
            self::calculateHoursForClock();
            self::getHistory();
            if($i == 1) {
                $historyToReturn = $history;
            } else {
                self::updateHistoryToReturn();
            }
        }
    }

    /**
     * Gathers the host id which is required if you want the item id.
     * @param $i
     */
    private static function getHostId($i) {
        global $api, $hostid;
        $host = $api->hostGet( array(
            'output' => 'extend',
            'filter' => array('host' => UA_GRAPHHOST_SOM_START.$i.UA_GRAPHHOST_SOM_END)
        ));
        $hostid = $host[0]->hostid;
    }

    /**
     * Gathers the item id which is required if you want to get the history of a graph.
     */
    private static function getItemId() {
        global $api, $hostid, $itemid;
        $item = $api->itemGet(array(
            'output' => 'extend',
            'hostids' => $hostid,
            'search' => array('key_' => 'session', 'name' => UA_GRAPH_FILTER_NAME),
        ));
        $itemid = $item[0]->itemid;
    }

    /**
     * Gets the latest time in epoch.
     */
    private static function getLatestEpochTime() {
        global $api, $itemid, $epoch;

        $history = $api->historyGet(array(
            'output' => 'extend',
            'history' => 3,
            'itemids' => $itemid,
            'sortfield' => 'clock',
            'sortorder' => 'DESC',
            'limit' => 1,
        ));

        $epoch = $history[0]->clock;
    }

    /**
     * Calculates the desired hours to show on the graph.
     */
    private static function calculateHoursForClock() {
        global $epoch, $clockTimes;
        $clockTimes = Array();

        for($i = 0; $i <= UA_GRAPH_VALUES_AMOUNT; $i++) {
            array_push($clockTimes, $epoch);
            $epoch = $epoch - $_REQUEST['epochDifference'];
        }
    }

    /**
     * Gathers the history information.
     */
    private static function getHistory() {
        global $api, $itemid, $clockTimes, $history;

        $history = $api->historyGet(array(
            'output' => 'extend',
            'history' => 3,
            'itemids' => $itemid,
            'sortfield' => 'clock',
            'sortorder' => 'DESC',
            'limit' => UA_GRAPH_VALUES_AMOUNT,
            'filter' => array('clock' => $clockTimes)
        ));
    }

    /**
     * Updates the historyToReturn variable with the new collected history.
     */
    private static function updateHistoryToReturn() {
        global $history, $historyToReturn;

        for($i = 0; $i < count($history); $i++) {
            $historyToReturn[$i]->clock = $history[$i]->clock;
            $historyToReturn[$i]->itemid = $history[$i]->itemid;
            $historyToReturn[$i]->ns = $history[$i]->ns;
            $historyToReturn[$i]->value = $historyToReturn[$i]->value + $history[$i]->value;
        }
    }
}

$rest = new RestServer('UserAmountHistory');
$rest->handle();

