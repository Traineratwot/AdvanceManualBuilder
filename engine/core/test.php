<?php
include "Jsonbd.class.php";
ob_start();
$test = new JsonBd("JsonBd");
$test->createBd('test');
$test->createTable(
	'test',
	"td",
	[
		"name" => "Test_int",
		"type" => "integer",
		"defult_value" => "",
		"index" => true,
		"auto_increment" => true,
	],
	[
		"name" => "Test_string",
		"type" => "string",
		"defult_value" => "я красавчик",
		"index" => false,
		"auto_increment" => false,
	],
	[
		"name" => "Test_bool",
		"type" => "bool",
		"defult_value" => "",
		"index" => false,
		"auto_increment" => false,
	],
	[
		"name" => "Test_double",
		"type" => "double",
		"defult_value" => "",
		"index" => false,
		"auto_increment" => false,
	],
	[
		"name" => "Test_date",
		"type" => "date",
		"defult_value" => "",
		"index" => false,
		"auto_increment" => false,
	]
);

$test->INSERT('test.td',[
"Test_string"=>"я первая строка",
"Test_bool" => true
]);
$test->INSERT('test.td',[
	"Test_string"=>"я первая строка",
	"Test_bool" => false
]);
$test->INSERT('test.td',[
	"Test_bool" => true
]);
$enter = ob_get_contents();
var_dump($enter);
var_dump($test);
