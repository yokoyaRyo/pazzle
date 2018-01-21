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
	SetTableColor(line, column);
	CalcRank()
}

function SetTableColor(side, vertical) {
	for (let i = 0; i < vertical; i++) {
		for (let j = 0; j < side; j++) {
			var tdTag = document.getElementById('gameTable' + 'Side' + (i + 1) + 'gameTable' + 'Vertical' + (j + 1));
			console.log(tdTag);
			SetTdColor(tdTag);
			if('block' + tdTag){
				tdTag.setAttribute('style', 'font-size: 26pt;');
			}
		}
	}
}

function SetTdColor(td) {
	var color;
	console.log(td.getAttribute('data-block'));
	if (td.getAttribute('data-block') == 2) {
		console.log('2');
		color = 'yellow';
	}
	if (td.getAttribute('data-block') == 4) {
		color = 'gold';
	}
	if (td.getAttribute('data-block') == 8) {
		color = 'orange';
	}
	if (td.getAttribute('data-block') == 16) {
		color = 'darkorange';
	}
	if (td.getAttribute('data-block') == 32) {
		color = 'chocolate';
	}
	if (td.getAttribute('data-block') == 64) {
		color = 'red';
	}
	if (td.getAttribute('data-block') == 128) {
		color = 'violet';
	}
	if (td.getAttribute('data-block') == 256) {
		color = 'darkorchid';
	}
	if (td.getAttribute('data-block') == 512) {
		color = 'purple';
	}
	if (td.getAttribute('data-block') == 1024) {
		color = 'darkslateblue';
	}
	if (td.getAttribute('data-block') == 2048) {
		color = 'blue';
	}
	if (td.getAttribute('data-block') == 4096) {
		color = 'springgreen';
	}
	if (td.getAttribute('data-block') >= 8192) {
		color = 'lime';
	}

	td.setAttribute('bgcolor', color);
}


function ContinuGame() {
	StartGame();
}

function CreateField(line, column, body) {
//	var gameElement = CreateElement('div', 'gameElement');
//	AddElement(body, gameElement);

	var gameElement = document.getElementById('gameElement');
	gameElement.removeAttribute('style');

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
	operation.setAttribute('border', '1');
	operation.setAttribute('width', '100vh');
	operation.setAttribute('height', '100vh');
	operation.setAttribute('style', 'margin: 0 auto;');
	AddElement(gameElement, operation);
	CreateGameTable(operation, operation.getAttribute('id'), 3, 3);

	operation.setAttribute('style', 'display: none');
	CreateOperationButton(operation.getAttribute('id'), 1, 2, 'Move()', '↑', line, column, 'up');
	CreateOperationButton(operation.getAttribute('id'), 2, 1, 'Move()', '←', line, column, 'left');
	CreateOperationButton(operation.getAttribute('id'), 2, 3, 'Move()', '→', line, column, 'right');
	CreateOperationButton(operation.getAttribute('id'), 3, 2, 'Move()', '↓', line, column, 'under');

	var ten = document.getElementById('ten');
	var number = CreateTextNode(4);
	ten.setAttribute('data-num', 4);
	AddElement(ten, number);

}

function Rank() {
	var menuElement = document.getElementById('menu');
	menuElement.setAttribute('style', 'display: none');
	document.getElementById('rankPage').removeAttribute('style');

	$.ajax({
	    url: 'http://localhost:8080/Pazzle/PazzleServlet',
		type: 'GET',
	    dataType: 'json',
	    success: function (data) {
	    	console.log("読み込み成功");

	    	var tableTag = document.getElementById('rankTable');
	    	var count = data.length;
	    	for(let i = 0; i < count; i++) {

		    	var record = data.pop();
		    	console.log(record);

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

	    	}

	    },
	    error: function (data) {
	        console.log("読み込み失敗");
	    }
	});
}

function CreateButton(elementName, idName, text,  parent){
	var element = CreateElement(elementName, idName);
	var textNode = CreateTextNode(text);
	AddElement(element, textNode);
	AddElement(parent, element);

	return element;
}

