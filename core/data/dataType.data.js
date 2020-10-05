var dataTypes = {}
dataTypes.toArray = (arr = []) => {
	for (let element in dataTypes) {
		let e = dataTypes[element]
		if (e instanceof CLASSES.DataTypeClass) {
			arr.push(`${e.subName} <small>(${e.preview})</small>`)
		}
	}
	return arr
}
dataTypes.json = new CLASSES.DataTypeClass({ name: 'string', subName: 'json', preview: '{a1:0}' })
dataTypes.xml = new CLASSES.DataTypeClass({ name: 'string', subName: 'xml', preview: '<element item="">content</element>' })
dataTypes.string = new CLASSES.DataTypeClass({ name: 'string', subName: 'string', preview: 'text' })
dataTypes.img = new CLASSES.DataTypeClass({ name: 'string', subName: 'img', preview: 'https://placehold.it/30x30' })
dataTypes.url = new CLASSES.DataTypeClass({ name: 'string', subName: 'url', preview: 'https://domain' })
dataTypes.object = new CLASSES.DataTypeClass({ name: 'object', subName: 'object', preview: '{}' })
dataTypes.array = new CLASSES.DataTypeClass({ name: 'array', subName: 'array', preview: '[]' })
dataTypes.int = new CLASSES.DataTypeClass({ name: 'number', subName: 'int', preview: '1' })
dataTypes.float = new CLASSES.DataTypeClass({ name: 'number', subName: 'float', preview: '0.5' })
dataTypes.timestamp = new CLASSES.DataTypeClass({ name: 'number', subName: 'timestamp', preview: '1601647148' })
dataTypes.resource = new CLASSES.DataTypeClass({ name: 'resource', subName: 'resource' })