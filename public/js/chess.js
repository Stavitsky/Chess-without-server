//флажок на цвет
//флажок на выбранную фигуру

//пути к иконкам
pathToLight = 'figures/light/White';
pathToDark = 'figures/dark/Black';

//Создание доски
function CreateBoard (boardHeight, boardWidth) {
	var board = $('#board');
	for (var i = 0; i < boardHeight; i++) {
		for (var j = 0; j < boardWidth; j++) {
			if ((i % 2 == 0 && j % 2 == 0) || (i % 2 != 0 && j % 2 != 0)) {
				board.append ($('<div class="lightCell"> </div>').attr("x",i+1).attr("y",j+1));
			} else {
				board.append ($('<div class="darkCell"> </div>').attr("x",i+1).attr("y",j+1));
            }
		}
	}
}

function Check (cell) {
    $(cell).addClass('checked');

}

function Uncheck (cell) {
    $(cell).removeClass('checked');
}

//для расстановки фигур
function Insert (x,y,figure) {
    $('[x='+x+']'+'[y='+y+']').append(figure);
}

//переключение хода
function ToggleTurn (turn) {
    return !turn;
}

//расстановка фигур
function Dotting () {

    cell = $(".whiteCell,.darkCell");

	/*
	pawn - пешка
	rook - ладья
	khight - конь
	bitshop - слон
	queen - ферзь
	king - король
	*/

//    console.log("jquery.type: "+ JQuery.type(null));

    //пешки
    var blackPawn = '<img color="white" type="pawn" src="'+pathToLight+' P.ico">';
    var whitePawn = '<img color="black" type="pawn" src="'+pathToDark+' P.ico">';
    //ладьи
    var blackRook = '<img color="black" type="rook" src="' + pathToDark + ' R.ico">';
    var whiteRook = '<img color="white" type="rook" src="' + pathToLight + ' R.ico">';
    //кони
    var blackKnight = '<img color="black" type="knight" src="' + pathToDark + ' N.ico">';
    var whiteKnight = '<img color="white" type="knight" src="' + pathToLight + ' N.ico">';
    //слоны
    var blackBitshop = '<img color="black" type="bithsop" src="' + pathToDark + ' B.ico">';
    var whiteBitshop = '<img color="white" type="bithsop" src="' + pathToLight + ' B.ico">';
    //ферзи
    var blackQueen = '<img color="black" type="queen" src="' + pathToDark + ' Q.ico">';
    var whiteQueen = '<img color="white" type="queen" src="' + pathToLight + ' Q.ico">';
    //короли
    var blackKing = '<img color="black" type="king" src="' + pathToDark + ' K.ico">';
    var whiteKing = '<img color="white" type="king" src="' + pathToLight + ' K.ico">';


/*
    for (var i = 0; i < 71; i++) {
        cell.eq(i).attr('id',i);         //нумерация ячеек id
    }
*/

    for (var i = 1; i < 9; i++) {
        for (var j = 1; j < 9; j++) {
            //пешки
            if (i == 2) {
                Insert(i,j,whitePawn);
            } else if (i == 7) {
                Insert (i,j,blackPawn);
            }
            //черные фигуры первого ряда
            else if (i == 1) {
                if (j == 1 || j == 8)  {
                    Insert(i,j, blackRook);
                }
                else if (j == 2 || j == 7) {
                    Insert(i,j,blackKnight);
                }
                else if (j == 3 || j == 6) {
                    Insert (i, j, blackBitshop);
                }
                else if (j == 4) {
                    Insert (i, j, blackQueen);
                } else if (j == 5) {
                    Insert(i,j,blackKing);
                }
            }
            //белые фигуры восьмого ряда
            else if (i == 8) {
                if (j == 1 || j == 8)  {
                    Insert(i,j, whiteRook);
                }
                else if (j == 2 || j == 7) {
                    Insert(i,j,whiteKnight);
                }
                else if (j == 3 || j == 6) {
                    Insert (i, j, whiteBitshop);
                }
                else if (j == 4) {
                    Insert (i, j, whiteQueen);
                } else if (j == 5) {
                    Insert(i,j,whiteKing);
                }
            }
        }
    }
}

//проверка ячейки на наличие фигурки
function IsEmpty (cell) {
    if ($(cell).find('img').length == 0) return true;
    return false;
};

function Move (figure) {
    $(figure).parent().removeClass('checked');

    figureCords = {'x':$(figure).parent().attr('x'), 'y': $(figure).parent().attr('x')};
    console.log ('figureCords' + figureCords.x + ' ' + figureCords.y);

    figureID = $(figure).parent().attr('id'); //извлечение id ячейки, на которой стоит пешка
    //console.log('figure ID: '+ figureID);

    var cell = $('.darkCell, .lightCell');

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
};

function newMove (figure, where) {

    $(where).append(figure);
};


//whiteMove = true; //первый ход - белым

$(document).ready(function () {

    var whiteMove = true;
	var checked = false;

	CreateBoard (8,8);
	Dotting();

    var cell = '.darkCell,.lightCell';


	//figure.click(function() {
    $('#board').on('click', cell, function(){

        if (!checked && !IsEmpty(this)) {

            clFigure = $(this).children()[0]; //запоминаем фигуру
            var clFigureColor = $(clFigure).attr('color');
            var clFigureType = $(clFigure).attr('type');
            var clFigureX = $(clFigure).parent().attr('x');
            var clFigureY = $(clFigure).parent().attr('y');

            console.log(clFigure);

            if (whiteMove && clFigureColor == 'white') {
                Check(this); //выделяем ячейку
                    if (clFigureType == 'pawn') {
                        $('[x='+ (clFigureX-1) +'][y='+ clFigureY +']').toggleClass('navigate');
                    }
                checked = true;

            } else if (whiteMove && clFigureColor != 'white') {
                alert ('Error! It\'s white turn!');
            }
            else if (!whiteMove && clFigureColor == 'black') {
                Check(this); //выделяем ячейку
                checked = true;
            }
            else if (!whiteMove && clFigureColor == 'white') {
                alert ('Error! It\'s black turn!');
            }



        } else if (checked && IsEmpty(this)) {

            Uncheck($(clFigure).parent()); //снимаем выделение

            newMove(clFigure, this);

            $('.navigate').toggleClass('navigate');

            checked = false;

            whiteMove = ToggleTurn(whiteMove);


        } else if (checked && !IsEmpty(this)) {
            console.log ('Not empty!');
        }



        //whiteMove = false;


	});




    //alert('After functions!');

});