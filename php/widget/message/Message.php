<?php

require_once('../../config/database.php');
require_once('../../lib/RestServer.php');

class Message {
    public static function getMessages() {
        $con = pg_connect("host=".CON_HOST." dbname=".CON_DBNAME." user=".CON_USER." password=".CON_PASSWORD."")
            or die ("Could not connect to server.");

        $query = "SELECT * FROM message WHERE start_date <= now()::date AND end_date >= now()::date AND removed = false";

        $result = pg_query($con, $query)
            or die("Cannot execute the query.");

        return pg_fetch_all($result);
    }

    public static function removeMessage() {
        $con = pg_connect("host=".CON_HOST." dbname=".CON_DBNAME." user=".CON_USER." password=".CON_PASSWORD."")
            or die ("Could not connect to server.");

        if($_REQUEST['id'] > 1) {
            $query = "UPDATE message SET removed = true WHERE message_id = ". $_REQUEST['id'];
        }

        pg_query($con, $query) or die("Cannot execute the query.");
    }

    public static function postMessage() {
        $con = pg_connect("host=".CON_HOST." dbname=".CON_DBNAME." user=".CON_USER." password=".CON_PASSWORD."")
            or die ("Could not connect to server.");

        $query = "INSERT INTO message (message, employee, start_date, end_date, removed)
                  VALUES ('". $_REQUEST['message'] ."','". $_REQUEST['name'] ."','". $_REQUEST['dateFrom'] ."','". $_REQUEST['dateTill'] ."', false)";

        pg_query($con, $query) or die("Cannot execute the query.");
    }
}

$rest = new RestServer('Message');
$rest->handle();