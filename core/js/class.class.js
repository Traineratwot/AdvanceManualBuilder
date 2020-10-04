
class ClassClass extends CommonClass {
	treeIcon = 'symbol-class'
	constructor() {
		super(...arguments)
		this.description = new DescriptionClass
		this.vars = [new ClassVarsClass]
		this.constants = [new ClassConstantsClass]
		this.methods = [new methodsClass]
		this.code = null
	}
	renderTree(parent) {
		var item = $(treeTemplate.get('item', {text: this.name,GlobalKey:this._GlobalKey,treeIcon:this.treeIcon})).appendTo(parent)
		if(this.vars.length > 0) {
			var subItem = $(treeTemplate.get('subItem')).appendTo(item)
			for(const k in this.vars) {
				if(this.vars[k] instanceof CommonClass) {
					const element = this.vars[k]
					element.renderTree(subItem)
				}
			}
		}
		if(this.constants.length > 0) {
			for(const k in this.constants) {
				if(this.constants[k] instanceof CommonClass) {
					const element = this.constants[k]
					element.renderTree(subItem)
				}
			}
		}
		if(this.methods.length > 0) {
			for(const k in this.methods) {
				if(this.methods[k] instanceof CommonClass) {
					const element = this.methods[k]
					element.renderTree(subItem)
				}
			}
		}
		super.treeEvent()
	}
}

class ObjectClass extends ClassClass {
	constructor() {
		super(...arguments)
		this.class = null
	}

}

class methodsClass extends FunctionClass {
	constructor() {
		super(...arguments)
		this.Visibility = 'public'
	}
}

class ClassVarsClass extends VarClass {
	constructor() {
		super(...arguments)
		this.Visibility = 'public'
	}
}

class ClassConstantsClass extends VarClass {
	treeIcon = 'symbol-constant'
	constructor() {
		super(...arguments)
		this.Visibility = 'public'
	}
}