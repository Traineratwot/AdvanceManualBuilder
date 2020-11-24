var treeTemplate = new CLASSES.Template()
treeTemplate.main = `<ul class="bg-dark tree"><p>${locale._('Manuals')}</p></ul>`
treeTemplate.item = `<li style="list-style-image:url(\'assets/icons/dark/$[treeIcon].svg\');"><button class="btn btn-link startEditor caret" data-childkey="$[childkey]" data-object="$[GlobalKey]">$[text]</button></li>`
treeTemplate.subItem = `<ul class="nested">`
treeTemplate.content = `<li style="list-style-image:url(\'assets/icons/dark/$[treeIcon].svg\');" ><button class="btn btn-link startEditor" data-childkey="$[childkey]" data-object="$[GlobalKey]">$[text]</button></li>`
treeTemplate.add = `<li style="list-style-image:url(\'assets/icons/dark/$[treeIcon].svg\');" ><button type="button" class="btn btn-link addElem" data-object="$[GlobalKey]" data-childkey="$[childkey]" data-classkey="$[classkey]">$[text]</button></li>`



