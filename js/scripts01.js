"use strict";

console.log("Empieza el programa");

// ------------------- VARIABLES GLOBALES ------------------------

// capturamos el formulario de introduccion de jugador
const formulario = document.querySelector("#formNombre");

// capturamos el contenedor donde mantendremos el chat con el jugador
const contenedorEscribirJugadores = document.getElementById("chat");

var numJugadores = 0; //contador de jugadores en JSON
var arrayJugadores = new Array(); //array de jugadores

var nombre = "";
var password = "";
var id = "";
var passwordOK = false;

const myTimeout = 9000;

// -------------------- CLASE JUGADOR -------------------------------
class Jugador {
  //constructor
  constructor(nombre, password, id) {
    this.nombre = nombre;
    this.password = password;
    this.id = id;
  }
  // metodos
  getJugador() {
    return this.id + " " + this.nombre + " " + this.password;
  }
  getIdJugador() {
    return this.id;
  }
  getNombreJugador() {
    return this.nombre;
  }
  getPasswordJugador() {
    return this.password;
  }
}

/*
  funcion para leer del JSON
*/
function cargarJugadoresJSON() {
  let path = "data/datosJugadores.json";

  let request = new Request(path, {
    headers: new Headers({
      "Content-Type": "text/json",
    }),
    method: "GET",
  });

  fetch(request).then((response) => {
    response.json().then((data) => {
      console.log("Datos", data);
      aniadirJugadoresInicialesArray(data); //llamo a la función
    });
  });
}

/* 
	metodo para añadir jugadores al array cuando arranca la pagina web
*/
function aniadirJugadoresInicialesArray(data) {
  //  cargar el fichero JSON, parsearlo a objetos tipo "jugador" y añadirlos al array
  var myJSON = JSON.stringify(data);
  var objetoParseado = JSON.parse(myJSON);
  for (let i = 0; i < objetoParseado.jugador.length; i++) {
    var nuevoJugador = new Jugador(
      objetoParseado.jugador[i].nombre,
      objetoParseado.jugador[i].password,
      objetoParseado.jugador[i].id
    );
    // añadir el objeto al array
    arrayJugadores.push(nuevoJugador);
  }
  console.log("arrayJugadores: ", arrayJugadores);
}
/* 
    Metodo para crear un jugador pasandole el nombre y la password y añadirlo al array
 */
function crearJugador(nombre, password, id) {
  // crear objeto Jugador
  var nuevoJugador = new Jugador(nombre, password, id);
  // añadir el objeto al array
  arrayJugadores.push(nuevoJugador);
  console.log("arrayJugadores: ", arrayJugadores);
}

/*
	Metodo para crear el ID del jugador en funcion del ultimo
	ID que hay en el array de Jugadores
*/
function crearID() {
  // mirar el id del ultimo jugador del array y sumarle uno
  console.log(arrayJugadores[arrayJugadores.length - 1].id);
  return arrayJugadores[arrayJugadores.length - 1].id + 1;
}

function inicio() {
  //		do{
  capturarDatosJugador();
  passwordOK = false;
  //comprobar password sin caracteres especiales
  comprobarPassword(password);
  //		} while (passwordOK==false);
  //	console.log("La password no tiene caracteres especiales!!!");
  // comprobar usuario y password en json
  console.log("usuario: " + nombre);
  console.log("password: " + password);

  // crear el jugador y añadirlo al array
  //	   crearJugador(nombre,password,id)
  if (passwordOK == true) {
    if (buscarJugador(nombre, password) == true) {
      document.getElementById("chat").innerHTML =
        "Nombre de usuario y password correctos!!!";
      var url = "randomrace.html";
	  alert("Bienvenido al juego randomrace!!!")
      redirigir(url);
    } else {
      document.getElementById("chat").innerHTML =
        "Nombre de usuario y password incorrectos!!!";
    }
  }
}

function redirigir(url) {
  window.location.href = url;
}

function buscarJugador(nombre, password) {
  let encontrado = false;
  arrayJugadores.forEach(function (jugador) {
    if (jugador.nombre == nombre && jugador.password == password) {
      encontrado = true;
    }
  });
  return encontrado;
}
function capturarDatosJugador() {
  // TODO: recoger los el nombre y password del HTML
  nombre = document.getElementById("fnombre").value;
  password = document.getElementById("fpassword").value;
  id = crearID();
  //PARA MOSTRARLOS (QUITAR)
  //    document.getElementById("escribir").innerHTML=" \ Tu nombre es: "+nombre+" \
  //     <br>Tu password es: "+password+"<br>Tu id es: "+id;
  console.log("Nombre:" + nombre);
  console.log("Password:" + password);
  console.log("Id:" + id);
}

function comprobarPassword(password) {
  let error = -1;
  for (let i = password.length; i >= 0; i--) {
    if (
      (password.charCodeAt(i) > 32 && password.charCodeAt(i) < 48) ||
      (password.charCodeAt(i) > 57 && password.charCodeAt(i) < 65) ||
      (password.charCodeAt(i) > 90 && password.charCodeAt(i) < 97) ||
      password.charCodeAt(i) == 123
    ) {
      error = i;
    }
    console.log("caracter " + i + ": " + password.charCodeAt(i));
    console.log("error:" + error);
    console.log("passwordOK:" + passwordOK);
  }
  console.log("===================");
  console.log("error:" + error);
  console.log("passwordOK:" + passwordOK);

  if (error != -1) {
    //		alert("password contiene \""+password[error]+"\". Introduce otra password!!!");
    document.getElementById("fpassword").innerHTML = "";
    document.getElementById("chat").innerHTML =
      'La password contiene "' +
      password[error] +
      '". Introduce otra password!!!';
  } else {
    //		alert("password OK");
    document.getElementById("chat").innerHTML =
      "La password no contiene caracteres especiales";
    passwordOK = true;
  }
}

// ------------------- MAIN ------------------------

// TODO: añadimos los jugadores iniciales cuando empieza el programa

cargarJugadoresJSON(); //carga el fichero JSON
console.log("Jugadores cargados!!!");
console.log(arrayJugadores);
console.log("Acaba el programa");
