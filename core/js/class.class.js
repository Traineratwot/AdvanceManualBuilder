
class ClassClass extends CommonClass {
	constructor() {
		super(...arguments)
		this.description = new DescriptionClass
		this.vars = [new ClassVarsClass]
		this.constants = [new ClassConstantsClass]
		this.methods = [new methodsClass]
		this.code = null
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
	constructor() {
		super(...arguments)
		this.Visibility = 'public'
	}
}