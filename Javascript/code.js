window.addEventListener("load", inicio);
        
function agregarFila(){
  document.getElementById("tablaprueba").insertRow(1).innerHTML = '<td id="campo1"></td><td id="campo2"></td><td id="campo3" onclick="validarFecha()"></td><td id="campo4"><input type="checkbox" id="chec"></td><td  id="modificar" ><button type="button" onclick="modificar()" class="btn btn-primary">modificar</button></td>';
}

function inicio() {
	document.getElementById("campo1").addEventListener("click", campo1);
	document.getElementById("campo2").addEventListener("click", campo2);
	document.getElementById("campo3").addEventListener("click", campo3);
}

function eliminarFila(){
	var checkbox = document.getElementById('chec');
	checkbox.addEventListener("change", eliminarFila, false);
	var checked = checkbox.checked;
	if(checked){
		var comprobacion = confirm("esta seguro de que desea borrar los elementos?");
		if (comprobacion == true) {
			document.getElementById("campo1").remove();
			document.getElementById("campo2").remove();
			document.getElementById("campo3").remove();
			document.getElementById("chec").remove();
			document.getElementById("campo4").remove();
			document.getElementById("modificar").remove();
		}
	}
}

function agregar() {
	//Crear elemento
	var texto = document.createElement("p");
	var texto2 = document.createElement("p");
	var texto3 = document.createElement("p");
	//Crear texto
	var Descripcion = document.createTextNode(prompt("Descripcion"));
	texto.appendChild(Descripcion);
	var fecha = new Date(prompt('Fecha y hora (aaaa-mm-dd hh:mm)'));
	var fecha_verificada = document.createTextNode(fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear());
	texto2.appendChild(fecha_verificada);
	var hora_verificada = document.createTextNode(fecha.getHours()+":"+fecha.getMinutes());
	texto3.appendChild(hora_verificada);
	//evento de hora
	var hoy = new Date();
	diferencia = fecha.getTime()-hoy.getTime();
	setTimeout(function(){alert("acabada!!");},diferencia);
	//Añadir atributos
	texto.setAttribute("atributo", "atributo");
	texto2.setAttribute("atributo2", "atributo2");
	texto3.setAttribute("atributo3", "atributo3");
	var cont = document.getElementById("campo1");
	var cont2 = document.getElementById("campo2");
	var cont3 = document.getElementById("campo3");
	cont.appendChild(texto);
	cont2.appendChild(texto2);
	cont3.appendChild(texto3);
        }

function modificar() {
    document.getElementById("campo1").innerHTML =prompt("Descripcion");
	parrafo.appendChild(Descripcion);
}