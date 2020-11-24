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
				caller: 'create'
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
		if(typeof manuals != 'undefined' && manuals instanceof Object) {
			for(const key in manuals.index) {
				if(manuals.index.hasOwnProperty(key)) {
					const manual = manuals.index[key]
					manual.renderTree(this.tree)
				}
			}
		}
		$(treeTemplate.get('add', {
			text: 'add manual',
			classkey: 'ManualClass',
			treeIcon: 'diff-added'
		})).appendTo(this.tree)

		this.treeEvent()
	}


	treeEvent() {
		$('.caret:not("caret-down")').each(function() {
			if(GOA[$(this).data('object')].treeOpened) {
				$(this).toggleClass('caret-down').find('+ .nested').slideToggle()
			}
		})
		$('.caret').on('nondblclick', function() {
			$(this).toggleClass('caret-down').find('+ .nested').slideToggle()
			GOA[$(this).data('object')].treeOpenedToggle()
		})
		$('button.startEditor').each(function() {
			EMC.add({
				element: this,
				event: 'dblclick',
				func: 'treeDblclick',
			})
		})
		$('button.addElem').each(function() {
			EMC.add({
				element: this,
				event: 'dblclick',
				func: 'treeAddDblclick',
			})
		})
		$('button.caret').each(function() {
			var v = $(this).siblings('ul').length
			if(v > 0) {
				$(this).removeClass('empty')
			} else {
				$(this).addClass('empty')

			}
		})
		EMC.setEvents()
		tmp.trash()
	}
}

class layoutPreviewClass {
	constructor() {
		this.block = $(window.frames[0].document.body).find('div#wrap')
		this.terminal = window.frames[0]
		this.markdown = []
		this.text = ''
	}
	add(text){
		this.markdown.push(`\n\r${text}\n\r`)
		this.text = this.markdown.join("\n\r***\n\r")
	}
	clear(){
		this.markdown = []
		this.text = ''
	}
	render(){
		if(this.block.length == 0){
			this.block = $(window.frames[0].document.body).find('div#wrap')
		}
		this.block.html(this.text)
		this.terminal.convert()
		return this.markdown
	}
}

layout.editor = new LayoutEditorClass()
layout.preview = new layoutPreviewClass()
layout.tree = new LayoutTreeClass()
layout.editor.template.addModal = `<div class="modal fade" id="$[GlobalKey]_addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
	     aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	            <div class="modal-header">
	                <h5 class="modal-title">$[header]</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true">&times;</span>
	                </button>
	            </div>
	            <div class="modal-body">
	                <div class="input-group mb-3">
	                    <div class="input-group-prepend">
	                        <label class="input-group-text" for="inputGroupSelect01">${locale._('object')}</label>
	                    </div>
	                    <select data-object="$[GlobalKey]" class="custom-select" id="inputGroupSelect01">
	                        <option selected>${locale._('chose')}</option>
	                    </select>
	                </div>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-secondary" 			data-dismiss="modal">${locale._('close')}</button>
	                <button type="button" class="btn btn-primary createElem"  	data-dismiss="modal">${locale._('create')}<i></i></button>
	            </div>
	        </div>
	    </div>
	</div>`
layout.tree.render()




