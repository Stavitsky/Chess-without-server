
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

//    console.log("jquery.type: "+ JQuery.type(null));



    for (var i = 0; i < 71; i++) {
        cell.eq(i).attr('id',i);         //нумерация ячеек id
    }


    //пешки
    $('[x=2]').append('<img class="black pawn" src="'+pathToDark+' P.ico">'); //на второй строке ставим пешки
    $('[x=7]').append('<img class="white pawn"  src="'+pathToLight+' P.ico">'); //на седьмой
    //ладьи
    $('[x=1][y=1]').append('<img class="black rook" src="' + pathToDark + ' R.ico">');
    $('[x=1][y=8]').append('<img class="black rook" src="' + pathToDark + ' R.ico">');
    $('[x=8][y=1]').append('<img class="white rook"  src="' + pathToLight + ' R.ico">');
    $('[x=8][y=8]').append('<img class="white rook"  src="' + pathToLight + ' R.ico">');
    //кони
    $('[x=1][y=2]').append('<img class="black knight"  src="' + pathToDark + ' N.ico">');
    $('[x=1][y=7]').append('<img class="black knight"  src="' + pathToDark + ' N.ico">');
    $('[x=8][y=2]').append('<img class="white knight"  src="' + pathToLight + ' N.ico">');
    $('[x=8][y=7]').append('<img class="white knight"  src="' + pathToLight + ' N.ico">');
    //слон
    $('[x=1][y=3]').append('<img class="black knight"  src="' + pathToDark + ' N.ico">');
    $('[x=1][y=6]').append('<img class="black knight"  src="' + pathToDark + ' N.ico">');
    $('[x=8][y=3]').append('<img class="white knight"  src="' + pathToLight + ' N.ico">');
    $('[x=8][y=6]').append('<img class="white knight"  src="' + pathToLight + ' N.ico">');
    //ферзи
    $('[x=1][y=4]').append('<img class="black queen" src="' + pathToDark + ' Q.ico">');
    $('[x=8][y=4]').append('<img class="white queen" src="' + pathToLight + ' Q.ico">');
    //короли
    $('[x=1][y=5]').append('<img class="black king" src="' + pathToDark + ' K.ico">');
    $('[x=8][y=5]').append('<img class="white king" src="' + pathToLight + ' K.ico">');

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