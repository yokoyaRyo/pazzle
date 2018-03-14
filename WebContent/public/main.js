function Rank() {
	var menuElement = document.getElementById('menu');
	menuElement.style.display='none';
	document.getElementById('rankPage').style.display='';
	$.ajax({
		type: 'GET',
	    dataType: 'json',
	    url: '../PazzleServlet',
	    success: function (data) {
	    	console.log("読み込み成功");
	    	console.log(data);

	    	var rankInfo = data;
	    	var tableTag = document.getElementById('rankTable');
	    	tableTag.setAttribute('style', 'margin: 0 auto;');
	    	var count = data.length;
	    	for(let i = 0; i < count; i++) {

		    	var record = rankInfo[i];
		    	console.log(record.player);

		    	var trTag = CreateElement('tr', 'record' + (i + 1));
	    		AddElement(tableTag, trTag);

	    		var rankTag = CreateElement('td', 'rank' + (i + 1));
    			AddElement(trTag, rankTag);
    			rankTag.textContent = i+1+'位';

    			var scoreTag = CreateElement('td', 'score' + (i + 1));
    			AddElement(trTag, scoreTag);
    			scoreTag.textContent = record.score + '点';

    			var playerTag = CreateElement('td', 'player' + (i + 1));
    			AddElement(trTag, playerTag);
    			playerTag.textContent = record.player;
    			playerTag.setAttribute('data-player', record.player);
	    	}
	    },
	    error: function (data) {
	        console.log("読み込み失敗");
	    }
	});
}

function ReturnMenuFromRankPage() {
	document.getElementById('rankPage').style.display='none';
	var rankTable = document.getElementById('rankTable');
	while (rankTable.firstChild) {
		rankTable.removeChild(rankTable.firstChild);
	}
	document.getElementById('menu').style.display='';
}

function StartGame() {
	var menuElement = document.getElementById('menu');

	var thisElement = event.target;
	var line = thisElement.getAttribute('data-line');
	var column = thisElement.getAttribute('data-column');
	var body = document.body;

	menuElement.setAttribute('style', 'display: none');

	CreateField(line, column, body);
	SetBlock('gameTable', line, column, 2);
	SetBlock('gameTable', line, column, 2);

	let colorArray = ['pink','red','perple','blue','liteBlue','green','yellow'];
	colorArray = ['#FF7FFF','#FF7F7F','#BF7FFF','#7F7FFF','#7FFFBF','#7FFF7F','#FFFF7F'];
	var colorNumber = Math.floor(Math.random() * colorArray.length);

    document.getElementById('updateColor').setAttribute('data-tableColor', colorNumber);
    SetTableColor(line, column, colorNumber);
	document.getElementById('updateColor').setAttribute('style', 'background-color: ' + colorArray[colorNumber] + ';');
}

function CreateField(line, column, body) {
	var gameElement = document.getElementById('gameElement');
	gameElement.removeAttribute('style');
	gameElement.setAttribute('style', 'text-align: center;	');

	var table = document.getElementById('table');
	var game = CreateElement('table', 'gameTable');
	game.setAttribute('border', '1');
	game.setAttribute('width', '400px');
	game.setAttribute('height', '400px');
	game.setAttribute('style', 'margin: 0 auto;');
	game.setAttribute('data-line', line);
	game.setAttribute('data-column', column);
	AddElement(table, game);
	CreateGameTable(game, game.getAttribute('id'), line, column);
	TableSize('gameTable', column, line);

	var operation = CreateElement('table', 'operationTable');
	AddElement(gameElement, operation);
	CreateGameTable(operation, operation.getAttribute('id'), 3, 3);

	operation.setAttribute('style', 'display: none');
	CreateOperationButton(operation.getAttribute('id'), 1, 2, 'Move()', '↑', line, column, 'up');
	CreateOperationButton(operation.getAttribute('id'), 2, 1, 'Move()', '←', line, column, 'left');
	CreateOperationButton(operation.getAttribute('id'), 2, 3, 'Move()', '→', line, column, 'right');
	CreateOperationButton(operation.getAttribute('id'), 3, 2, 'Move()', '↓', line, column, 'under');
}

