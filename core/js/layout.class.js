class LayoutEditorClass {
	constructor() {
		this.block = $("#editor");
		this.modal = $("#editorModal");
		this.addModal = $("#addModal");
	}
	/**
	 * @param  {ManualClass} manual
	 */
	render(elem = {}) {
		this.block.html("");
		this.elem = elem;
		if (elem instanceof CommonClass || elem instanceof  ManualClass) {
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
		this.tree = $(treeTemplate.get('main',{text:'Manuals'})).appendTo(this.block);
		if (typeof manuals != "undefined" && manuals instanceof Array) {
			for (const key in manuals) {
				if (manuals.hasOwnProperty(key)) {
					const manual = manuals[key];
					manual.renderTree(this.tree);
				}
			}
		}
		var toggler = document.getElementsByClassName("caret");
		var i;

		for (i = 0; i < toggler.length; i++) {
			$(toggler[i]).on("nondblclick", function() {
				$(this).toggleClass("caret-down").find("+ .nested").slideToggle()
			});
		}
	}
}
var layout = {};
layout.editor = new LayoutEditorClass();
layout.tree = new LayoutTreeClass();
layout.tree.render();
