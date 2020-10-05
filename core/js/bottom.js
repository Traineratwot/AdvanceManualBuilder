nondblclick = {
	click: false,
	dblclick: false,
}
$(document).on('click', function(e) {
	nondblclick.click = true
	setTimeout((e) => {
		if(!nondblclick.dblclick && nondblclick.click) {
			$(e.target).trigger('nondblclick', e)
		}
		nondblclick.click = false
		nondblclick.dblclick = false
	}, 300, e)

})
$(document).on('dblclick onselectstart"', function() {
	nondblclick.dblclick = true
})