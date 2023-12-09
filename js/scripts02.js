
var TODAS = COLUMNAS * RENGLONES;
var MINAS = COLUMNAS * 2;
var VECINOS = 8;

var x1=1;
var y1=0;
var x2=1;
var y2=0;
var canvas, ctx;
var TCOLUMNAS=13
var TRENGLONES = 10;
var TANCHO_CUADRO=40
var TMATRIZ_RENGLON = 20;
var TMATRIZ_COLUMNA = 320;
function tablerocircuito(){
//	banderaMarca = new Bandera();
	TMATRIZ_COLUMNA = (canvas.width - (TCOLUMNAS * TANCHO_CUADRO))/2;
	//
	for(var i=0; i<TRENGLONES; i++){
		for(var j=0; j<TCOLUMNAS; j++){
			ii = j + i * TRENGLONES;
			//
			x = TMATRIZ_COLUMNA + j * TANCHO_CUADRO;
			y = TMATRIZ_RENGLON + i * TANCHO_CUADRO;
			//
			var celda = new Celda(i, j, x, y, TANCHO_CUADRO, TANCHO_CUADRO, ii, 0, 0);
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

/***********
INICIO
************/
window.onload = function(){
	canvas = document.getElementById("#tCanvas");
	if(canvas && canvas.getContext){
		ctx = canvas.getContext("2d");
		if(ctx){
			tablerocircuito();
//			generaMinas();
//			calculaVecinos();
//			marcador();
//			canvas.addEventListener("click", selecciona, false);
		} else {
			alert("Error al crear tu contexto");
		}
	}
}

/*************
VARIABLES
***************/
var canvas, ctx;
var COLUMNAS = 10;
var RENGLONES = 10;
var TODAS = COLUMNAS * RENGLONES;
var MINAS = COLUMNAS * 2;
var VECINOS = 8;
var MATRIZ_RENGLON = 20;
var MATRIZ_COLUMNA = 320;
var ANCHO_CUADRO = 40;
//Marcador
var numeroMinas = 0;
var minasEncontradas = 0;
var minasMarcadas = 0;
//ESTADOS
var CUBIERTO = 0;
var DESCUBIERTO = 1;
var MARCA_MINA = 2;
var BOMBA = 9;
var OK = 14;
//
var celdas_array = new Array();
var colorTecla = "blue";
var colorMargen = "yellow";
var colorVoltea = "cyan";
var banderaMarca;
/*******************
OBJETOS
********************/
function Celda(ren, col, x, y, w, h, i, minas, estado){
	this.ren = ren;
	this.col = col;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.i = i;
	this.minas = minas;
	this.estado = estado;
	//
	this.dibuja = dibujaCelda;
	this.voltea = volteaCelda;
	this.marca = marcaCelda;	
}
function dibujaCelda(){
	ctx.save();
	ctx.fillStyle = colorTecla;
	ctx.strokeStyle = colorMargen;
	ctx.fillRect(this.x, this.y, this.w, this.h);
	ctx.strokeRect(this.x, this.y, this.w, this.h);
	ctx.restore();
}
function volteaCelda(){
	ctx.save();
	ctx.fillStyle = colorVoltea;
	ctx.strokeStyle = colorMargen;
	ctx.fillRect(this.x, this.y, this.w, this.h);
	//
	ctx.fillStyle = "black";
	ctx.font = "bold 20px Courier";
	//
	if(this.minas ==0){
		ctx.fillText(" ", this.x+this.w/2-5, this.y+this.h/2+5);
	} else if(this.minas == BOMBA){
		ctx.fillText("*", this.x+this.w/2-5, this.y+this.h/2+5);
	} else if(this.minas == OK){
		ctx.fillText("OK", this.x+this.w/2-6, this.y+this.h/2+5);
	} else {
		ctx.fillText(this.minas, this.x+this.w/2-5, this.y+this.h/2+5);
	}
	ctx.restore();
}
function marcaCelda(){
	ctx.save();
	ctx.fillStyle = colorTecla;
	ctx.strokeStyle = colorMargen;
	ctx.fillRect(this.x, this.y, this.w, this.h);
	ctx.strokeRect(this.x, this.y, this.w, this.h);
	ctx.fillStyle = "red";
	ctx.font = "bold 20px Courier";
	if(this.estado ==0){
		ctx.fillText("?", this.x+this.w/2-5, this.y+this.h/2+5);
		this.estado = MARCA_MINA;
		minasMarcadas++;
		MINAS--;
		if(MINAS==0) findelJuego();
	} else {
		ctx.fillText(" ", this.x+this.w/2-5, this.y+this.h/2+5);
		this.estado = CUBIERTO;
		minasMarcadas--;
		MINAS++;
	}
	ctx.restore()
	marcador();
}
function Bandera(){
	this.x = 610;
	this.y = 445;
	this.w = 280;
	this.h = 30;
	this.estado = false;	
}

function ajusta(xx, yy){
	var posCanvas = canvas.getBoundingClientRect();
	var x = xx - posCanvas.left;
	var y = yy - posCanvas.top;
	return {x:x, y:y}
}
function selecciona(e){
	var pos = ajusta(e.clientX, e.clientY);	
	var x = pos.x;
	var y = pos.y;
	var celda;
	//
	for(var i=0; i<celdas_array.length; i++){
		celda = celdas_array[i];
		if((x >celda.x)&&(x<celda.x+celda.w)&&(y>celda.y)&&(y<celda.y+celda.h)){
			break;
		}
	}
	if(i<celdas_array.length){
		if(banderaMarca.estado){
			celda.marca();
		} else {
			celda.voltea();
			if(celda.minas == BOMBA){
				findeJuego();
			} else if(celda.estado==CUBIERTO){
				buscaBlanco(i);
			}		
		}
	} else if((x>banderaMarca.x)&&(x<banderaMarca.x+banderaMarca.w)&&(y>banderaMarca.y)&&(y<banderaMarca.y+banderaMarca.h)){
		banderaMarca.estado = !banderaMarca.estado;
		estadoBandera();	
	}
}
function findeJuego(){
	var indice, columnaVecino, renglonVecino, i, j, celda;
	for(i=0; i<RENGLONES; i++){
		for(j=0; j<COLUMNAS; j++){	
			indice = j + i * RENGLONES;
			celda = celdas_array[indice];
			columnaVecino = celda.col;
			renglonVecino = celda.ren;
			if(celda.minas == BOMBA &&
			 celda.estado ==MARCA_MINA){
					minasEncontradas++;
					celda.minas = OK;
			}
			celda.voltea();
			celda.estado = DESCUBIERTO;
		}
	}
	marcador();
}
function buscaBlanco(numCelda){
	for(var i=0; i<VECINOS; i++){
		ii = indiceVecino(numCelda, i);
		//Si existe vecino
		if(ii>-1){
			columnaVecino = celdas_array[ii].col;
			reglonVecino = celdas_array[ii].ren;
			celda = celdas_array[ii];
			//Si es blanco
			if(celda.minas==0){
				if(celda.estado==CUBIERTO){
					celda.voltea();
					celda.estado = DESCUBIERTO;
					buscaBlanco(ii);	
				}
			} else {
				if(celda.minas != BOMBA && celda.estado==CUBIERTO){
					celda.voltea();
					celda.estado = DESCUBIERTO;	
				}
			}
		}
	}
	return 0;
}
function generaMinas(){
	var celda, i;
	do{
		i = Math.floor(Math.random()*celdas_array.length);
		celda = celdas_array[i];
		if(celda.minas != BOMBA){
			celda.minas = BOMBA;
			console.log(celda.ren+", "+celda.col+", "+i);
			numeroMinas++;	
		}
	}while(numeroMinas<MINAS);
}
function marcador(){
	ctx.save();
	ctx.clearRect(50, 440, 850, 40);
	ctx.strokeStyle = colorMargen;
	ctx.strokeRect(50,440,850,40);
	//
	ctx.fillStyle = "black";
	ctx.font = "bold 20px Courier";
	ctx.fillText("MINAS: ",80,465);
	ctx.fillText("MARCADAS: ",240,465);
	ctx.fillText("ENCONTRADAS: ",420,465);
	//
	ctx.fillStyle = "blue";
	ctx.fillText(MINAS,160,465);
	ctx.fillText(minasMarcadas,350,465);
	ctx.fillText(minasEncontradas,570,465);
	//
	estadoBandera();
	//
	ctx.restore();
}
function estadoBandera(){
	ctx.save();
	ctx.clearRect(banderaMarca.x, banderaMarca.y, banderaMarca.w, banderaMarca.h);
	ctx.font = "bold 20px Courier";
	if(banderaMarca.estado){
		ctx.fillStyle = "white";
		ctx.fillText("BANDERA MARCA",640,465);
		ctx.fillStyle = "red";
		ctx.fillText(banderaMarca.estado,810,465);
	} else {
		ctx.fillStyle = "black";
		ctx.fillText("BANDERA MARCA",640,465);
		ctx.fillStyle = "blue";
		ctx.fillText(banderaMarca.estado,810,465);
	}
	ctx.restore();
}
function calculaVecinos(){
	var celda;
	for(var i=0; i<celdas_array.length; i++){
		celda = celdas_array[i];
		console.log("Celda antes: "+celda.minas);
		if(celda.minas != BOMBA){
			for(var j=0; j<VECINOS; j++){
				celda.minas += verificaVecino(i, j);	
			}
		}
	}
}
function verificaVecino(indice, vecino){
	var salida = 0;
	var vecino = indiceVecino(indice, vecino);
	var celda;
	if(vecino>0){
		celda = celdas_array[vecino];
		if(celda.minas == BOMBA){
			salida = 1;
		}
	}
	return salida;
}
function indiceVecino(indice, numVecino){
	var renglonVecino = celdas_array[indice].ren;
	var columnaVecino = celdas_array[indice].col;
	if(numVecino==0){
		renglonVecino--;
		columnaVecino--;
	} else if(numVecino==1){
		renglonVecino--;
	} else if(numVecino==2){
		renglonVecino--;
		columnaVecino++;
	} else if(numVecino==3){
		columnaVecino++;
	} else if(numVecino==4){
		renglonVecino++;
		columnaVecino++;
	} else if(numVecino==5){
		renglonVecino++;
	} else if(numVecino==6){
		renglonVecino++;
		columnaVecino--;
	} else if(numVecino==7){
		columnaVecino--;
	}
	if(columnaVecino < 0 || renglonVecino < 0){
		return -1
	}
	if(columnaVecino == COLUMNAS || renglonVecino == RENGLONES){
		return -1
	}
	return columnaVecino + renglonVecino * RENGLONES;
}
/***********
INICIO
************
window.onload = function(){
	canvas = document.getElementById("miCanvas");
	if(canvas && canvas.getContext){
		ctx = canvas.getContext("2d");
		if(ctx){
			tablero();
			generaMinas();
			calculaVecinos();
			marcador();
			canvas.addEventListener("click", selecciona, false);
		} else {
			alert("Error al crear tu contexto");
		}
	}
}
*/