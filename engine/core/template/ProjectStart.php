# NAME <?=$ProjectName?>
### Discription <?=$Projectdiscription?>
  
## Project instalation
---

<? foreach ($Projectinstalation as $i => $item): ?>
Step <?=$i++?>:
<? switch ($item["type"]): case "html": ?>
```html
<?=$item["text"].PHP_EOL?>
```
<? break; case "npm": ?>
```html
<?=$item["text"].PHP_EOL?>
```
<? break; case "git": ?>
```html
<?=$item["text"].PHP_EOL?>
```
<? break; case "composer": ?>
```html
<?=$item["text"].PHP_EOL?>
```
<? break; endswitch; endforeach; ?>



## Dependences
---
<? foreach ($Projectdependences as $item): ?>
- <?=$item["name"]?>: Version >= <?=$item["minversion"]?> minversion
<? endforeach; ?>