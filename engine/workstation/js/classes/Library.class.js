class _object {
	constructor(name, ShortDisc = null, LongDisc = null) {
		this.SELECTOR = $(".contructor");
		this.SELECTOR.html("");
		this.arguments = [...arguments];
		this.name = name;
		this.ShortDisc = ShortDisc;
		this.LongDisc = LongDisc;
		this.types = `
			<option value="String">String</option>
			<option value="Number">Number</option>
			<option value="Boolean">Boolean</option>
			<option value="Function">Function</option>
			<option value="Object">Object</option>
			<option value="Array">Array</option>
			<option value="Any">Any</option>
		`;
		let args = [...arguments];
		if (args.length >= 3) {
			args.shift();
			args.shift();
			args.shift();
			this.__constructor(...args);
		} else {
			this.__constructor();
		}
	}

	__constructor() {}

	nextLine(to = this.body) {
		this.currentP = $(`<p>`).appendTo(to);
		this.structuer.push(this.currentP);
		return this.currentP;
	}
}

class _function extends _object {
	__constructor() {
		// this.param = [];
		// this.addParam()
	}
	addParam() {
		// var Itr 	= $(`<tr>`).appendTo(this.SELECTOR);
		// var Itd 	= $(`<td>`).appendTo(Itr);
		// var Iselect	= $(`<select name="type">${this.types}</select>`).appendTo(Itd)
		// 	Itd 	= $(`<td>`).appendTo(Itr);
		// var Iparam	= $(`<input type="text" name="param" placeholder="Param name">`).appendTo(Itd)
		// 	Itd 	= $(`<td>`).appendTo(Itr);
		// var Iadd	= $(`<button><i class="fas fa-plus"></i></button>`).appendTo(Itd)
		// 	Itr 	= $(`<tr>`).appendTo(this.SELECTOR);
		// 	Itd 	= $(`<td colspan="3">`).appendTo(Itr);
		// var Idisc	= $(`<input type="text" name="discription" placeholder="Discription">`).appendTo(Itd)
		// this.param.push({
		// 	Iparam,
		// 	Iselect,
		// 	Idisc,
		// })
	}
	addReturn() {}
}
class _class extends _object {
	__constructor() {}
}
class _const extends _object {
	__constructor() {}
}
class _var extends _object {
	__constructor() {}
}

var Maxies = {
	function: class extends _function {},
	class: class extends _class {},
	const: class extends _const {},
	var: class extends _var {},
};

function CreateClass(Type) {
	return new Maxies[Type]()
}