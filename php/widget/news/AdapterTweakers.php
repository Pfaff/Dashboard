<?php

require_once('../../config/config.php');

class AdapterTweakers {

    public static function main($url) {
        return self::buildDataToReturn(self::getNews($url));
    }

    private static function getNews($url) {
        $fileContent = file_get_contents($url);
        $fileContent = str_replace(array("\n", "\r", "\t"), '', $fileContent);
        $fileContent = trim(str_replace('"', "'", $fileContent));

        $xmlContent = simplexml_load_string($fileContent);

        return $xmlContent->channel;
    }

    private static function buildDataToReturn($content) {
        $dataToReturn = array();

        for($i = 0; $i < MAX_NEWS_ARTICLES; $i++) {
            $item = $content->item[$i];

            $row = array(   "site" => "Tweakers",
                "category" => "techniek",
                "title" => (string) $item->title,
                "link" => (string) $item->link,
                "photo" => (string) $content[0]->image->url,
            );

            array_push($dataToReturn, $row);
        }

        return $dataToReturn;
    }
}