function CreateElement(elementName, idName) {
	var element = document.createElement(elementName);
	element.setAttribute('id', idName);
	return element;
}

function AddElement(parent, child) {
	parent.appendChild(child);
}

function DeleteElement(parent, child) {
	parent.removeChild(child);
}

function CreateTextNode(text) {
	var element = document.createTextNode(text);
	return element;
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
	var color;
	if (number == 2) {
		color = 'chocolate';
	}
	if (number == 4) {
		color = 'red';
	}
	if (number == 8) {
		color = 'violet';
	}
	if (number == 16) {
		color = 'darkorchid';
	}
	if (number == 32) {
		color = 'purple';
	}
	if (number == 64) {
		color = 'darkslateblue';
	}
	if (number == 128) {
		color = 'blue';
	}
	if (number == 256) {
		color = 'springgreen';
	}
	if (number == 512) {
		color = 'lime';
	}
	if (number == 1024) {
		color = 'yellow';
	}
	if (number == 2048) {
		color = 'gold';
	}
	if (number == 4096) {
		color = 'orange';
	}
	if (number >= 8192) {
		color = 'darkorange';
	}


	block.setAttribute('style', 'color: ' + color);
	block.setAttribute('align', 'center');
	block.setAttribute('data-num', number);
}

function SetBlock(id, line, column, number) {
	var blockArray = CreateBlockArray(id, line, column);
	var blockId = SelectRandomTd(blockArray);
	CreateBlock(blockId, number);
}

function ReturnMenu() {
	document.getElementById('gameElement').setAttribute('style', 'display: none');
	DeleteElement(document.getElementById('table'), document.getElementById('gameTable'));
	DeleteElement(document.getElementById('gameElement'), document.getElementById('operationTable'));
	if(document.getElementById('gameOver')) {
		DeleteElement(document.getElementById('gameover'), document.getElementById('gameOver'));
		DeleteElement(document.getElementById('gameover'), document.getElementById('inputPlayer'));
		DeleteElement(document.getElementById('gameover'), document.getElementById('form'));
	}
	document.getElementById('menu').setAttribute('style', '');
}

function ReturnMenu2() {
	document.getElementById('rankPage').setAttribute('style', 'display: none');
	//DeleteElement(document.body, document.getElementById('rankPage'));
	document.getElementById('menu').setAttribute('style', '');
}

function InsertRank() {

	var num = document.getElementById('ten').getAttribute('data-num');
	var player = document.forms.form.textBox.value;

	$.ajax({
	type: 'POST',
	data: {'num': num, 'player': player},
    url: 'http://localhost:8080/Pazzle/PazzleServlet',
    dataType: 'json',
    success: function (data) {
    	console.log("読み込み成功");
    },
    error: function () {
        console.log("読み込み失敗");
    }
    });

	ReturnMenu();
}

function Move() {
	var thisElement = event.target;
	var move = thisElement.getAttribute('data-move');
    var line = thisElement.getAttribute('data-line');
    var column = thisElement.getAttribute('data-column');

    switch(move) {
    case 'up':
    	UpMotion(line, column);
    	break;
    case 'left':
    	LeftMotion(line, column);
    	break;
    case 'right':
    	RightMotion(line, column);
    	break;
    case 'under':
    	UnderMotion(line, column);
    	break;
    }

}


