<?php

require_once('../../config/config.php');

class AdapterNu {
    /**
     * Builds the data retrieved from the given url.
     * @param $url
     * @return array
     */
    public static function main($url) {
        return self::buildDataToReturn(self::getNews($url));
    }

    /**
     * Retrieves the news from the given url.
     * @param $url
     * @return SimpleXMLElement[]
     */
    private static function getNews($url) {
        $fileContent = file_get_contents($url);
        $fileContent = str_replace(array("\n", "\r", "\t"), '', $fileContent);
        $fileContent = trim(str_replace('"', "'", $fileContent));

        $xmlContent = simplexml_load_string($fileContent);

        return $xmlContent->channel;
    }

    /**
     * Builds an array in a desired format from the retrieved content.
     * @param $content
     * @return array
     */
    private static function buildDataToReturn($content) {
        $dataToReturn = array();

        for($i = 0; $i < MAX_NEWS_ARTICLES; $i++) {
            $item = $content->item[$i];

            $row = array(   "site" => "Nu",
                            "category" => (string) strtolower($item->category),
                            "title" => (string) $item->title,
                            "link" => (string) $item->link,
                            "photo" => (string) $item->enclosure->attributes()->url,
            );

            array_push($dataToReturn, $row);
        }

        return $dataToReturn;
    }
}
