


var Project, Shematik, Types = {};
var ThisNewObject, CreatChunkMenu, FileText;
var _Projects, _Shematik, _Types = false
$.get("../../BD/Projects.json", '',
	function (data, textStatus, jqXHR) {
		Project = data['rows'][new URLSearchParams(window.location.search).get('ProjectId')]
		fit_text($(`<h1 class="fit_text">${Project.name}</h1>`).appendTo("#tree header"))
		_Projects = true;
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
$(".NewChuncs").on("click", function (event) {
	CreatChunkMenu.show(event);
});
//TODO depricated

// $(document).ready(function () {
// 	// $('.js-example-basic-single').select2();
// 	$("#save_object").on("click", (event) => {
// 		switch ($("#select_object").val()) {
// 			case "function":
// 				ThisNewObject = new _function;
// 				break;
// 			case "class":
// 				ThisNewObject = new _class;
// 				break;
// 			case "const":
// 				ThisNewObject = new _const;
// 				break;
// 			case "var":
// 				ThisNewObject = new _var;
// 				break;

// 			default:
// 				ThisNewObject = "def"
// 				break;
// 		}
// 		$("#select_object").attr("disabled", "")
// 	})
// });

$.ajax({
	type: "GET",
	url: "/Untitled_Document.md",
	dataType: "text",
	success: function (response) {
		FileText = response;
		convert(response)
	}
});
var converter = new showdown.Converter();
//IT IS LIVE !!!!!!!!!!!!!!!!!!!!!!!!!!
function convert(text) {
	html = converter.makeHtml(text);
	$("#prev").html(html);
}

$("#work").on("keydown", convert())



$(document).ready(function () {
	var iload = setInterval(() => {
		if (_Projects === true && _Shematik === true && _Types === true) {
			clearInterval(iload);
			$(window).on('resize', function () {
				fit_text($('.fit_text'))
			});
			convert();
			initSCM();
		}
	}, 10);
});
