'use strict'

class ManualClass {
	constructor() {
		this.name = ''
		this.version = ''
		this.dateUpdate = ''
		this.dateCreate = ''
		this.type = ''
		this.description = new DescriptionClass
		this.elements = []
		this.classKey = this.constructor.name
	}


	addElement(value) {
		if(value instanceof CommonClass) {
			var key = this.elements.length
			value.setManual(this,key)
			this.elements.push(value)
			return true
		}
		return false
	}


	removeElement() {

	}


	build() {

	}


	print() {

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
				JSON[key] = [];
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

	fromObject(){

	}
}