var celdas_array = new Array();
var filas = [];
var fila = [];
var TCOLUMNAS=12, TFILAS = 12;

var colorTecla = "whitesmoke";
var colorMargen = "black";
var colorCoche1 = "#5B7721";
var colorCoche2 = "#91CD72";

function rollDice1(){
    var die1 = document.getElementById("die1");
    var status1 = document.getElementById("status1");
    var d1 = Math.floor(Math.random() * 6) + 1;
    var pos1 =d1 + y1;
    die1.innerHTML = d1;
    status1.innerHTML = "Tu posicion :"+ pos1 +".";
    tiro1.innerHTML = "Tu numero de tiro es "+x1+".";
    x1 = x1+1;[]
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
	constructor(x, y, bgcolor, coche) {
		this.x = x.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          });
		this.y = y.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          });
		this.bgcolor = bgcolor;
		this.selector = "#celda"+this.x+"-"+this.y;
		this.coche = coche;
        this.manejador = document.getElementById(this.selector);
        this.manejador.addEventListener('mouseover', colorChange); 
    }
}

function tablerocircuito(){
	for(var i=1; i<TFILAS; i++){
		for(var j=1; j<TCOLUMNAS; j++){
			celdas_array.push(new Celda(i, j, "whitesmoke", 0));    
//            celdas_array[i][j].manejador.addEventListener('mouseover', colorChange); 
		}
	}
	
}

function colorChange() {
    //Función de callback, se llama desde JS en lugar de llamarse desde HTML
                console.log("click en celda: ",this.selector);
                if(this.bgcolor!="whitesmoke"){
                    this.manejador.style.background="#5B7721";
                }else{
                    this.manejador.style.background="whitesmoke";
                }
                this.manejador.style.border="1px solido #ccc";
            }
/***********
INICIO
************/
window.onload = function(){
//	canvas = document.getElementById("tCanvas");
//	if(canvas && canvas.getContext){
//		ctx = canvas.getContext("2d");
//		if(ctx){
//			tablerocircuito();
			console.log("Se ha pintado el playground!!!")
			console.log("Hay que dibujar el circuito!!!")
			console.log(celdas_array)
//		} else {
//			alert("Error al crear tu contexto");
//		}
//	}
}