<?php

require_once('../../config/config.php');
require_once('../../lib/RestServer.php');
include('AdapterNu.php');
include('AdapterTweakers.php');

class News {

    public static function main() {
        $adapterNu = new AdapterNu();
        $adapterTweakers = new AdapterTweakers();

        $news = array();
        array_push(
            $news,
            $newsNuGeneral = $adapterNu->main(NEWS_NU_GENERAL),
            $newsNuInternet = $adapterNu->main(NEWS_NU_INTERNET),
            $newsNuEconomy = $adapterNu->main(NEWS_NU_ECONOMY),
            $newsNuSport = $adapterNu->main(NEWS_NU_SPORT),
            $newsNuScience = $adapterNu->main(NEWS_NU_SCIENCE),
            $newsTweakers = $adapterTweakers->main(NEWS_TWEAKERS)
        );

        return self::createDataToReturn($news);
    }

    public static function createDataToReturn($news) {
        $dataToReturn = array();

        for($i = 0; $i < count($news); $i++) {
            for($x = 0; $x < count($news[$i]); $x++) {
                array_push($dataToReturn, $news[$i][$x]);
            }
        }

        return $dataToReturn;
    }
}

$rest = new RestServer('News');
$rest->handle();
