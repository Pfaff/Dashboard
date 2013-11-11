<?php

require_once('../config/config.php');
require_once('../lib/RestServer.php');
include('AdapterNu.php');
include('AdapterTweakers.php');

class News {

    public static function main() {
//        $adapterNu = new AdapterNu();
//        $news = $adapterNu->main();
//
//        return $news;

        $adapterTweakers = new AdapterTweakers();
        $news = $adapterTweakers->main();

        return $news;
    }
}

$rest = new RestServer('News');
$rest->handle();
