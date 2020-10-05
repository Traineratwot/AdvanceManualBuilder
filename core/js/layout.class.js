class LayoutEditorClass {
	constructor() {
		this.block = $('#editor')
		this.modal = $('#editorModal')
		this.addModal = $('#addModal')
		this.modals ={}
	}


	/**
	 * @param  {ManualClass} manual
	 */
	render(elem = {}) {
		this.block.html('')
		this.elem = elem
		if(elem instanceof CLASSES.CommonClass || elem instanceof ManualClass) {
			elem.editorRender(this.block)
		}
	}
}

class LayoutTreeClass {
	constructor() {
		this.block = $('#tree')
	}


	render() {
		this.block.html('')
		this.renderTree()
	}


	renderTree() {
		this.tree = $(treeTemplate.get('main', {text: 'Manuals'})).appendTo(this.block)
		if(typeof manuals != 'undefined' && manuals instanceof Array) {
			for(const key in manuals) {
				if(manuals.hasOwnProperty(key)) {
					const manual = manuals[key]
					manual.renderTree(this.tree)
				}
			}
		}
		$(treeTemplate.get('add', {
			text: 'add manual',
			class: CLASSES.ManualClass.constructor.name,
			treeIcon: 'diff-added'
		})).appendTo(this.tree)

		this.treeEvent()
	}


	treeEvent() {
		$('.caret').on('nondblclick', function() {
			$(this).toggleClass('caret-down').find('+ .nested').slideToggle()
		})
		$('span.startEditor').on('dblclick', function() {
			layout.editor.render(GOA[$(this).data('object')])
		})
		$('span.addElem').on('dblclick', function() {
			layout.editor.addModal.GlobalKey = $(this).data('object')
			layout.editor.addModal.modal('show')
		})
	}
}


layout.editor = new LayoutEditorClass()
layout.tree = new LayoutTreeClass()
layout.tree.render()
