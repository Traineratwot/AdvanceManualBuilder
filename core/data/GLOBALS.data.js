const CLASSES = {}
CLASSES.GlobalObjectAccess = class GlobalObjectAccess {

	getAllKeys() {
		var a = []
		for(const thisKey in this) {
			a.push(this)
		}
		return a
	}


	add(value) {
		var key = this.getUniqueKey()
		if(value.GlobalKey === null || typeof value.GlobalKey == 'undefined') {
			value.GlobalKey = key
			this[key] = value
			console.info('initialized ' + key + ' ' + value.constructor.name)
			$(document).trigger(value.constructor.name + '_initialized', {
				obj: value,
				key: key,
			})
		} else {
			key = value.GlobalKey
			if(typeof this[key] == 'undefined') {
				this[key] = value
				console.info('initialized ' + key + ' ' + value.constructor.name)
				$(document).trigger(value.constructor.name + '_initialized', {
					obj: value,
					key: key,
				})
			}
		}

	}

	count(){
		var i = 0
		for(const globalObjectAccessKey in this) {
			i++
		}
		return i
	}

	getUniqueKey() {
		var key = getRandomString()
		var keys = this.getAllKeys()

		function eq(element) {
			return element == this
		}

		if(keys.length > 0) {
			while(keys.find(eq, key)) {
				key = getRandomString()
			}
		}
		return key
	}
}
var GOA = new CLASSES.GlobalObjectAccess
CLASSES.Manuals = class Manuals {
	i = 0
	index = {}


	constructor() {
		GOA.add(this)
	}


	add(manual) {
		if(typeof this[manual.GlobalKey] == 'undefined') {
			this.index[this.i] = this[manual.GlobalKey] = manual
			manual.ElementId = this.i
			this.i++
		}
	}
}
var manuals = new CLASSES.Manuals
const dataTypes = {}
const layout = {}
const current = {}
current.editor = ''
class Temp {
	add(value) {
		var key = getRandomString()
		if(value.temp === null) {
			value.temp = key
			this[key] = value
			return key
		} else {
			return value.temp
		}
	}


	trash() {
		for(const thisKey in this) {
			if(this[thisKey] instanceof CLASSES.CommonClass) {
				this[thisKey].temp = null
				this[thisKey] = null
				delete this[thisKey]
			}
		}
	}


	remove(value) {
		delete this[value.temp]
		value.temp = null
	}
}
const tmp = new Temp
CLASSES.Template = class Template {
	get(s, v = null) {
		if(v != null && typeof (v) == 'object') {
			var t = '' + this[s]
			for(var k in v) {
				if(typeof v[k] != 'undefined' && v[k] != 'undefined') {

					t = t.replaceAll('$[' + k + ']', locale._(v[k]))
				}
			}
			t = t.replaceAll(/\$\[.+?\]/g, '')
			return t
		} else return this[s]
	}
}
