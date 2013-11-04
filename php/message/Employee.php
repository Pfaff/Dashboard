<?php

require_once('../config/config.php');

$ldap = ldap_connect(LDAP_LOCATION) or die("Could not connect to LDAP server.");

if ($ldap) {
    $bind = ldap_bind($ldap, LDAP_USER, LDAP_PASS);

    $base_dn = "OU=TopicusUsers, OU=Topicus, DC=topicus, DC=local";

    $attributes = array("name", "mail");
//CN=topicusonderwijs

    $email ="thijs.elferink@topicus.nl";

    $result = ldap_search($ldap, $base_dn,  "(cn=*)") or die ("Error in search query");

    $info = ldap_get_entries($ldap, $result);

    echo json_encode($info);
}



