<?php

class AdapterNu {

    public static function main() {
        return self::buildDataToReturn(self::getNews());
    }

    private static function getNews() {
        $fileContent = file_get_contents('http://www.nu.nl/feeds/rss/algemeen.rss');
        $fileContent = str_replace(array("\n", "\r", "\t"), '', $fileContent);
        $fileContent = trim(str_replace('"', "'", $fileContent));

        $xmlContent = simplexml_load_string($fileContent);

        return $xmlContent->channel;
    }

    private static function buildDataToReturn($content) {
        $dataToReturn = array();

        for($i = 0; $i < count($content->item); $i++) {
            $item = $content->item[$i];

            $row = array(   "site" => "Nu",
                            "category" => $item->category,
                            "title" => $item->title,
                            "photo" => $item->enclosure->attributes()->url,
            );

            array_push($dataToReturn, $row);
        }

        return $dataToReturn;
    }
}