function LeftMotion(line, column) {
	var arrayArray = [];
	var count = 0;
	var blockArray = [];
	var stockArray = [];

	for (let countLine = 1; countLine <= line; countLine++) {

		blockArray = CreateBlockArrayLeftMotion(countLine, column);
		stockArray = blockArray;
		blockArray = stockArray.concat();
		DeleteNull(blockArray);
		var notNullCount = NotNullCountFunc(blockArray);
		Calc(notNullCount, blockArray);
		DeleteNull(blockArray);

		var game = document.getElementById('gameTable');
		DeleteElement(game, document.getElementById('gameTableSide' + countLine));

		var trTag = CreateElement('tr', 'gameTableSide' + countLine);
		AddElement(game, trTag);
		for (let countColumn = 1; countColumn <= line; countColumn++) {
			var tdTag = CreateElement('td', 'gameTable' + 'Side' + countLine + 'gameTable' + 'Vertical' + countColumn);
			AddElement(trTag, tdTag);
		}
		arrayArray[countLine] = blockArray;
		if (stockArray.toString() == blockArray.toString()) {
			count = count + 1;
		}
	}

	for (let countLine = 1; countLine < arrayArray.length; countLine++) {
		LeftMotionResult(countLine, column, arrayArray);
	}
	TableSize('gameTable', column, line);
	if (count == line) {
		SetTableColor(line, column);
		return;
	}
	game = document.getElementById('gameTable');
	SetBlock(game.getAttribute('id'), game.getAttribute('data-line'), game.getAttribute('data-column'), 2);

	CalcRank();

	var flag = MoveFlag(line, column);
	SetTableColor(line, column);
	GameOver(flag, line, column);
}

function RightMotion(line, column) {

	var arrayArray = [];
	var count = 0;
	var blockArray = [];
	var stockArray = [];

	for (let countLine = 1; countLine <= line; countLine++) {

		blockArray = CreateBlockArrayRightMotion(countLine, column);
		stockArray = blockArray;
		blockArray = stockArray.concat();
		DeleteNull(blockArray);
		var notNullCount = NotNullCountFunc(blockArray);
		Calc(notNullCount, blockArray);
		DeleteNull(blockArray);

		var game = document.getElementById('gameTable');
		DeleteElement(game, document.getElementById('gameTableSide' + countLine));

		var trTag = CreateElement('tr', 'gameTableSide' + countLine);
		AddElement(game, trTag);
		for (let countColumn = 1; countColumn <= line; countColumn++) {
			var tdTag = CreateElement('td', 'gameTable' + 'Side' + countLine + 'gameTable' + 'Vertical' + countColumn);
			AddElement(trTag, tdTag);
		}
		arrayArray[countLine] = blockArray;
		if (stockArray.toString() == blockArray.toString()) {
			count = count + 1;
			console.log(count);
		}
	}
	for (let countLine = 1; countLine < arrayArray.length; countLine++) {
		RightMotionResult(countLine, column, arrayArray);
	}
	TableSize('gameTable', column, line);
	if (count == line) {
		SetTableColor(line, column);
		return;
	}
	game = document.getElementById('gameTable');
	SetBlock(game.getAttribute('id'), game.getAttribute('data-line'), game.getAttribute('data-column'), 2);

	CalcRank();

	var flag = MoveFlag(line, column);
	SetTableColor(line, column);
	GameOver(flag, line, column);
}

function UpMotion(line, column) {
	var arrayArray = [];
	var count = 0;
	var blockArray = [];
	var stockArray = [];

	for (let countColumn = 1; countColumn <= column; countColumn++) {

		blockArray = CreateBlockArrayUpMotion(countColumn, line);
		stockArray = blockArray;
		blockArray = stockArray.concat();
		DeleteNull(blockArray);
		var notNullCount = NotNullCountFunc(blockArray);
		Calc(notNullCount, blockArray);
		DeleteNull(blockArray);

		arrayArray[countColumn] = blockArray;
		if (stockArray.toString() == blockArray.toString()) {
			count = count + 1;
			console.log(count);
		}
	}

	for (let countLine = 1; countLine <= line; countLine++) {
		var game = document.getElementById('gameTable');
		DeleteElement(game, document.getElementById('gameTableSide' + countLine));

		var trTag = CreateElement('tr', 'gameTableSide' + countLine);
		AddElement(game, trTag);
		for (let countColumn = 1; countColumn <= line; countColumn++) {
			var tdTag = CreateElement('td', 'gameTable' + 'Side' + countLine + 'gameTable' + 'Vertical' + countColumn);
			AddElement(trTag, tdTag);
		}

	}
	for (let countColumn = 1; countColumn < arrayArray.length; countColumn++) {
		UpMotionResult(countColumn, line, arrayArray);
	}
	TableSize('gameTable', column, line);
	if (count == column) {
		SetTableColor(line, column);
		return;
	}
	game = document.getElementById('gameTable');
	SetBlock(game.getAttribute('id'), game.getAttribute('data-line'), game.getAttribute('data-column'), 2);

	CalcRank();

	var flag = MoveFlag(line, column);
	SetTableColor(line, column);
	GameOver(flag, line, column);
}

