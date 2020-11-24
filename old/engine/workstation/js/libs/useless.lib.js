function fit_text(elem, parent = false,max=24,min=5) {
	elem.each(function (index, element) {
		if (!parent) {
			parent = $(this).parent()
		}
		var parentW = parent.width()
		var elemW = $(this).width()
		var elemF = parseInt($(this).css('fontSize'));
		var i = 256
		if (parentW > elemW) {
			while (parentW > elemW) {
				if (i-- <= 0 || elemF > max) {
					break;
				}
				$(this).css({ fontSize: `${++elemF}px` });
				elemW = $(this).width()
			}
		} else {
			while (parentW < elemW) {
				if (i-- <= 0 || elemF < min) {
					break;
				}
				$(this).css({ fontSize: `${--elemF}px` });
				elemW = $(this).width()
			}
		}
	});

	return elem
}
//# sourceMappingURL=useless.lib.js.map

//# sourceMappingURL=useless.lib.js.map
