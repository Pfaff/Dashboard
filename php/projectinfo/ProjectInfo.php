<?php

require_once("../lib/RestServer.php");
include('../lib/simple_html_dom.php');

class ProjectInfo {

    public static function getProjectInfo() {
        $results = array();

        for ($i = 1; $i <= 7; $i++) {
            $html = file_get_html('https://start'.$i.'.mijnsom.nl/app/status');

            $tds = $html->find('body', 0)->find('td');

            $data = self::fillArrayWithValuesToGet();

            foreach ($data as $value) {
                foreach($tds as $td){
                    if($td->plaintext == $value){
                        $results[$value.$i] = $td->next_sibling()->plaintext;
                    }
                }
            }
        }

        return $results;
    }

    private static function fillArrayWithValuesToGet() {
        return array(   'Versie',
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
    }
}

$rest = new RestServer('ProjectInfo');
$rest->handle();