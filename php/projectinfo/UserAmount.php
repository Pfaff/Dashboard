<?php

require_once("../lib/RestServer.php");
require_once("../dbconfig.php");

class UserAmount {
    public static function getUserAmounts() {
        $con = pg_connect("host=".CON_HOST." dbname=".CON_DBNAME." user=".CON_USER." password=".CON_PASSWORD."")
            or die ("Could not connect to server.");

        $query = "SELECT * FROM user_amount";

        $result = pg_query($con, $query)
            or die("Cannot execute the query.");

        return pg_fetch_all($result);
    }
}

$rest = new RestServer('UserAmount');
$rest->handle();