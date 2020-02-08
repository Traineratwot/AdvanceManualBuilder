class install {

	constructor(Types, Shematik) {
		this.Types = Types;
		this.Shematik = Shematik;
		this.body = $(`<div class="instalition-main" style="display:none;">`).appendTo("body").fadeIn();
		this.body = $(`<table>`).appendTo(this.body);
		this.CurrentStep = 0;
		this.step1()
	}
	step1(){

	}
}
