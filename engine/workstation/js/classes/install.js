class install {
	constructor(Types, Shematik) {
		var self = this;
		this.Types = Types;
		this.Shematik = Shematik;
		this.body = $(`<div class="instalition-main" style="display:none;">`).appendTo("body").fadeIn();
		this.CurrentStep = 0;
		this.structuer = []
		this.currentP = null;
		this.data = {}
		this.events = [];
		this.but = [];
		this.iii = 0;
		this.step1()
		var p = $(`<p style="position:absolute;bottom:4px;width:calc(100% - 8px);">`).appendTo(this.body)
		this.saveBut = $(`<button disabled>Save</button>`).appendTo(p)
		this.saveBut.on("click", () => {
			var SEND = {}
			SEND.data = self.export()
			$.ajax({
				type: "POST",
				url: "engine/core/CreateProject.php",
				data: SEND,
				dataType: "text",
				success: function (response) {
					console.log(response);
				}
			});
		})
		this.DeleteBut = $(`<button disabled>Delete</button>`).appendTo(p).on("click", (event) => {
			function start() {
				self.body.fadeOut("fast");
				self.DeleteMenu.div.fadeIn("slow");
			}
			if (self.advMenu) {
				self.advMenu.fadeOut("fast",()=>{
					self.advMenu.remove();
					start();
				})
			} else {
				start();
			}
			let name = ""
			if (self.data.Projectname) {
				name = self.data.Projectname.val()
			}
			self.DeleteMenu.text.html(`This action <strong>cannot</strong> be undone. This will permanently delete the <strong>${name}</strong> project.<br><br>Please type <strong>${name || "confirm"}</strong> to confirm.`)
			name = name || "confirm"
			self.DeleteMenu.textToBe = name
			self.DeleteMenu.input.attr("size", name.length)
			self.DeleteMenu.input.attr("maxlength", name.length)
		})
		this.CancelBut = $(`<button>Cancel</button>`).appendTo(p)
		.on("click", (event) => {
			if (self.advMenu) {
				self.advMenu.fadeOut("fast",()=>{
					self.advMenu.remove();
				})
			}
			$(".select-project").fadeIn()
			self.body.fadeOut()
		})
	}
	create_delete() {
		let self = this
		this.DeleteMenu = {}
		this.DeleteMenu.div = $(`<div class="delete-menu" style="display:none;">`).appendTo("body")
		this.DeleteMenu.text = $(`<p style="text-align: center"></p></br>`).appendTo(this.DeleteMenu.div)
		this.DeleteMenu.input = $(`<input style="text-align: center">`).appendTo(this.DeleteMenu.div)
		.on("input", (event) => {
			if (self.DeleteMenu.input.val() == self.DeleteMenu.textToBe){
				self.DeleteMenu.ok.removeAttr("disabled")
			} else {
				self.DeleteMenu.ok.attr("disabled", "")
			}
		})
		$(`<p class="Eenter"></p>`).appendTo(this.DeleteMenu.div)
		this.DeleteMenu.cancel = $(`<button class="cancel"style="text-align: center">cancel</button>`).appendTo(this.DeleteMenu.div)
		.on("click", (event) => {
			self.body.fadeIn("slow")
			self.DeleteMenu.div.fadeOut("fast",() => {
				self.DeleteMenu.input.val("")
				self.DeleteMenu.ok.attr("disabled", "")
			})
		})
		this.DeleteMenu.ok = $(`<button class="DELETE"style="text-align: center" disabled>DELETE</button>`).appendTo(this.DeleteMenu.div)
		.on("click", (event) => {
			if (self.DeleteMenu.input.val() == self.DeleteMenu.textToBe){
				// var particles = new Particles('.DELETE');
				// particles.disintegrate();
				self.DeleteMenu.ok.attr("disabled", "")
				self.DeleteMenu.cancel.attr("disabled", "")
				self.DeleteMenu.div.fadeOut(2000, () => {
					self.delete()
					self.DeleteMenu.input.val("")
					$(".select-project").fadeIn("slow")
				})
			}
		})
	}
	nextLine(to = this.body) {
		this.currentP = $(`<p>`).appendTo(to)
		this.structuer.push(this.currentP);
		return this.currentP
	}
	step1() {
		var self = this;
		var i = this.nextLine();
		var cl = this.create_select(this.Types.project).appendTo(i);
		var button = $(`<button>OK</button>`).appendTo(i);
		button.on("click", (event) => {
			self.data.Projectype = cl.val();
			i.html("")
			$(`<h2  style="margin: 0;text-align: center;">${self.data.Projectype}</h2>`).appendTo(this.nextLine());
			this.step2()
		})
	}
	step2() {
		var self = this;
		this.saveBut.removeAttr("disabled")
		this.DeleteBut.removeAttr("disabled")
		this.create_delete()
		var i = 0;
		for (const key in this.Shematik.Project.typeField[this.data.Projectype]) {
			if (this.Shematik.Project.typeField[this.data.Projectype].hasOwnProperty(key)) {
				var var_name = `Project${key}`;
				let name = this.Shematik.Project.typeField[this.data.Projectype][key].name || key
				let _d = $(`<span class="install-menu" data-i="${i++}" data-key="${key}">${name}</span> <span id="right${var_name}" class="right"></span>`).appendTo(this.nextLine())
				if (key == "name") {
					_d.addClass("h1")
				}
				this.but.push(this.currentP)
			}
		}
		$(".install-menu").on("click", (event) => {
			self.generate(event)
			this.iii = 0;
		})
	}
	generate(event) {
		var self = this;
		var et = $(event.target)
		var key = et.attr("data-key")
		var i = et.attr("data-i")
		var var_name = `Project${key}`;
		$(".install-menu").removeClass('selected')
		et.addClass('selected')
		var area = this.Shematik.Project.typeField[this.data.Projectype][key]
		this.currentField = area
		if ("short" in area && area.short) {
			et.fadeOut(0);
			var val
			if (this.data[var_name]) {
				val = this.data[var_name].val()
			}
			this.data[var_name] = $(this.create_short(area, key)).appendTo(this.but[i])
			if (this.data[var_name]) {
				this.data[var_name].val(val)
			}
			this.data[var_name].focus()
			this.data[var_name].on('change blur', (event) => {
				if (!$(event.target).val()) {
					et.html(`${area.name}`)
				} else if (var_name == "Projectname") {
					et.html($(event.target).val())
				} else {
					et.html(`${area.name}:<span class="right">${$(event.target).val()}</span>`)
				}
				et.fadeIn(0);
				self.data[var_name].unbind(event);
				$(event.target).remove()
			})
		} else {
			if (area.type == "array") {
				if ($(`#right${var_name}`).html() == "") {
					$(`#right${var_name}`).html(`(1)`)
				}
			}
			if (this.data[var_name]) {
				this.regenrate(var_name)
			} else {
				this.overstep(var_name)
			}
		}
		console.log(key)
	}
	overstep(var_name, add = false) {
		var self = this;
		if (!add) {
			if (this.advMenu) {
				this.advMenu.remove()
			}
			this.advMenu = $(`<div class="adv-menu" style="display:none;">`).appendTo("body").fadeIn();
		}
		var area = this.currentField
		var addAction;
		for (const k in area.fields) {
			if (area.fields.hasOwnProperty(k)) {
				const e = area.fields[k];
				var _field;
				e.attr = e.attr || [];
				switch (k.replace(/\d/g, '')) {
					case "select":
						_field = this.create_select(e.options);
						break;
					case "text":
						_field = `<input ${e.attr.join(' ')} type="text" placeholder="${e.placeholder}">`;
						break;
					case "textarea":
						_field = `<textarea ${e.attr.join(' ')} rows="3" placeholder="${e.placeholder}"></textarea>`;
						break;
					case "button":
						_field = `<button ${e.attr.join(' ')}>${e.title}</button>`;
						break;
					default:
						_field = `<input ${e.attr.join(' ')} type="${k}" placeholder="${e.placeholder}">`;
						break;
				}
				_field = $(_field).appendTo(this.nextLine(this.advMenu));
				if (e.action == 'add') {
					addAction = _field
				}
				if (e.varName) {
					if (area.type == "array") {
						if (!this.data[var_name]) {
							this.data[var_name] = []
						}
						if (!this.data[var_name][this.iii]) {
							this.data[var_name][this.iii] = {}
						}
						this.data[var_name][this.iii][e.varName] = _field
					} else {
						if (!this.data[var_name]) {
							this.data[var_name] = {}
						}
						this.data[var_name][e.varName] = _field
					}
				}
			}
		}
		if (addAction) {
			addAction.on('click', (e) => {
				$(e.target).remove()
				self.iii++;
				$(`#right${var_name}`).html(`(${self.iii + 1})`)
				self.overstep(var_name, true)
			})
		}
	}
	regenrate(var_name) {
		var self = this;
		var Dt = this.data[var_name];
		// var area = this.currentField;
		var addAction;
		if (this.advMenu) {
			this.advMenu.remove()
		}
		var _field;
		this.advMenu = $(`<div class="adv-menu" style="display:none;">`).appendTo("body").fadeIn();
		switch (Dt.constructor.name) {
			case "k":
				Dt.appendTo(this.nextLine(this.advMenu))
				break;
			case "Array":
				var _r = true;
				for (const iterator of Dt) {
					if (!iterator) {
						self.overstep(var_name)
						_r = false
						break;
					}
					if (iterator.constructor.name == "k") {
						iterator.appendTo(this.nextLine(this.advMenu))
					} else if (iterator.constructor.name == "Object") {
						for (const k in iterator) {
							if (iterator.hasOwnProperty(k)) {
								const elem = iterator[k];
								if (elem.constructor.name == "k") {
									elem.appendTo(this.nextLine(this.advMenu))
								}
							}
						}
					}
				}
				if (_r) {
					_field = $(`<button>add</button>`).appendTo(this.nextLine(this.advMenu));
					addAction = _field
				}

				break;
			case "Object":
				for (const k in Dt) {
					if (Dt.hasOwnProperty(k)) {
						const e = Dt[k];
						if (e.constructor.name == "k") {
							e.appendTo(this.nextLine(this.advMenu))
						}
					}
				}
				break;
			case "String":

				break;
			default:
				break;
		}
		if (addAction) {
			addAction.on('click', (e) => {
				$(e.target).remove()
				self.iii = Dt.length;
				$(`#right${var_name}`).html(`(${self.iii + 1})`)
				self.overstep(var_name, true)
			})
		}
	}
	create_short(area) {
		var key = Object.keys(area.fields)[0];
		var _field;
		area.fields[key].attr = area.fields[key].attr || [];
		switch (key.replace(/\d/g, '')) {
			case "select":
				_field = this.create_select(area.fields[key])
				break;
			case "text":
				_field = `<input ${area.fields[key].attr.join(' ')} type="text" placeholder="${area.fields[key].placeholder}">`;
				break;
			case "textarea":
				_field = `
				<textarea rows="3" ${area.fields[key].attr.join(' ')} placeholder="${area.fields[key].placeholder}"></textarea>
				`;
				break;
			case "button":
				_field = `<button ${area.fields[key].attr.join(' ')}>${area.fields[key].title}</button>`;
				break;
			default:
				_field = `<input ${area.fields[key].attr.join(' ')} type="${key}" placeholder="${area.fields[key].placeholder}">`;
				break;
		}
		return $(_field);
	}
	create_select(e) {
		if (e.attr) {
			var _field = `<select ${e.attr.join(' ')}>`;
		}else{
			var _field = `<select>`;
		}
		if(!e.options){
			var	values = e
		}else{
			var	values = e.options
		}
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
		_field += `</select>`;
		_field = $(_field)
		return _field
	}
	export() {
		var exportData = {};
		for (const key in this.data) {
			if (this.data.hasOwnProperty(key)) {
				const e = this.data[key];
				var cn = e.constructor.name;
				switch (cn) {
					case "k":
						if (!exportData[key]) {
							exportData[key] = []
						}
						if (e.val() != "on" && e.val() != "off") {
							exportData[key] = e.val()
						} else {
							exportData[key] = e.prop("checked")
						}
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
									if (elem.val() != "on" && elem.val() != "off") {
										exportData[key][i][k] = elem.val()
									} else {
										exportData[key][i][k] = elem.prop("checked")
									}
								}
							}
							i++;
						}
						break;
					case "Object":
						var i = 0;
						for (const k in e) {
							if (e.hasOwnProperty(k)) {
								const elem = e[k];
								if (!exportData[key]) {
									exportData[key] = []
								}
								if (!exportData[key][i]) {
									exportData[key][i] = {}
								}
								if (elem.val() != "on" && elem.val() != "off") {
									exportData[key][i][k] = elem.val()
								} else {
									exportData[key][i][k] = elem.prop("checked")
								}
							}
							i++;
						}
						break;
					case "String":
						exportData[key] = e
						break;
					default:
						break;
				}
			}
		}
		return exportData
	}
	DeleteProject(){
		var self = this;
		$.ajax({
			type: "POST",
			url: "engine/core/DeleteProject.php",
			data: "name="+self.data.Projectname.val(),
			dataType: "text",
			success: function (response) {
				loadProjects()
			}
		});
	}
}