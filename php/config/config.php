<?php

/* Serverpage: SOM. */
define('SERVERPAGE_SOM_START', 'https://start');
define('SERVERPAGE_SOM_END', '.mijnsom.nl/app/status');

/* Information retrieved from the SOM servers for project information display. */
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