function CreateGameTable(table, idName, vertical, side) {
	for (let i = 0; i < vertical; i++) {
		var trTag = CreateElement('tr', idName + 'Side' + (i + 1));
		AddElement(table, trTag);
		for (let j = 0; j < side; j++) {
			var tdTag = CreateElement('td', idName + 'Side' + (i + 1) + idName + 'Vertical' + (j + 1));
			AddElement(trTag, tdTag);
		}
	}
}

function TableSize(idName, vertical, side) {
	var tdTag;
	for (let i = 0; i < vertical; i++) {
		for (let j = 0; j < side; j++) {
			tdTag = document.getElementById(idName + 'Side' + (i + 1) + idName + 'Vertical' + (j + 1));
			tdTag.setAttribute('width', '60px');
			tdTag.setAttribute('height', '60px');
		}
	}
}

function CreateOperationButton(id, line, column, func, ope, lineLength, columnLength, move) {
	var tdTag = GetTableTd(id, line, column);
	tdTag.setAttribute('onclick', func);
	tdTag.setAttribute('data-line', lineLength);
	tdTag.setAttribute('data-column', columnLength);
	tdTag.setAttribute('data-move', move);
	var operation = CreateTextNode(ope);
	AddElement(tdTag, operation);
}

function GetTableTd(idName, line, column) {
	var tdTag = document.getElementById(idName + 'Side' + line + idName + 'Vertical' + column);
	return tdTag;
}

function SetBlock(id, line, column, number) {
	var blockArray = CreateBlockArray(id, line, column);
	var blockId = SelectRandomTd(blockArray);
	CreateBlock(blockId, number);
}

function CreateBlockArray(idName, line, column) {
	let countLine;
	let countColumn;
	let blockArray = [];
	let countArray = 0;
	for (countLine = 1; countLine <= line; countLine++) {
		for (countColumn = 1; countColumn <= column; countColumn++) {
			let id = idName + 'Side' + countLine + idName + 'Vertical'	+ countColumn;
			let tdTag = document.getElementById(id);
			if (tdTag.getAttribute('data-block') == null) {
				blockArray[countArray] = id;
				countArray++;
			}
		}
	}
	return blockArray;
}

function SelectRandomTd(blockArray) {
	var block = blockArray[Math.floor(Math.random() * blockArray.length)];
	return block;
}

function CreateBlock(id, number) {
	var tdTag = document.getElementById(id);
	tdTag.setAttribute('data-block', number);
	var block = CreateElement('div', 'block' + id);
	var numberNode = CreateTextNode(number);
	SetColor(block, number);
	AddElement(tdTag, block);
	AddElement(block, numberNode);
}

function SetColor(block, number) {
	var color = 'block';

	block.setAttribute('style', 'color: ' + color);
	block.setAttribute('align', 'center');
	block.setAttribute('data-num', number);
}

function SetTableColor(side, vertical, colorFlg) {
	for (let i = 0; i < vertical; i++) {
		for (let j = 0; j < side; j++) {
			var tdTag = document.getElementById('gameTable' + 'Side' + (i + 1) + 'gameTable' + 'Vertical' + (j + 1));
			SetTdColor(tdTag, 'td', colorFlg);
			if('block' + tdTag){
				tdTag.setAttribute('style', 'font-size: 26pt;');
			}
		}
	}
}

