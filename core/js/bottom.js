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
setInterval(() => {
	$(`*[data-content]`).each(function() {
		$(this).html(locale._($(this).data('content')))
		$(this).removeAttr('data-content')
	})
	var t = converterUnits.convert(window.performance.memory.usedJSHeapSize,'byte','b')
	$('#memory_usage').html(t[0]+' '+t[1])
	$('#object_count').html(GOA.count())
}, 500)