<?php

require_once "lib/RestServer.php";

class HelloWorld
{
    public static function sayHello()
    {
        return array("Response" => "Hello Crazy World");
    }
}

$rest = new RestServer('HelloWorld');
$rest->handle();