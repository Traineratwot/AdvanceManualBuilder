CLASSES.CommonClass = class CommonClass {
	_empty = true
	_ElementId = null
	_GlobalKey = null
	name = ''
	uqField = 'name'
	editorFields = {
		name: new CLASSES.EditorFieldsClass(this, {name: 'name'}),
	}
	treeIcon = 'circle-outline'
	treeAddIcon = 'diff-added'
	availableChildrenClass = {}
	treeOpened = false
	parent = null
	temp = null
	fieldKey = ''
	mdTemplate = new CLASSES.Template


	constructor(objects = {}) {
		if(arguments.length == 0) {
			this._empty = true
		} else {
			this._empty = false
		}
		this.sortKey = 0
		this.classKey = this.constructor.name
		Object.assign(this, objects)
		this[this.uqField] = this[this.uqField] ?? ''
		this.mdTemplate.main = ''
		GOA.add(this)
	}


	getMd() {
		return this.mdTemplate.get('main', this)
	}


	/**
	 * @param  {Object} manual
	 * @param  {number} key
	 */
	setParent(parent, key) {
		if(parent instanceof CLASSES.CommonClass) {
			this.parent = parent
			this.sortKey = key
			this.ElementId = key
		}
	}


	addChildren(obj, key, empty = false) {
		if(obj instanceof CLASSES.CommonClass && obj.parent === null) {
			if(key.indexOf('[]') > 0 || this[key] instanceof Array) {
				if(!this[key] instanceof Array) {
					this[key] = []
				}
				var id = this[key].length
				obj.setParent(this, id)
				this[key][id] = obj
				this._empty = empty
			} else {
				obj.setParent(this, -1)
				this[key] = obj
				this._empty = empty
			}
			$(document).trigger(this.classKey + '_childAdd', {
				obj: this,
				child: obj,
				classKey: obj.constructor.name
			})
			$(document).trigger('childAdd', {
				obj: this,
				child: obj,
				classKey: obj.constructor.name
			})
			Console.info(this.GlobalKey + ' <== ' + obj.GlobalKey)
		}
	}


	set(key, value) {
		switch( typeof value ) {
			case 'boolean':
			case 'number':
			case 'symbol':
			case 'string':
				value = ('' + value).trim()
				if(value == '') {
					value = false
				}
				break
			default:
				break
		}
		this[key] = value
		this._empty = false
		$(document).trigger(this.classKey + 'set', {
			obj: this,
			key: key,
			value: value,
			classKey: this.classKey,
		})
		$(document).trigger('set', {
			obj: this,
			key: key,
			value: value,
			classKey: this.classKey,
		})
	}


	render() { Console.info('TODO render(){}') }


	editorRender(options) {
		this[this.uqField] = this[this.uqField] ?? ''
		options = Object.assign({
			parent: layout.editor.block,
			fieldKey: this.fieldKey ?? '',
			label: this[this.uqField],
			object: false,
			prefix: 'edit',
			btnClass: 'btn-primary',
			caller: 'tree'
		}, options)
		Console.info('TODO editorRender(){}', arguments)

		let label = options.label ? '"' + options.label + '"' : ''
		if(!label || label.trim() == '') {
			label = options.fieldKey
		}
		var buttonLabel = locale._(options.prefix) + ' ' + locale._(label)

		if(typeof layout?.editor?.modals[this.GlobalKey] == 'undefined') {
			layout.editor.modals[this.GlobalKey] = $(editorTemplate.get('modal', {
				id: this.GlobalKey,
				parent: this?.parent?.GlobalKey,
				name: buttonLabel,
				classKey: this.constructor.name,
			})).appendTo('body')
		}
		layout.editor.modals[this.GlobalKey].find('div.modal-body').html('')
		layout.editor.modals[this.GlobalKey].find('div.modal-body').html('')
		if(options.caller == 'tree') {
			this.editorRenderFields(options.parent)
		} else {
			this.editorRenderFields(layout.editor.modals[this.GlobalKey].find('div.modal-body'))
			var attr = ''
			var button = $(editorTemplate.get('button', {
				id: this.GlobalKey,
				text: buttonLabel,
				classKey: this.constructor.name,
				btnClass: options.btnClass,
				attr: attr,
			})).appendTo(options.parent)
			EMC.add({
				element: button.find('button')[0],
				event: 'click',
				func: 'editorRender_button'
			})
			EMC.add({
				element: layout.editor.modals[this.GlobalKey].find('button.action-save')[0],
				event: 'click',
				func: 'editorRender_button_action_save',
				options: options,
				elem:this,
			})
			EMC.add({
				element: layout.editor.modals[this.GlobalKey].find('button.action-cancel')[0],
				event: 'click',
				func: 'editorRender_button_action_cancel',
				options: this,
			})
		}
		$(document).trigger(this.GlobalKey + '_rendered', {
			obj: this,
			key: this.GlobalKey,
			options: options,
		})
		$(document).trigger('editor_rendered', {
			obj: this,
			key: this.GlobalKey,
			options: options,
		})
		EMC.setEvents()
	}


	editorRenderFields(parent, caller) {
		caller = caller ? caller : this.constructor.name
		parent.html('')
		for(const editorFieldsKey in this.editorFields) {
			this.editorFields[editorFieldsKey].render(parent, this[editorFieldsKey], false, caller)
		}
	}


	removeChildren(GlobalKey, obj = false) {
		if(obj == false) {
			obj = this
		}
		for(const objKey in obj) {
			const val = obj[objKey]
			if(val instanceof CommonClass) {
				if(val.GlobalKey == GlobalKey) {
					delete obj[objKey]
					return true
				}
			}
			if(val instanceof Array || val instanceof Object) {
				for(const objKey in obj) {
					const val = obj[objKey]
					if(val instanceof CommonClass) {
						if(val.GlobalKey == GlobalKey) {
							delete obj[objKey]
							return true
						}
					}
				}
			}
		}
	}


	prepare() {
		return true
	}


	success(msg = '', data = {}) {
		return {success: true, msg: msg, data: data}
	}


	failure(msg = '', data = {}) {
		return {success: false, msg: msg, data: data}
	}


	get empty() {
		return this._empty
	}


	set empty(value) {
		return false
	}


	get ElementId() {
		return this._ElementId
	}


	set ElementId(value) {
		if(this._ElementId == null) {
			this._ElementId = value
		}
	}


	get GlobalKey() {
		return this._GlobalKey
	}


	set GlobalKey(value) {
		if(this._GlobalKey == null) {
			this._GlobalKey = value
		}
	}


	toObject() {
		var JSON = {}
		for(let key in this) {
			if(key != 'parent') {
				let element = this[key]
				if(element instanceof CLASSES.CommonClass) {
					JSON[key] = element.toObject()
					continue
				}
				if(element instanceof Array) {
					JSON[key] = []
					for(let k in element) {
						let e = element[k]
						if(e instanceof CLASSES.CommonClass) {
							JSON[key].push(e.toObject())
						}
					}
					continue
				}
				JSON[key] = element
			}
		}
		delete JSON.parent
		delete JSON.editorFields
		return JSON
	}


	fromObject(value) {
		Object.assign(this, value)
		this._empty = false
		return this.toObject()
	}


	renderTree(parent) {
		GOA.add(this)
		var name
		if(this.name) {
			name = this.name
		} else if(this?.defaultName) {
			name = this.defaultName
		} else {
			name = this.constructor.name
		}
		var content = $(treeTemplate.get('content', {
			text: name,
			GlobalKey: this.GlobalKey,
			childkey: this?.parent?.GlobalKey,
			treeIcon: this.treeIcon
		})).appendTo(parent)

	}


	renderAddItem(subItem) {
		layout.editor.addModals[this.GlobalKey] = $(layout.editor.template.get('addModal', {
			GlobalKey: this._GlobalKey,
		})).appendTo('body')
		for(const availableChildrenClassKey in this.availableChildrenClass) {
			var select = layout.editor.addModals[this.GlobalKey].find('select')
			select.append($(editorTemplate.get('option', {
				label: locale._(this.availableChildrenClass[availableChildrenClassKey].label),
				value: availableChildrenClassKey,
			})))
		}
		$(treeTemplate.get('add', {
			text: 'add new',
			GlobalKey: this.GlobalKey,
			treeIcon: this.treeAddIcon
		})).appendTo(subItem)
	}


	createNewElement(classKey, parentGlobalKey, childKey, parent = null) {
		parent = parent ?? layout.editor.block
		var tempKey = tmp.add(new CLASSES[classKey])
		tmp[tempKey].editorRenderFields(parent, 'create')
		$(editorTemplate.get('button', {
			id: parentGlobalKey,
			classKey: classKey,
			btnClass: 'btn-success',
			text: 'save',
		})).appendTo(parent).on('click', () => {
			if(this instanceof CLASSES.ManualClass) {
				this.addElement(tmp[tempKey])
			} else {
				this.addChildren(tmp[tempKey], childKey)
			}
			layout.tree.render()
		})
		return tmp[tempKey]
	}


	regeneration(obj) {
		for(const thisKey in this) {
			if(this[thisKey] instanceof Object && (this[thisKey] instanceof CommonClass) == false) {
				if(this[thisKey]?.classKey) {
					var tmpKey = tmp.add(new CLASSES[this[thisKey].classKey](this[thisKey]))
					this.addChildren(tmp[tmpKey].regeneration(this[thisKey]), thisKey)
				}
			}
			if(this[thisKey] instanceof Array) {
				for(const k in this[thisKey]) {
					if(this[thisKey][k] instanceof Object && (this[thisKey][k] instanceof CommonClass) == false) {
						if(this[thisKey][k]?.classKey) {
							var tmpKey = tmp.add(new CLASSES[this[thisKey][k].classKey](this[thisKey][k]))
							this.addChildren(tmp[tmpKey].regeneration(this[thisKey][k]), thisKey)
						}
					}
				}
			}
		}
		Object.assign(this, obj)
		return this
	}


	addElement(tmpElement) {

	}


	treeOpenedToggle() {
		if(this.treeOpened) {
			this.treeOpened = false
		} else {
			this.treeOpened = true
		}
	}


	parentClass(className, maxIteration = 10) {
		var i = maxIteration

		var proto = this.__proto__
		while(proto.constructor.name != className && i > 0) {
			i--
			proto = proto.__proto__
		}
		return proto
	}
}

