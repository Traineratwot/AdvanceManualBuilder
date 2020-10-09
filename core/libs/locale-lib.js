class Locale {
	en = {}


	constructor(lang) {
		this.lang = lang ? lang : $('html').attr('lang')
	}


	_(s='', v = null) {
		if(!s || typeof s != 'string'){
			return s
		}
		var LangKey = s.toLowerCase()
		if(typeof this[this.lang][LangKey] != 'undefined') {
			var t = this[this.lang][LangKey]
		} else if(typeof this.en[LangKey] != 'undefined') {
			var t = this.en[LangKey]
		} else {
			var t = s
		}
		if(v != null && typeof (v) == 'object') {
			for(var k in v) {
				if(typeof v[k] != 'undefined') {
					t = t.replaceAll('${' + k + '}', v[k])
				}
			}
			t = t.replaceAll(/\$\{.+?\}/g, '')
			return t
		} else {
			return t
		}

	}


	add(key, obj) {
		for(const objKey in obj) {
			obj[objKey.toLowerCase()] =obj[objKey]
		}
		this[key] = obj
	}

}

var locale = new Locale()