function UnderMotion(line, column) {
	var arrayArray = [];
	var count = 0;
	var blockArray = [];
	var stockArray = [];

	for (let countColumn = 1; countColumn <= column; countColumn++) {
		blockArray = CreateBlockArrayUnderMotion(countColumn, line);
		stockArray = blockArray;
		blockArray = stockArray.concat();
		DeleteNull(blockArray);
		var notNullCount = NotNullCountFunc(blockArray);
		Calc(notNullCount, blockArray);
		DeleteNull(blockArray);

		arrayArray[countColumn] = blockArray;
		if (stockArray.toString() == blockArray.toString()) {
			count = count + 1;
			console.log(count);
		}
	}

	for (let countLine = 1; countLine <= line; countLine++) {
		var game = document.getElementById('gameTable');
		DeleteElement(game, document.getElementById('gameTableSide' + countLine));

		var trTag = CreateElement('tr', 'gameTableSide' + countLine);
		AddElement(game, trTag);
		for (let countColumn = 1; countColumn <= line; countColumn++) {
			var tdTag = CreateElement('td', 'gameTable' + 'Side' + countLine + 'gameTable' + 'Vertical' + countColumn);
			AddElement(trTag, tdTag);
		}
	}

	for (let countColumn = 1; countColumn < arrayArray.length; countColumn++) {
		UnderMotionResult(countColumn, line, arrayArray);
	}
	TableSize('gameTable', column, line);
	if (count == column) {
		SetTableColor(line, column);
		return;
	}
	game = document.getElementById('gameTable');
	SetBlock(game.getAttribute('id'), game.getAttribute('data-line'), game.getAttribute('data-column'), 2);

	CalcRank();

	var flag = MoveFlag(line, column);
	SetTableColor(line, column);
	GameOver(flag, line, column);
}

function CalcRank() {
	var rankNumber = document.getElementById('rankNumber');
	var ten = document.getElementById('ten');

	var num = parseInt(ten.getAttribute('data-num'));
	console.log(rankNumber.getAttribute('data-num'));

	DeleteElement(rankNumber, ten);
	ten = CreateElement('div', 'ten');
	AddElement(rankNumber, ten);
	ten.setAttribute('data-num', num + 2);

	var node = CreateTextNode(num + 2);
	AddElement(ten, node);
}


function GameOver(flag, line, column) {
	if(flag == (line*column)) {
		console.log('gameover');

//		DeleteElement(document.getElementById('gameElement'), document.getElementById('save'));

//		var div = CreateElement('div', 'div');
//		AddElement(document.getElementById('gameElement'), div);

		var gameOver = CreateElement('div', 'gameOver');
		var text = CreateTextNode('GAMEOVER');
		AddElement(gameOver, text);
		AddElement(document.getElementById('gameover'), gameOver);

		var popup = CreateElement('div', 'inputPlayer');
		text = CreateTextNode('名前を入力してください');
		AddElement(popup, text);
		AddElement(gameover, popup);

		var form = CreateElement('form', 'form');
		var textBox = CreateElement('input', 'textBox');
		textBox.setAttribute('type', 'text');
		AddElement(gameover, form);
		AddElement(form, textBox);

//		var saveButton = CreateButton('div', 'save', 'メニューに戻る', gameElement);
//		saveButton.setAttribute('onclick', 'InsertRank()');

	}
}

