<?php

require_once("UserAmount.php");

$user = new UserAmount();
$result = $user->getUserAmounts();

echo $result;

