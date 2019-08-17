function toggleMostrar(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function seleccionar(id){
    if (seleccionActual == ""){
        document.getElementById(id).style.background="#D3D3D3"
        seleccionActual = id;
    }else if (seleccionActual == id){
        document.getElementById(id).style.background="#ffffff"
        seleccionActual = "";
    }else{
        document.getElementById(seleccionActual).style.background="#ffffff"
        seleccionActual=id;
        document.getElementById(id).style.background="#D3D3D3"
    }
}
function sinSeleccion(){
    if (seleccionActual!=""){
        document.getElementById(seleccionActual).style.background="#ffffff"
        seleccionActual=""
    }
}
function directorioAnterior(){
    var funcion = "directorioAnterior"
    var argumento = ".."

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `funciones.php?funcion=${funcion}&argumento=${argumento}`, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respuesta = this.responseText
            alert(respuesta)
        }
        
    };
}
function abrirArchivo(archivo){
    var funcion = "abrirArchivo"
    var argumento = archivo

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `funciones.php?funcion=${funcion}&argumento=${argumento}`, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respuesta = this.responseText
            document.getElementById("caja-texto").innerHTML=respuesta
            document.getElementById("titulo-barra-texto").innerHTML=archivo
            toggleMostrar("visor-texto")
        }
        
    };
}
function abrirCarpeta(carpeta){
    var funcion = "abrirCarpeta"
    var argumento = carpeta

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `funciones.php?funcion=${funcion}&argumento=${argumento}`, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respuesta = this.responseText
        }
        
    };
}
function cambiarPath(path){
    var funcion = "cambiarPath"
    var argumento = path

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `funciones.php?funcion=${funcion}&argumento=${argumento}`, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respuesta = this.responseText
            alert(respuesta)
        }
        
    };
}
var seleccionActual = "";
var pwd="";
