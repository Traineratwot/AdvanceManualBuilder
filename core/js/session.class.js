CLASSES.SessionClass = class SessionClass{
	constructor(objects) {
		this.classKey = this.constructor.name
		Object.assign(this, objects)
		GOA.add(this)
	}

}
const session = new CLASSES.SessionClass