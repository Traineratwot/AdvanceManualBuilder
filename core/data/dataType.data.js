var dataTypes       = []
dataTypes.json      = new DataTypeClass('string'  , 'json'     , '{a1:0}');
dataTypes.xml       = new DataTypeClass('string'  , 'xml'      , '<element item="">content</element>');
dataTypes.string    = new DataTypeClass('string'  , 'string'   , 'text');
dataTypes.img   	= new DataTypeClass('string'  , 'img'      , 'https://placehold.it/30x30');
dataTypes.url   	= new DataTypeClass('string'  , 'url'      , 'https://domain');
dataTypes.object    = new DataTypeClass('object'  , 'object'   , '{}');
dataTypes.array     = new DataTypeClass('array'   , 'array'    , '[]');
dataTypes.int       = new DataTypeClass('number'  , 'int'      , '1');
dataTypes.float     = new DataTypeClass('number'  , 'float'    , '0.5');
dataTypes.timestamp = new DataTypeClass('number'  , 'timestamp', '1601647148');
dataTypes.resource  = new DataTypeClass('resource', 'resource');