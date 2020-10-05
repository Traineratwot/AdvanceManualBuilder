var editorTemplate = new CLASSES.Template()
editorTemplate.input = '<div class="input-group mb-3">\n' +
	'<div class="input-group-prepend">\n' +
	'    <span class="input-group-text">${name}</span>\n' +
	'  </div>' +
	'  <input id="${id}" name="${name}" value="${value}" type="${type}" class="form-control" placeholder="${placeholder}" aria-describedby="${id}_aria">\n' +
	'  <div class="input-group-append">\n' +
	'    <span class="input-group-text" id="${id}_aria"></span>\n' +
	'  </div>\n' +
	'</div>'