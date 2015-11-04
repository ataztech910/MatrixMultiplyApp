(function() {
//запуск приложения и инициализация переменных и объектов
var matrixNames = ['matrixA','matrixB'];
var cantDo = "You cant do that because count of rows in Matrix A do not eq to count of lines in Matrix B";
var data = new Array();
var matrixs = new Object();
var selectedMatrix = matrixNames[0];
matrixNames.forEach(function(item, i, arr) {
	matrixs[item] = [["",""],["",""]];
	data[item] = new Array();
	data[item]['x'] = 2;
	data[item]['y'] = 2;
});
//----------------------------------------------------------
//сброс результатов
//++обнуление массива и пересоздание
function CreateResult(x,y){
	matrixs['result'] = new Array();
	for(var i=0; i< x; i++){
		matrixs['result'][i] = new Array();
		for(var j=0; j<y; j++){
			matrixs['result'][i].push("");		
		}
	}
}
//----------------------------------------------------------
var x = data[selectedMatrix]['x'];
var y = data[selectedMatrix]['y'];
CreateResult(data['matrixA']['x'],data['matrixB']['y']);
//инициализация приложения Angular
var matrix = angular.module('matrix',[]);
//инициализация контроллера
matrix.controller('buttons', function($scope) {
			$scope.data =  new Object();
			$scope.data.arrs =  matrixs;
			//объявление связи между массивом с матрицами и глобальным объектом контроллера
//--------------------------------------------------------- 
//сброс значений матриц
			$scope.clearMatrix=function(){
				if(confirm("Очистить матрицы ? ")){
				matrixNames.forEach(function(item, i, arr) {
							matrixs[item] = [["",""],["",""]];
					  		data[item] = new Array();
					  		data[item]['x'] = 2;
					  		data[item]['y'] = 2;
					  	});
				x = 2;
				y = 2;
				$scope.data =  new Object();
				$scope.data.arrs =  matrixs;
				$(".row__col--13").addClass("row--gray");
				$(".row__col--13").removeClass("row--pink");
				CreateResult(data['matrixA']['x'],data['matrixB']['y']);
			}}
//--------------------------------------------------------- 
//смена мест матриц
			$scope.changeMatrix=function(){
			var tmp = matrixs[selectedMatrix];
			var tmpX = data[selectedMatrix]['x'];
			var tmpY = data[selectedMatrix]['y'];
			CreateResult(data['matrixA']['x'],data['matrixB']['y']);
			matrixNames.forEach(function(item, i, arr) {
			if(item!=selectedMatrix){
				var nextName = item;
				data[selectedMatrix]['x'] = data[nextName]['x'];
				data[selectedMatrix]['y'] = data[nextName]['y'];
				matrixs[selectedMatrix] = matrixs[nextName];
				matrixs[nextName] = tmp;
				data[nextName]['x'] = tmpX;
				data[nextName]['y'] = tmpY;
				x = data[selectedMatrix]['x'];
				y = data[selectedMatrix]['y'];
				stop;
			}
			});
			
		}
//--------------------------------------------------------- 
//умножение матриц
		$scope.doit = function(){
			$(".row__col--13").removeClass("row--pink");
			$scope.data.errorMessage = "";
			$(".errorMessage").show();
			if(data['matrixA']['y'] != data['matrixB']['x']){ 
				$scope.data.errorMessage = cantDo;
				$(".row__col--13").addClass("row--pink");
				$(".row__col--13").removeClass("row--gray");
				error = 1;
			}
			else{
					$(".row__col--13").removeClass("row--pink");
					$(".row__col--13").addClass("row--gray");
					$scope.data.errorMessage = "";
					for(var i=0;i<data['matrixB']['y'];i++){
						for(var j=0;j<data['matrixA']['x'];j++){
							 var tmp = 0;
							 for(var k=0;k<data['matrixB']['x'];k++) tmp+= matrixs['matrixA'][j][k]*matrixs['matrixB'][k][i];
							 matrixs['result'][j][i] = tmp;
						}	
					}
					$scope.data.arrs =  matrixs;
			}
		}
//---------------------------------------------------------
//удалить строку
		$scope.killRow = function (){
			if(x>2){
				var last = matrixs[selectedMatrix].length-1;
				matrixs[selectedMatrix].splice(last,1);
				x--;
				if(x==0){
					y=0;
				}
				data[selectedMatrix]['x'] = x;
				data[selectedMatrix]['y'] = y;
				CreateResult(data['matrixA']['x'],data['matrixB']['y']);
				$scope.data.arrs =  matrixs;
			}
		}
//---------------------------------------------------------		
//удалить столбец
		$scope.killLine = function (){
			if(x>0 && y>2){
				var last = matrixs[selectedMatrix][0].length-1;
				var stop = 0;
				matrixs[selectedMatrix].forEach(function(item, i, arr) {
					if(stop==0){
						matrixs[selectedMatrix][i].splice(last,1);	
						if(matrixs[selectedMatrix][i].length==0){
							matrixs[selectedMatrix] = new Array();
							x=0;
							stop = 1;
						}
					}
				});
				y--;
				data[selectedMatrix]['x'] = x;
				data[selectedMatrix]['y'] = y;
				CreateResult(data['matrixA']['x'],data['matrixB']['y']);
				$scope.data.arrs =  matrixs;
			}
		}  		
//---------------------------------------------------------  		    	
//добавление строки или столбца в одном методе
		$scope.addButton = function (id){
		if(id==1){
			if(x<11){
				if(x==0) {
					matrixs[selectedMatrix][x] = new Array();
					matrixs[selectedMatrix][x][y] = "";
					x++;
					y++;
				}else{
						matrixs[selectedMatrix][x] = new Array();
						for(var i = 0;i<y;i++){ 
							matrixs[selectedMatrix][x][i] = "";
						}
						x++;
				}
			}
		}
		else{
			if(y<11){
				if(matrixs[selectedMatrix].length==0) {
					matrixs[selectedMatrix][x] = new Array();
					matrixs[selectedMatrix][x][y] = "";
					x++;
					y++;
				}else{
				
					for(var i=0; i<x; i++){
						matrixs[selectedMatrix][i][y] = "";
					}
					y++;
					
				}
			}
		}
		$scope.data.arrs =  matrixs;
		data[selectedMatrix]['x'] = x;
		data[selectedMatrix]['y'] = y;
		CreateResult(data['matrixA']['x'],data['matrixB']['y']);
	}
});
//---------------------------------------------------------
//сменить выбор матрицы
$('.radioGroup').click(function(){
	if($("#matrixA-styler").hasClass()){
		selectedMatrix = matrixNames[0];
	}
	else{
		selectedMatrix = matrixNames[1];
	}
	x = data[selectedMatrix]['x'];
	y = data[selectedMatrix]['y'];
});  
//---------------------------------------------------------  
})();
//установка обработчиков событий
$(document).ready(function(){
	$(".greenbtn").mouseup(function(){
		$(this).removeClass("greenbtn--focus");
	});
	$(".greenbtn").focus(function(){
		$(this).addClass("greenbtn--focus");
	});
	$(".greenbtn").blur(function(){
		$(this).removeClass("greenbtn--focus");
	});
	$(".inputs").blur(function() {  
		$(".row__col--13").addClass("row--gray");
		$(".row__col--13").removeClass("row--blue");
	});
	$(".inputs").keypress(function() {  
		$(".row__col--13").addClass("row--blue");
		$(".row__col--13").removeClass("row--gray");
		$(".row__col--13").removeClass("row--pink");
		$(".errorMessage").hide();
	});
})
