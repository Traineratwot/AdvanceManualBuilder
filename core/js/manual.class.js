'use strict'

CLASSES.ManualClass = class ManualClass extends CLASSES.CommonClass {
	_GlobalKey = null
	editorFields = {
		name: new CLASSES.EditorFieldsClass(this, {name: 'name'}),
		version: new CLASSES.EditorFieldsClass(this, {name: 'version'}),
		description: new CLASSES.EditorFieldsClass(this, {
			name: 'description',
			type: 'class',
			class: 'DescriptionClass'
		}),
		type: new CLASSES.EditorFieldsClass(this, {name: 'type'}),
	}
	availableChildrenClass = {
		ClassClass: {label: 'class', childKey: 'elements'},
		FunctionClass: {label: 'function', childKey: 'elements'},
		ObjectClass: {label: 'object', childKey: 'elements'},
		CodePreviewClass: {label: 'codePreview', childKey: 'elements'},
	}


	constructor(object) {
		super()
		GOA.add(this)
		this.name = ''
		this.version = ''
		this.type = ''
		this.addChildren(new CLASSES.DescriptionClass, 'description')
		this.elements = []
		this.classKey = this.constructor.name
		Object.assign(this, object)

	}


	addElement(value) {
		if(value instanceof CLASSES.CommonClass && value.parent === null) {
			var key = this.elements.length
			value.setParent(this, key)
			this.elements.push(value)
			console.info(this.GlobalKey + ' <== ' + value.GlobalKey)
			return true
		}
		return false
	}


	removeElement() { }


	build() { }


	print() { }


	toObject() {
		var JSON = {}
		for(let key in this) {
			if(key != 'parent') {
				let element = this[key]
				if(element instanceof CLASSES.CommonClass) {
					JSON[key] = element.toObject()
					continue
				}
				if(element instanceof Array) {
					JSON[key] = []
					for(let k in element) {
						let e = element[k]
						if(e instanceof CLASSES.CommonClass) {
							JSON[key].push(e.toObject())
						}
					}
					continue
				}
				JSON[key] = element
			}
		}
		delete JSON.parent
		delete JSON.editorFields
		return JSON
	}


	editorRender(options) {
		options = Object.assign({
			parent: layout.editor.block,
			name: this.name ?? '',
			label: '',
			object: false,
			prefix: 'edit ',
			btnClass: 'btn-primary',
			caller: 'tree'
		}, options)
		for(const editorFieldsKey in this.editorFields) {
			this.editorFields[editorFieldsKey].render(options.parent, this[editorFieldsKey], options.label)
		}
		$(document).trigger(this.GlobalKey + '_rendered', {
			obj: this,
			key: this.GlobalKey,
			options: options,
		})
		$(document).trigger('editor_rendered', {
			obj: this,
			key: this.GlobalKey,
			options: options,
		})
	}


	fromObject() { }


	renderTree(parent) {
		GOA.add(this)
		var item = $(treeTemplate.get('item', {
			text: this.name,
			GlobalKey: this.GlobalKey,
			childkey: this?.parent?.GlobalKey,
			treeIcon: this.treeIcon
		})).appendTo(parent)
		if(this.elements.length > 0) {
			var subItem = $(treeTemplate.get('subItem')).appendTo(item)
			for(const k in this.elements) {
				if(this.elements[k] instanceof CLASSES.CommonClass) {
					const element = this.elements[k]
					element.renderTree(subItem)
				}
			}
		}
		this.renderAddItem(subItem)
	}


	getMd() {
		layout.preview.clear()
		for(const element in this.elements) {
			layout.preview.add(this.elements[element].getMd())
		}
		return layout.preview.render()
	}
}

