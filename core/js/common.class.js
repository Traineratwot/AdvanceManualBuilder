CLASSES.CommonClass = class CommonClass {
	_empty = true
	_ElementId = null
	_GlobalKey = null
	editorFields = {
		name: new CLASSES.EditorFieldsClass(this, {name: 'name'}),
	}
	treeIcon = 'circle-outline'
	treeAddIcon = 'diff-added'
	availableChildrenClass = []
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
			console.info(this.GlobalKey + ' added ' + obj.GlobalKey)
		}
	}


	render() { console.info('TODO render(){}') }


	editorRender(parent, name = false, object = false,options) {
		name = name ?? this.constructor.name
		console.info('TODO editorRender(){}', arguments)
		if(typeof layout?.editor?.modals[this.GlobalKey] == 'undefined') {
			layout.editor.modals[this.GlobalKey] = $(editorTemplate.get('modal', {
				id: this.GlobalKey,
				parent: this?.parent?.GlobalKey,
				name: options.prefix + name,
				classKey: this.constructor.name,
			})).appendTo('body')
		}
		layout.editor.modals[this.GlobalKey].find('div.modal-body').html('')
		for(const editorFieldsKey in this.editorFields) {
			this.editorFields[editorFieldsKey].render(layout.editor.modals[this.GlobalKey].find('div.modal-body'), this[editorFieldsKey])
		}
		var button = $(editorTemplate.get('button', {
			id: this.GlobalKey,
			text: options.prefix + name,
			classKey: this.constructor.name,
		})).appendTo(parent)
		var self = this
		button.find('button').on('click', function() {
			layout.editor.modals[$(this).data('object')].modal('show')
		})
		layout.editor.modals[this.GlobalKey].find('button.action-save').on('click', () => {
			if(object !== false) {
				object.addChildren(this, name)
			}
		})
		layout.editor.modals[this.GlobalKey].find('button.action-cancel').on('click', () =>  {
			tmp.remove(this)
		})

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
		delete JSON.manual
		delete JSON.editorFields
		return JSON
	}


	fromObject(value) {
		Object.assign(this, value)
		return toObject()
	}


	renderTree(parent) {
		var content = $(treeTemplate.get('content', {
			text: this.name,
			GlobalKey: this._GlobalKey,
			treeIcon: this.treeIcon
		})).appendTo(parent)

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
		body: new CLASSES.EditorFieldsClass(this, {name: 'body', type: 'textarea'}),
	}


	editorRender(parent, label = false) {
		for(const editorFieldsKey in this.editorFields) {
			this.editorFields[editorFieldsKey].render(parent, this[editorFieldsKey], label)
		}
	}


	render() {

	}
}

CLASSES.VarClass = class VarClass extends CLASSES.CommonClass {
	treeIcon = 'symbol-variable'


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
		this.placeholder = ''
		this.id = getRandomString()
		this.input = false
		Object.assign(this, options)
	}


	render(parent, value = '', label = false) {
		if(!label) {
			label = this.name
		}
		if(this.input === false) {
			switch( this.type ) {
				case 'class':
					if(this.object[this.name] instanceof CLASSES[this.class]) {
						var result = this.object[this.name]
					} else {
						var result = new CLASSES[this.class]
					}
					var key = tmp.add(result)

					tmp[key].editorRender(parent, this.name, this.object,{
						prefix:'set '
					})
					break
				case 'class[]':
					var result = new CLASSES[this.class]
					var key = tmp.add(result)
					for(const fieldKey in this.object[this.name]) {
						this.object[this.name][fieldKey].editorRender(parent, this.name,this.object,{
							prefix:'edit '
						})
					}
					tmp[key].editorRender(parent, this.name,this.object,{
						prefix:'add '
					})
					break
				case 'select':
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

					break
				default:
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

					break
			}
		} else {
			this.input.appendTo(parent)
			this.input.val(value)
		}
		return this.object
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
		if(value.GlobalKey === null) {
			value.GlobalKey = key
			this[key] = value
		}
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
