var Project, Shematik, Types, Properties = {};
var ThisNewObject, CreatChunkMenu, FileText;
var _Projects, _Shematik, _Types, _Propertiesб, TreeFirstRender = false
$(document).ready(function () {
	MassLoad()
});
function MassLoad() {
	_Projects, _Shematik, _Types, _Properties = false
	Project, Shematik, Types, Properties = {};
	$.get("../../BD/Projects.json", '',
		function (data) {
			Project = data['rows'][new URLSearchParams(window.location.search).get('ProjectId')]
			$("#tree header").html("");
			fit_text($(`<h1 class="fit_text">${Project.name}</h1>`).appendTo("#tree header"))
				.on('click', () => {
					var SEND = {}
					SEND.data = Project
					SEND.prev = 1
					$.ajax({
						type: "POST",
						url: "../../engine/core/CreateProject.php",
						data: SEND,
						dataType: "text",
						success: function (response) {
							convert(response);
							document.querySelectorAll('pre code').forEach((block) => {
								hljs.highlightBlock(block);
							});
						}
					});
				});
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
}


function initSCM() {
	var menu = [];
	Types.ChunksType[Project.PorjectData.Projectype].forEach(element => {
		menu.push({
			item: element,
			function: (e, self, AnyValue) => {
				ThisNewObject = CreateClass(element, AnyValue)
			}
		})
	});
	CreatChunkMenu = new SCM(menu);
}

function renderTree() {
	if (TreeFirstRender) {
		$('#tree #content').jstree(true).settings.core.data = Properties.tree;
		$('#tree #content').jstree(true).redraw();
		$('#tree #content').jstree(true).refresh();
	} else {
		TreeFirstRender = true;
		$("#tree #content").html("");
		$('#tree #content').jstree({
			'core': {
				'multiple': false,
				'data': Properties.tree
			}
		});
		$('#tree #content').on("changed.jstree", function (e, data) {
			if (data.selected.length) {
				var node = data.instance.get_node(data.selected[0])
				var id = data.instance.get_node(data.selected[0]).original.id
				parent = node.parent
				if (!parent || parent == "#") {
					parent = 0
				}
				//console.log(node);
				if (id <= 0) {
					id = Math.abs(id);
					CreatChunkMenu.show(null, [parent, -1]);
					Preview()
				} else {
					ThisNewObject = CreateClass(Properties.chunks[id].ClassType, [parent, id], Properties.chunks[id])
					Preview()
				}
				//alert('The selected node is: ' + data.instance.get_node(data.selected[0]).id);
			}
		})
	}
}

function Preview() {
	if (ThisNewObject) {
		SEND = {}
		SEND.data = ThisNewObject.export()
		SEND.project = Project
		$.ajax({
			type: "POST",
			url: "../../engine/core/addChunks.php",
			data: SEND,
			dataType: "text",
			success: function (response) {
				convert(response);
				document.querySelectorAll('pre code').forEach((block) => {
					hljs.highlightBlock(block);
				});
			}
		});
	}
}
function save() {
	if (ThisNewObject) {
		SEND = {}
		SEND.parent = ThisNewObject.Parent
		SEND.data = ThisNewObject.export()
		SEND.project = Project
		SEND.id = ThisNewObject.id || -1
		SEND.save = true
		$.ajax({
			type: "POST",
			url: "../../engine/core/addChunks.php",
			data: SEND,
			dataType: "text",
			success: function (response) {
				convert(response);
				document.querySelectorAll('pre code').forEach((block) => {
					hljs.highlightBlock(block);
				});
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
		setTimeout(() => {
			whiletrue = true
		}, 900);
	}
}
var converter = new showdown.Converter();
function convert(text) {
	html = converter.makeHtml(text);
	$("#prev").html(html);
}



//# sourceMappingURL=workstation.js.map

//# sourceMappingURL=workstation.js.map
