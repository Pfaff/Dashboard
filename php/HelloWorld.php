<?php

require_once "lib/RestServer.php";

class HelloWorld
{
    public static function sayHello()
    {
        return array("Response" => "Hallo Wereld");
    }
}

$rest = new RestServer('HelloWorld');
$rest->handle();