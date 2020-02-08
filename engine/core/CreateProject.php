<?php
var_dump($_POST);
file_put_contents("test.json",$_POST['data']);