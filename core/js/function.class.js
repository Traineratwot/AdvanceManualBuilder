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
	availableChildrenClass = [
		'FunctionInputClass',
		'FunctionOutputClass',
		'DescriptionClass',
		'CodePreviewClass',
	]


	constructor(options = {}) {
		super(...arguments)
		this.name = ''
		this.inputs = []
		this.addChildren(new CLASSES.FunctionOutputClass, 'output')
		this.addChildren(new CLASSES.DescriptionClass, 'description')
		this.addChildren(new CLASSES.CodePreviewClass, 'code')
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
			GlobalKey: this._GlobalKey,
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
}
CLASSES.FunctionInputClass = class FunctionInputClass extends CLASSES.CommonClass {
	treeIcon = 'symbol-variable'
	editorFields = {
		name: new CLASSES.EditorFieldsClass(this, {name: 'name'}),
		dataType: new CLASSES.EditorFieldsClass(this, {name: 'dataType', type: 'select', dataSet: dataTypes.toArray()}),
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
		this.addChildren(new CLASSES.VarClass, 'defult')
		this.addChildren(new CLASSES.DescriptionClass, 'description')
		this.possible_values = []
	}
}

CLASSES.FunctionOutputClass = class FunctionOutputClass extends CLASSES.CommonClass {
	treeIcon = 'symbol-constant'
	editorFields = {
		name: new CLASSES.EditorFieldsClass(this, {name: 'name'}),
		dataType: new CLASSES.EditorFieldsClass(this, {name: 'dataType', type: 'select', dataSet: dataTypes.toArray()}),
	}


	constructor() {
		super(...arguments)
		this.name = ''
		this.addChildren(new CLASSES.DataTypeClass, 'dataType')
		this.addChildren(new CLASSES.VarClass, 'default')
		this.possible_values = []
	}
}

