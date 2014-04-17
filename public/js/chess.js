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

function CheckRed (cell) {
    $(cell).addClass('checked');

}

function UncheckRed (cell) {
    $(cell).removeClass('checked');
    $('.attack').toggleClass('attack');
}

function Navigate (x,y,type,color) {

    if (type == 'pawn') {
        if (color == 'white') {
            var goalCell = $('[x='+ (parseInt(x)-1) +'][y='+ y +']'); //целевая ячейка белой пешки
            var attackCell1 = $('[x='+ (parseInt(x)-1) +'][y='+ (parseInt(y)+1) +']'); //правая под атакой белой
            var attackCell2 = $('[x='+ (parseInt(x)-1) +'][y='+ (parseInt(y)-1) +']'); //левая под атакой белой

            if (IsEmpty(goalCell)) {
                goalCell.toggleClass('navigate');
            }
            //если в ячейке по диагонали есть фигура и она противоположного цвета
            if (!IsEmpty(attackCell1) && $(attackCell1).children().attr('color') != color) {
                attackCell1.toggleClass('attack')
            }
            if (!IsEmpty(attackCell2) && $(attackCell1).children().attr('color') != color) {
                attackCell2.toggleClass('attack')
            }


        } else if (color == 'black') {
            var goalCell = $('[x='+ (parseInt(x)+1) +'][y='+ y +']'); //целевая ячейка черной пешки
            var attackCell1 = $('[x='+ (parseInt(x)+1) +'][y='+ (parseInt(y)+1) +']'); //правая под атакой черной
            var attackCell2 = $('[x='+ (parseInt(x)+1) +'][y='+ (parseInt(y)-1) +']'); //левая под атакой черной

            if (IsEmpty(goalCell)) {
                goalCell.toggleClass('navigate');
            }
            //если в ячейке по диагонали есть фигура и она противоположного цвета
            if (!IsEmpty(attackCell1) && $(attackCell1).children().attr('color') != color) {
                attackCell1.toggleClass('attack')
            }
            if (!IsEmpty(attackCell2) && $(attackCell1).children().attr('color') != color) {
                attackCell2.toggleClass('attack')
            }
        }
    }
    else if (type == 'knight') {
        //goalCell1-8 - возможные варианты хода коня

        //выше коня
        var goalCell1 = $('[x='+ (parseInt(x)-2) +'][y='+ (parseInt(y) +1) +']');
        //var goalCell1 = $('[x='+ (x-2) +'][y='+ (y +1) +']');
        var goalCell2 = $('[x='+ (parseInt(x)-2) +'][y='+ (parseInt(y) -1) +']');
        var goalCell3 = $('[x='+ (parseInt(x)-1) +'][y='+ (parseInt(y) -2) +']');
        var goalCell4 = $('[x='+ (parseInt(x)-1) +'][y='+ (parseInt(y) +2) +']');
        //ниже коня
        var goalCell5 = $('[x='+ (parseInt(x)+1) +'][y='+ (parseInt(y) +2) +']');
        var goalCell6 = $('[x='+ (parseInt(x)+1) +'][y='+ (parseInt(y) -2) +']');
        var goalCell7 = $('[x='+ (parseInt(x)+2) +'][y='+ (parseInt(y) +1) +']');
        var goalCell8 = $('[x='+ (parseInt(x)+2) +'][y='+ (parseInt(y) -1) +']');

        //если целевая ячейка пустая - подсвечиваем её зеленым
        if (IsEmpty(goalCell1)) {
            goalCell1.toggleClass('navigate');
        } else {
            //если фигура, которая там стоит - чужая, подсветить атакой
            if ($(goalCell1).children().attr('color') != color) {
                goalCell1.toggleClass('attack');
            }
        }

        if (IsEmpty(goalCell2)) {
            goalCell2.toggleClass('navigate');

        } else {
            if ($(goalCell2).children().attr('color') != color) {
                goalCell2.toggleClass('attack');
            }
        }

        if (IsEmpty(goalCell3)) {
            goalCell3.toggleClass('navigate');
        } else {
            if ($(goalCell3).children().attr('color') != color) {
                goalCell3.toggleClass('attack');
            }
        }

        if (IsEmpty(goalCell4)) {
            goalCell4.toggleClass('navigate');
        } else {
            if ($(goalCell4).children().attr('color') != color) {
                goalCell4.toggleClass('attack');
            }
        }

        if (IsEmpty(goalCell5)) {
            goalCell5.toggleClass('navigate');
        } else {
            if ($(goalCell5).children().attr('color') != color) {
                goalCell5.toggleClass('attack');
            }
        }

        if (IsEmpty(goalCell6)) {
            goalCell6.toggleClass('navigate');
        } else {
            if ($(goalCell6).children().attr('color') != color) {
                goalCell6.toggleClass('attack');
            }
        }

        if (IsEmpty(goalCell7)) {
            goalCell7.toggleClass('navigate');
        } else {
            if ($(goalCell7).children().attr('color') != color) {
                goalCell7.toggleClass('attack');
            }
        }

        if (IsEmpty(goalCell8)) {
            goalCell8.toggleClass('navigate');
        } else {
            if ($(goalCell8).children().attr('color') != color) {
                goalCell8.toggleClass('attack');
            }
        }

    }
    else if (type == 'rook') {
        //подсветка предлагаемых ячеек ниже фигуры
        for (var i = x; i < 9; i++) {
            var goalCell = $('[x='+ (parseInt(i)+1) +'][y='+ (parseInt(y)) +']');
            if (IsEmpty(goalCell)) {
                goalCell.toggleClass('navigate');
            } else {
                if ($(goalCell).children().attr('color') != color) {
                    goalCell.toggleClass('attack');
                }
                break;
            }

        }
        //выше фигуры
        for (var i = x; i > 0; i--) {
            var goalCell = $('[x='+ (parseInt(i)-1) +'][y='+ (parseInt(y)) +']');
            if (IsEmpty(goalCell)) {
                goalCell.toggleClass('navigate');
            } else {
                if ($(goalCell).children().attr('color') != color) {
                    goalCell.toggleClass('attack');
                }
                break;
            }

        }
        for (var j = y; j < 9; j++) {
            var goalCell = $('[x=' + parseInt(x) + '][y=' + (parseInt(j)+1) +']');
            if (IsEmpty(goalCell)) {
                goalCell.toggleClass('navigate');
            } else {
                if ($(goalCell).children().attr('color') != color) {
                    goalCell.toggleClass('attack');
                }
                break;
            }
        }

        for (var j = y; j > 0; j--) {
            var goalCell = $('[x=' + parseInt(x) + '][y=' + (parseInt(j)-1) +']');
            if (IsEmpty(goalCell)) {
                goalCell.toggleClass('navigate');
            } else {
                if ($(goalCell).children().attr('color') != color) {
                    goalCell.toggleClass('attack');
                }
                break;
            }
        }
    }
    else if (type == 'bitshop') {
        //goalCell 1-4 - это четыре разных направления возможного движения слона
        //не придумал, как можно реализовать одним циклом, поэтому 4

        //юго-восток
        for (var i = 1; i < 9; i++) {
            goalCell1 = $('[x=' + (parseInt(x) + i) + '][y=' + (parseInt(y) + i) + ']');
            if (IsEmpty(goalCell1)) {
                goalCell1.toggleClass('navigate');
            } else  {
                if ($(goalCell1).children().attr('color') != color) {
                    goalCell1.toggleClass('attack');
                }
                break;
            }
        }

        //юго-запад
        for (var i = 1; i < 9; i++) {
            goalCell2 = $('[x=' + (parseInt(x) + i) + '][y=' + (parseInt(y) - i) + ']');
            if (IsEmpty(goalCell2)) {
                goalCell2.toggleClass('navigate');
            } else {
                if ($(goalCell2).children().attr('color') != color) {
                    goalCell2.toggleClass('attack');
                }
                break;
            }
        }

        //с-в
        for (var i = 1; i < 9; i++) {
            goalCell3 = $('[x=' + (parseInt(x) - i) + '][y=' + (parseInt(y) + i) + ']');
            if (IsEmpty(goalCell3)) {
                goalCell3.toggleClass('navigate');
            } else {
                if ($(goalCell3).children().attr('color') != color) {
                    goalCell3.toggleClass('attack');
                }
                break;
            }
        }

        //с-з
        for (var i = 1; i < 9; i++) {
            goalCell4 = $('[x=' + (parseInt(x) - i) + '][y=' + (parseInt(y) - i) + ']');
            if (IsEmpty(goalCell4)) {
                goalCell4.toggleClass('navigate');
            } else {
                if ($(goalCell4).children().attr('color') != color) {
                    goalCell4.toggleClass('attack');
                }
                break;
            }
        }
    }
    else if (type == 'queen') {
        //ДОПИЛИТЬ КАК ROOK+BITSHOP
    }
    else if (type == 'king') {
        //доделать
    }





}

