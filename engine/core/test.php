<?php
include "Jsonbd.class.php";
ob_start();
$test = new JsonBd("JsonBd");
$test->createTable(
	'test3',
	"td",
	[
		"name" => "rtr",
		"type" => "int",
		"defult_value" => "",
		"index" => true,
		"auto_increment" => true,
	],
	[
		"name" => "jhj",
		"type" => "string",
		"defult_value" => "",
		"index" => false,
		"auto_increment" => false,
	]
);
$enter = ob_get_contents();
var_dump($enter);
var_dump($test);
