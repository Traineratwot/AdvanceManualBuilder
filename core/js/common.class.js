class CommonClass {
	_empty = true
	_ElementId = null
	_GlobalKey = null
	editorFields = {
		name: new EditorFieldsClass(this, {name: 'name'}),
	}
	treeIcon = 'circle-outline'
	treeAddIcon = 'diff-added'
	availableChildrenClass = []


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
	setManual(manual, key) {
		if(manual instanceof ManualClass) {
			this.manual = manual
			this.sortKey = key
			this.ElementId = key
		}
	}


	render() {console.info('TODO render(){}')}


	editorRender(parent) {
		console.info('TODO editorRender(){}', arguments)
		layout.editor.modal.find('div.modal-body').html('')
		for(const editorFieldsKey in this.editorFields) {
			this.editorFields[editorFieldsKey].render(layout.editor.modal.find('div.modal-body'), this[editorFieldsKey])
		}
		layout.editor.modal.modal('show')

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
			if(element instanceof CommonClass) {
				JSON[key] = element.toObject()
				continue
			}
			if(element instanceof Array) {
				JSON[key] = []
				for(let k in element) {
					let e = element[k]
					if(e instanceof CommonClass) {
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

class DataTypeClass extends CommonClass {
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

class DescriptionClass extends CommonClass {
	constructor() {
		super(...arguments)
		this.body = ''
	}


	render() {

	}
}

class VarClass extends CommonClass {
	treeIcon = 'symbol-variable'


	constructor(options = {}) {
		super(...arguments)
		this.name = null
		this.value = ''
		this.type = dataTypes.string
		Object.assign(this, options)
	}
}

class CodePreviewClass extends CommonClass {
	editorFields = {
		language: new EditorFieldsClass(this, {name: 'lanuage', type: 'select'}),
		body: new EditorFieldsClass(this, {name: 'body', type: 'textarea'}),
	}


	constructor(options = {}) {
		super(...arguments)
		this.language = ''
		this.body = ''
		Object.assign(this, options)
		this.lanuage = this.language.toLowerCase()
	}
}

class EditorFieldsClass {
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


	render(parent, value = '') {
		if(this.input === false) {
			switch( this.type ) {
				default:
					this.input = $(editorTemplate.get('input', {
						name: this.name,
						type: this.type,
						value: value,
						id: this.id,
						placeholder: this.placeholder,
					})).appendTo(parent)
					if(this.dataSet.length > 0) {
						this.input.find('input').autocomplete({
							source: this.dataSet.toArray(),
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

					break
			}
		} else {
			this.input.appendTo(parent)
			this.input.val(value)
		}
		return this.input
	}
}

class Template {
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

class GlobalObjectAccess {
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

var GOA = new GlobalObjectAccess