function SetTdColor(td, flg, colorFlg) {

	var colorList;
	var num = td.getAttribute('data-block');
	var color;

	let colorArray = ['pink','red','perple','blue','liteBlue','green','yellow'];
	colorFlg = colorArray[colorFlg];

    if(flg == 'td') {
	  td.setAttribute('data-color', colorFlg);
	}

	if(flg == 'number') {

	}

	switch(colorFlg) {
	case 'pink':
	//ピンク
	colorList = {
    null:function() {color = 'white'},
	"2":function() {color = "#FFD5EC";},
	"4":function() {color = "#FFBEDA";},
	"8":function() {color = "#FFABCE";},
	"16":function() {color = "#FF97C2";},
	"32":function() {color = "#FF82B2";},
	"64":function() {color = "#FF69A3";},
	"128":function() {color = "#FF5192";},
	"256":function() {color = "#FF367F";},
	"512":function() {color = "#FF1A6F";},
	"1024":function() {color = "#FF0461";},
	"2048":function() {color = "#FF0461";},
	"4096":function() {color = "#FF0461";},
	"8192":function() {color = "#FF0461";},
	"16384":function() {color = "#FF0461";},
	"32768":function() {color = "#FF0461";}
	};
	break;

	case 'red':
	//赤
	colorList = {
    null:function() {color = 'white'},
	"2":function() {color = "#FFDBC9";},
	"4":function() {color = "#FFC7AF";},
	"8":function() {color = "#FFAD90";},
	"16":function() {color = "#FF9872";},
	"32":function() {color = "#FF8856";},
	"64":function() {color = "#FF773E";},
	"128":function() {color = "#FF6928";},
	"256":function() {color = "#FF5F17";},
	"512":function() {color = "#FF570D";},
	"1024":function() {color = "#FF4F02";},
	"2048":function() {color = "#FF4F03";},
	"4096":function() {color = "#FF4F04";},
	"8192":function() {color = "#FF4F05";},
	"16384":function() {color = "#FF4F06";},
	"32768":function() {color = "#FF4F07";}
	};
	break;

	case 'perple':
	//紫
	colorList = {
    null:function() {color = 'white'},
	"2":function() {color = "#EAD9FF";},
	"4":function() {color = "#DCC2FF";},
	"8":function() {color = "#D0B0FF";},
	"16":function() {color = "#C299FF";},
	"32":function() {color = "#B384FF";},
	"64":function() {color = "#A16EFF";},
	"128":function() {color = "#9057FF";},
	"256":function() {color = "#7B3CFF";},
	"512":function() {color = "#6927FF";},
	"1024":function() {color = "#5507FF";},
	"2048":function() {color = "#5507FF";},
	"4096":function() {color = "#5507FF";},
	"8192":function() {color = "#5507FF";},
	"16384":function() {color = "#5507FF";},
	"32768":function() {color = "#5507FF";}
	};
	break;

	case 'blue':
	//青
	colorList = {
    null:function() {color = 'white'},
	"2":function() {color = "#D9E5FF";},
	"4":function() {color = "#BAD3FF";},
	"8":function() {color = "#A4C6FF";},
	"16":function() {color = "#8EB8FF";},
	"32":function() {color = "#75A9FF";},
	"64":function() {color = "#5D99FF";},
	"128":function() {color = "#4689FF";},
	"256":function() {color = "#2C7CFF";},
	"512":function() {color = "#136FFF";},
	"1024":function() {color = "#005FFF";},
	"2048":function() {color = "#005FFF";},
	"4096":function() {color = "#005FFF";},
	"8192":function() {color = "#005FFF";},
	"16384":function() {color = "#005FFF";},
	"32768":function() {color = "#005FFF";}
	};
	break;

	case 'litebleu':
	//水色
	colorList = {
    null:function() {color = 'white'},
	"2":function() {color = "#CEF9DC";},
	"4":function() {color = "#B1F9D0";},
	"8":function() {color = "#9BF9CC";},
	"16":function() {color = "#86F9C5";},
	"32":function() {color = "#77F9C3";},
	"64":function() {color = "#64F9C1";},
	"128":function() {color = "#4DF9B9";},
	"256":function() {color = "#30F9B2";},
	"512":function() {color = "#17F9AD";},
	"1024":function() {color = "#00F9A9";},
	"2048":function() {color = "#00F9A9";},
	"4096":function() {color = "#00F9A9";},
	"8192":function() {color = "#00F9A9";},
	"16384":function() {color = "#00F9A9";},
	"32768":function() {color = "#00F9A9";}
	};
	break;

	case 'green':
	//緑
	colorList = {
    null:function() {color = 'white'},
	"2":function() {color = "#E6FFE9";},
	"4":function() {color = "#CBFFD3";},
	"8":function() {color = "#AEFFBD";},
	"16":function() {color = "#93FFAB";},
	"32":function() {color = "#78FF94";},
	"64":function() {color = "#5BFF7F";},
	"128":function() {color = "#43FF6B";},
	"256":function() {color = "#2DFF57";},
	"512":function() {color = "#1BFF4A";},
	"1024":function() {color = "#00FF3B";},
	"2048":function() {color = "#00FF3B";},
	"4096":function() {color = "#00FF3B";},
	"8192":function() {color = "#00FF3B";},
	"16384":function() {color = "#00FF3B";},
	"32768":function() {color = "#00FF3B";}
	};
	break;

	case 'yellow':
	//黄色
	colorList = {
    null:function() {color = 'white'},
	"2":function() {color = "#F3FFD8";},
	"4":function() {color = "#EDFFBE";},
	"8":function() {color = "#E9FFA5";},
	"16":function() {color = "#E4FF8D";},
	"32":function() {color = "#DBFF71";},
	"64":function() {color = "#D6FF58";},
	"128":function() {color = "#D0FF43";},
	"256":function() {color = "#C9FF2F";},
	"512":function() {color = "#BEFF15";},
	"1024":function() {color = "#B6FF01";},
	"2048":function() {color = "#B6FF01";},
	"4096":function() {color = "#B6FF01";},
	"8192":function() {color = "#B6FF01";},
	"16384":function() {color = "#B6FF01";},
	"32768":function() {color = "#B6FF01";}
	};
	break;
	}
	var prosece = colorList[num];
	prosece();

	if(flg == 'td') {
		td.setAttribute('bgcolor', color);
	}
}

