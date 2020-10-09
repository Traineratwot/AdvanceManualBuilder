CLASSES.FunctionClass = class FunctionClass extends CLASSES.CommonClass {
	treeIcon = 'symbol-method'
	editorFields = {
		name: new CLASSES.EditorFieldsClass(this, {name: 'name'}),
		description: new CLASSES.EditorFieldsClass(this, {
			name: 'description',
			type: 'class',
			class: 'DescriptionClass'
		}),
		inputs: new CLASSES.EditorFieldsClass(this, {name: 'inputs', type: 'class[]', class: 'FunctionInputClass'}),
		output: new CLASSES.EditorFieldsClass(this, {name: 'output', type: 'class', class: 'FunctionOutputClass'}),
		code: new CLASSES.EditorFieldsClass(this, {
			name: 'code',
			type: 'class',
			class: 'CodePreviewClass'
		}),

	}
	availableChildrenClass = {
		FunctionInputClass: {label: 'input', childKey: 'inputs'},
		FunctionOutputClass: {label: 'function', childKey: 'output'},
		DescriptionClass: {label: 'object', childKey: 'description'},
		CodePreviewClass: {label: 'codePreview', childKey: 'code'},
	}


	constructor(options = {}) {
		super(...arguments)
		this.name = ''
		this.inputs = []
		this.addChildren(new CLASSES.FunctionOutputClass, 'output')
		this.addChildren(new CLASSES.DescriptionClass, 'description')
		this.addChildren(new CLASSES.CodePreviewClass, 'code')
		this.mdTemplate.main = `*$[name]* ($[inputs])`

		Object.assign(this, options)
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


	renderTree(parent) {
		var item = $(treeTemplate.get('item', {
			text: this.name,
			GlobalKey: this.GlobalKey,
			childkey: this.parent?.GlobalKey,
			treeIcon: this.treeIcon
		})).appendTo(parent)
		if(this.inputs.length > 0) {
			var subItem = $(treeTemplate.get('subItem')).appendTo(item)
			for(const k in this.inputs) {
				if(this.inputs[k] instanceof CLASSES.CommonClass) {
					const element = this.inputs[k]
					element.renderTree(subItem)
				}
			}
		}
	}


	getMd() {
		var text = ''
		var inputs = []
		for(const inputsKey in this.inputs) {
			inputs.push(this.inputs[inputsKey].getMd())
		}
		text += this.mdTemplate.get('main', {
			name: this.name,
			inputs: inputs.join(','),
		})
		text += '\n'
		text += this.output.getMd()
		text += '\n'
		text += this.description.getMd()
		text += '\n'
		text += this.code.getMd()

		return text
	}
}

CLASSES.FunctionInputClass = class FunctionInputClass extends CLASSES.CommonClass {
	treeIcon = 'symbol-variable'
	editorFields = {
		name: new CLASSES.EditorFieldsClass(this, {name: 'name'}),
		default: new CLASSES.EditorFieldsClass(this, {name: 'default', type: 'class', class: 'VarClass'}),
		dataType: new CLASSES.EditorFieldsClass(this, {name: 'dataType', type: 'select', dataSet: dataTypes.toArray(),dataSetOriginal:dataTypes}),
		description: new CLASSES.EditorFieldsClass(this, {
			name: 'description',
			type: 'class',
			class: 'DescriptionClass'
		}),
	}


	constructor() {
		super(...arguments)
		this.name = ''
		this.addChildren(new CLASSES.DataTypeClass, 'dataType')
		this.addChildren(new CLASSES.VarClass, 'default')
		this.addChildren(new CLASSES.DescriptionClass, 'description')
		this.possible_values = []
		this.mdTemplate.main = `$[dataType] **$[name]** $[default] $[possible_values]`
	}


	getMd() {
		var possible_values = ''
		if(this.possible_values.length > 0) {
			possible_values = `[${this.possible_values.join(',')}]`
		}
		var dataType = `<i style="color: #693">${this.dataType?.name}${this.dataType?.subname ?':'+this.dataType?.subname:''}</i>`
		var _default = `= <i style="color: #936" title="${this.default?.dataType?.subname}">${this.default?.value}</i>`
		return this.mdTemplate.get('main', {
			name: this.name,
			possible_values: possible_values,
			dataType: dataType,
			default: _default,
		})
	}
}

CLASSES.FunctionOutputClass = class FunctionOutputClass extends CLASSES.CommonClass {
	treeIcon = 'symbol-constant'
	editorFields = {
		name: new CLASSES.EditorFieldsClass(this, {name: 'name'}),
		dataType: new CLASSES.EditorFieldsClass(this, {name: 'dataType', type: 'select', dataSet: dataTypes.toArray(),dataSetOriginal:dataTypes}),
	}


	constructor() {
		super(...arguments)
		this.name = ''
		this.addChildren(new CLASSES.DataTypeClass, 'dataType')
		this.addChildren(new CLASSES.VarClass, 'default')
		this.mdTemplate.main = `$[dataType] **$[name]** $[default] $[possible_values]`
		this.possible_values = []
	}


	getMd() {
		var possible_values = ''
		if(this.possible_values.length > 0) {
			possible_values = `[${this.possible_values.join(',')}]`
		}
		var dataType = `<i style="color: #693">${this.dataType?.name}${this.dataType?.subname ?':'+this.dataType?.subname:''}</i>`
		var _default = `= <i style="color: #936" title="${this.default?.dataType?.subname}">${this.default?.value}</i>`
		return this.mdTemplate.get('main', {
			name: this.name,
			possible_values: possible_values,
			dataType: dataType,
			default: _default,
		})
	}
}

