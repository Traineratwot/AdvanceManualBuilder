'use strict'

class CommonClass {
	#_empty = true
	#_ElementId = null
	sortKey = 0


	constructor() {
		if(arguments.length == 0) {
			this.#_empty = true
		} else {
			this.#_empty = false
		}
		this.name = null
		this.sortKey = 0
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
		JSON.elements = []
		Object.assign(JSON, this)
		if(typeof this.elements != 'undefined') {
			for(let element of this.elements) {
				if(element instanceof CommonClass) {
					JSON.elements.push(element.toObject())
				}
			}
		}
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
