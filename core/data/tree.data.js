var treeTemplate     = new Template()
treeTemplate.main    = '<nav class="navbar navbar-dark flex-column bg-dark"><span class="navbar-brand" href="#">${text}</span></nav>'
treeTemplate.item    = '<nav class="nav nav-pills flex-column">\n<a class="nav-link dropdown-toggle" data-object="${GlobalKey}" href="#">${text}</a>\n</nav>'
treeTemplate.subItem = '<nav class="nav nav-pills flex-column" style="display: none">'
treeTemplate.content = '<a class="nav-link ml-3 my-1" data-object="${GlobalKey}" href="#item-3-1">${text}</a>'