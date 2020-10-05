const CLASSES = {}
const dataTypes = {}
const layout = {}
class Temp {
	add(value) {
		var key = getRandomString()
		if(value.temp === null) {
			value.temp = key
			this[key] = value
			return key
		}else{
			return value.temp
		}
	}
	remove(value){
		delete this[value.temp]
		value.temp = null;
	}
}
const tmp = new Temp
