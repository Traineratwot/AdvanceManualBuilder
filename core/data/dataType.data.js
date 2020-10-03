var dataTypes = {}
dataTypes.toArray = function(arr = []){
	for(let e of this) {
		if(e instanceof DataTypeClass) {
			arr.push(`${e.subName} <small>(${e.preview})</small>`)
		}
	}
	return arr
}
dataTypes.json      = new DataTypeClass({name: 'string'  , subName: 'json'      , preview: '{a1:0}'})
dataTypes.xml       = new DataTypeClass({name: 'string'  , subName: 'xml'       , preview: '<element item="">content</element>'})
dataTypes.string    = new DataTypeClass({name: 'string'  , subName: 'string'    , preview: 'text'})
dataTypes.img       = new DataTypeClass({name: 'string'  , subName: 'img'       , preview: 'https://placehold.it/30x30'})
dataTypes.url       = new DataTypeClass({name: 'string'  , subName: 'url'       , preview: 'https://domain'})
dataTypes.object    = new DataTypeClass({name: 'object'  , subName: 'object'    , preview: '{}'})
dataTypes.array     = new DataTypeClass({name: 'array'   , subName: 'array'     , preview: '[]'})
dataTypes.int       = new DataTypeClass({name: 'number'  , subName: 'int'       , preview: '1'})
dataTypes.float     = new DataTypeClass({name: 'number'  , subName: 'float'     , preview: '0.5'})
dataTypes.timestamp = new DataTypeClass({name: 'number'  , subName: 'timestamp' , preview: '1601647148'})
dataTypes.resource  = new DataTypeClass({name: 'resource', subName: 'resource'})