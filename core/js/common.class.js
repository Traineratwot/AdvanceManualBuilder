'use strict'

class CommonClass {
	#_empty = true
	#_ElementId = null
	editorFields = {
		name: new EditorFieldsClass({name: 'name'})
	}


	constructor() {
		if(arguments.length == 0) {
			this.#_empty = true
		} else {
			this.#_empty = false
		}
		this.sortKey = 0
		this.classKey = this.constructor.name
	}


	setManual(manual, key) {
		if(manual instanceof ManualClass) {
			this.manual = manual
			this.sortKey = key
			this.ElementId = key
		}
	}


	render() {}


	prepare() {
		return true
	}


	success(msg = '', data = {}) {
		return {success: true, msg: msg, data: data}
	}


	failure(msg = '', data = {}) {
		return {success: false, msg: msg, data: data}
	}


	get empty() {
		return this.#_empty
	}


	set empty(value) {
		return false
	}


	get ElementId() {
		return this.#_ElementId
	}


	set ElementId(value) {
		if(this.#_ElementId == null) {
			this.#_ElementId = value
		}
	}


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
		delete JSON.editorFields
		return JSON
	}


	fromObject(value) {
		Object.assign(this, value)
		return toObject()
	}
}

class DataTypeClass extends CommonClass {
	constructor(name = '', subname = '', preview = '') {
		super(...arguments)
		this.name = name.toLowerCase()
		this.subName = subname.toLowerCase()
		this.preview = preview.toLowerCase()
	}


	preRender() {
		super.render()
	}
}

class DescriptionClass extends CommonClass {
	constructor() {
		super(...arguments)
		this.body = ''
	}


	preRender() {
		super.render()
	}
}

class VarClass extends CommonClass {
	constructor() {
		super(...arguments)
		this.name = null
		this.value = ''
		this.type = new DataTypeClass()
	}
}

class EditorFieldsClass {
	constructor(options) {
		this.name = ''
		this.type = 'text'
		this.dataSetKey = []
		this.callback = false
		this.id = this.randomString(6)
		this.input = false
		Object.assign(this, options)
	}


	render(parent, value = '') {
		if(this.input === false) {
			switch( this.type ) {
				default:
					this.input = $(`<input name="${this.name}" id="${this.id}" type="${this.type}" value="${value}">`).appendTo(parent)
					if(this.callback !== false) {
						this.input.on('change', this.callback)
					}
					break
			}
		}else {
			this.input.appendTo(parent)
			this.input.val(value)
		}
		return this.input;
	}


	randomString(length = 0) {
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('')

		if(!length) {
			length = Math.floor(Math.random() * chars.length)
		}

		var str = ''
		for(var i = 0; i < length; i++) {
			str += chars[Math.floor(Math.random() * chars.length)]
		}
		return str
	}
}