function Continue() {
	DeleteElement(document.getElementById('gameElement'), document.getElementById('div'));
	var saveButton = CreateButton('div', 'continue', 'もう一度始める', div);
	saveButton.setAttribute('onclick', 'Continue()');
}

function MoveFlag(line, column) {
	var countLine = 1;
	var countColumn = 1;
	var id;
	var upId;
	var underId;
	var leftId;
	var rightId;
	var idNum = 0;
	var upIdNum = 0;
	var underIdNum = 0;
	var leftIdNum = 0;
	var rightIdNum = 0;
	var count = 0;
	var flag = true;

	for (countLine = 1; countLine <= line; countLine +=1) {
		for (countColumn = 1; countColumn <= line; countColumn +=1) {
			id = "gameTableSide" + countLine + "gameTableVertical" + countColumn;
			if(document.getElementById(id).getAttribute('data-block') == null) {
				flag = false;
				break;
			}
		}
		if(flag == false) {
			break;
		}
	}

	if(flag == true) {
		for (countLine = 1; countLine <= line; countLine +=1) {
			for (countColumn = 1; countColumn <= line; countColumn +=1) {
				if(document.getElementById("gameTableSide" + countLine + "gameTableVertical" + countColumn).getAttribute('data-block') !== null) {
					console.log(countLine);
					console.log(countColumn);
					id = "blockgameTableSide" + countLine + "gameTableVertical" + countColumn;
					upId = "blockgameTableSide" + (countLine-1) + "gameTableVertical" + countColumn;
					underId = "blockgameTableSide" + (countLine+1) + "gameTableVertical" + countColumn;
					leftId = "blockgameTableSide" + countLine + "gameTableVertical" + (countColumn-1);
					rightId = "blockgameTableSide" + countLine + "gameTableVertical" + (countColumn+1);

					if((countLine == 1) && (countColumn == 1)){
						idNum = document.getElementById(id).getAttribute('data-num');
						underIdNum = document.getElementById(underId).getAttribute('data-num');
						rightIdNum = document.getElementById(rightId).getAttribute('data-num');

					} else if(((countLine == 1) && (countColumn == 2)) || ((countLine == 1) && (countColumn == 3))) {
						idNum = document.getElementById(id).getAttribute('data-num');
						underIdNum = document.getElementById(underId).getAttribute('data-num');
						leftIdNum = document.getElementById(leftId).getAttribute('data-num');
						rightIdNum = document.getElementById(rightId).getAttribute('data-num');

					} else if((countLine == 1) && (countColumn == column)) {
						idNum = document.getElementById(id).getAttribute('data-num');
						underIdNum = document.getElementById(underId).getAttribute('data-num');
						leftIdNum = document.getElementById(leftId).getAttribute('data-num');

					} else if(((countLine == 2)  && (countColumn == 1)) || ((countLine == 3) && (countColumn == 1))) {
						idNum = document.getElementById(id).getAttribute('data-num');
						upIdNum = document.getElementById(upId).getAttribute('data-num');
						underIdNum = document.getElementById(underId).getAttribute('data-num');
						rightIdNum = document.getElementById(rightId).getAttribute('data-num');

					} else if(((countLine == 2) && (countColumn == column)) || ((countLine == 3) && (countColumn == column))) {
						idNum = document.getElementById(id).getAttribute('data-num');
						upIdNum = document.getElementById(upId).getAttribute('data-num');
						underIdNum = document.getElementById(underId).getAttribute('data-num');
						leftIdNum = document.getElementById(leftId).getAttribute('data-num');

					} else if((countLine == line) && (countColumn == 1)) {
						idNum = document.getElementById(id).getAttribute('data-num');
						upIdNum = document.getElementById(upId).getAttribute('data-num');
						rightIdNum = document.getElementById(rightId).getAttribute('data-num');

					} else if(((countLine == line) && (countColumn == 2)) || ((countLine == line) && (countColumn == 3))) {
						idNum = document.getElementById(id).getAttribute('data-num');
						upIdNum = document.getElementById(upId).getAttribute('data-num');
						leftIdNum = document.getElementById(leftId).getAttribute('data-num');
						rightIdNum = document.getElementById(rightId).getAttribute('data-num');

					} else if((countLine == line) && (countColumn == column)) {
						idNum = document.getElementById(id).getAttribute('data-num');
						upIdNum = document.getElementById(upId).getAttribute('data-num');
						leftIdNum = document.getElementById(leftId).getAttribute('data-num');

					} else {
						idNum = document.getElementById(id).getAttribute('data-num');
						upIdNum = document.getElementById(upId).getAttribute('data-num');
						underIdNum = document.getElementById(underId).getAttribute('data-num');
						leftIdNum = document.getElementById(leftId).getAttribute('data-num');
						rightIdNum = document.getElementById(rightId).getAttribute('data-num');
					}
				}
				console.log(idNum);
				console.log(upIdNum);
				console.log(underIdNum);
				console.log(leftIdNum);
				console.log(rightIdNum);

				if((idNum!==upIdNum)&&(idNum!==underIdNum)&&(idNum!==leftIdNum)&&(idNum!==rightIdNum)) {
					count = count + 1;
				}
				idNum = 0;
				upIdNum = 0;
				underIdNum = 0;
				leftIdNum = 0;
				rightIdNum = 0;
			}
		}
	}
	console.log(count);

	return count;
}

