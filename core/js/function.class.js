class FunctionClass extends CommonClass {
	treeIcon = 'symbol-method'
	constructor(options = {}) {
		super(...arguments)
		this.name = ''
		this.inputs = [new FunctionInputClass]
		this.output = new FunctionOutputClass()
		this.description = new DescriptionClass
		this.code = null
		Object.assign(this,options)
	}
}

class FunctionInputClass extends CommonClass {
	constructor() {
		super(...arguments)
		this.name = ''
		this.dataType = new DataTypeClass
		this.defult = new VarClass
		this.description = new DescriptionClass
		this.possible_values = [new VarClass]
	}
}

class FunctionOutputClass extends CommonClass {
	constructor() {
		super(...arguments)
		this.name = ''
		this.dataType = new DataTypeClass
		this.description = new DescriptionClass
		this.possible_values = [new VarClass]
	}
}

