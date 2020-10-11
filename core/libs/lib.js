/**
 * @param {...number} args An array containing number like items.
 * @return {number} average of an args
 */
Math.avg = function() {
	var sum = 0
	for(var i = 0; i < arguments.length; i++) {
		sum += (typeof arguments[i] == 'number') ? arguments[i] : Number(arguments[i])
	}
	return sum / arguments.length
}
/**
 * String is converted to number
 * @param {...number} args An array containing number like items.
 * @return {number} sum of an args
 */
Math.sum = function() {
	var sum = 0
	for(var i = 0; i < arguments.length; i++) {
		sum += (typeof arguments[i] == 'number') ? arguments[i] : Number(arguments[i])
	}
	return sum
}
Math.add = Math.sum
/**
 * Tau is equal to two PI
 */
Math.Tau = Math.PI * 2

/**

	-----------Number-----------

 */

/**
 * @param {...number} args An array containing number like items.
 * @return {number} average of an args
 */
Number.prototype.avg = function() {
	var sum = Number(this)
	for(var i = 0; i < arguments.length; i++) {
		sum += (typeof arguments[i] == 'number') ? arguments[i] : Number(arguments[i])
	}
	return sum / (arguments.length + 1)
}
/**
 * String is converted to number
 * @param {...number} args An array containing number like items.
 * @return {number} sum of an args
 */
Number.prototype.sum = function() {
	var sum = Number(this)
	for(var i = 0; i < arguments.length; i++) {
		sum += (typeof arguments[i] == 'number') ? arguments[i] : Number(arguments[i])
	}
	return sum
}
Number.prototype.add = Number.prototype.sum
/**
 * @param  {String} charset="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz"
 */
Number.prototype.getRandomString = function(charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz') {
	let length = Number(this)
	if(length < 0) length = -length
	var str = ''
	for(var i = 0; i < length; i++) {
		str += charset[Math.floor(Math.random() * charset.length)]
	}
	return str
}
/**

	-----------String-----------

 */
/**
 * @param  {Number} length=16
 */
String.prototype.getRandomString = function(length = 16) {
	let charset = this
	if(length < 0) length = -length
	var str = ''
	for(var i = 0; i < length; i++) {
		str += charset[Math.floor(Math.random() * charset.length)]
	}
	return str
}

/**
 * -------------------------
 */
/**

	-----------array-----------

 */
getUniqueValues = function() {
	return unique = this.filter((value, index, self) => {
		return self.indexOf(value) === index
	})
}

function uniqueArrayObject(array, keys, obj) {

	var test = []

	function ObjCount(obj) {
		var i = 0
		for(const key in obj) {
			if(obj.hasOwnProperty(key)) {
				i++
			}
		}
		return i
	}

	var objCount = ObjCount(obj)
	if(ObjCount(array) == 0 || ObjCount(keys) == 0) {
		return true
	}
	if(objCount > ObjCount(keys)) {
		return true
	}
	var error = 0
	for(const key in array) {
		if(array.hasOwnProperty(key)) {
			const elem = array[key]
			if(ObjCount(elem) != objCount) {
				error++
				continue
			}
			for(const keysKey in keys) {
				const objKey = keys[keysKey]
				if(typeof elem[objKey] != 'undefined' && typeof obj[objKey] != 'undefined') {
					if(obj[objKey] instanceof HTMLElement) {
						if(!elem[objKey].isSameNode(obj[objKey])) {
							error++
							continue
						}
					} else {
						if(!Object.is(elem[objKey], obj[objKey])) {
							error++
							continue
						}
					}
				} else {
					error++
					continue
				}
			}
		}
	}
	if(error == ObjCount(array)) {
		return true
	} else {
		return false
	}
}

/**
 * @param  {Number} length=16
 * @param  {String} charset="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz"
 */
function getRandomString(length = 16, charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz') {
	if(length < 0) length = -length
	var str = ''
	for(var i = 0; i < length; i++) {
		str += charset[Math.floor(Math.random() * charset.length)]
	}
	return str
}

var eq = (a, b, eq = false) => {
	function Exception(response) {
		this.response = response
		this.get = () => {
			return this.response
		}
	}

	function objCompare(a, b, eq) {
		if(a.constructor.name != b.constructor.name) {
			return false
		}
		if(a instanceof HTMLElement) {
			if(b instanceof HTMLElement) {
				if(eq) {
					return a.isSameNode(b)
				}
				return a.isEqualNode(b)
			} else {
				return false
			}
		}
	}

	try {
		if(eq) {
			if(Object.is(a, b)) {
				throw new Exception(true)
			}
		} else {
			if(a == b) {
				throw new Exception(true)
			}
		}
		var type = typeof a
		if(type === typeof b) {
			switch( type ) {
				case 'boolean':
				case 'number':
				case 'string':
					if(eq) {
						throw new Exception(a === b)
					}
					throw new Exception(a == b)
				case 'object':
					if(Object.is(a, b)) {
						throw new Exception(true)
					} else {
						throw new Exception(objCompare(a, b, eq))
					}
			}
		} else {
			throw new Exception(false)
		}
	} catch(__e__) {
		return __e__.get()
	}
}