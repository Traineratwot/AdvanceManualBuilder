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
		body: new CLASSES.EditorFieldsClass(this, {name: 'body', type: 'textarea', label: 'Description',placeholder:'Markdown'}),
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
			type: 'text',
			dataSet: CodeLanguagesDataSet
		}),
		body: new CLASSES.EditorFieldsClass(this, {name: 'body', type: 'textarea',label: 'codePreview'}),
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
