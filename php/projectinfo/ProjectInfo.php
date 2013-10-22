<?php

require_once('../config/config.php');
require_once("../lib/RestServer.php");
require_once('../lib/simple_html_dom.php');

class ProjectInfo {
    /**
     *
     * @return array
     */
    public static function getProjectInfo() {
        $results = array();

        for ($i = 1; $i <= AMOUNT_SOM_SERVERS; $i++) {
            $html = file_get_html(SERVERPAGE_SOM_START.$i.SERVERPAGE_SOM_END);

            $tds = $html->find('body', 0)->find('td');

            $data = unserialize(SERVERPAGE_SOM_VALUES);

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
}

$rest = new RestServer('ProjectInfo');
$rest->handle();