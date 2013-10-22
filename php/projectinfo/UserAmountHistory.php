<?php

require_once('../config/config.php');
require_once('../lib/ZabbixApiAbstract.class.php');
require_once('../lib/ZabbixApi.class.php');
require_once("../lib/RestServer.php");

class UserAmountHistory {
    var $api = null;
    var $hostid = null;
    var $itemid = null;

    public static function main() {
        self::connectToZabbix();
        self::getHostId();
        self::getItemId();
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
            'filter' => array('host' => GRAPHHOST_SOM_START.'1'.GRAPHHOST_SOM_END)
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

    private static function getHistory() {
        global $api, $itemid;

        $history = $api->historyGet(array(
            'output' => 'extend',
            'history' => 3,
            'itemids' => $itemid,
            'sortfield' => 'clock',
            'sortorder' => 'DESC',
            'limit' => 10,
            //'filter' => array('clock' => array('1382423641', '1382416441'))
        ));

        return $history;
    }
}

$rest = new RestServer('UserAmountHistory');
$rest->handle();