function CreateBlockArrayLeftMotion(countLine, column) {
	var blockArray = [];
	var countArray = 0;
	for (let countColumn = 1; countColumn <= column; countColumn++) {
		let id = 'gameTable' + 'Side' + countLine + 'gameTable' + 'Vertical' + countColumn;
		let tdTag = document.getElementById(id);
		if (tdTag.getAttribute('data-block') == null) {
			blockArray[countArray] = null;
		} else {
			blockArray[countArray] = tdTag.getAttribute('data-block');
		}
		countArray++;
	}
	return blockArray;
}

function CreateBlockArrayRightMotion(countLine, column) {
	var blockArray = [];
	var countArray = 0;
	for (let countColumn = column; countColumn >= 1; countColumn--) {
		let id = 'gameTable' + 'Side' + countLine + 'gameTable' + 'Vertical' + countColumn;
		let tdTag = document.getElementById(id);
		if (tdTag.getAttribute('data-block') == null) {
			blockArray[countArray] = null;
		} else {
			blockArray[countArray] = tdTag.getAttribute('data-block');
		}
		countArray++;
	}
	return blockArray;
}

function CreateBlockArrayUpMotion(countColumn, line) {
	var blockArray = [];
	var countArray = 0;
	for (let countLine = 1; countLine <= line; countLine++) {
		let id = 'gameTable' + 'Side' + countLine + 'gameTable' + 'Vertical' + countColumn;
		let tdTag = document.getElementById(id);
		if (tdTag.getAttribute('data-block') == null) {
			blockArray[countArray] = null;
		} else {
			blockArray[countArray] = tdTag.getAttribute('data-block');
		}
		countArray++;
	}
	return blockArray;
}

function DeleteNull(blockArray) {
	var blockArrayLength = blockArray.length;
	var nullCount = 0;
	for (let i = 0; i < blockArrayLength; i++) {
		if (blockArray[i] == null) {
			blockArray.push(null);
			nullCount++;
		}
	}

	var deleteCount = 0;
	notNullCount = 0;
	for (let i = 0; i < nullCount; i) {
		if (blockArray[notNullCount] == null) {
			blockArray.splice(notNullCount, 1);
			i++;
		} else {
			notNullCount++;
		}
	}
}

function CreateBlockArrayUnderMotion(countColumn, line) {
	var blockArray = [];
	var countArray = 0;
	for (let countLine = line; countLine >= 1; countLine--) {
		let id = 'gameTable' + 'Side' + countLine + 'gameTable' + 'Vertical' + countColumn;
		let tdTag = document.getElementById(id);
		if (tdTag.getAttribute('data-block') == null) {
			blockArray[countArray] = null;
		} else {
			blockArray[countArray] = tdTag.getAttribute('data-block');
		}
		countArray++;
	}
	return blockArray;
}

