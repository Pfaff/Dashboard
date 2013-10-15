<?php

require_once("../lib/RestServer.php");
include('../lib/simple_html_dom.php');

class ProjectInfo {

    public static function getProjectInfo() {
        $html = file_get_html('https://start1.mijnsom.nl/app/status');

        $tds = $html->find('body', 0)->find('td');

        $data = self::fillArrayWithValuesToGet();

        $results = array();

        foreach ($data as $value) {
            foreach($tds as $td){
                if($td->plaintext == $value){
                    $results[$value] = $td->next_sibling()->plaintext;
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