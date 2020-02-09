<?php
include "Jsonbd.class.php";
ob_start();
$test = new JsonBd("JsonBd");
$test->createBd('test');
$enter = ob_get_contents();
var_dump($enter);
var_dump($test);