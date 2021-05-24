
// functie care seteaza modul de stocare(implicit se seteaza <localStorage> !!)
var optiuneStocare = "localStorage";
function alegeStocare(){
	optiuneStocare = document.getElementById("optiuneStocare").value;
	if(optiuneStocare == "localStorage")
	{
		optiuneStocare = "localStorage";
	}
	else if(optiuneStocare == "indexedDB"){
		optiuneStocare = "indexedDB";	
	}
}

// ------ pentru lucru cu indexed DB ---------------------
var db;
var request = indexedDB.open("produseDatabase", 1)			// se creeaza baza de date cu versiunea 1
var objectStore;											
request.onupgradeneeded = event => {
	db = event.target.result;
	objectStore = db.createObjectStore("listaProduse", {keyPath: "id"});
	//console.log("upgrade cu succes")
}
request.onsuccess = event => {
	db = event.target.result;
	//console.log("creata cu succes")
}
request.onerror = event =>{
	//console.log("eroare la crere db")
}
// -----------------------------------------------


class Produs{
	constructor(denumire, cantitate){
		this.denumire = denumire;
		this.cantitate = cantitate;
	}
}

// clasa pentru lucru cu localStorage
class StocareLocala extends Produs{
	constructor(denumire, cantitate){
		super(denumire, cantitate);
	}
	adaugaProdus(){
		var produs = {
			nume: denumire,
			cantitate : cantitate
		}
		// preiau dimensiunea lui localStorage
		var current_id = localStorage.length;
	
		// adaug elementul on localStorage pe baza id-ului extras
		localStorage.setItem(current_id+1, JSON.stringify(produs));
	}

	afiseazaProdus(){
		var result = ""

		result = "<table class=\"format_tabel\"><tr>" + 
		"<th>ID</th>" +
		"<th>Nume Produs</th>" + 
		"<th>Cantitate</th>" +
		"</tr>"

		for (var i=1; i<=localStorage.length; i++)
		{
			var produs = JSON.parse(localStorage.getItem(i));
			result += "<tr>" + 
			"<td>" + i + "</td>" +
			"<td>" + produs.nume + "</td>" +
			"<td>" + produs.cantitate + "</td>" +
			"</tr>"
			//console.log("produs*****= " + result)
		}

		result += "</table>"

		document.getElementById("produse").innerHTML = result; 
	}

	stergeProdus(){
		localStorage.clear();
		var result = "<table class=\"format_tabel\"><tr>" + 
		"<th>ID</th>" +
		"<th>Nume Produs</th>" + 
		"<th>Cantitate</th>" +
		"</tr>"
		result += "</table>"
	
		document.getElementById("produse").innerHTML = result; 
	}
}



// clasa pentru lucru cu indexedDB
class IndexedDB extends Produs{
	constructor(denumire, cantitate){
		super(denumire, cantitate);
	}

	adaugaProdus(){
		var transaction = db.transaction("listaProduse", "readwrite")
		transaction.onerror = event => {
			console.log("eroare la adaugare")
		}

		var numberOfQuery = 0;

		var objectStoreAdd = transaction.objectStore("listaProduse")
		var countRequest = objectStoreAdd.count()
		countRequest.onsuccess = function() {
			numberOfQuery = countRequest.result;
			console.log("in: " + numberOfQuery)
			var produs = {
				id: numberOfQuery,
				nume: denumire,
				cantitate : cantitate
			}
			objectStoreAdd.add(produs)
		}
		console.log("out: " + numberOfQuery)
		console.log("in adauga")
	}

	afiseazaProdus(){
		var transaction = db.transaction("listaProduse", "readonly")
		transaction.onerror = event => {
			console.log("eroare la adaugare")
		}
		var objectStoreView = transaction.objectStore("listaProduse")

		var result = ""

		result = "<table class=\"format_tabel\"><tr>" + 
		"<th>ID</th>" +
		"<th>Nume Produs</th>" + 
		"<th>Cantitate</th>" +
		"</tr>"

		var request = objectStoreView.openCursor()
		request.onsuccess = event =>{
			var cursor = event.target.result
			if(cursor)
			{
				result += "<tr>" + 
				"<td>" + cursor.key + "</td>" +
				"<td>" + cursor.value.nume + "</td>" +
				"<td>" + cursor.value.cantitate + "</td>" +
				"</tr>"
				//console.log(result)
				//console.log(`key: ${cursor.key} - nume:  ${cursor.value.nume} - cantitate:  ${cursor.value.cantitate}`)
				cursor.continue()
			}
			else{
				result += "</table>"
				document.getElementById("produse").innerHTML = result; 
			}
		} 
	}

	stergeProdus(){
		var transaction = db.transaction("listaProduse", "readwrite")
		transaction.onerror = event => {
			console.log("eroare la adaugare")
		}
		var objectStoreDelete = transaction.objectStore("listaProduse")
	
		var request = objectStoreDelete.openCursor()
		request.onsuccess = event =>{
			var cursor = event.target.result
			if(cursor)
			{
				objectStoreDelete.delete(cursor.key)
				//console.log(`key: ${cursor.key} - nume:  ${cursor.value.nume} - cantitate:  ${cursor.value.cantitate}`)
				cursor.continue()
			}
		}
		var result = "<table class=\"format_tabel\"><tr>" + 
		"<th>ID</th>" +
		"<th>Nume Produs</th>" + 
		"<th>Cantitate</th>" +
		"</tr>"
		result += "</table>"
	
		document.getElementById("produse").innerHTML = result;  
	}
}


// se declara cate un obiect pentru fiecare dintre clase
var produsLocalStorage = new StocareLocala();
var produsIndexedDB = new IndexedDB();

function adaugaProdus(){
	// se preiau datele din campurile din pagina
	denumire = document.getElementById("nume_produs").value;
	cantitate = document.getElementById("cantitate").value;

	if(optiuneStocare == "localStorage")
	{	
		produsLocalStorage = new StocareLocala(denumire, cantitate)
		produsLocalStorage.adaugaProdus()
	}else if(optiuneStocare == "indexedDB"){
		produsIndexedDB = new IndexedDB(denumire, cantitate)
		produsIndexedDB.adaugaProdus()
		produsIndexedDB.afiseazaProdus();
	}
}

function afiseazaProdus(){

	if(optiuneStocare == "localStorage")
	{	
		produsLocalStorage.afiseazaProdus()
	}else if(optiuneStocare == "indexedDB"){
		produsIndexedDB.afiseazaProdus();
	}
}

function stergeProdus(){

	if(optiuneStocare == "localStorage")
	{	
		produsLocalStorage.stergeProdus()
	}else if(optiuneStocare == "indexedDB"){
		produsIndexedDB.stergeProdus();
		produsIndexedDB.afiseazaProdus();
	}
}


// partea cu worker (functioneala doar pentru localStorage)
if(window.Worker){
	var worker = new Worker("js/worker.js");			// se declara un obiect cu legatura catre worker.js
	var oldStorageLength = localStorage.length;			// se preia dimensiunea lui localStorage
	worker.onmessage = function(event){
		if(event.data == "verifica"){					
			if(oldStorageLength < localStorage.length){
				worker.postMessage("modificare")
				oldStorageLength = localStorage.length;
			}
		}
		else if(event.data == "modifica"){
			//console.log("sunt in modifica cuparaturi.js")
			afiseazaProdus()		// pentru cazul in care dupa verificare(mai sus) s-a detectat o modificare se reafiseaza tabelul
		}
	}
}

