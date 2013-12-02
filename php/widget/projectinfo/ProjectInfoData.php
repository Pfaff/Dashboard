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
        global $historyToReturn;

        $api = self::connectToZabbix();
        $hostid = self::getHostId($api);
        $itemid = self::getItemId($api, $hostid);
        $historyToReturn = self::getHistory($api, $itemid);

        return $historyToReturn;
    }

    /**
     * Connection function to Zabbix.
     */
    private static function connectToZabbix() {
        global $api;
        $api = new ZabbixApi(ZABBIX_API_URL, ZABBIX_USER, ZABBIX_PASS);
        return $api;
    }

    private static function getHostId($api) {
        global $host;
        $host = $api->hostGet( array(
            'output' => 'extend',
            'filter' => array('host' => 'start1.mijnsom.nl')
        ));
        return $host[0]->hostid;
    }

    private static function getItemId($api, $hostid) {
        $item = $api->itemGet(array(
            'output' => 'extend',
            'hostids' => $hostid,
            'search' => array('name' => 'WebApp version'),
        ));
        return $item[0]->itemid;
    }

    private static function getHistory($api, $itemid) {
        $history = $api->historyGet(array(
            'output' => 'extend',
            'history' => 4,
            'itemids' => $itemid,
            'sortfield' => 'clock',
            'sortorder' => 'DESC',
            'limit' => 1
        ));
        return $history;
    }
}

$rest = new RestServer('ProjectInfoData');
$rest->handle();