<?php

require_once("User.php");

$user = new User();
$result = $user->getUsers();

echo $result;

