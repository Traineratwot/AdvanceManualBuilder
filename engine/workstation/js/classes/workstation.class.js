class _objects {
	constructor() {
		this.conteiner = {}
		this.conteiner.body = $("#edit_panel");
		this.arguments = arguments;
		this.Types = Types
		this.Shematik = Shematik;
		this.structuer = []
		this.data = {};
		this.iii = 0;
		this.DataImport = false;
		this.menuArray = {}
		let args = arguments;
		if (args.length > 0) {
			this.Parent = this.arguments[0][1][0] || 0;
			this.id = this.arguments[0][1][1] || 0;
			this.DataImport = this.arguments[0][2] || false;
			this.__constructor(...this.arguments);
		} else {
			this.__constructor();
		}
		this.step1()
		if (this.DataImport) {
			$.each(this.menuArray, function (indexInArray, valueOfElement) { 
				$(valueOfElement).trigger("click");
			});
			var keys = Object.keys(this.menuArray)
			this.menuArray[keys[0]].trigger("click");
		}else{
			var keys = Object.keys(this.menuArray)
			this.menuArray[keys[0]].trigger("click");
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
		this.conteiner.Chunk = this.Shematik.Chunks.typeField[this.constructor.name.trim('_')]
		this.conteiner.menu = $(`<menu style="height:1em;">`).appendTo(this.conteiner.body);
		$.each(this.conteiner.Chunk, (indexInArray, valueOfElement) => {
			self.menuArray[indexInArray] = $(`<div class='menu_item' data-Field="${indexInArray}">${indexInArray}</div>`).appendTo(self.conteiner.menu)
				.on("click", (e) => {
					var currentField = $(e.target).attr("data-Field")
					self.currentField = this.conteiner.Chunk[currentField]
					$(".menu_item").removeClass("selected");
					$(e.target).addClass("selected")
					self.structuer = [];
					self.iii = 0;
					var addAction = self.overstep(currentField, false, self.DataImport)
					if (self.DataImport) {
						if (self.DataImport[currentField].constructor.name == 'Array') {
							if (self.DataImport[currentField].length > 1) {
								for (let i = 1; i < self.DataImport[currentField].length; i++) {
									if (addAction) {
										addAction.remove()
										self.iii++;
										$(`#right${currentField}`).html(`(${self.iii + 1})`)
										self.overstep(currentField, true,self.DataImport)
									}
								}
							}
						}
					}
				})
		});
		this.conteiner.toolbox = $(`<div class="toolbox">`).appendTo(this.conteiner.body)
	}

	overstep(var_name, add = false, DataImport = false) {
		var self = this;
		if (!add) {
			if (this.data[var_name] && !DataImport) {
				return this.regenrate(var_name)
			}
			if (this.conteiner.toolbox) {
				this.conteiner.toolbox.remove()
			}
			this.conteiner.toolbox = $(`<div class="toolbox">`).appendTo(this.conteiner.body);

		}
		var block = $(`<div class="tool-block" style="display:none;">`).appendTo(this.conteiner.toolbox).fadeIn()
		var area = this.currentField
		var addAction;
		for (const k in area.fields) {
			if (area.fields.hasOwnProperty(k)) {
				const e = area.fields[k];
				var _field;
				e.attr = e.attr || [];
				switch (k.replace(/\d/g, '')) {
					case "select":
						_field = this.create_select(e);
						break;
					case "text":
						_field = `<input ${e.attr.join(' ')} type="text" placeholder="${e.placeholder}">`;
						break;
					case "textarea":
						_field = `<textarea ${e.attr.join(' ')} rows="3" placeholder="${e.placeholder}"></textarea>`;
						break;
					case "button":
						_field = `<button ${e.attr.join(' ')} >${e.title}</button>`;
						break;
					case "checkbox":
						_field = `<input ${e.attr.join(' ')} data-lable="${e.lable}" style="width:40px !important" type="checkbox">`;
						break;
					default:
						_field = `<input ${e.attr.join(' ')} type="${k}" placeholder="${e.placeholder}">`;
						break;
				}
				_field = $(_field).appendTo(this.nextLine(block));
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
						if (e.short && e.short == true) {
							this.data[var_name] = _field
						} else {
							this.data[var_name][e.varName] = _field
						}
					}
				}
				var NewValue
				if (DataImport) {
					if (typeof DataImport[var_name][e.varName] !== 'undefined') {
						NewValue = DataImport[var_name][e.varName]
					} else if (typeof DataImport[var_name][this.iii][e.varName] !== 'undefined') {
						NewValue = DataImport[var_name][this.iii][e.varName]
					} else {
						NewValue = DataImport[var_name]
					}
					switch (k.replace(/\d/g, '')) {
						case "select":
							$(_field).find("option").each(function (index, element) {
								var vsfu = $(element).val()
								if (NewValue.indexOf(vsfu) >= 0) {
									$(element).prop('selected', true);
								}
							});
							break;
						case "textarea":
							_field.html(NewValue)
							break;
						case "checkbox":
							if (NewValue) {
								_field.prop('checked', true);
							}
							break;
						default:
							_field.val(NewValue)
							break;
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
			return addAction;
		}
		return false;
	}
	regenrate(var_name) {
		var self = this;
		var Dt = this.data[var_name];
		// var area = this.currentField;
		var addAction;
		if (this.conteiner.toolbox) {
			this.conteiner.toolbox.remove()
		}
		var _field;
		this.conteiner.toolbox = $(`<div class="toolbox">`).appendTo(this.conteiner.body);
		switch (Dt.constructor.name) {
			case "k":
				Dt.appendTo(this.nextLine(this.conteiner.toolbox))
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
						iterator.appendTo(this.nextLine(this.conteiner.toolbox))
					} else if (iterator.constructor.name == "Object") {
						for (const k in iterator) {
							if (iterator.hasOwnProperty(k)) {
								const elem = iterator[k];
								if (elem.constructor.name == "k") {
									elem.appendTo(this.nextLine(this.conteiner.toolbox))
								}
							}
						}
					}
				}
				if (_r) {
					_field = $(`<button>add</button>`).appendTo(this.nextLine(this.conteiner.toolbox));
					addAction = _field
				}

				break;
			case "Object":
				for (const k in Dt) {
					if (Dt.hasOwnProperty(k)) {
						const e = Dt[k];
						if (e.constructor.name == "k") {
							e.appendTo(this.nextLine(this.conteiner.toolbox))
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

	create_select(e) {
		if (e.attr) {
			var _field = `<select ${e.attr.join(' ')}>`;
		} else {
			var _field = `<select>`;
		}
		if (!e.options) {
			var values = e
		} else {
			var values = e.options
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
		exportData.ClassType = this.constructor.name;
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
									exportData[key] = {}
								}
								// if (!exportData[key][i]) {
								// 	exportData[key][i] = {}
								// }
								if (elem.val() != "on" && elem.val() != "off") {
									exportData[key][k] = elem.val()
								} else {
									exportData[key][k] = elem.prop("checked")
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
	import() {

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
	return new Maxies[Type](arguments)
}