<?php

require_once('../config/config.php');

$ldap = ldap_connect(LDAP_LOCATION) or die("Could not connect to LDAP server.");

if ($ldap) {
    //$bind = ldap_bind($conn, LDAP_USER, LDAP_PASS);


}



