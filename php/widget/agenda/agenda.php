<?php

//$user = 'topicus.dashboard@gmail.com';
//$pass = 'Deventer11';

$googleURL = "https://www.google.com/calendar/feeds/mr5t4iqhiu81dh0cdq040cruc4%40group.calendar.google.com/private-ac4baac1a7cfab33824e2b02261b7b81/basic";
//$googleURL = "http://www.google.com/calendar/feeds/$userid/private-$magicWord/basic?alt=json";
//$url = "http://www.google.com/calendar/feeds/developer-calendar@google.com/public/full?alt=json";
$data = file_get_contents($googleURL);
$feed = simplexml_load_string($data);
echo json_encode($feed);