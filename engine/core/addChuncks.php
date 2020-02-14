<?
include "Jsonbd.class.php";
$data = $_POST['data'];

$BD = new JsonBd("../..", 'BD');
if ($_POST['save']) {

} else {
	echo generate();
}
function generate()
{
	global $data;
	extract($data);
	ob_start();
	include "template/$ClassType.php";
	return ob_get_clean();
}
