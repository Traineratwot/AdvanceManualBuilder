<?php
$data = json_decode($_POST['data'],1);
foreach($data as $key => $d){
	$$key = $d;
}

ob_start();
include "template/ProjectStart.php";
$MarkDown = ob_get_contents();
file_put_contents("test.md",$MarkDown);