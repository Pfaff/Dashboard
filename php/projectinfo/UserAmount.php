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
            $STH = $this->DBH->prepare("SELECT * FROM users");
            $STH->execute();
            $this->userAmounts = $STH->fetchAll();

            if($this->userAmounts) {
                return json_encode($this->userAmounts);
            } else {
                return 0;
            }
        } catch(PDOException $e) {
            return $e->getMessage();
        }
    }
}