<?php

require_once('../../config/config.php');
require_once('../../lib/RestServer.php');

class Agenda {

    public static function main() {
        return 'hi';
    }
}

$rest = new RestServer('Agenda');
$rest->handle();
