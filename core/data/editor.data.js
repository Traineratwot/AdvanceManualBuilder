editorTemplate = new CLASSES.Template()
editorTemplate.input   = '<div class="input-group mb-3">\n' +
						 '<div class="input-group-prepend">\n' +
						 '    <span class="input-group-text">${label}</span>\n' +
						 '  </div>' +
						 '  <input id="${id}" name="${name}" value="${value}" type="${type}" class="form-control" placeholder="${placeholder}" aria-describedby="${id}_aria">\n' +
						 '  <div class="input-group-append">\n' +
						 '    <span class="input-group-text" id="${id}_aria"></span>\n' +
						 '  </div>\n' +
						 '</div>'

editorTemplate.select  = '<div class="input-group mb-3">\n' +
						 '  <div class="input-group-prepend">\n' +
						 '    <label class="input-group-text" for="inputGroupSelect01">${label}</label>\n' +
						 '  </div>\n' +
						 '  <select id="${id}" name="${name}"  class="custom-select" id="inputGroupSelect01">\n' +
						 '		${options}'+
						 '  </select>\n' +
						 '  <div class="input-group-append">\n' +
						 '    <span class="input-group-text" id="${id}_aria"></span>\n' +
						 '  </div>\n' +
						 '</div>';
editorTemplate.option  = '<option value="${value}" ${attr}>${label}</option>'

editorTemplate.button  = '<button type="button" id="${id}_button" data-object="${id}" class="btn btn-primary">${text}</button>'

editorTemplate.modal   = '<div class="modal fade" id="${id}_editorModal" data-object="${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"\n' +
						 '        aria-hidden="true">\n' +
						 '        <div class="modal-dialog modal-dialog-centered" role="document">\n' +
						 '            <div class="modal-content">\n' +
						 '                <div class="modal-header">\n' +
						 '                    <h5 class="modal-title">${name}</h5>\n' +
						 '                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
						 '                        <span aria-hidden="true">&times;</span>\n' +
						 '                    </button>\n' +
						 '                </div>\n' +
						 '                <div class="modal-body">\n' +
						 '                </div>\n' +
						 '                <div class="modal-footer">\n' +
						 '                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n' +
						 '                    <button type="button" class="btn btn-primary">Save changes</button>\n' +
						 '                </div>\n' +
						 '            </div>\n' +
						 '        </div>\n' +
						 '    </div>\n'

