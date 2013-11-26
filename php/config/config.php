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
define('LDAP_BASE_DN', 'OU=TopicusUsers, OU=Topicus, DC=topicus, DC=local');
define('LDAP_FILTER_GROUP', 'CN=topicusonderwijs,OU=TopicusGroups,OU=Topicus,DC=topicus,DC=local');

/**
 * Gravatar
 */
define('DEFAULT_PHOTO_LOCATION', 'http://img600.imageshack.us/img600/9933/t2ah.png');

/**
 * Amount of news items to gather from each site.
 */
define('MAX_NEWS_ARTICLES', 4);

/**
 * URLs of the news locations.
 */
define('NEWS_NU_GENERAL', 'http://www.nu.nl/deeplink_rss2/index.jsp?r=Algemeen');
define('NEWS_NU_INTERNET', 'http://www.nu.nl/deeplink_rss2/index.jsp?r=Internet');
define('NEWS_NU_ECONOMY', 'http://www.nu.nl/deeplink_rss2/index.jsp?r=Economie');
define('NEWS_NU_SPORT', 'http://www.nu.nl/deeplink_rss2/index.jsp?r=Sport');
define('NEWS_NU_SCIENCE', 'http://www.nu.nl/deeplink_rss2/index.jsp?r=Wetenschap');
define('NEWS_TWEAKERS', 'http://feeds.feedburner.com/tweakers/nieuws');

/**
 * URL of Mantis Stats service.
 */
define('MANTISSTATS_LOCATION', 'http://192.168.55.134:8080/service/issue_stats');

$agendaLocations = array(   'Topicus' => 'https://www.google.com/calendar/feeds/topicus.dashboard%40gmail.com/private-60d11dd21d2ccfbf1105ff1e61bda6ef/basic',
                            'Alluris' => 'https://www.google.com/calendar/feeds/k9ok850b2f6scdenq4o04i7g8c%40group.calendar.google.com/private-8362322aead7f000a9779b821cf6bd9f/basic',
                            'Dashboard' => 'https://www.google.com/calendar/feeds/oimp4f9fc881lhcigp600m6kb0%40group.calendar.google.com/private-9648657d3f997623cc7fa069fb4a6109/basic',
                            'EduArte' => 'https://www.google.com/calendar/feeds/k6m9icfnlsqqe38vclu2ldrj8g%40group.calendar.google.com/private-0e701a0ed06865521db460e9822e1719/basic',
                            'Iris+' => 'https://www.google.com/calendar/feeds/4969ahcnmhvcva8mg1de511d10%40group.calendar.google.com/private-07bb68d3dac0d565fe17b815529d95e7/basic',
                            'ParnasSys' => 'https://www.google.com/calendar/feeds/0nl64fq988e5ac8lo6t255e01o%40group.calendar.google.com/private-f8e2aa32b5e162b8c70f2ad3bca0dd8c/basic',
                            'ParnasSys Ouders' => 'https://www.google.com/calendar/feeds/uhj4l3ve9h53sj7gj08g39colk%40group.calendar.google.com/private-9dcd00c27c4b6adedfcd13ff5e540b00/basic',
                            'ParnasSys Supportportaal' => 'https://www.google.com/calendar/feeds/r02sp92bsodg2ecsdii4cnbtjs%40group.calendar.google.com/private-177afd1c3cada788e1adbb38b7f46471/basic',
                            'Passepartout' => 'https://www.google.com/calendar/feeds/91bcnkrue2kttvivfj1jkp98t8%40group.calendar.google.com/private-df6bf7a53bd1f9618e1597063711e2d1/basic',
                            'Reportal' => 'https://www.google.com/calendar/feeds/jdvgls35i7nki91gii14esccq0%40group.calendar.google.com/private-e99f3123be73f25b0f60577f5d919af5/basic',
                            'SOM' => 'https://www.google.com/calendar/feeds/mr5t4iqhiu81dh0cdq040cruc4%40group.calendar.google.com/private-ac4baac1a7cfab33824e2b02261b7b81/basic',
                            'SOM Portaal' => 'https://www.google.com/calendar/feeds/6gcb6gf0e9d58vqrkgotcvje6k%40group.calendar.google.com/private-1c504d9f8aec958e8a20784d112a65f5/basic',
                            'SOMtoday' => 'https://www.google.com/calendar/feeds/hsapfrojii8gcujk0q646r4fio%40group.calendar.google.com/private-2f89b09181dad7990e320e77387597ec/basic',
                            'TrmVerwijzer' => 'https://www.google.com/calendar/feeds/abm0hu6lcpqodam0fherevgq58%40group.calendar.google.com/private-de2b5200e3811f684dfffc82a6a1ff15/basic',
                            'ZIEN!' => 'https://www.google.com/calendar/feeds/6vmshhut8pvjf2l5hev8griv9k%40group.calendar.google.com/private-000aea449a7e9dc1c05f229318030751/basic');
define('AGENDA_LOCATIONS', serialize($agendaLocations));