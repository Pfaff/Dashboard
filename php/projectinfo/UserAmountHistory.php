<?php

require_once('../config/config.php');
require_once('../lib/ZabbixApiAbstract.class.php');
require_once('../lib/ZabbixApi.class.php');
require_once("../lib/RestServer.php");

class UserAmountHistory {
    var $api = null;
    var $hostid = null;
    var $itemid = null;
    var $epoch = null;
    var $clockTimes = null;

    public static function main() {
        self::connectToZabbix();
        self::getHostId();
        self::getItemId();
        self::getLatestEpochTime();
        self::calculateHoursForClock();
        return self::getHistory();
    }

    private static function connectToZabbix() {
        global $api;
        $api = new ZabbixApi(ZABBIX_API_URL, ZABBIX_USER, ZABBIX_PASS);
    }

    private static function getHostId() {
        global $api, $hostid;
        $host = $api->hostGet( array(
            'output' => 'extend',
            'filter' => array('host' => GRAPHHOST_SOM_START.'6'.GRAPHHOST_SOM_END)
        ));
        $hostid = $host[0]->hostid;
    }

    private static function getItemId() {
        global $api, $hostid, $itemid;
        $item = $api->itemGet(array(
            'output' => 'extend',
            'hostids' => $hostid,
            'search' => array('key_' => 'session', 'name' => GRAPH_FILTER_NAME),
        ));
        $itemid = $item[0]->itemid;
    }

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

    private static function calculateHoursForClock() {
        global $i, $epoch, $clockTimes;
        $clockTimes = Array();

        for($i = 0; $i < GRAPH_VALUES_AMOUNT; $i++) {
            array_push($clockTimes, (string)$epoch);
            $epoch = $epoch - GRAPH_VALUES_DIFFERENCE;
        }
    }

    private static function getHistory() {
        global $api, $itemid, $clockTimes;

        $history = $api->historyGet(array(
            'output' => 'extend',
            'history' => 3,
            'itemids' => $itemid,
            'sortfield' => 'clock',
            'sortorder' => 'DESC',
            'limit' => GRAPH_VALUES_AMOUNT,
            'filter' => array('clock' => $clockTimes)
        ));

        return $history;
    }
}

$rest = new RestServer('UserAmountHistory');
$rest->handle();