//для расстановки фигур
function InsertFigure (x,y,figure) {
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
    var blackBitshop = '<img color="black" type="bitshop" src="' + pathToDark + ' B.ico">';
    var whiteBitshop = '<img color="white" type="bitshop" src="' + pathToLight + ' B.ico">';
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
                InsertFigure(i,j,whitePawn);
            } else if (i == 7) {
                InsertFigure (i,j,blackPawn);
            }
            //черные фигуры первого ряда
            else if (i == 1) {
                if (j == 1 || j == 8)  {
                    InsertFigure(i,j, blackRook);
                }
                else if (j == 2 || j == 7) {
                    InsertFigure(i,j,blackKnight);
                }
                else if (j == 3 || j == 6) {
                    InsertFigure (i, j, blackBitshop);
                }
                else if (j == 4) {
                    InsertFigure (i, j, blackQueen);
                } else if (j == 5) {
                    InsertFigure(i,j,blackKing);
                }
            }
            //белые фигуры восьмого ряда
            else if (i == 8) {
                if (j == 1 || j == 8)  {
                    InsertFigure(i,j, whiteRook);
                }
                else if (j == 2 || j == 7) {
                    InsertFigure(i,j,whiteKnight);
                }
                else if (j == 3 || j == 6) {
                    InsertFigure (i, j, whiteBitshop);
                }
                else if (j == 4) {
                    InsertFigure (i, j, whiteQueen);
                } else if (j == 5) {
                    InsertFigure(i,j,whiteKing);
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


function Move (figure, where) {

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

            //console.log(clFigure);

            if (whiteMove && clFigureColor == 'white') {
                CheckRed(this); //выделяем ячейку
                //выделяем возможный вариант хода
                Navigate(clFigureX,clFigureY,clFigureType,clFigureColor);
                checked = true; //флаг выбранной фигуры

            } else if (whiteMove && clFigureColor != 'white') {
                alert ('Error! It\'s white turn!');
            }
            else if (!whiteMove && clFigureColor == 'black') {
                CheckRed(this); //выделяем ячейку
                //возможный вариант ходов
                Navigate(clFigureX,clFigureY,clFigureType,clFigureColor);


                checked = true;
            }
            else if (!whiteMove && clFigureColor == 'white') {
                alert ('Error! It\'s black turn!');
            }



        } else if (checked && IsEmpty(this)) {

            UncheckRed($(clFigure).parent()); //снимаем выделение

            Move(clFigure, this);

            $('.navigate').toggleClass('navigate'); //выключаем зеленые квадратики

            checked = false; //снимаем флаг выбранной фигуры

            whiteMove = ToggleTurn(whiteMove); //переход хода


        } else if (checked && !IsEmpty(this)) {
            console.log ('Not empty!');
        }



        //whiteMove = false;


	});




    //alert('After functions!');

});