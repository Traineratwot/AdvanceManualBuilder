<?php
include "Jsonbd.class.php";
ob_start();
$test = new JsonBd("JsonBd", "Project");
$test->createBd('');
$test->createTable(
	'',
	[
		"name" => "Test_int",
		"type" => "integer",
		"defult_value" => "",
		"index" => true,
		"auto_increment" => true,
	],
	[
		"name" => "Test_array",
		"type" => "array",
		"index" => false,
		"auto_increment" => false,
	]
);

// $test->INSERT('test.td2', [
// 	"Test_array" 	=> "я строка",
// ], [
// 	"Test_array" 	=> [1, 2, 454, 56, 7, 6],
// ]);
$result = $test->SELECT('test.td', ["Test_string"], 2);
$enter = ob_get_contents();
var_dump($result);
var_dump($test);
