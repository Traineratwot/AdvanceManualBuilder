class MemoryClass {
	save() {
		var data = []
		for(const manualsKey in manuals.index) {
			manuals.index[manualsKey].name
			data.push(manuals.index[manualsKey].toObject())
		}
		return this.setLocalStorage('data', data)
	}


	load() {
		var data = this.getLocalStorage('data')
		for(const datum of data) {
			var tmpKey = tmp.add(new CLASSES[datum.classKey](datum))
			tmp[tmpKey].regeneration()
			manuals.add(tmp[tmpKey])
		}
		layout.tree.render()
	}

	getLocalStorage(name) {
		name = name.toString()
		if(name) {
			try {
				return JSON.parse(localStorage[name])
			} catch(e) {
				if(typeof localStorage[name] != 'undefined') {
					return localStorage[name]
				} else {
					return false
				}
			}
		}
	}


	setLocalStorage(name, value = {}) {
		var store = this.getLocalStorage(name)
		try {
			if(value instanceof Object || value instanceof Array) {
				if(store instanceof Object || store instanceof Array) {
					value = Object.assign(store, value)
				}
				value = JSON.stringify(value)
			}

			localStorage[name] = value
			return true
		} catch(e) {
			return e
		}
		return false
	}
}

memory = new MemoryClass