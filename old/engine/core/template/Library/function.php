<?
$_input = [];
if ($input) {
}

?>
```<?= $pro_PorjectData['Projectlang'] . PHP_EOL ?>
function <?= $name ?>(<?= implode(', ', $_input) ?>) {

return <?= implode(', ', $renurn['datatype']); ?> //<?= $renurn['shortDiscription'] ?>

}

```
## inputs:
<table class="md-table">
	<tr class="md-row">
		<th class="md-th">Name </th>
		<th class="md-th">data type</th>
		<th class="md-th">defult</th>
		<th class="md-th">optional</th>
		<th class="md-th">short discription</th>
	</tr>
	<? foreach ($input as $item) : ?>
		<?
		$types = implode(', '.PHP_EOL, $item['datatype']);
		$optional = ($item["optional"] == "true") ? "Optional" : "32423"; ?>

		<tr class="md-row">
			<td class="md-td"><?= $item["Name"] ?> </td>
			<td class="md-td"><?= $types ?> </td>
			<td class="md-td"><?= $item["defult"] ?></td>
			<td class="md-td"><?= $item["optional"] ?></td>
			<td class="md-td"><?= $item["shortDiscription"] ?></td>
		</tr>
	<? endforeach; ?>
</table>
### <?= $discription['shortDiscription'] ?>

<?= $discription['longDiscription'] ?>