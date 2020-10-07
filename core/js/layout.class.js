class LayoutEditorClass {
	constructor() {
		this.block = $('#editor')
		this.modal = $('#editorModal')
		this.template = new CLASSES.Template()
		this.addModal = $('#addModal')
		this.addModals = {}
		for(const CLASSESKey in CLASSES) {
			this.addModal.find('select').append($(editorTemplate.get('option', {
				label: CLASSESKey,
				value: CLASSESKey,
			})))
		}

		this.modals = {}
	}


	/**
	 * @param  {ManualClass} manual
	 */
	render(elem = {}) {
		this.block.html('')
		this.elem = elem
		if(elem instanceof CLASSES.CommonClass) {
			elem.editorRender({
				parent: this.block,
				caller:'create'
			})
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
		$('.caret:not("caret-down")').each(function() {
			if(GOA[$(this).data('object')].treeOpened){
				$(this).toggleClass('caret-down').find('+ .nested').slideToggle()
			}
		})
		$('.caret').on('nondblclick', function() {
			$(this).toggleClass('caret-down').find('+ .nested').slideToggle()
			GOA[$(this).data('object')].treeOpenedToggle()
		})
		$('span.startEditor').on('dblclick', function() {
			current.editor = $(this).data('object')
			layout.editor.render(GOA[current.editor])
		})
		$('span.addElem').on('dblclick', function() {
			var GlobalKey = $(this).data('object')
			var childKey = $(this).data('childKey')
			var modal = layout.editor.addModals[GlobalKey]
			modal.modal('show')
			modal.find('select')
				.on('change', function() {
					modal.find('button.createElem i').html($(this).val())
				})
			modal.find('button.createElem')
				.on('click', () => {
					var classKey = modal.find('select').val()
					GOA[GlobalKey].createNewElement(classKey, GlobalKey, childKey, layout.editor.block)
				})
		})
		$('span.caret').each(function() {
			var v = $(this).siblings('ul').length
			if(v > 0) {
				$(this).removeClass('empty')
			} else {
				$(this).addClass('empty')

			}
		})
		tmp.trash()
	}
}

layout.editor = new LayoutEditorClass()
layout.tree = new LayoutTreeClass()
layout.editor.template.addModal = '<div class="modal fade" id="${GlobalKey}_addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"\n' +
	'     aria-hidden="true">\n' +
	'    <div class="modal-dialog modal-dialog-centered" role="document">\n' +
	'        <div class="modal-content">\n' +
	'            <div class="modal-header">\n' +
	'                <h5 class="modal-title">Modal title</h5>\n' +
	'                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
	'                    <span aria-hidden="true">&times;</span>\n' +
	'                </button>\n' +
	'            </div>\n' +
	'            <div class="modal-body">\n' +
	'                <div class="input-group mb-3">\n' +
	'                    <div class="input-group-prepend">\n' +
	'                        <label class="input-group-text" for="inputGroupSelect01">Options</label>\n' +
	'                    </div>\n' +
	'                    <select data-object="${GlobalKey}" class="custom-select" id="inputGroupSelect01">\n' +
	'                        <option selected>Выберите...</option>\n' +
	'                    </select>\n' +
	'                </div>\n' +
	'            </div>\n' +
	'            <div class="modal-footer">\n' +
	'                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n' +
	'                <button type="button" class="btn btn-primary createElem"  data-dismiss="modal">Create <i></i></button>\n' +
	'            </div>\n' +
	'        </div>\n' +
	'    </div>\n' +
	'</div>'
layout.tree.render()
