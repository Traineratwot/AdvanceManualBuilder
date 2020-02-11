<?php
include "Jsonbd.class.php";
$BD = new JsonBd("../..", 'BD');
$BD->DELETE('Projects',$_POST['name']);
var_dump($BD->log);
?>