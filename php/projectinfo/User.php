<?php

require_once("../dbconfig.php");

class User {
    public function __construct() {
        $this->DBH = new PDO("pgsql:dbname=".CON_DBNAME.";host=".CON_HOST."", CON_USER, CON_PASSWORD);
        $this->users = Array();
    }

    public function __destruct() {
        $this->DBH = null;
    }

    public function getUsers() {
        try {
            $STH = $this->DBH->prepare("SELECT * FROM users");
            $STH->execute();
            $this->users = $STH->fetchAll();

            if($this->users) {
                return json_encode($this->users);
            } else {
                return 0;
            }
        } catch(PDOException $e) {
            return $e->getMessage();
        }
    }
}