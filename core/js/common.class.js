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
	parent = null
	temp = null


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
		GOA.add(this)
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


	addChildren(obj, key) {
		if(obj instanceof CLASSES.CommonClass && obj.parent === null) {
			if(key.indexOf('[]') > 0 || this[key] instanceof Array) {
				if(!this[key] instanceof Array) {
					this[key] = []
				}
				var id = this[key].length
				obj.setParent(this, id)
				this[key][id] = obj
			} else {
				obj.setParent(this, -1)
				this[key] = obj
			}
			$(document).trigger(this.classKey + '_childAdd', {
				obj: this,
				child: obj
			})
			$(document).trigger('CommonClass_childAdd', {
				obj: this,
				child: obj
			})
			console.info(this.GlobalKey + ' <== ' + obj.GlobalKey)
		}
	}


	set(key, value) {
		this[key] = value
		$(document).trigger(this.classKey + '_set', {
			obj: this,
			key: key,
			value: value,
		})
		$(document).trigger('CommonClass_set', {
			obj: this,
			key: key,
			value: value,
		})
	}


	render() { console.info('TODO render(){}') }


	editorRender(options) {
		this[this.uqField] = this[this.uqField] ?? ''
		options = Object.assign({
			parent: layout.editor.block,
			name: this.name ?? '',
			label: '',
			object: false,
			prefix: 'edit ',
			btnClass: 'btn-primary',
			caller: 'tree'
		}, options)
		console.info('TODO editorRender(){}', arguments)
		if(typeof layout?.editor?.modals[this.GlobalKey] == 'undefined') {
			layout.editor.modals[this.GlobalKey] = $(editorTemplate.get('modal', {
				id: this.GlobalKey,
				parent: this?.parent?.GlobalKey,
				name: options.prefix + options.name + ' ' + options.label + ' ' + this[this.uqField],
				classKey: this.constructor.name,
			})).appendTo('body')
		}
		layout.editor.modals[this.GlobalKey].find('div.modal-body').html('')
		layout.editor.modals[this.GlobalKey].find('div.modal-body').html('')
		if(options.caller == 'tree') {
			this.editorRenderFields(options.parent)
		} else {
			this.editorRenderFields(layout.editor.modals[this.GlobalKey].find('div.modal-body'))
			var button = $(editorTemplate.get('button', {
				id: this.GlobalKey,
				text: options.prefix + options.name + ' ' + options.label + ' ' + this[this.uqField],
				classKey: this.constructor.name,
				btnClass: options.btnClass,
			})).appendTo(options.parent)
			var self = this
			button.find('button').on('click', function() {
				layout.editor.modals[$(this).data('object')].modal('show')
			})
			layout.editor.modals[this.GlobalKey].find('button.action-save').on('click', () => {
				if(options.object !== false) {
					options.object.addChildren(this, options.name)
					layout.editor.render(GOA[current.editor])
					layout.tree.render()
				}
			})
			layout.editor.modals[this.GlobalKey].find('button.action-cancel').on('click', () => {
				tmp.remove(this)
			})
		}
		$(document).trigger(this.GlobalKey+'_rendered', {
			obj: this,
			key: this.GlobalKey,
			options: options,
		})
		$(document).trigger('editor_rendered', {
			obj: this,
			key: this.GlobalKey,
			options: options,
		})
	}


	editorRenderFields(parent) {
		parent.html('')
		for(const editorFieldsKey in this.editorFields) {
			this.editorFields[editorFieldsKey].render(parent, this[editorFieldsKey])
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
		return toObject()
	}


	renderTree(parent) {
		GOA.add(this)
		var name
		if(this.name) {
			name = this.name
		} else if(this?.defultName) {
			name = this.defultName
		} else {
			name = this.constructor.name
		}
		var content = $(treeTemplate.get('content', {
			text: name,
			GlobalKey: this._GlobalKey,
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
				label: this.availableChildrenClass[availableChildrenClassKey].label,
				value: availableChildrenClassKey,
			})))
		}
		$(treeTemplate.get('add', {
			text: 'add new',
			GlobalKey: this._GlobalKey,
			treeIcon: this.treeAddIcon
		})).appendTo(subItem)
	}


	createNewElement(classKey, parentGlobalKey, childKey, parent = null) {
		parent = parent ?? layout.editor.block
		var tempKey = tmp.add(new CLASSES[classKey])
		tmp[tempKey].editorRenderFields(parent)
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
}

