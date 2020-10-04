var treeTemplate = new Template()
treeTemplate.main = '<ul class="bg-dark tree"><p>Manuals</p></ul>'
treeTemplate.item = '<li style="list-style-image:url(\'assets/icons/dark/${treeIcon}.svg\');"><span class="caret" data-object="${GlobalKey}">${text}</span></li>'
treeTemplate.subItem = '<ul class="nested">'
treeTemplate.content = '<li style="list-style-image:url(\'assets/icons/dark/${treeIcon}.svg\');" ><span data-object="${GlobalKey}">${text}</span></li>'