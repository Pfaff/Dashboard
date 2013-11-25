<?php

require_once('../../lib/RestServer.php');

class Agenda {

    public static function main() {
        $dataToReturn = array();

        $dataToReturn = self::buildDataToReturn($dataToReturn, "SOM", self::getAgendaItems("https://www.google.com/calendar/feeds/0nl64fq988e5ac8lo6t255e01o%40group.calendar.google.com/private-f8e2aa32b5e162b8c70f2ad3bca0dd8c/basic"));
        //$dataToReturn = self::buildDataToReturn($dataToReturn, "SOM", self::getAgendaItems("https://www.google.com/calendar/feeds/mr5t4iqhiu81dh0cdq040cruc4%40group.calendar.google.com/private-ac4baac1a7cfab33824e2b02261b7b81/basic"));

        return $dataToReturn;
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
        return substr($datePieces[4], 0, 4) . '-' . self::getMonth($datePieces[3]) . '-' . substr($datePieces[2], 0, -1);
    }

    private static function getMonth($month) {
        $months = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

        for($i = 0; $i < count($months); $i++) {
            if($month === $months[$i]) {
                return $i;
            }
        }

        return $month;
    }
}

$rest = new RestServer('Agenda');
$rest->handle();
