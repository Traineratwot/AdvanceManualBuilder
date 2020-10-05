const CLASSES = {}
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
				delete this[thisKey];
			}
		}
	}


	remove(value) {
		delete this[value.temp]
		value.temp = null
	}
}

const tmp = new Temp
