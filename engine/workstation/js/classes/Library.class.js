class _objects {
	constructor() {
		this.conteiner = {}
		this.conteiner.body = $("#edit_panel");
		this.arguments = [...arguments];
		this.Types = Types
		this.Shematik = Shematik;
		this.structuer = []
		this.data = {};
		this.iii = 0;
		this.step1()
		let args = [...arguments];
		if (args.length > 0) {
			this.__constructor(...args);
		} else {
			this.__constructor();
		}
	}
	__constructor() { }

	nextLine(to = this.toolbox) {
		this.currentP = $(`<p>`).appendTo(to);
		this.structuer.push(this.currentP);
		return this.currentP;
	}
	step1() {
		self = this;
		this.conteiner.body.html("")
		this.conteiner.Chunc = this.Shematik.Chuncs.typeField[this.constructor.name.trim('_')]
		this.conteiner.menu = $("<menu>").appendTo(this.conteiner.body);
		$.each(this.conteiner.Chunc, (indexInArray, valueOfElement) => {
			$(`<div class='menu_item' data-Field="${indexInArray}">${indexInArray}</div>`).appendTo(self.conteiner.menu)
				.on("click", (e) => {
					var currentField = $(e.target).attr("data-Field")
					self.currentField = this.conteiner.Chunc[currentField]
					$(".menu_item").removeClass("selected");
					$(e.target).addClass("selected")
					self.overstep(currentField)
				})
		});
		this.conteiner.toolbox = $(`<div class="toolbox">`).appendTo(this.conteiner.body)
	}

	overstep(var_name, add = false) {
		var self = this;
		if (!add) {
			if (this.conteiner.toolbox) {
				this.conteiner.toolbox.remove()
			}
			this.conteiner.toolbox = $(`<div class="toolbox" style="display:none;">`).appendTo(this.conteiner.body).fadeIn();
		}
		var area = this.currentField
		var addAction;
		for (const k in area.fields) {
			if (area.fields.hasOwnProperty(k)) {
				const e = area.fields[k];
				var _field;
				switch (k.replace(/\d/g, '')) {
					case "select":
						_field = this.create_select(e.options);
						break;
					case "text":
						_field = `<input type="text" placeholder="${e.placeholder}">`;
						break;
					case "textarea":
						_field = `
							<textarea rows="3" placeholder="${e.placeholder}"></textarea>
							`;
						break;
					case "button":
						_field = `<button>${e.title}</button>`;
						break;
					case "checkbox":
						_field = `<input data-lable="${e.labal}" style="width:40px !important" type="checkbox">`;
						break;
					default:
						_field = `<input type="${k}" placeholder="${e.placeholder}">`;
						break;
				}
				_field = $(_field).appendTo(this.nextLine(this.conteiner.toolbox));
				if (e.action == 'add') {
					addAction = _field
				}
				if (e.value) {
					if (area.type == "array") {
						if (!this.data[var_name]) {
							this.data[var_name] = []
						}
						if (!this.data[var_name][this.iii]) {
							this.data[var_name][this.iii] = {}
						}
						this.data[var_name][this.iii][e.value] = _field
					} else {
						if (!this.data[var_name]) {
							this.data[var_name] = {}
						}
						this.data[var_name][e.value] = _field
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
	create_select(values) {
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
}

class _function extends _objects {
	__constructor() {

		// this.param = [];
		// this.addParam()
	}
	addParam() {
		// var Itr 	= $(`<tr>`).appendTo(this.SELECTOR);
		// var Itd 	= $(`<td>`).appendTo(Itr);
		// var Iselect	= $(`<select name="type">${this.types}</select>`).appendTo(Itd)
		// 	Itd 	= $(`<td>`).appendTo(Itr);
		// var Iparam	= $(`<input type="text" name="param" placeholder="Param name">`).appendTo(Itd)
		// 	Itd 	= $(`<td>`).appendTo(Itr);
		// var Iadd	= $(`<button><i class="fas fa-plus"></i></button>`).appendTo(Itd)
		// 	Itr 	= $(`<tr>`).appendTo(this.SELECTOR);
		// 	Itd 	= $(`<td colspan="3">`).appendTo(Itr);
		// var Idisc	= $(`<input type="text" name="discription" placeholder="Discription">`).appendTo(Itd)
		// this.param.push({
		// 	Iparam,
		// 	Iselect,
		// 	Idisc,
		// })
	}
	addReturn() { }
}
class _class extends _objects {
	__constructor() { }
}
class _const extends _objects {
	__constructor() { }
}
class _var extends _objects {
	__constructor() { }
}

var Maxies = {
	function: class extends _function { },
	class: class extends _class { },
	const: class extends _const { },
	var: class extends _var { },
};

function CreateClass(Type) {
	return new Maxies[Type]()
}