CLASSES.DataTypeClass = class DataTypeClass extends CLASSES.CommonClass {
	constructor(options = {}) {
		super(...arguments)
		this.name = ''
		this.subName = ''
		this.preview = ''
		Object.assign(this, options)
		this.name = this.name.toLowerCase()
		this.subName = this.subName.toLowerCase()
		this.preview = this.preview.toLowerCase()
	}


	preRender() {
		super.render()
	}
}

CLASSES.DescriptionClass = class DescriptionClass extends CLASSES.CommonClass {
	constructor() {
		super(...arguments)
		this.body = ''
	}


	editorFields = {
		body: new CLASSES.EditorFieldsClass(this, {name: 'body', type: 'textarea', label: 'Description'}),
	}


	editorRender(options) {
		options = Object.assign({
			parent: layout.editor.block,
			name: this.name ?? '',
			label: '',
			object: false,
			prefix: 'edit ',
			btnClass: 'btn-primary',
			caller: 'tree'
		}, options)
		for(const editorFieldsKey in this.editorFields) {
			this.editorFields[editorFieldsKey].render(options.parent, this[editorFieldsKey], options.label)
		}
	}


	render() {

	}
}

CLASSES.VarClass = class VarClass extends CLASSES.CommonClass {
	treeIcon = 'symbol-variable'
	editorFields = {
		name: new CLASSES.EditorFieldsClass(this, {name: 'name'}),
		dataType: new CLASSES.EditorFieldsClass(this, {name: 'dataType', type: 'select', dataSet: dataTypes.toArray()}),
	}


	constructor(options = {}) {
		super(...arguments)
		this.name = null
		this.value = ''
		this.type = dataTypes.string
		Object.assign(this, options)
	}
}

CLASSES.CodePreviewClass = class CodePreviewClass extends CLASSES.CommonClass {
	editorFields = {
		language: new CLASSES.EditorFieldsClass(this, {
			name: 'language',
			type: 'select',
			dataSet: {'php': 'php', 'js': 'JavaScript'}
		}),
		body: new CLASSES.EditorFieldsClass(this, {name: 'body', type: 'textarea'}),
	}
	treeIcon = 'code'


	constructor(options = {}) {
		super(...arguments)
		this.language = ''
		this.body = ''
		Object.assign(this, options)
		this.lanuage = this.language.toLowerCase()
	}

}

