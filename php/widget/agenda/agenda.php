

<?php

//$googleURL = "https://www.google.com/calendar/feeds/mr5t4iqhiu81dh0cdq040cruc4%40group.calendar.google.com/private-ac4baac1a7cfab33824e2b02261b7b81/basic";
////$googleURL = "http://www.google.com/calendar/feeds/$userid/private-$magicWord/basic?alt=json";
////$url = "http://www.google.com/calendar/feeds/developer-calendar@google.com/public/full?alt=json";
//$data = file_get_contents($googleURL);
//$feed = simplexml_load_string($data);
//echo json_encode($feed);

require_once('../../lib/RestServer.php');

class Agenda {

    public static function main() {
        $dataToReturn = array();

        //$dataToReturn = self::buildDataToReturn($dataToReturn, "SOM", self::getAgendaItems("https://www.google.com/calendar/feeds/0nl64fq988e5ac8lo6t255e01o%40group.calendar.google.com/private-f8e2aa32b5e162b8c70f2ad3bca0dd8c/basic"));
        $dataToReturn = self::buildDataToReturn($dataToReturn, "SOM", self::getAgendaItems("https://www.google.com/calendar/feeds/mr5t4iqhiu81dh0cdq040cruc4%40group.calendar.google.com/private-ac4baac1a7cfab33824e2b02261b7b81/basic"));

        return $dataToReturn;

        //return self::getAgendaItems("https://www.google.com/calendar/feeds/mr5t4iqhiu81dh0cdq040cruc4%40group.calendar.google.com/private-ac4baac1a7cfab33824e2b02261b7b81/basic");
    }

    private static function getAgendaItems($url) {
        $fileContent = file_get_contents($url);
        $xmlContent = simplexml_load_string($fileContent);

        return $xmlContent;
    }

    private static function buildDataToReturn($array, $agendaName, $content) {
        $dataToReturn = array();

        for($i = 0; $i < count($content->entry); $i++) {
            $item = $content->entry[$i];

            $row = array(   "title" => (string) $item->title,
                            "agenda" => $agendaName,
                            "date" => self::calculateDate((string) $item->summary)
            );

            array_push($dataToReturn, $row);
        }

        return $dataToReturn;
    }

    private static function calculateDate($content) {
        $datePieces = explode(" ", $content);

        return $datePieces;
    }
}

$rest = new RestServer('Agenda');
$rest->handle();
