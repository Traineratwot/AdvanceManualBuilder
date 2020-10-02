<?php
extract($_POST['data']);
extract($_POST['data']["PorjectData"]);
if ((int) $_POST['prev'] == 1) {
	ob_start();
	include "template/$Projectype/Start.php";
	$MarkDown = ob_get_contents();
	return;
}
include "Jsonbd.class.php";
$data = $_POST['data'];
// extract($data);
// $project = new JsonBd("../../Projects/$Projectname");
$BD = new JsonBd("../..", 'BD');
$path = "../../Projects";
if (file_exists($BD->currentDbPath . "/$Projectname.json")) {
	die;
}
if (!is_dir($path)) {
	mkdir($path);
}
$path = "../../Projects/$Projectname";
if (!is_dir($path)) {
	mkdir($path);
}

$BD->INSERT('Projects', [
	"name" => $Projectname,
	'PorjectData' => $data
]);
$patten = [
	"tree" => [
		[
			"id" => -9999,
			"text" => "add"
		]
	],
	"chunks" => []
];

file_put_contents($BD->currentDbPath . "/$Projectname.json", json_encode($patten, 256));

ob_start();
include "template/$Projectype/Start.php";
$MarkDown = ob_get_contents();
file_put_contents("$path/$Projectname.md", $MarkDown);
// var_dump($BD);
