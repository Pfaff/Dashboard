<?php
include('lib/simple_html_dom.php');

$html = file_get_html($_POST['externalUrl']);


$tds = $html->find('body', 0)->find('td');
$value = null;
$count = 1;

$data = json_decode($_POST["value"], true);

$results = array();

while($count < count($data)) {
    foreach($tds as $td){
        if($td->plaintext == $data["value".$count]){
            $results["value".$count] = $td->next_sibling()->plaintext;
            if($count != count($data)) {
                $count++;
            } else {
                break;
            }
        }
    }
}

echo(json_encode($results));