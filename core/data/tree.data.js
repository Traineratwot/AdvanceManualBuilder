var treeTemplate = new CLASSES.Template()
treeTemplate.main = `<ul class="bg-dark tree"><p>Manuals</p></ul>`
treeTemplate.item = `<li style="list-style-image:url(\'assets/icons/dark/$[treeIcon].svg\');"><span class="startEditor caret" data-object="$[GlobalKey]">$[text]</span></li>`
treeTemplate.subItem = `<ul class="nested">`
treeTemplate.content = `<li style="list-style-image:url(\'assets/icons/dark/$[treeIcon].svg\');" ><span class="startEditor" data-object="$[GlobalKey]">$[text]</span></li>`
treeTemplate.add = `<li style="list-style-image:url(\'assets/icons/dark/$[treeIcon].svg\');" ><span class="addElem" data-object="$[GlobalKey]" data-classKey="$[classKey]">$[text]</span></li>`