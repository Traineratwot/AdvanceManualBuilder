dataTypes.toArray = (arr = {}) => {
	for(let element in dataTypes) {
		let e = dataTypes[element]
		if(e instanceof CLASSES.DataTypeClass) {
			arr[element] = (`${locale._(e.subName)} <small class="dataSet">(${e.name})</small>`)
		}
	}
	return arr
}
dataTypes.mixed = new CLASSES.DataTypeClass({name: 'mixed', subName: 'mixed'})
dataTypes.string = new CLASSES.DataTypeClass({name: 'string', subName: 'string', preview: 'text'})
dataTypes.int = new CLASSES.DataTypeClass({name: 'number', subName: 'int', preview: '1'})
dataTypes.boolean = new CLASSES.DataTypeClass({name: 'boolean', subName: 'boolean', preview: 'true'})
dataTypes.float = new CLASSES.DataTypeClass({name: 'number', subName: 'float', preview: '0.5'})
dataTypes.object = new CLASSES.DataTypeClass({name: 'object', subName: 'object', preview: '{}'})
dataTypes.array = new CLASSES.DataTypeClass({name: 'array', subName: 'array', preview: '[]'})
dataTypes.timestamp = new CLASSES.DataTypeClass({name: 'number', subName: 'timestamp', preview: '1601647148'})
dataTypes.json = new CLASSES.DataTypeClass({name: 'string', subName: 'json', preview: '{a1:0}'})
dataTypes.img = new CLASSES.DataTypeClass({name: 'string', subName: 'img', preview: 'https://placehold.it/30x30'})
dataTypes.url = new CLASSES.DataTypeClass({name: 'string', subName: 'url', preview: 'https://domain'})
dataTypes.resource = new CLASSES.DataTypeClass({name: 'resource', subName: 'resource'})
dataTypes.xml = new CLASSES.DataTypeClass({
	name: 'string',
	subName: 'xml',
	preview: '<element item="">content</element>'
})
