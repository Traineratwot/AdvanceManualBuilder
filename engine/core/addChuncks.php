<?
$data = $_POST['data'];
extract($_POST['data'], EXTR_PREFIX_ALL, "data");
extract($_POST['project'], EXTR_PREFIX_ALL, "pro");

if ($_POST['save']) {
	$Tree = json_decode(file_get_contents("../../BD/$pro_name.json"), 1);
	$i = count($Tree["chunks"])+1;
	$Tree["chunks"][$i] = $data;
	$push = [
		"id" => $i,
		"text" => "<span class='data_ClassType'>$data_ClassType</span>.<span class='data_name'>$data_name</span>",
		"state"=> [ "opened"=> true ],
		"children" => [
			[
				"id" => -$i,
				"text" => "add"
			],
		]
	];
	if ((int) $_POST['parent'] == 0) {
		$Tree["tree"][] = $push;
	} else {
		recursiveFindValue($Tree["tree"], (int) $_POST['parent'], $push);
	}
	file_put_contents("../../BD/$pro_name.json", json_encode($Tree, 256));
	file_put_contents("../../Projects/$pro_name/$data_ClassType.$data_name.md", generate());
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

function recursiveFindValue(&$arr, $val, $set)
{
	for ($i = 0; $i < count($arr); $i++) {
		$value = &$arr[$i];
		if ($value['id'] == $val) {
			$value['children'][] = $set;
			return;
		}
		recursiveFindValue($arr, $val, $set);
	}
}
