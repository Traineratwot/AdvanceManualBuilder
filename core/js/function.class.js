
CLASSES.FunctionClass = class FunctionClass extends CLASSES.CommonClass {
	treeIcon = 'symbol-method'
	availableChildrenClass = [
		'FunctionInputClass',
		'FunctionOutputClass',
		'DescriptionClass',
		'CodePreviewClass',
	]
	constructor(options = {}) {
		super(...arguments)
		this.name = ''
		this.inputs = [new CLASSES.FunctionInputClass]
		this.output = new CLASSES.FunctionOutputClass()
		this.description = new CLASSES.DescriptionClass
		this.code = new CLASSES.CodePreviewClass
		Object.assign(this, options)
	}
}


CLASSES.FunctionInputClass = class FunctionInputClass extends CLASSES.CommonClass {
	constructor() {
		super(...arguments)
		this.name = ''
		this.dataType = new CLASSES.DataTypeClass
		this.defult = new CLASSES.VarClass
		this.description = new CLASSES.DescriptionClass
		this.possible_values = [new CLASSES.VarClass]
	}
}


CLASSES.FunctionOutputClass = class FunctionOutputClass extends CLASSES.CommonClass {
	constructor() {
		super(...arguments)
		this.name = ''
		this.dataType = new CLASSES.DataTypeClass
		this.description = new CLASSES.DescriptionClass
		this.possible_values = [new CLASSES.VarClass]
	}
}