CLASSES.EditorFieldsClass = class EditorFieldsClass {
	constructor(object, options) {
		this.object = object
		this.name = ''
		this.caller = this.constructor.name
		this.type = 'text'
		this.dataSet = []
		this.dataSetOriginal = {}
		this.callback = false
		this.label = false
		this.placeholder = ''
		this.id = getRandomString()
		this.input = false
		Object.assign(this, options)
	}


	render(parent, value = '', label = false, caller = false) {
		if(!label) {
			if(this.label) {
				label = this.label
			} else {
				label = this.name
			}
		}
		if(caller) {
			this.caller = caller
		}
		if(this.input === false) {
			switch( this.type ) {
				case 'class':
					this.renderClass(parent, value, label)
					break
				case 'class[]':
					this.renderClassArray(parent, value, label)
					break
				case 'select':
					this.renderSelect(parent, value, label)
					break
				case 'textarea':
					this.renderTextarea(parent, value, label)
					break
				default:
					this.renderDefault(parent, value, label)
					break
			}
		} else {
			this.input.appendTo(parent)
			this.input.val(value)
		}
		$(document).trigger(this.classKey + '_rendered', {
			obj: this,
			parent: parent,
			label: label,
			value: value,
		})
		$(document).trigger('CommonClass_rendered', {
			obj: this,
			parent: parent,
			label: label,
			value: value,
		})
		return this.object
	}


	renderClass(parent, value = '', label = false) {
		if(this.object[this.name] instanceof CLASSES[this.class]) {
			this.object[this.name].editorRender({
				parent: parent,
				fieldKey: this.name ?? '',
				object: this.object,
				prefix: 'edit',
				btnClass: 'btn-primary',
				caller: this.caller
			})
		} else {
			var key = tmp.add(new CLASSES[this.class])
			tmp[key].editorRender({
				parent: parent,
				fieldKey: this.name ?? '',
				object: this.object,
				prefix: 'set',
				btnClass: 'btn-info',
				caller: this.caller
			})
		}
	}


	renderClassArray(parent, value = '', label = false) {
		var result = new CLASSES[this.class]
		var key = tmp.add(result)
		for(const fieldKey in this.object[this.name]) {
			this.object[this.name][fieldKey].editorRender({
				parent: parent,
				fieldKey: this.name ?? '',
				object: this.object,
				prefix: 'edit',
				btnClass: 'btn-secondary',
				caller: this.caller
			})
		}
		tmp[key].editorRender({
			parent: parent,
			fieldKey: this.name ?? '',
			label: '',
			object: this.object,
			prefix: 'add',
			btnClass: 'btn-info',
			caller: this.caller
		})
	}


	renderSelect(parent, value = '', label = false) {
		if(this.dataSet instanceof Array || this.dataSet instanceof Object) {
			this.input = $(editorTemplate.get('select', {
				label: label,
				name: this.name,
				id: this.id,
			})).appendTo(parent)
			for(const dataSetKey in this.dataSet) {
				if(dataSetKey == value) {
					$(editorTemplate.get('option', {
						label: this.dataSet[dataSetKey],
						value: dataSetKey,
						attr: 'selected',
					})).appendTo(this.input.find('select'))
				} else {
					$(editorTemplate.get('option', {
						label: this.dataSet[dataSetKey],
						value: dataSetKey,
					})).appendTo(this.input.find('select'))
				}
			}
			if(this.callback !== false) {
				this.input.find('select').on('change', () => {
					this.callback()
					this.input.find('select').removeClass('changing')
					this.input.find('select').addClass('changed')
				})
			} else {
				this.input.find('select').on('change', () => {
					this.object.set(this.name, this.dataSetOriginal ? this.dataSetOriginal[this.input.find('select').val()] : this.dataSet[this.input.find('select').val()])
					this.input.find('select').removeClass('changing')
					this.input.find('select').addClass('changed')
				})
			}
		}
	}


	renderDefault(parent, value = '', label = false) {
		this.input = $(editorTemplate.get('input', {
			label: label,
			name: this.name,
			type: this.type,
			value: value,
			id: this.id,
			placeholder: this.placeholder,
		})).appendTo(parent)
		if(this.dataSet instanceof Array || this.dataSet instanceof Object) {
			this.input.find('input').autocomplete({
				source: this.dataSet,
				minLength: 0,
			})
		}
		EMC.add({
			element: this.input.find('input')[0],
			event: 'input',
			func: 'inputChanging'
		})
		EMC.add({
			element: this.input.find('input')[0],
			event: 'change blur',
			func: 'inputChanged',
			callback: this.callback,
			object: this.object
		})
		EMC.setEvents()
	}


	renderTextarea(parent, value = '', label = false) {
		this.input = $(editorTemplate.get('textarea', {
			label: label,
			name: this.name,
			type: this.type,
			value: value,
			id: this.id,
			placeholder: this.placeholder,
		})).appendTo(parent)
		if(this.dataSet instanceof Array || this.dataSet instanceof Object) {
			this.input.find('input').autocomplete({
				source: this.dataSet,
				minLength: 0,
			})
		}
		EMC.add({
			element: this.input.find('textarea')[0],
			event: 'input',
			func: 'inputChanging'
		})

		EMC.add({
			element: this.input.find('textarea')[0],
			event: 'change blur',
			func: 'inputChanged',
			callback: this.callback,
			object: this.object
		})
		EMC.setEvents()
	}

}
