<?php

require_once("../dbconfig.php");

class UserAmount {
    public function __construct() {
        $this->DBH = new PDO("pgsql:dbname=".CON_DBNAME.";host=".CON_HOST."", CON_USER, CON_PASSWORD);
        $this->userAmounts = Array();
    }

    public function __destruct() {
        $this->DBH = null;
    }

    public function getUserAmounts() {
        try {
            $STH = $this->DBH->prepare("SELECT * FROM user_amount");
            $STH->execute();
            $this->userAmounts = $STH->fetchAll();

            return json_encode($this->userAmounts);
        } catch(PDOException $e) {
            return $e->getMessage();
        }
    }
}