class install {

	constructor(Types, Shematik) {
		this.Types = Types;
		this.Shematik = Shematik;
		this.body = $(`<div class="instalition-main" style="display:none;">`).appendTo("body").fadeIn();
		this.table = $(`<table class="no_calc">`).appendTo(this.body);
		this.CurrentStep = 0;
		this.step1()
	}
	step1(){
		var self = this;
		// this.Project.typeField
		var cl = this.create_select(this.Types.project).appendTo(this.table)
		var button = $(`<button>OK</button>`).appendTo(cl)
		button.on("click",(event)=>{
			self.table.html("")
			$(`<h1>${}</h1>`).appendTo(cl)
		})
	}
	create_select(values){
		let td = $(`<td class="select">`)
		let _field = `<select>`;
		if (typeof values == 'object') {
			for (const val of values) {
				_field += `<option value="${val}">${val}</option>`
			}
		} else if (typeof values == 'string') {
			var v = values.split('.')
			var obj = this[v[0]][v[1]]
			for (const val of obj) {
				_field += `<option value="${val}">${val}</option>`
			}
		}
		_field += `</select></td>`;
		$(_field).appendTo(td);
		
		return td
	}
}
