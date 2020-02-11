<!DOCTYPE html>
<html lang="en">

<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<link rel="stylesheet" href="css/main.css">
	<link rel="stylesheet" href="css/input.css">
	<link href="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css" rel="stylesheet" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tonsky/FiraCode@1.207/distr/fira_code.css">
	<script src="https://use.fontawesome.com/releases/v5.12.1/js/all.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/showdown@1.9.1/dist/showdown.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js"></script>
</head>

<body>
	<div id="tree" class="tree-panel"> </div>
	<div id="work" class="work-panel">
		<header>
			<h1>JavaScript Library</h1>
		</header>
		<div class="form">
			<table>
				<tr>
					<td style="width: 5em;">
						<select style="width: 5em;" class="js-example-basic-single" name="select_object"
							id="select_object">
							<option value="function">ƒ(x)</option>
							<option value="class">Class</option>
							<option value="const">Const</option>
							<option value="var">Var</option>
						</select>
					</td>
					<td><input type="text" id="name_object" placeholder="Name"></td>
					<td><button id="save_object"><i class="fas fa-save"></i></button></td>
				</tr>
				<tr>
					<td colspan="3">
						<input type="text" id="ShortDiscription" placeholder="Short discription"><br>
						<textarea type="text" id="LongDiscription" rows="3" placeholder="Long discription"></textarea>
					</td>
				</tr>
			</table>
			<table class="contructor"></table>
		</div>
	</div>
	<div id="prev" class="prev-panel"> </div>

	<script src="js/classes/JsLib.js"></script>
	<script>
		var Project = {};
		$.get("../../BD/Projects.json", '',
			function (data, textStatus, jqXHR) {
				Project = data['rows']["<?=$_GET['ProjectId']?>"]
			},
			"json"
		);


		var ThisNewObject;
		$(document).ready(function () {
			// $('.js-example-basic-single').select2();
			$("#save_object").on("click", (event) => {
				switch ($("#select_object").val()) {
					case "function":
						ThisNewObject = new _function;
						break;
					case "class":
						ThisNewObject = new _class;
						break;
					case "const":
						ThisNewObject = new _const;
						break;
					case "var":
						ThisNewObject = new _var;
						break;

					default:
						ThisNewObject = "def"
						break;
				}
				$("#select_object").attr("disabled", "")
			})
		});
		var FileText
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
		convert()
		$("#work").on("keydown", convert())

	</script>
</body>

</html>