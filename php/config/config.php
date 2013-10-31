<?php

/**
 * Amount of SOM Servers.
 */
define('AMOUNT_SOM_SERVERS',    7);

/**
 * Serverpage: SOM.
 */
define('SERVERPAGE_SOM_START',  'https://start');
define('SERVERPAGE_SOM_END',    '.mijnsom.nl/app/status');

/**
 * Information retrieved from the (SOM) servers for project information display.
 */
$information = array(   'Versie',
                        'Gem. request duur',
                        'Requests per minuut',
                        'Starttijd',
                        'Gebruikt geheugen',
                        'Maximum geheugen',
                        'Load average',
                        "CPU's",
                        'Schema',
                        'Open connections',
                        'Busy connections',
                        'Idle connections'      );
define('SERVERPAGE_SOM_VALUES', serialize($information));

/**
 * Server of Topicus Zabbix.
 */
define('ZABBIX_API_URL',    'https://zabbix.topicusonderwijs.nl/api_jsonrpc.php');

/**
 * User and password of the Topicus Zabbix page.
 */
define('ZABBIX_USER',   'dashboard');
define('ZABBIX_PASS',   'b9UWR7ba');

/**
 * Amount of values for graph.
 */
define('UA_GRAPH_VALUES_AMOUNT',    10);

/**
 * User amount history graph hosts of Zabbix.
 */
define('UA_GRAPHHOST_SOM_START',   'start');
define('UA_GRAPHHOST_SOM_END',     '.mijnsom.nl');

/**
 * Search word for user amount history graph host.
 */
define('UA_GRAPH_FILTER_NAME', 'Number of active sessions at this moment');

/**
 * CPU load history graph hosts of Zabbix.
 */
define('CL_GRAPHHOST_SOM_START',    'atvo');
define('CL_GRAPHHOST_SOM_END',    '-web');

/**
 * Search word for CPU load history graph host.
 */
define('CL_GRAPH_FILTER_NAME', 'Processor load (1 min average per core)');

/**
 * Amount of values for graph.
 */
define('CL_GRAPH_VALUES_AMOUNT',    10);

/**
 * LDAP information.
 */
define('LDAP_USER', 'buildbot');
define('LDAP_PASS', 'Zp3?KL6t');
define('LDAP_LOCATION', 'baas2');
