document.onkeydown = BlockMove;

function BlockMove() {
	var id;
	var line;
	var column
	var json = {
		'37': function() {
			id = document.getElementById('operationTableSide2operationTableVertical1');
			line = id.getAttribute('data-line');
			column = id.getAttribute('data-column');
			LeftMotion(line, column);
		},
		'38': function() {
			id = document.getElementById('operationTableSide1operationTableVertical2');
			line = id.getAttribute('data-line');
			column = id.getAttribute('data-column');
			UpMotion(line, column);
		},
		'39': function() {
			id = document.getElementById('operationTableSide2operationTableVertical3');
			line = id.getAttribute('data-line');
			column = id.getAttribute('data-column');
			RightMotion(line, column);
		},
		'40': function() {
			id = document.getElementById('operationTableSide3operationTableVertical2');
			line = id.getAttribute('data-line');
			column = id.getAttribute('data-column');
			UnderMotion(line, column);
		}
	}
	var process = json[event.keyCode];
	if(process) {
		process();
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
		SetTableColor(line, column, document.getElementById('updateColor').getAttribute('data-tablecolor'));
		return;
	}
	game = document.getElementById('gameTable');
	SetBlock(game.getAttribute('id'), game.getAttribute('data-line'), game.getAttribute('data-column'), 2);

	CalcRank();

	var flag = MoveFlag(line, column);
	SetTableColor(line, column, document.getElementById('updateColor').getAttribute('data-tablecolor'));
	GameOver(flag, line, column);
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
		SetTableColor(line, column, document.getElementById('updateColor').getAttribute('data-tablecolor'));
		return;
	}
	game = document.getElementById('gameTable');
	SetBlock(game.getAttribute('id'), game.getAttribute('data-line'), game.getAttribute('data-column'), 2);

	CalcRank();

	var flag = MoveFlag(line, column);
	SetTableColor(line, column, document.getElementById('updateColor').getAttribute('data-tablecolor'));
	GameOver(flag, line, column);
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
		}
	}
	for (let countLine = 1; countLine < arrayArray.length; countLine++) {
		RightMotionResult(countLine, column, arrayArray);
	}
	TableSize('gameTable', column, line);
	if (count == line) {
		SetTableColor(line, column, document.getElementById('updateColor').getAttribute('data-tablecolor'));
		return;
	}
	game = document.getElementById('gameTable');
	SetBlock(game.getAttribute('id'), game.getAttribute('data-line'), game.getAttribute('data-column'), 2);

	CalcRank();

	var flag = MoveFlag(line, column);
	SetTableColor(line, column, document.getElementById('updateColor').getAttribute('data-tablecolor'));
	GameOver(flag, line, column);
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

function UnderMotion(line, column) {
	console.log(document.getElementById('updateColor').getAttribute('data-tablecolor'));
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
		SetTableColor(line, column, document.getElementById('updateColor').getAttribute('data-tablecolor'));
		return;
	}
	game = document.getElementById('gameTable');
	SetBlock(game.getAttribute('id'), game.getAttribute('data-line'), game.getAttribute('data-column'), 2);

	CalcRank();

	var flag = MoveFlag(line, column);
	SetTableColor(line, column, document.getElementById('updateColor').getAttribute('data-tablecolor'));
	GameOver(flag, line, column);
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

function CalcRank() {
	var rankNumber = document.getElementById('rankNumber');
	var ten = document.getElementById('ten');
	var num = parseInt(ten.getAttribute('data-num'));
	ten.setAttribute('data-num', num + 2);
	var node = CreateTextNode(num + 2);
	ten.removeChild(ten.firstChild);
	AddElement(ten, node);
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
					id = "blockgameTableSide" + countLine + "gameTableVertical" + countColumn;
					leftId = "blockgameTableSide" + countLine + "gameTableVertical" + (countColumn-1);
					upId = "blockgameTableSide" + (countLine-1) + "gameTableVertical" + countColumn;
					rightId = "blockgameTableSide" + countLine + "gameTableVertical" + (countColumn+1);
					underId = "blockgameTableSide" + (countLine+1) + "gameTableVertical" + countColumn;

					idNum = document.getElementById(id).getAttribute('data-num');

					if((countLine == 1) && (countColumn == 1)){
						underIdNum = document.getElementById(underId).getAttribute('data-num');
						rightIdNum = document.getElementById(rightId).getAttribute('data-num');
					} else if(((countLine == 1) && (countColumn == 2)) || ((countLine == 1) && (countColumn == 3))) {
						underIdNum = document.getElementById(underId).getAttribute('data-num');
						leftIdNum = document.getElementById(leftId).getAttribute('data-num');
						rightIdNum = document.getElementById(rightId).getAttribute('data-num');
					} else if((countLine == 1) && (countColumn == column)) {
						underIdNum = document.getElementById(underId).getAttribute('data-num');
						leftIdNum = document.getElementById(leftId).getAttribute('data-num');
					} else if(((countLine == 2)  && (countColumn == 1)) || ((countLine == 3) && (countColumn == 1))) {
						upIdNum = document.getElementById(upId).getAttribute('data-num');
						underIdNum = document.getElementById(underId).getAttribute('data-num');
						rightIdNum = document.getElementById(rightId).getAttribute('data-num');
					} else if(((countLine == 2) && (countColumn == column)) || ((countLine == 3) && (countColumn == column))) {
						upIdNum = document.getElementById(upId).getAttribute('data-num');
						underIdNum = document.getElementById(underId).getAttribute('data-num');
						leftIdNum = document.getElementById(leftId).getAttribute('data-num');
					} else if((countLine == line) && (countColumn == 1)) {
						upIdNum = document.getElementById(upId).getAttribute('data-num');
						rightIdNum = document.getElementById(rightId).getAttribute('data-num');
					} else if(((countLine == line) && (countColumn == 2)) || ((countLine == line) && (countColumn == 3))) {
						upIdNum = document.getElementById(upId).getAttribute('data-num');
						leftIdNum = document.getElementById(leftId).getAttribute('data-num');
						rightIdNum = document.getElementById(rightId).getAttribute('data-num');
					} else if((countLine == line) && (countColumn == column)) {
						upIdNum = document.getElementById(upId).getAttribute('data-num');
						leftIdNum = document.getElementById(leftId).getAttribute('data-num');
					} else {
						upIdNum = document.getElementById(upId).getAttribute('data-num');
						underIdNum = document.getElementById(underId).getAttribute('data-num');
						leftIdNum = document.getElementById(leftId).getAttribute('data-num');
						rightIdNum = document.getElementById(rightId).getAttribute('data-num');
					}
				}

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

	return count;
}