function ReturnMenuFromGame() {
	var returnElement = document.getElementById('return');
	var insertFlg = returnElement.getAttribute('data-insertflg');
	if(insertFlg == 'true') {
		returnElement.removeAttribute('data-insertflg')
		returnElement.setAttribute('data-insertflg', '');
		InsertRank();
	}

	document.getElementById('gameElement').setAttribute('style', 'display: none');
	DeleteElement(document.getElementById('table'), document.getElementById('gameTable'));
	DeleteElement(document.getElementById('gameElement'), document.getElementById('operationTable'));

	var ten = document.getElementById('ten');
	ten.setAttribute('data-num', 4);
	var node = CreateTextNode(4);
	ten.removeChild(ten.firstChild);
	AddElement(ten, node);

	var gameOver = document.getElementById('gameOver');
	var gameover = document.getElementById('gameover');
	if(gameOver) {
		DeleteElement(gameover, gameOver);
		DeleteElement(gameover, document.getElementById('inputPlayer'));
		DeleteElement(gameover, document.getElementById('form'));
	}
	document.getElementById('menu').setAttribute('style', 'text-align: center;');
	return;
}

function InsertRank() {

	var num = document.getElementById('ten').getAttribute('data-num');
	var player = document.forms.form.textBox.value;
	console.log('得点：' + num + ' プレイヤー：' + player);
	$.ajax({
	type: 'POST',
	data: {'num': num, 'player': player},
    url: '../PazzleServlet',
    dataType: 'json',
    success: function (data) {
    	console.log("読み込み成功");
    },
    error: function () {
        console.log("読み込み失敗");
    }
    });

//	ReturnMenuFromGame();
}

function updateColor() {
	var updateColor = document.getElementById('updateColor');
	var line = document.getElementById('gameTable').getAttribute('data-line');
	var column = document.getElementById('gameTable').getAttribute('data-column');
	let colorArray = ['#FF7FFF','#FF7F7F','#BF7FFF','#7F7FFF','#7FFFBF','#7FFF7F','#FFFF7F'];
	var colorNumber = updateColor.getAttribute('data-tablecolor');
	colorNumber = parseInt(colorNumber) + 1;
	if(colorNumber == 7) {
		colorNumber = 0;
	}

	updateColor.setAttribute('data-tablecolor', colorNumber);
	SetTableColor(line, column, colorNumber);
	updateColor.setAttribute('style', 'background-color: ' + colorArray[colorNumber] + ';');
}

function GameOver(flag, line, column) {
	if(flag == (line*column)) {

		document.getElementById('return').removeAttribute('data-insertflg');
		document.getElementById('return').setAttribute('data-insertflg', 'true');

		var gameOver = CreateElement('div', 'gameOver');
		var text = CreateTextNode('GAMEOVER');
		AddElement(gameOver, text);
		AddElement(document.getElementById('gameover'), gameOver);
		gameOver.setAttribute('style', 'font-size: 26pt; margin: 0 auto; width: 200px');

		var popup = CreateElement('div', 'inputPlayer');
		text = CreateTextNode('名前を入力してください');
		AddElement(popup, text);
		AddElement(gameover, popup);
		popup.setAttribute('style', 'margin: 0 auto; width: 200px');

		var form = CreateElement('form', 'form');
		var textBox = CreateElement('input', 'textBox');
		textBox.setAttribute('type', 'text');
		AddElement(gameover, form);
		AddElement(form, textBox);
		form.setAttribute('style', 'margin: 0 auto; width: 200px');
		textBox.setAttribute('style', 'margin: 0 auto; width: 200px');
	}
}

