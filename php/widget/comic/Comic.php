<?php

require_once('../../config/config.php');
require_once('../../lib/RestServer.php');

class Comic {

    public static function main() {

        $xmlComics = self::getComics();
        return self::buildDataToReturn($xmlComics);
    }

    private static function getComics() {
        $fileContent = file_get_contents("http://xkcd.com/rss.xml");
        $fileContent = str_replace(array("\n", "\r", "\t"), '', $fileContent);
        $fileContent = trim(str_replace('"', "'", $fileContent));

        $xmlContent = simplexml_load_string($fileContent);

        return $xmlContent->channel;
    }

    private static function buildDataToReturn($xmlComics) {
        $dataToReturn = array();

        for($i = 0; $i < count($xmlComics->item); $i++) {
            $item = $xmlComics->item[$i];

            $row = array(   "title" => (string) $item->title,
                "src" => (string) $item->description,
                "alt" => (string) $item->description
            );

            array_push($dataToReturn, $row);
        }

        return $dataToReturn;
    }
}

$rest = new RestServer('Comic');
$rest->handle();
