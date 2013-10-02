<?php
include('lib/simple_html_dom.php');

$html = file_get_html($_POST['externalUrl']);


$tds = $html->find('body', 0)->find('td');
$value = null;
$count = 1;

$data = json_decode($_POST["value"], true);

$results = array();

foreach ($data as &$value) {
    $results[$value] = $value * 2;

    foreach($tds as $td){
        if($td->plaintext == $value){
            $results[$value] = $td->next_sibling()->plaintext;
        }
    }
}

echo(json_encode($results));