CLASSES.EditorFieldsClass = class EditorFieldsClass {
	constructor(object, options) {
		this.object = object
		this.name = ''
		this.type = 'text'
		this.dataSet = []
		this.callback = false
		this.label = false
		this.placeholder = ''
		this.id = getRandomString()
		this.input = false
		Object.assign(this, options)
	}


	render(parent, value = '', label = false) {
		if(!label) {
			if(this.label) {
				label = this.label
			} else {
				label = this.name
			}
		}
		if(this.input === false) {
			switch(this.type) {
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
			var result = this.object[this.name]
		} else {
			var result = new CLASSES[this.class]
		}
		var key = tmp.add(result)
		tmp[key].editorRender({
			parent: parent,
			name: this.name ?? '',
			label: '',
			object: this.object,
			prefix: 'set ',
			btnClass: 'btn-info',
			caller: this.constructor.name
		})
	}


	renderClassArray(parent, value = '', label = false) {
		var result = new CLASSES[this.class]
		var key = tmp.add(result)
		for(const fieldKey in this.object[this.name]) {
			this.object[this.name][fieldKey].editorRender({
				parent: parent,
				name: this.name ?? '',
				label: '',
				object: this.object,
				prefix: 'edit ',
				btnClass: 'btn-secondary',
				caller: this.constructor.name
			})
		}
		tmp[key].editorRender({
			parent: parent,
			name: this.name ?? '',
			label: '',
			object: this.object,
			prefix: 'add ',
			btnClass: 'btn-info',
			caller: this.constructor.name
		})
	}


	renderSelect(parent, value = '', label = false) {
		this.input = $(editorTemplate.get('select', {
			label: label,
			name: this.name,
			id: this.id,
		})).appendTo(parent)
		if(this.dataSet instanceof Array || this.dataSet instanceof Object) {
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
		}
		if(this.callback !== false) {
			this.input.find('select').on('change', () => {
				this.callback()
				this.input.find('select').removeClass('changing')
				this.input.find('select').addClass('changed')
			})
		} else {
			this.input.find('select').on('change', () => {
				this.object[this.name] = this.input.find('select').val()
				this.input.find('select').removeClass('changing')
				this.input.find('select').addClass('changed')
			})
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
		this.input.find('input').on('input', function() {
			$(this).removeClass('changed')
			$(this).addClass('changing')
		})
		if(this.callback !== false) {
			this.input.find('input').on('change', () => {
				this.callback()
				this.input.find('input').removeClass('changing')
				this.input.find('input').addClass('changed')
			})
		} else {
			this.input.find('input').on('change', () => {
				this.object[this.name] = this.input.find('input').val()
				this.input.find('input').removeClass('changing')
				this.input.find('input').addClass('changed')
			})
		}
		this.input.find('input').on('blur', () => {
			this.input.find('input').removeClass('changing')
		})
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
		this.input.find('textarea').on('input', function() {
			$(this).removeClass('changed')
			$(this).addClass('changing')
		})
		if(this.callback !== false) {
			this.input.find('textarea').on('change', () => {
				this.callback()
				this.input.find('textarea').removeClass('changing')
				this.input.find('textarea').addClass('changed')
			})
		} else {
			this.input.find('textarea').on('change', () => {
				this.object[this.name] = this.input.find('textarea').val()
				this.input.find('textarea').removeClass('changing')
				this.input.find('textarea').addClass('changed')
			})
		}
		this.input.find('textarea').on('blur', () => {
			this.input.find('input').removeClass('changing')
		})
	}

}

CLASSES.Template = class Template {
	get(s, v = null) {
		if(v != null && typeof (v) == 'object') {
			var t = '' + this[s]
			for(var k in v) {
				if(typeof v[k] != 'undefined') {
					t = t.replaceAll('${' + k + '}', v[k])
				}
			}
			t = t.replaceAll(/\$\{.+?\}/g, '')
			return t
		} else return this[s]
	}
}

CLASSES.GlobalObjectAccess = class GlobalObjectAccess {
	constructor() {

	}


	getAllKeys() {
		var a = []
		for(const thisKey in this) {
			a.push(this)
		}
		return a
	}


	add(value) {
		var key = this.getUniqueKey()
		if(value.GlobalKey === null || typeof value.GlobalKey == 'undefined') {
			value.GlobalKey = key
			this[key] = value
		} else {
			if(typeof this[value.GlobalKey] == 'undefined') {
				key = value.GlobalKey
				this[key] = value
			}
		}
		console.info('initialized ' + key + ' ' + value.constructor.name)
		$(document).trigger(value.constructor.name+'_initialized', {
			obj: value,
			key: key,
		})
	}


	getUniqueKey() {
		var key = getRandomString()
		var keys = this.getAllKeys()

		function eq(element) {
			return element == this
		}

		if(keys.length > 0) {
			while(keys.find(eq, key)) {
				key = getRandomString()
			}
		}
		return key
	}
}

var GOA = new CLASSES.GlobalObjectAccess
