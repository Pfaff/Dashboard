<?php

require_once('../config/config.php');
require_once('../lib/ZabbixApiAbstract.class.php');
require_once('../lib/ZabbixApi.class.php');
require_once("../lib/RestServer.php");

class UserAmountHistory {
    public static function main() {
        global $historyToReturn;

        self::connectToZabbix();
        self::getUserAmountHistoryOfAllServers();

        return $historyToReturn;
    }

    private static function connectToZabbix() {
        global $api;
        $api = new ZabbixApi(ZABBIX_API_URL, ZABBIX_USER, ZABBIX_PASS);
    }

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

    private static function getHostId($i) {
        global $api, $hostid;
        $host = $api->hostGet( array(
            'output' => 'extend',
            'filter' => array('host' => GRAPHHOST_SOM_START.$i.GRAPHHOST_SOM_END)
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
        global $epoch, $clockTimes;
        $clockTimes = Array();

        for($i = 0; $i <= GRAPH_VALUES_AMOUNT; $i++) {
//            print_r($epoch."   :   ");
            array_push($clockTimes, $epoch);
            $epoch = $epoch - GRAPH_VALUES_DIFFERENCE;
        }
    }

    private static function getHistory() {
        global $api, $itemid, $clockTimes, $history;

        $history = $api->historyGet(array(
            'output' => 'extend',
            'history' => 3,
            'itemids' => $itemid,
            'sortfield' => 'clock',
            'sortorder' => 'DESC',
            'limit' => GRAPH_VALUES_AMOUNT,
            'filter' => array('clock' => $clockTimes)
        ));
    }

    private static function updateHistoryToReturn() {
        global $history, $historyToReturn;

        for($i = 0; $i < count($history); $i++) {
            $historyToReturn[$i]->clock = $history[$i]->clock;
            $historyToReturn[$i]->itemid = $history[$i]->itemid;
            $historyToReturn[$i]->ns = $history[$i]->ns;
            $historyToReturn[$i]->value = $historyToReturn[$i]->value + $history[$i]->value;
        }

//        $historyToReturn = $history;
    }
}

$rest = new RestServer('UserAmountHistory');
$rest->handle();

