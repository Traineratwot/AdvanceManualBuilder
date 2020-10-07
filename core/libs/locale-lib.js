var locale = {}
locale._ = function(s, v = null) {
	if(v != null && typeof (v) == 'object') {
		var t = '' + this[s]
		for(var k in v) {
			if(typeof v[k] != 'undefined') {
				t = t.replaceAll('[+' + k + '+]', v[k])
			}
		}
		t = t.replaceAll(/\[\+.+?\+\]/g, '')
		return t
	} else return this[s]
}

