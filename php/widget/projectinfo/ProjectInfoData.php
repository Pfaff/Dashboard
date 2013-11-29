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

        self::connectToZabbix();

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
}

$rest = new RestServer('ProjectInfoData');
$rest->handle();