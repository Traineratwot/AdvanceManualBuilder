# <?=$Projectname.PHP_EOL?>
<?=$Projectlang?> <?=$Projecttype?> v<?=$Projectversion.PHP_EOL?>  
### <?=$Projectdiscription?>

<? if (isset($Projectinstalation)): ?>
## Project instalation
---

<? foreach ($Projectinstalation as $i => $item): ?>
Variant <?=++$i?> <?=$item["type"]?>:
<? switch ($item["type"]): case "html": ?>
```html
<?=trim($item["text"]).PHP_EOL?>
```
<? break; case "npm": ?>
```html
<?=trim($item["text"]).PHP_EOL?>
```
<? break; case "git": ?>
```html
<?=trim($item["text"]).PHP_EOL?>
```
<? break; case "composer": ?>
```html
<?=trim($item["text"]).PHP_EOL?>
```
<? break; endswitch; endforeach; endif; ?>

<? if (isset($Projectinstalation)): ?>
## Dependences
---
<? foreach ($Projectdependences as $item): ?>
- [<?=$item["name"]?>]() >= <?=$item["minversion"]?> 
<? endforeach; ?>
<? endif; ?>