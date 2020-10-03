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
	/**
	 * @param  {ManualClass} manual
	 */
	render() {
		// this.block.html("");
		this.create_manual = $(`<button type="button" class="btn btn-primary" id="create_manual"></button>`).text('create manual').appendTo(this.block);
    }
    renderTree(){
        
    }
}
var layout = {};
layout.editor = new LayoutEditorClass();
layout.tree = new LayoutTreeClass();
layout.tree.render();
