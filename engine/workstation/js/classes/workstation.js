var Project, Shematik, Types, Properties = {};
var ThisNewObject, CreatChunkMenu, FileText;
var _Projects, _Shematik, _Types, _Properties = false
$.get("../../BD/Projects.json", '',
	function (data) {
		Project = data['rows'][new URLSearchParams(window.location.search).get('ProjectId')]
		fit_text($(`<h1 class="fit_text">${Project.name}</h1>`).appendTo("#tree header"))
		_Projects = true;
	},
	"json"
);
$.get(`../../BD/${new URLSearchParams(window.location.search).get('ProjectId')}.json`, '',
	function (data) {
		Properties = data;
		_Properties = true;
	},
	"json"
);
$.get("json/Shematik.json", '',
	function (data) {
		Shematik = data;
		_Shematik = true;
	},
	"json"
);
$.get("json/Types.json", '',
	function (data) {
		Types = data;
		_Types = true;
	},
	"json"
);

function initSCM() {
	var menu = [];
	Types.ChunksType[Project.PorjectData.Projectype].forEach(element => {
		menu.push({
			item: element,
			function: (e, self, AnyValue) => {
				ThisNewObject = CreateClass(element,AnyValue)
			}
		})
	});
	CreatChunkMenu = new SCM(menu);
}

function renderTree() {
	
	$("#tree #content").html("");
	$('#tree #content')
	.on("changed.jstree", function (e, data) {
		if (data.selected.length) {
			var node = data.instance.get_node(data.selected[0])
			var id = data.instance.get_node(data.selected[0]).original.id
			console.log(node);
			if (id <= 0) {
				id = Math.abs(id);
				CreatChunkMenu.show(null,id);
			}else{
				parent = node.parent
				if (!parent || parent == "#") {
					parent = 0
				}
				ThisNewObject = CreateClass(Properties.chunks[id].ClassType,parent,Properties.chunks[id])
			}
			//alert('The selected node is: ' + data.instance.get_node(data.selected[0]).id);
		}
	})
	.jstree({
		'core': {
			'multiple': false,
			'data': Properties.tree
		}
	});
}


function Preview() {
	if (ThisNewObject) {
		SEND = {}
		SEND.data = ThisNewObject.export()
		SEND.project = Project
		$.ajax({
			type: "POST",
			url: "../../engine/core/addchunks.php",
			data: SEND,
			dataType: "text",
			success: function (response) {
				convert(response);

			}
		});
	}
}
function save(){
	if (ThisNewObject) {
		SEND = {}
		SEND.parent = ThisNewObject.Parent
		SEND.data = ThisNewObject.export()
		SEND.project = Project
		SEND.save = true
		$.ajax({
			type: "POST",
			url: "../../engine/core/addchunks.php",
			data: SEND,
			dataType: "text",
			success: function (response) {
				convert(response);

			}
		});
	}
}
var whiletrue = true;
function prev(stop = false) {
	if (!stop && whiletrue) {
		whiletrue = setInterval(() => {
			Preview()
		}, 1000);
	} else {
		clearInterval(whiletrue);
		whiletrue = false;
		setTimeout(() => {
			document.querySelectorAll('pre code').forEach((block) => {
				hljs.highlightBlock(block);
			});
		}, 100);
	}
}
var converter = new showdown.Converter();
function convert(text) {
	html = converter.makeHtml(text);
	$("#prev").html(html);
}

$(document).ready(function () {
	var iload = setInterval(() => {
		if (_Projects === true && _Shematik === true && _Types === true && _Properties === true) {
			clearInterval(iload);
			renderTree()
			$(window).on('resize', function () {
				fit_text($('.fit_text'))
			});
			convert();
			initSCM();
			$(".NewChunks").on("click", function (event) {
				CreatChunkMenu.show(event);
			});
		}
	}, 10);
});
