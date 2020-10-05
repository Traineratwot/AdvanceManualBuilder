'use strict'

CLASSES.ManualClass = class ManualClass extends CLASSES.CommonClass {
	_GlobalKey = null
	editorFields = {
		name: new CLASSES.EditorFieldsClass(this, { name: 'name' }),
		version: new CLASSES.EditorFieldsClass(this, { name: 'version' }),
		description: new CLASSES.EditorFieldsClass(this, { name: 'description', type: 'class', class: 'DescriptionClass' }),
		type: new CLASSES.EditorFieldsClass(this, { name: 'type' }),
	}
	constructor(object) {
		super()
		this.name = ''
		this.version = ''
		this.type = ''
		this.description = new CLASSES.DescriptionClass
		this.elements = []
		this.classKey = this.constructor.name
		Object.assign(this, object)
		GOA.add(this)
	}


	addElement(value) {
		if (value instanceof CLASSES.CommonClass) {
			var key = this.elements.length
			value.setManual(this, key)
			this.elements.push(value)
			return true
		}
		return false
	}


	removeElement() { }


	build() { }


	print() { }


	toObject() {
		var JSON = {}
		for (let key in this) {
			let element = this[key]
			if (element instanceof CLASSES.CommonClass) {
				JSON[key] = element.toObject()
				continue
			}
			if (element instanceof Array) {
				JSON[key] = []
				for (let k in element) {
					let e = element[k]
					if (e instanceof CLASSES.CommonClass) {
						JSON[key].push(e.toObject())
					}
				}
				continue
			}
			JSON[key] = element
		}
		delete JSON.manual
		return JSON
	}

	editorRender(parent) {
		for (const editorFieldsKey in this.editorFields) {
			this.editorFields[editorFieldsKey].render(parent, this[editorFieldsKey])
		}
	}

	fromObject() { }

	get GlobalKey() {
		return this._GlobalKey
	}


	set GlobalKey(value) {
		if (this._GlobalKey == null) {
			this._GlobalKey = value
		}
	}

	renderTree(parent) {
		var item = $(treeTemplate.get('item', { text: this.name, GlobalKey: this._GlobalKey, treeIcon: this.treeIcon })).appendTo(parent)
		if (this.elements.length > 0) {
			var subItem = $(treeTemplate.get('subItem')).appendTo(item)
			for (const k in this.elements) {
				if (this.elements[k] instanceof CLASSES.CommonClass) {
					const element = this.elements[k]
					element.renderTree(subItem)
				}
			}
		}
		$(treeTemplate.get('add', { text: 'add new', GlobalKey: this._GlobalKey, treeIcon: this.treeAddIcon })).appendTo(subItem)

	}
}

