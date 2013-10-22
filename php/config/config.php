<?php
//1382421600  1382425200  1382428800
/* Amount of SOM Servers. */
define('AMOUNT_SOM_SERVERS',    7);

/* Serverpage: SOM. */
define('SERVERPAGE_SOM_START',  'https://start');
define('SERVERPAGE_SOM_END',    '.mijnsom.nl/app/status');

/* Information retrieved from the (SOM) servers for project information display. */
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

/* Server of Topicus Zabbix. */
define('ZABBIX_API_URL',    'https://zabbix.topicusonderwijs.nl/api_jsonrpc.php');

/* User and password of the Topicus Zabbix page. */
define('ZABBIX_USER',   'dashboard');
define('ZABBIX_PASS',   'b9UWR7ba');

/* Amount of values for graph. */
define('GRAPH_VALUES_AMOUNT',    10);

/* Difference between graph values. */
define('GRAPH_VALUES_DIFFERENCE',   7200); // 3600 = 1 Hour.

/* Graph hosts of Zabbix. */
define('GRAPHHOST_SOM_START',   'start');
define('GRAPHHOST_SOM_END',     '.mijnsom.nl');

/* Search word for graph host. */
define('GRAPH_FILTER_NAME', 'Number of active sessions at this moment');