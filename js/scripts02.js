
var canvas, ctx;
var x1=1;
var y1=0;
var x2=1;
var y2=0;
var TCOLUMNAS=13
var TRENGLONES = 10;
var TANCHO_CUADRO=42; //ANCHO CELDA
var TMATRIZ_RENGLON = 20;
var TMATRIZ_COLUMNA = 320;

var celdas_array = new Array();
var colorTecla = "whitesmoke";
var colorMargen = "black";
var colorCoche1 = "#5B7721";
var colorCoche2 = "#91CD72";

function tablerocircuito(){
	TMATRIZ_COLUMNA = (canvas.width - (TCOLUMNAS * TANCHO_CUADRO))/2;
	//
	for(var i=0; i<TRENGLONES; i++){
		for(var j=0; j<TCOLUMNAS; j++){
			ii = j + i * TRENGLONES;
			//
			x = TMATRIZ_COLUMNA + j * TANCHO_CUADRO;
			y = TMATRIZ_RENGLON + i * TANCHO_CUADRO;
			//
			var celda = new Celda(i, j, x, y, TANCHO_CUADRO, TANCHO_CUADRO, ii);
			//
			celdas_array.push(celda);
			celda.dibuja();	
		}
	}
	
}
function rollDice1(){
    var die1 = document.getElementById("die1");
    var status1 = document.getElementById("status1");
    var d1 = Math.floor(Math.random() * 6) + 1;
    var pos1 =d1 + y1;
    die1.innerHTML = d1;
    status1.innerHTML = "Tu posicion "+ pos1 +".";
    tiro1.innerHTML = "Tu numero de tiro es "+x1+".";
    x1 = x1+1;
    y1 = pos1;
    if (pos1 > 99){
    	alert("EL juego ha terminado");
    	y1 = 0;
    }
    else {
        alert("Muevo el coche 1 hasta "+pos1);
        rollDice2();  
    }
}
function rollDice2(){
    var die2 = document.getElementById("die2");
    var status2 = document.getElementById("status2");
    var d2 = Math.floor(Math.random() * 6) + 1;
    var pos2 =d2 + y2;
    die2.innerHTML = d2;
    status2.innerHTML = "Tu posicion "+ pos2 +".";
    tiro2.innerHTML = "Tu numero de tiro es "+x2+".";
    x2 = x2+1;
    y2 = pos2;
    if (pos2 > 99){
    	alert("EL juego ha terminado");
    	y2 = 0;
    }
    else {
        alert("Muevo el coche 2 hasta "+pos2);
    }
   
}
/*******************
OBJETOS
********************/
class Celda {
	constructor(ren, col, x, y, w, h, i) {
		this.ren = ren;
		this.col = col;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.i = i;
		this.dibuja = dibujaCelda;
		this.circuito1 = marcaCelda1;
		this.circuito2 = marcaCelda2;
	}
}
function dibujaCelda(){
	ctx.save();
	ctx.fillStyle = colorTecla;
	ctx.strokeStyle = colorMargen;
	ctx.fillRect(this.x, this.y, this.w, this.h);
	ctx.strokeRect(this.x, this.y, this.w, this.h);
	ctx.restore();
}

function marcaCelda1(){
	ctx.save();
	ctx.fillStyle = colorCoche1;
	ctx.strokeStyle = colorMargen;
	ctx.fillRect(this.x, this.y, this.w, this.h);
	ctx.strokeRect(this.x, this.y, this.w, this.h);
	ctx.restore();
}

function marcaCelda2(){
	ctx.save();
	ctx.fillStyle = colorCoche2;
	ctx.strokeStyle = colorMargen;
	ctx.fillRect(this.x, this.y, this.w, this.h);
	ctx.strokeRect(this.x, this.y, this.w, this.h);
	ctx.restore();
}




/***********
INICIO
************/
window.onload = function(){
	canvas = document.getElementById("tCanvas");
	if(canvas && canvas.getContext){
		ctx = canvas.getContext("2d");
		if(ctx){
			tablerocircuito();
			console.log("Se ha pintado el playground!!!")
			console.log("Hay que dibujar el circuito!!!")
		} else {
			alert("Error al crear tu contexto");
		}
	}
}
