<?php

class AdapterTweakers {

    public static function main() {
        return self::buildDataToReturn(self::getNews());
    }

    private static function getNews() {
        $fileContent = file_get_contents('http://feeds.feedburner.com/tweakers/nieuws');
        $fileContent = str_replace(array("\n", "\r", "\t"), '', $fileContent);
        $fileContent = trim(str_replace('"', "'", $fileContent));

        $xmlContent = simplexml_load_string($fileContent);

        return $xmlContent->channel;
    }

    private static function buildDataToReturn($content) {
        $dataToReturn = array();

        for($i = 0; $i < count($content->item); $i++) {
            $item = $content->item[$i];

            $row = array(   "site" => array(0 => "Tweakers"),
                "category" => array(0 => "techniek"),
                "title" => $item->title,
                "photo" => $content[0]->image->url,
            );

            array_push($dataToReturn, $row);
        }

        return $dataToReturn;
    }
}