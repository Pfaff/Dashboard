<?php

include('../connect.php');

$result = pg_query($connection,"SELECT * FROM users");

$myarray = array();
while ($row = pg_fetch_row($result)) {
    $myarray[] = $row;
}

echo json_encode($myarray);

pg_close($connection);
