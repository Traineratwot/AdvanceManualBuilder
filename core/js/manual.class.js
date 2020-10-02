'use strict'

class ManualClass {
	constructor() {
		this.object = {}
		this.object.name = ''
		this.object.version = ''
		this.object.dateUpdate = ''
		this.object.dateCreate = ''
		this.object.type = ''
		this.object.description = new DescriptionClass
		this.elements = []
	}


	addElement(value) {
		if(value instanceof CommonClass) {
			var key = this.elements.length
			value.ElementId = key
			this.elements.push(value)
			return true;
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
		JSON.elements = []
		Object.assign(JSON, this.object)
		for(let element of this.elements) {
			if(element instanceof CommonClass) {
				JSON.elements.push(element.toObject())
			}
		}
		return JSON
	}
}