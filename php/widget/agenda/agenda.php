<?php

require_once('../../lib/RestServer.php');
require_once('../../config/config.php');

class Agenda {

    public static function main() {
        $data = array();
        $projects = ["Topicus", "Alluris", "Dashboard", "EduArte", "Iris+", "ParnasSys", "ParnasSys Ouders", "ParnasSys Supportportaal", "Passepartout", "Reportal", "SOM", "SOM Portaal", "SOMtoday", "TrmVerwijzer", "ZIEN!"];
        $agendaLocations = unserialize(AGENDA_LOCATIONS);

        for($i = 0; $i < count($projects); $i++) {
            $projectToGet = $projects[$i];
            $agendaItems = self::getAgendaItems($agendaLocations[$projectToGet]);
            $agendaItems = self::removeIrrelevantRows(self::buildDataArray($projectToGet, $agendaItems));
            $data = self::addAgendaItemsToData($data, $agendaItems);
        }

        return $data;
    }

    private static function getAgendaItems($url) {
        $fileContent = file_get_contents($url);
        $xmlContent = simplexml_load_string($fileContent);

        return $xmlContent;
    }

    private static function buildDataArray($agendaName, $content) {
        $data = array();

        for($i = 0; $i < count($content->entry); $i++) {
            $item = $content->entry[$i];

            $row = array(   "title" => (string) $item->title,
                            "agenda" => $agendaName,
                            "date" => self::calculateDate((string) $item->summary)
            );

            array_push($data, $row);
        }

        return $data;
    }

    private static function calculateDate($content) {
        $datePieces = explode(" ", $content);
        return substr($datePieces[4], 0, 4) . '-' . self::getMonth($datePieces[3]) . '-' . substr($datePieces[2], 0, -1);
    }

    private static function getMonth($month) {
        $months = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

        for($i = 0; $i < count($months); $i++) {
            if($month == $months[$i]) {
                return $i + 1;
            }
        }

        return $month;
    }

    private static function removeIrrelevantRows($content) {
        $data = array();

        $dateToday = date('Y-m-d');
        $parts = explode('-', $dateToday);
        $dateIn14Days = date('Y-m-d', mktime(0, 0, 0, $parts[1], $parts[2] + 14, $parts[0]));

        for($i = 0; $i < count($content); $i++) {
            $dateToCheck = date($content[$i]['date']);

            if(strtotime($dateToCheck) >= strtotime($dateToday) && strtotime($dateToCheck) <= strtotime($dateIn14Days)) {
                array_push($data, $content[$i]);
            }
        }

//        return date($content[21]['date']) >= $dateToday;
//        return [strtotime(date($content[21]['date'])), strtotime($dateIn14Days)];
//        return strtotime(date($content[21]['date'])) <= strtotime($dateIn14Days);
        return $data;
    }

    private static function addAgendaItemsToData($data, $agendaItems) {
        for($i = 0; $i < count($agendaItems); $i++) {
            array_push($data, $agendaItems[$i]);
        }

        return $data;
    }
}

$rest = new RestServer('Agenda');
$rest->handle();
