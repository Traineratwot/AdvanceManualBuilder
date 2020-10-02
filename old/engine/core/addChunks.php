<?
$data = $_POST['data'];
extract($_POST['data'], EXTR_PREFIX_ALL, "data");
extract($_POST['project'], EXTR_PREFIX_ALL, "pro");

if ($_POST['save']) {
	$Tree = json_decode(file_get_contents("../../BD/$pro_name.json"), 1);
	$id = (int) $_POST['id'] ?: -1;
	if ($id < 0) {
		$i = count($Tree["chunks"]) + 1;
	} else {
		$i = $id;
	}
	$Tree["chunks"][$i] = $data;
	$push = [
		"id" => $i,
		"text" => "<span class='data_ClassType'>$data_ClassType</span>.<span class='data_name'>$data_name</span>",
		"state" => ["opened" => true],
		"children" => [
			[
				"id" => -$i,
				"text" => "add"
			],
		]
	];
	if ((int) $_POST['parent'] == 0 and $id < 0) {
		$Tree["tree"][] = $push;
	} else {
		recursiveFindValue($Tree["tree"], (int) $_POST['parent'], $id, $push);
	}
	file_put_contents("../../BD/$pro_name.json", json_encode($Tree, 256));
	file_put_contents("../../Projects/$pro_name/$data_ClassType.$data_name.md", generate());
	echo generate();
} else {
	echo generate();
}
function generate()
{
	global $data, $pro_PorjectData;
	extract($data);
	ob_start();
	include "template/" . $pro_PorjectData['Projectype'] . "/$ClassType.php";
	return ob_get_clean();
}

function recursiveFindValue(&$arr, $val, $id, $set)
{
	if ($val == 0 and $id < 0) {
		$arr[] = $set;
		return;
	} else {
		for ($i = 0; $i < count($arr); $i++) {
			$value = &$arr[$i];
			if ($value['id'] == $val) {
				if ($id < 0) {
					$value['children'][] = $set;
				} else {
					$value['children'][$id - 1] = $set;
				}
				return;
			}
		}
	}

	return recursiveFindValue($arr, $val, $id, $set);
}
