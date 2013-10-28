<?php

require_once('../config/config.php');
require_once('../lib/ZabbixApiAbstract.class.php');
require_once('../lib/ZabbixApi.class.php');
require_once("../lib/RestServer.php");

class CPULoadHistory {

    /**
     * Starts a connection with the Zabbix overview of Topicus Onderwijs.
     * Followed by a function which gathers the desired information.
     * @return mixed
     */
    public static function main() {
        global $historyToReturn;

        self::connectToZabbix();
        self::getCPULoadHistoryOfAllServers();

        return $historyToReturn;
    }

    /**
     * Connection function to Zabbix.
     */
    private static function connectToZabbix() {
        global $api;
        $api = new ZabbixApi(ZABBIX_API_URL, ZABBIX_USER, ZABBIX_PASS);
    }

    private static function getCPULoadHistoryOfAllServers() {
        for($i = 1; $i <= 4; $i++) {
            self::getHostId($i);
            self::getItemId();
            self::getHistory($i);
        }
    }

    private static function getHostId($i) {
        global $api, $host, $hostid;
        $host = $api->hostGet( array(
            'output' => 'extend',
            'selectScreenItems' => 'extend',
            'search' => array('name' => CL_GRAPHHOST_SOM_START.$i.CL_GRAPHHOST_SOM_END)
        ));
        $hostid = $host[0]->hostid;
    }

    private static function getItemId() {
        global $api, $hostid, $itemid;
        $item = $api->itemGet(array(
            'output' => 'extend',
            'hostids' => $hostid,
            'search' => array('name' => CL_GRAPH_FILTER_NAME),
        ));
        $itemid = $item[0]->itemid;
    }

    private static function getHistory($i) {
        global $api, $history, $historyToReturn, $itemid;

        $history = $api->historyGet(array(
            'output' => 'extend',
            'history' => 0,
            'itemids' => $itemid,
            'sortfield' => 'clock',
            'sortorder' => 'DESC',
            'limit' => CL_GRAPH_VALUES_AMOUNT
        ));

        return $historyToReturn[$i] = $history;
    }
}

$rest = new RestServer('CPULoadHistory');
$rest->handle();

