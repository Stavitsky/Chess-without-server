
//Создание доски
function CreateBoard (boardHeight, boardWidth) {
	var board = $('#board');
	for (var i = 0; i < boardHeight; i++) {
		for (var j = 0; j < boardWidth; j++) {
			if ((i % 2 == 0 && j % 2 == 0) || (i % 2 != 0 && j % 2 != 0)) {
				board.append ('<div class="lightCell"> </div>');
			} else {
				board.append ('<div class="darkCell"> </div>');
			}
		}
	}
	//board.css("border: solid 1px black;");
}

//расстановка фигур
function Dotting () {
    cell = $('.darkCell, .lightCell');

	/*
	pawn - пешка
	rook - ладья
	khight - конь
	bitshop - слон
	queen - ферзь
	king - король
	*/



    for (var i = 0; i < 71; i++) {
        cell.eq(i).attr('id',i);         //нумерация ячеек id
    }

	cell.slice (8,16).append('<img class="black pawn" src="'+pathToDark+' P.ico">'); //ряд черных пешек
	cell.slice (48,56).append('<img class="white pawn"  src="'+pathToLight+' P.ico">'); //ряд белых пешек

	for (var i = 0; i < 8; i++) {
		if (i == 0 || i == 7) {
			$(cell.slice (0,8)[i]).append('<img class="black rook" src="' + pathToDark + ' R.ico">');
			$(cell.slice (56,71)[i]).append('<img class="white rook"  src="' + pathToLight + ' R.ico">');
		}
		if (i == 1 || i == 6) {
			$(cell.slice (0,8)[i]).append('<img class="black knight"  src="' + pathToDark + ' N.ico">');
			$(cell.slice (56,71)[i]).append('<img class="white knight"  src="' + pathToLight + ' N.ico">');
		}
		if (i == 2 || i == 5) {
			$(cell.slice (0,8)[i]).append('<img class="black bitshop" src="' + pathToDark + ' B.ico">');
			$(cell.slice (56,71)[i]).append('<img class="white bitshop" src="' + pathToLight + ' B.ico">');
		}
		if (i == 3) {
			$(cell.slice (0,8)[i]).append('<img class="black queen" src="' + pathToDark + ' Q.ico">');
			$(cell.slice (56,71)[i]).append('<img class="white queen" src="' + pathToLight + ' Q.ico">');
		}
		if (i == 4) {
			$(cell.slice (0,8)[i]).append('<img class="black king" src="' + pathToDark + ' K.ico">');
			$(cell.slice (56,71)[i]).append('<img class="white king" src="' + pathToLight + ' K.ico">');
		}

		
	}
}

//проверка ячейки на наличие фигурки
function IsEmpty (cell) {
    if ($(cell).find('img').length == 0) return true;

    return false;
};

function Move (figure) {
    console.log ('Move function!');
    console.log ('clFigure: '+ clFigure);

    console.log($(figure));
    $(figure).parent().toggleClass('checked');
    //var clFigure = this;

    figureID = $(figure).parent().attr('id'); //извлечение id ячейки, на которой стоит пешка
    //console.log('figure ID: '+ figureID);

    //var cell = $('.darkCell, .lightCell');

    cell.click(function() {
    //$('#board').on('click', cell, function() {
        console.log('this: ' +this);
        var clID = $(this).attr('id'); //id ячейки, на которую нажали;
        var figure_ID = $('#' + figureID); //id фигуры для вставки в jquery
        var clicked_ID = $('#' + clID);
        figure_ID.removeClass('checked').empty();


        if (IsEmpty(clicked_ID)) {
            //console.log('Clicked cell ID: ' + clID);
            //console.log('Clicked figure ID: ' + figureID);
            $(clicked_ID).append(clFigure);
            //return;

        } else {
           console.log('else catch!');
          //$(clicked_ID).children().remove();
          //$(clicked_ID).append(clFigure);
          //return;



        }


    });

    //alert('Exit from Move function!');
    //return;
}



//пути к иконкам
pathToLight = 'figures/light/White';
pathToDark = 'figures/dark/Black';
whiteMove = true; //первый ход - белым

$(document).ready(function () {

	var checked = false;

	CreateBoard (8,8);
	Dotting();

	//figure = '.pawn, .rook, .knight, .bitshop, .queen, .king';
    if (!whiteMove) {
        figure = '.black';
        whiteMove = true;
    } else {
        figure = '.white, .black';
        whiteMove = false;
    }



	//figure.click(function() {
    $('#board').on('click', figure, function(){
        console.log (IsEmpty(this));
        clFigure = this;
        Move(clFigure);
        //whiteMove = false;


	});




    //alert('After functions!');

});