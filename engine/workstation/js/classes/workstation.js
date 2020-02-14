var Project, Shematik, Types,Properties = {};
var ThisNewObject, CreatChunkMenu, FileText;
var _Projects, _Shematik, _Types,_Properties = false
$.get("../../BD/Projects.json", '',
	function (data, textStatus, jqXHR) {
		Project = data['rows'][new URLSearchParams(window.location.search).get('ProjectId')]
		fit_text($(`<h1 class="fit_text">${Project.name}</h1>`).appendTo("#tree header"))
		_Projects = true;
	},
	"json"
);
$.get(`../../BD/${new URLSearchParams(window.location.search).get('ProjectId')}.json`, '',
	function (data, textStatus, jqXHR) {
		Properties = data;
		_Properties = true;
	},
	"json"
);
$.get("json/Shematik.json", '',
	function (data, textStatus, jqXHR) {
		Shematik = data;
		_Shematik = true;
	},
	"json"
);
$.get("json/Types.json", '',
	function (data, textStatus, jqXHR) {
		Types = data;
		_Types = true;
	},
	"json"
);

function initSCM() {
	var menu = [];
	Types.chuncsType[Project.PorjectData.Projectype].forEach(element => {
		menu.push({
			item: element,
			function: (e, self, AnyValue) => {
				ThisNewObject = CreateClass(element)
			}
		})
	});
	CreatChunkMenu = new SCM(menu);
}

function renderTree() {
	$("#tree #content").html("");
	var ul = $(`<ul>`).appendTo("#tree #content");
	if (!Object.keys(Properties.tree).length) {
		$(`<li class="NewChuncs">➕добавить</li>`).appendTo(ul);
	}
}
function Preview() {
	if(ThisNewObject){
	SEND = {}
	SEND.data = ThisNewObject.export()
	$.ajax({
		type: "POST",
		url: "../../engine/core/addChuncks.php",
		data: SEND,
		dataType: "text",
		success: function (response) {
			convert(response);
			
		}
	});
}
}
var whiletrue
function prev(stop = false) { 
	if (!stop) {
		whiletrue = setInterval(() => {
			Preview()
		}, 1000);	
	}else{
		clearInterval(whiletrue);
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
			$(".NewChuncs").on("click", function (event) {
				CreatChunkMenu.show(event);
			});
		}
	}, 10);
});
