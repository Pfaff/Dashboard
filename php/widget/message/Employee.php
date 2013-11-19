<?php

require_once('../../config/config.php');
require_once('../../lib/RestServer.php');

class Employee {

    public static function main() {
        $ldap = ldap_connect(LDAP_LOCATION) or die("Could not connect to LDAP server.");
        $info = null;

        if ($ldap) {
            ldap_bind($ldap, LDAP_USER, LDAP_PASS);

            $attributes = array("displayname", "mail");

            $filter = "(&(memberOf=" .LDAP_FILTER_GROUP. "))";

            $result = ldap_search($ldap, LDAP_BASE_DN,  $filter, $attributes) or die ("Error in search query");
            $info = ldap_get_entries($ldap, $result);
        }

        return $info;
    }
}

$rest = new RestServer('Employee');
$rest->handle();




