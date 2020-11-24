CLASSES.DataTypeClass = class DataTypeClass extends CLASSES.CommonClass {
	constructor(options = {}) {
		super(...arguments)
		this.name = ''
		this.subName = ''
		this.preview = ''
		this.color = '#693'
		this.mdTemplate.main = `<i style="color: #693" title="$[name]">$[name] : $[subName]</i>`
		Object.assign(this, options)
		this.name = this.name.toLowerCase()
		this.subName = this.subName.toLowerCase()
		this.preview = this.preview.toLowerCase()
	}


	getMd() {
		if(this.name == this.subName) {
			this.mdTemplate.main = `<i style="color: ${this.color}">$[name]</i>`
		} else {
			this.mdTemplate.main = `<i style="color: ${this.color}">$[name] : $[subName]</i>`
		}
		return super.getMd()
	}

}

CLASSES.DescriptionClass = class DescriptionClass extends CLASSES.CommonClass {
	constructor() {
		super(...arguments)
		this.body = ''
	}


	editorFields = {
		body: new CLASSES.EditorFieldsClass(this, {
			name: 'body',
			type: 'textarea',
			label: 'Description',
			placeholder: 'Markdown'
		}),
	}


	editorRender(options) {
		options = Object.assign({
			parent: layout.editor.block,
			fieldKey: this.fieldKey ?? '',
			prefix: 'edit',
			btnClass: 'btn-primary',
			caller: 'tree'
		}, options)
		for(const editorFieldsKey in this.editorFields) {
			this.editorFields[editorFieldsKey].render(options.parent, this[editorFieldsKey], options.label)
		}
	}


	render() {

	}


	getMd() {
		return '\n' + this.body + '\n'
	}
}

CLASSES.VarClass = class VarClass extends CLASSES.CommonClass {
	treeIcon = 'symbol-variable'
	editorFields = {
		value: new CLASSES.EditorFieldsClass(this, {name: 'value'}),
		dataType: new CLASSES.EditorFieldsClass(this, {
			name: 'dataType',
			type: 'select',
			dataSet: dataTypes.toArray(),
			dataSetOriginal: dataTypes
		}),
	}
	uqField = 'value'

	constructor(options = {}) {
		super(...arguments)
		this.name = null
		this.dataType = dataTypes.mixed
		this.value = null
		this.mdTemplate.main = `$[dataType] $[value]`
		Object.assign(this, options)
	}


	set(key, value) {
		super.set(key, value)
		if(!this.value){
			this._empty = true
		}else{
			this._empty = false
		}
	}


	getMd() {
		var dataType = ''
		if(this.dataType instanceof CLASSES.DataTypeClass) {
			dataType = this.dataType.getMd()
		}
		return this.mdTemplate.get('main', {
			'dataType': dataType,
			'value': this.value
		})
	}
}

CLASSES.CodePreviewClass = class CodePreviewClass extends CLASSES.CommonClass {

	editorFields = {
		language: new CLASSES.EditorFieldsClass(this, {
			name: 'language',
			type: 'text',
			dataSet: CodeLanguagesDataSet
		}),
		body: new CLASSES.EditorFieldsClass(this, {name: 'body', type: 'textarea', label: 'codePreview'}),
	}
	treeIcon = 'code'
	name = locale._('codePreview')


	constructor(options = {}) {
		super(...arguments)
		this.language = ''
		this.body = ''
		this.mdTemplate.main = `\`\`\`$[language]\n$[body]\n\`\`\``
		Object.assign(this, options)
		this.lanuage = this.language.toLowerCase()
	}

}




