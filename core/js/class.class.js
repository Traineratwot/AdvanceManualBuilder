
CLASSES.ClassClass = class ClassClass extends CLASSES.CommonClass {
	treeIcon = 'symbol-class'
	constructor() {
		super(...arguments)
		this.description = new CLASSES.DescriptionClass
		this.vars = [new CLASSES.ClassVarsClass]
		this.constants = [new CLASSES.ClassConstantsClass]
		this.methods = [new CLASSES.methodsClass]
		this.code = null
	}
	renderTree(parent) {
		var item = $(treeTemplate.get('item', { text: this.name, GlobalKey: this._GlobalKey, treeIcon: this.treeIcon })).appendTo(parent)
		if (this.vars.length > 0) {
			var subItem = $(treeTemplate.get('subItem')).appendTo(item)
			for (const k in this.vars) {
				if (this.vars[k] instanceof CLASSES.CommonClass) {
					const element = this.vars[k]
					element.renderTree(subItem)
				}
			}
		}
		if (this.constants.length > 0) {
			for (const k in this.constants) {
				if (this.constants[k] instanceof CLASSES.CommonClass) {
					const element = this.constants[k]
					element.renderTree(subItem)
				}
			}
		}
		if (this.methods.length > 0) {
			for (const k in this.methods) {
				if (this.methods[k] instanceof CLASSES.CommonClass) {
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
}

CLASSES.ClassVarsClass = class ClassVarsClass extends CLASSES.VarClass {
	constructor() {
		super(...arguments)
		this.Visibility = 'public'
	}
}

CLASSES.ClassConstantsClass = class ClassConstantsClass extends CLASSES.VarClass {
	treeIcon = 'symbol-constant'
	constructor() {
		super(...arguments)
		this.Visibility = 'public'
	}
}