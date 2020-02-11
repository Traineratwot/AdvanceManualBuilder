<?php
include "Jsonbd.class.php";

$Bd = new JsonBd("../../Projects/$Projectname");
extract($_POST['data']);

// $path = "../../Projects";
// if (!is_dir($path)) {
// 	mkdir($path);
// }
// $path = "../../Projects/$Projectname";
// if (!is_dir($path)) {
// 	mkdir($path);
// }
$Bd->createBd(translit_sef($Projectname));
file_put_contents("../../Projects/$Projectname/index.json", json_encode($_POST, 256));

ob_start();
include "template/ProjectStart.php";
$MarkDown = ob_get_contents();
file_put_contents("test.md", $MarkDown);
