var locale = {}
locale._ = function(s, v = null) {
	if(v != null && typeof (v) == 'object') {
		var t = '' + this[s]
		for(var k in v) {
			if(typeof v[k] != 'undefined') {
<<<<<<< HEAD
				t = t.replaceAll('[+' + k + '+]', v[k])
			}
		}
		t = t.replaceAll(/\[\+.+?\+\]/g, '')
=======
				t = t.replaceAll('${' + k + '}', v[k])
			}
		}
		t = t.replaceAll(/\$\{.+?\}/g, '')
>>>>>>> 9c6dd913cb7f06fc8c738da6d1ff072b2940fb60
		return t
	} else return this[s]
}