function DeleteNull(blockArray) {
	var blockArrayLength = blockArray.length;
	var nullCount = 0;
	for (let i = 0; i < blockArrayLength; i++) {
		if (blockArray[i] == null) {
			blockArray.push(null);
			nullCount++;
		}
	}

	var deleteCount = 0;
	notNullCount = 0;
	for (let i = 0; i < nullCount; i) {
		if (blockArray[notNullCount] == null) {
			blockArray.splice(notNullCount, 1);
			i++;
		} else {
			notNullCount++;
		}
	}
}

function NotNullCountFunc(blockArray) {
	var notNullCount = 0;
	for (let i = 0; i < blockArray.length; i++) {
		if (blockArray[i] !== null) {
			notNullCount++;
		}
	}
	return notNullCount;
}

function Calc(notNullCount, blockArray) {
	for (let i = 0; i < notNullCount - 1; i++) {
		if ((blockArray[i] == blockArray[i + 1])) {
			blockArray[i] = blockArray[i] * 2;
			blockArray[i + 1] = null;
		}
	}
}

function LeftMotionResult(countLine, column, blockArray) {
	for (let countColumn = 1; countColumn <= column; countColumn++) {
		var id = 'gameTable' + 'Side' + countLine + 'gameTable' + 'Vertical' + countColumn;
		var tdTag = document.getElementById(id);
		let number = blockArray[countLine][countColumn - 1];
		if (number !== null) {
			CreateBlock(id, number);
		}
	}
}

function RightMotionResult(countLine, column, blockArray) {
	for (let countColumn = column; countColumn >= 1; countColumn--) {
		var id = 'gameTable' + 'Side' + countLine + 'gameTable' + 'Vertical' + countColumn;
		var tdTag = document.getElementById(id);
		let number = blockArray[countLine][blockArray[countLine].length - countColumn];
		if (number !== null) {
			CreateBlock(id, number);
		}
	}
}

function UpMotionResult(countColumn, line, blockArray) {
	for (let countLine = 1; countLine <= line; countLine++) {
		var id = 'gameTable' + 'Side' + countLine + 'gameTable' + 'Vertical' + countColumn;
		var tdTag = document.getElementById(id);
		let number = blockArray[countColumn][countLine - 1];
		if (number !== null) {
			CreateBlock(id, number);
		}
	}
}

function UnderMotionResult(countColumn, line, blockArray) {
	for (let countLine = line; countLine >= 1; countLine--) {
		var id = 'gameTable' + 'Side' + countLine + 'gameTable' + 'Vertical'
				+ countColumn;
		var tdTag = document.getElementById(id);
		let number = blockArray[countColumn][blockArray[countColumn].length
				- countLine];
		if (number !== null) {
			CreateBlock(id, number);
		}
	}
}

document.onkeydown = BlockMove;

function BlockMove() {

	var id;
	var line;
	var column

	switch (event.keyCode) {
	case 38:
		id = document.getElementById('operationTableSide1operationTableVertical2');
		line = id.getAttribute('data-line');
		column = id.getAttribute('data-column');
		UpMotion(line, column);
		break;
	case 40:
		id = document.getElementById('operationTableSide3operationTableVertical2');
		line = id.getAttribute('data-line');
		column = id.getAttribute('data-column');
		UnderMotion(line, column);
		break;
	case 37:
		id = document.getElementById('operationTableSide2operationTableVertical1');
		line = id.getAttribute('data-line');
		column = id.getAttribute('data-column');
		LeftMotion(line, column);
		break;
	case 39:
		id = document.getElementById('operationTableSide2operationTableVertical3');
		line = id.getAttribute('data-line');
		column = id.getAttribute('data-column');
		RightMotion(line, column);
		break;
	}
}




