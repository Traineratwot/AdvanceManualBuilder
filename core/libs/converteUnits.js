class ConverterUnits {
	converterRule = {
		'byte': {
			0: {
				'bit': {
					0: 0.125,
					1: 'b'
				}
			},
			1: {
				'kb': {
					0: 1024,
					1: 'b'
				},
				'mb': {
					0: 1024,
					1: 'kb'
				},
				'gb': {
					0: 1024,
					1: 'mb'
				},
				'tb': {
					0: 1024,
					1: 'gb'
				}
			},
			'SI': {
				0: 1,
				1: 'b'
			}
		},
		'mass': {
			0: {
				'g': {
					0: 0.001,
					1: 'kg'
				},
				'mg': {
					0: 0.001,
					1: 'g'
				}
			},
			1: {
				'T': {
					0: 1000,
					1: 'kg'
				}
			},
			'SI': {
				0: 1,
				1: 'kg'
			}
		},
		'length': {
			0: {
				'mm': {
					0: 0.001,
					1: 'm'
				},
				'cm': {
					0: 10,
					1: 'mm'
				},
				'dm': {
					0: 10,
					1: 'dm'
				}
			},
			1: {
				'km': {
					0: 1000,
					1: 'm'
				}
			},
			'SI': {
				0: 1,
				1: 'm'
			}
		},
		'time': {
			0: {
				'ms': {
					0: 0.001,
					1: 's'
				}
			},
			1: {
				'min': {
					0: 60,
					1: 's'
				},
				'h': {
					0: 60,
					1: 'min'
				},
				'day': {
					0: 24,
					1: 'h'
				}
			},
			'SI': {
				0: 1,
				1: 's'
			}
		}
	}


	convert(n, type, from, to) {
		if(typeof n == 'undefined') n = 0
		if(typeof type == 'undefined') type = 'byte'
		if(typeof from == 'undefined') from = 'SI'
		if(typeof to == 'undefined') to = 'best'
		try {
			//validate input start
			var out = false
			var size = {}
			var i = 1
			n = parseFloat(n)
			if(!n) {
				throw new this.Exception('invalid number', 0)
			}
			if(typeof this.converterRule[type] != 'undefined') {
				var converterRule = this.converterRule[type]
				var SI = converterRule['SI'][1]
			} else {
				throw new this.Exception('invalid type', 0)
			}
			if(to != 'best' && to != 'SI') {
				if(!this.in_array(to, this.array_keys(converterRule[0])) && !this.in_array(to, this.array_keys(converterRule[1])) && to != SI) {
					to = 'best'
				}
			}
			//validate input end
			if(to == from && to != 'SI') {
				throw new this.Exception('easy )', 1)
			}
			n = this.ToSi(n, type, from)
			if(!n) {
				throw new this.Exception('invalid "from" unit', 2)
			}
			if(to == 'SI' || to == SI) {
				throw new this.Exception('easy )', 2)
			}
			if(to != 'best') {
				if(this.in_array(to, this.array_keys(converterRule[0]))) {
					var g
					g = 0
				} else if(this.in_array(to, this.array_keys(converterRule[1]))) {
					g = 1
				} else {
					throw new this.Exception('invalid "to" unit', 2)
				}
			} else {
				var g
				if(n >= converterRule['SI'][0]) {
					g = 1
				} else {
					g = 0
				}
			}
			var key
			__loop1:
				for(key in converterRule[g]) {
					var rule
					rule = converterRule[g][key]
					if(n >= rule[0]) {
						n /= rule[0]
						size = {
							0: n.toFixed(i),
							1: key
						}
					} else {
						if(to == 'best') {
							break
						}
					}
					if(to != 'best' && to == key) {
						break
					}
					i++
				}
			if(!out && size instanceof Object) {
				out = size
			} else {
				out = {
					0: n,
					1: SI
				}
			}
		} catch(__e__) {
			var e
			if(__e__ instanceof this.Exception) {
				e = __e__
				console.log(e.getMessage())
				__loop1:
					switch(e.getCode()) {
						case 1:
							return {
								0: n.toFixed(i),
								1: from
							}
						case 2:
							return {
								0: n.toFixed(i),
								1: SI
							}
						default:
							return e.getMessage()
					}
			} else {
				throw __e__
			}
		}
		return out
	}
	
	ToSi(n, type, from) {
		if(typeof type == 'undefined') type = 'byte'
		if(typeof from == 'undefined') from = 'SI'
		if(typeof this.converterRule[type] != 'undefined') {
			var converterRule
			converterRule = this.converterRule[type]
			var SI
			SI = converterRule['SI'][1]
		} else {
			return false
		}
		if(from == 'SI' || from == SI) {
			return n
		}
		var g

		if(this.in_array(from, this.array_keys(converterRule[0]))) {
			g = 0
		} else if(this.in_array(from, this.array_keys(converterRule[1]))) {
			g = 1
		} else {
			return false
		}
		__loop1:
			while(from != SI && typeof converterRule[g][from] != 'undefined') {
				var f_
				f_ = converterRule[g][from]
				n *= f_[0]
				from = f_[1]
			}
		return n
	}

	in_array($k, $a) {
		for(const $aKey in $a) {
			if($k == $a[$aKey]) {return true}
		}
		return false
	}

	array_keys($a) {
		var arr = []
		for(const $aKey in $a) {
			arr.push($aKey)
		}
		return arr
	}

	Exception(message, code) {
		this.message = message;
		this.code = code;
		this.getCode=()=>{
			return this.code
		}
		this.getMessage=()=>{
			return this.message
		}
	}
}

converterUnits = new ConverterUnits