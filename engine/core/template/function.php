<?
$_input =[];
	foreach ($input as $key => $value) {
		$types ="[";
		$types .= implode(', ',$value['datatype']);
		$types .="]";
		$_input[] = "$types".$value["Name"]." = ".$value["defult"];
	}
?>
```php
function <?=$name?>(<?=implode(', ',$_input)?>) {
	return <?=implode(', ',$renurn['datatype']);?>
	//<?=$renurn['shortDiscription']?>
}
```

### <?=$discription['shortDiscription']?>

<?=$discription['longDiscription']?>

