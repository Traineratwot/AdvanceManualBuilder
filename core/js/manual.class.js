'use strict'

class ManualClass{
	#_GlobalKey = null
	editorFields = {
		name       : new EditorFieldsClass({name: 'name'}),
		version    : new EditorFieldsClass({name: 'version'}),
		description: new EditorFieldsClass({name: 'description',type:'class',class:'DescriptionClass'}),
		type       : new EditorFieldsClass({name: 'type'}),
	}
	constructor(object) {
		this.name = ''
		this.version = ''
		this.dateUpdate = ''
		this.dateCreate = ''
		this.type = ''
		this.description = new DescriptionClass
		this.elements = []
		this.classKey = this.constructor.name
		Object.assign(this, object)
		GOA.add(this)
	}


	addElement(value) {
		if(value instanceof CommonClass) {
			var key = this.elements.length
			value.setManual(this, key)
			this.elements.push(value)
			return true
		}
		return false
	}


	removeElement() {}


	build() {}


	print() {}


	toObject() {
		var JSON = {}
		for(let key in this) {
			let element = this[key]
			if(element instanceof CommonClass) {
				JSON[key] = element.toObject()
				continue
			}
			if(element instanceof Array) {
				JSON[key] = []
				for(let k in element) {
					let e = element[k]
					if(e instanceof CommonClass) {
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

	editorRender(parent){
		for(const editorFieldsKey in this.editorFields) {
			this.editorFields[editorFieldsKey].render(parent,this[editorFieldsKey])
		}
	}

	fromObject() {}

	get GlobalKey() {
		return this.#_GlobalKey
	}


	set GlobalKey(value) {
		if(this.#_GlobalKey == null) {
			this.#_GlobalKey = value
		}
	}

	renderTree(parent) {
		var item = $(treeTemplate.get('item', {text: this.name,GlobalKey:this.#_GlobalKey})).appendTo(parent)
		item.on('dblclick',function() {
			layout.editor.render(GOA[$(this).find('a').data('object')])
		})
		if(this.elements.length > 0) {
			var subItem = $(treeTemplate.get('subItem')).appendTo(item)
			item.on('click',(e)=>{
				subItem.slideToggle()
			})
			for(const k in this.elements) {
				if(this.elements[k] instanceof CommonClass) {
					const element = this.elements[k]
					element.renderTree(subItem)
				}
			}
		}

	}
}

