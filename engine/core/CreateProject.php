<?php
include "Jsonbd.class.php";
$data = json_decode($_POST['data'],1);
extract($data);

// $project = new JsonBd("../../Projects/$Projectname");
$BD = new JsonBd("../..", 'BD');
$path = "../../Projects";
if (file_exists($BD->currentDbPath."/$Projectname.json")) {
	die;
}
if (!is_dir($path)) {
	mkdir($path);
}
$path = "../../Projects/$Projectname";
if (!is_dir($path)) {
	mkdir($path);
}

$BD->INSERT('Projects',[
	"name"=>$Projectname,
	'PorjectData'=>$data
	]);
$patten = [
	"tree" => [],
	"chuncks" => []
];
	
file_put_contents($BD->currentDbPath."/$Projectname.json", json_encode($patten,256));

ob_start();
include "template/ProjectStart.php";
$MarkDown = ob_get_contents();
file_put_contents("test.md", $MarkDown);
// var_dump($BD);
