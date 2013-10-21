<?php

require_once('../config/config.php');
require_once('../lib/ZabbixApiAbstract.class.php');
require_once('../lib/ZabbixApi.class.php');


try {
    $api = new ZabbixApi(ZABBIX_API_URL, ZABBIX_USER, ZABBIX_PASS);
} catch(Exception $e) { echo $e->getMessage(); }

    $host = $api->hostGet( array(
        'output' => 'extend',
        'filter' => array('host' => GRAPHHOST_SOM_START.'1'.GRAPHHOST_SOM_END)
    ));
    global $hostid;
    $hostid = $host[0]->hostid;


    $item = $api->itemGet(array(
        'output' => 'extend',
        'hostids' => $hostid,
        'search' => array('key_' => 'session', 'name' => GRAPH_FILTER_NAME),
    ));
    $itemid = $item[0]->itemid;


    $history = $api->historyGet(array(
        'output' => 'extend',
        'history' => 3,
        'itemids' => $itemid,
        'sortfield' => 'clock',
        'sortorder' => 'DESC',
        'limit' => 10
    ));
    echo(json_encode($history));


