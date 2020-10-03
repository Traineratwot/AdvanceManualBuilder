class LayoutEditorClass {
	constructor() {
		this.block = $("#editor");
	}
	/**
	 * @param  {ManualClass} manual
	 */
	render(elem = {}) {
		this.block.html("");
		this.elem = elem;
		if (elem instanceof CommonClass) {
			elem.editorRender(this.block);
		}
	}
}
class LayoutTreeClass {
	constructor() {
		this.block = $("#tree");
	}
	render() {
		this.block.html("");
		this.create_manual = $(`<button type="button" class="btn btn-primary" id="create_manual"></button>`).text("create manual").appendTo(this.block);
		this.renderTree();
	}
	renderTree() {
		this.tree = $(`
        <nav class="navbar navbar-dark bg-dark">
            <span class="navbar-brand" href="#">Manuals</span>
        </nav>
        `).appendTo(this.block);
		this.treeElme = {};
		if (typeof manuals != "undefined" && manuals instanceof Array) {
			for (const key in manuals) {
				if (manuals.hasOwnProperty(key)) {
					const manual = manuals[key];
					this.treeElme[manual.name] = $(`
                        <nav class="nav nav-pills flex-column">
                        <a class="nav-link dropdown-toggle" href="#">${manual.name}</a>
                        </nav>
                        `).appendTo(this.tree);
					if (manual.elements.length > 0) {
						var item = $(`<nav class="nav nav-pills flex-column">`).appendTo(this.treeElme[manual.name]);
					}
					for (const k in manual.elements) {
						if (manuals.hasOwnProperty(key) && manual.elements[k] instanceof CommonClass) {
							const element = manual.elements[k];
							$(`<a class="nav-link ml-3 my-1" href="#item-3-1">${element.name}<smal>()</smal></a>`).appendTo(item);
						}
					}
				}
			}
		}
	}
}
var layout = {};
layout.editor = new LayoutEditorClass();
layout.tree = new LayoutTreeClass();
layout.tree.render();
