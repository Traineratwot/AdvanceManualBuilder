CLASSES.ClassClass = class ClassClass extends CLASSES.CommonClass {
	treeIcon = 'symbol-class'
	editorFields = {
		name: new CLASSES.EditorFieldsClass(this, {name: 'name'}),
		description: new CLASSES.EditorFieldsClass(this, {
			name: 'description',
			type: 'class',
			class: 'DescriptionClass'
		}),
		constants: new CLASSES.EditorFieldsClass(this, {
			name: 'constants',
			type: 'class[]',
			class: 'ClassConstantsClass'
		}),
		vars: new CLASSES.EditorFieldsClass(this, {name: 'vars', type: 'class[]', class: 'ClassVarsClass'}),
		methods: new CLASSES.EditorFieldsClass(this, {name: 'methods', type: 'class[]', class: 'methodsClass'}),
		code: new CLASSES.EditorFieldsClass(this, {
			name: 'code',
			type: 'class',
			class: 'CodePreviewClass'
		}),
	}


	constructor() {
		super(...arguments)
		this.addChildren(new CLASSES.DescriptionClass, 'description')
		this.vars = []
		this.constants = []
		this.methods = []
		this.code = null
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
			childkey: this?.parent?.GlobalKey,
			treeIcon: this.treeIcon
		})).appendTo(parent)
		if(this.vars.length > 0) {
			var subItem = $(treeTemplate.get('subItem')).appendTo(item)
			for(const k in this.vars) {
				if(this.vars[k] instanceof CLASSES.CommonClass) {
					const element = this.vars[k]
					element.renderTree(subItem)
				}
			}
		}
		if(this.constants.length > 0) {
			for(const k in this.constants) {
				if(this.constants[k] instanceof CLASSES.CommonClass) {
					const element = this.constants[k]
					element.renderTree(subItem)
				}
			}
		}
		if(this.methods.length > 0) {
			for(const k in this.methods) {
				if(this.methods[k] instanceof CLASSES.CommonClass) {
					const element = this.methods[k]
					element.renderTree(subItem)
				}
			}
		}

	}
}

CLASSES.ObjectClass = class ObjectClass extends CLASSES.ClassClass {
	constructor() {
		super(...arguments)
		this.class = null
	}
}

CLASSES.methodsClass = class methodsClass extends CLASSES.FunctionClass {
	constructor() {
		super(...arguments)
		this.Visibility = 'public'
	}


	editorRender() {
		this.parentClass('CommonClass').editorRender.call(this,...arguments)
	}
}

CLASSES.ClassVarsClass = class ClassVarsClass extends CLASSES.VarClass {
	constructor() {
		super(...arguments)
		this.Visibility = 'public'
	}


	editorRender() {
		this.parentClass('CommonClass').editorRender.call(this,...arguments)
	}
}

CLASSES.ClassConstantsClass = class ClassConstantsClass extends CLASSES.VarClass {
	treeIcon = 'symbol-constant'


	constructor() {
		super(...arguments)
		this.Visibility = 'public'
	}


	editorRender(parent, name = false, object = false, options = {}) {
		this.parentClass('CommonClass').editorRender.call(this,...arguments)
	}
}