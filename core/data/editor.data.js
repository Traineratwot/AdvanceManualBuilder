var editorTemplate = new CLASSES.Template()
editorTemplate.input = `<div class="form-group"><div class="input-group mb-3">
	<div class="input-group-prepend">
	    <span class="input-group-text">$[label]</span>
	  </div>
	  <input id="$[id]" name="$[name]" value="$[value]" type="$[type]" class="form-control" placeholder="$[placeholder]" aria-describedby="$[id]_aria">
	  <div class="input-group-append">
	    <span class="input-group-text" id="$[id]_aria"></span>
	  </div>
	</div></div>`
editorTemplate.textarea = `<div class="form-group"><div class="input-group mb-3">
	<div class="input-group-prepend">
	    <span class="input-group-text">$[label]</span>
	  </div>
	  <textarea id="$[id]" name="$[name]" min-rows="3" rows="5" value="$[value]" type="$[type]"  class="md-textarea form-control"  placeholder="$[placeholder]" aria-describedby="$[id]_aria"></textarea>
	  <div class="input-group-append">
	    <span class="input-group-text" id="$[id]_aria"></span>
	  </div>
	</div></div>`
editorTemplate.select = `<div class="form-group"><div class="input-group mb-3">
	  <div class="input-group-prepend">
	    <label class="input-group-text" for="inputGroupSelect01">$[label]</label>
	  </div>
	  <select id="$[id]" name="$[name]"  class="custom-select" id="inputGroupSelect01">
			$[options]'
	  </select>
	  <div class="input-group-append">
	    <span class="input-group-text" id="$[id]_aria"></span>
	  </div>
	</div></div>`
editorTemplate.option = `<option data-key="$[key]" value="$[value]" data-label="$[label]" $[attr]>$[label]</option>`
editorTemplate.button = `<div class="form-group"><button $[attr] type="button" id="$[id]_button" data-class="$[classKey]" data-object="$[id]" class="btn $[btnClass]">$[text]</button></div>`
editorTemplate.modal = 	`<div class="modal fade" id="$[id]_editorModal" data-object="$[id]" data-parent="$[parent]" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
						        aria-hidden="true">
						        <div class="modal-dialog modal-dialog-centered" role="document">
						            <div class="modal-content">
						                <div class="modal-header">
						                    <h3 class="modal-title">$[header]</h3>
						                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
						                        <span aria-hidden="true">&times;</span>
						                    </button>
						                </div>
						                <div class="modal-body">
						                </div>
						                <div class="modal-footer">
						                    <button type="button"data-object="$[id]" data-parent="$[parent]" class="btn btn-secondary action-cancel" data-dismiss="modal">${locale._('close')}</button>
						                    <button type="button"data-object="$[id]" data-parent="$[parent]" class="btn btn-primary   action-save"   data-dismiss="modal">${locale._('create')}</button>
						                </div>
						            </div>
						        </div>
						    </div>`
