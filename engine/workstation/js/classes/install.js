class install {

	constructor(Types, Shematik) {
		this.data ={};
		this.Types = Types;
		this.Shematik = Shematik;
		this.body = $(`<div class="select-project">`).fadeOut();
		this.body = $(`<div class="instalition-main" style="display:none;">`).appendTo("body");
		this.body.fadeIn()
		this.body = $(`<table>`).appendTo(this.body);
		this.CurrentStep = 0;
		this.step1()
	}
	step1() {
		var self = this;
		var tr = $(`<tr>`).appendTo(this.body)
		var td = $(`<td>`).appendTo(tr)
		var select = `<select>`;
		for (const key in this.Types.project) {
			const e = this.Types.project[key];
			select += `<option value="${e}">${e}</option>`;
		}
		select += `</select>`
		this.data.ProjectType = $(select).appendTo(td);
		td = $(`<td>`).appendTo(tr);
		this.data.ProjectName = $(`<input type="text" placeholder="Name">`).appendTo(td);
		td = $(`<td>`).appendTo(tr);
		var button = $(`<button>next</button>`).appendTo(td);
		button.on('click', (e) => {
			$(e.target).attr('disabled', "")
			self.data.ProjectType.attr('disabled', "")
			self.overstep()
		})
	}
	overstep() {
		var self = this;
		Shematik = this.Shematik.Project.typeField[this.data.ProjectType.val()];
		var key = Object.keys(Shematik)[this.CurrentStep];
		if (!key) {
			var data = JSON.stringify(this.data)
			$.ajax({
				type: "POST",
				url: "engine/core/CreateProject.php",
				data: `data=${data}`,
				dataType: "json",
				success: function (response) {
					alert(response)
				}
			});
			return "finish";
		}
		var var_name = `Project${key}`;
		var CurrentField = Shematik[key]
		if (CurrentField.type == "array") {
			this.data[var_name] = []
		} else {
			this.data[var_name] = null
		}
		var addAction;
		var tr = $(`<tr>`).appendTo(this.body)
		var td;
		td = $(`<td>`).appendTo(tr)
		$(`<span>${key}</span>`).appendTo(td);
		var $i = 0;
		for (const k in CurrentField.fields) {
			if (CurrentField.fields.hasOwnProperty(k)) {
				const e = CurrentField.fields[k];
				
				var _field;
				switch (k.replace(/\d/g,'')) {
					case "select":
						td = $(`<td class="select">`).appendTo(tr)
						_field = `
						<select>`;
						if (typeof e.options == 'object') {
							for (const val of e.options) {
								_field += `<option value="${val}">${val}</option>`
							}
						} else if (typeof e.options == 'string') {
							var _kkk = e.options.split('.')
							var obj = this[_kkk[0]][_kkk[1]]
							for (const val of obj) {
								_field += `<option value="${val}">${val}</option>`
							}
						}

						_field += `</select>
						`;
						break;
					case "text":
						td = $(`<td class="text">`).appendTo(tr)
						_field = `<input type="text" placeholder="${e.placeholder}">`;
						break;
					case "textarea":
						td = $(`<td class="textarea">`).appendTo(tr)
						_field = `
						<textarea rows="3" placeholder="${e.placeholder}"></textarea>
						`;
						break;
					case "button":
						td = $(`<td class="button">`).appendTo(tr)
						_field = `<button>${e.title}</button>`;
						break;
					default:
						td = $(`<td class="text">`).appendTo(tr)
						_field = `<input type="${k}" placeholder="${e.placeholder}">`;
						break;
				}
				_field = $(_field).appendTo(td);
				if (e.action == 'add') {
					addAction = _field
				}
				if (e.value) {
					if (CurrentField.type == "array") {
						if (!this.data[var_name]) {
							this.data[var_name] = []
						}
						if (!this.data[var_name][$i]) {
							this.data[var_name][$i] = {}
						}
						this.data[var_name][$i][e.value] = _field
					} else {
						this.data[var_name] = {}
						this.data[var_name][e.value] = _field
					}
				}
			}
		}
		console.log(CurrentField);
		td = $(`<td>`).appendTo(tr)
		var button = $(`<button>next</button>`).appendTo(td);
		button.on('click', (e) => {
			this.CurrentStep++;
			if(addAction){
				addAction.attr('disabled',"");
			}
			$(e.target).attr('disabled',"");
			self.overstep()
		})
		if(addAction){
			addAction.on('click', (e) => {
				$(e.target).attr('disabled',"");
				button.attr('disabled',"");
				self.overstep()
			})
		}
		this.table();
	}

	table() {
		var nums = []
		$(".instalition-main table tr").each(function(row){
			var i = 0;
			$(this).find('td').each(function(cell){
				i++;
			});
			nums.push(i);
		});
		var max = Math.max(...nums)
		$(".instalition-main table tr").each(function(row){
			var i = 0;
			$(this).find('td').each(function(cell){
				i++;
			});
			var diff = max - i+1;
			$(this).find('td:eq(1)').attr("colspan",diff)
		});
	}

	export(){
		var exportData = {};
		for (const key in this.data) {
			if (this.data.hasOwnProperty(key)) {
				const e = this.data[key];
				var cn = e.constructor.name;
				switch (cn) {
					case "k":
						exportData[key] = e.val() 
						break;
					case "Array":
						var i = 0;
						for (const iterator of e) {
							for (const k in iterator) {
								if (iterator.hasOwnProperty(k)) {
									const elem = iterator[k];
									if (!exportData[key]) {
										exportData[key] = []
									}
									if (!exportData[key][i]) {
										exportData[key][i] = {}
									}
									exportData[key][i][k] = elem.val()
								}
							}
							i++;
						}
						break;
					case "Object":
						for (const k in Object) {
							if (Object.hasOwnProperty(k)) {
								const elem = Object[k];
								if (!exportData[key]) {
									exportData[key] = []
								}
								exportData[key][k] = elem.val()
							}
						}
					break;
					default:
						break;
				}
			}
		}
		return exportData
	}
}
