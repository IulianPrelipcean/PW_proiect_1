 
onmessage = function(event) {
	if(event.data == "modificare"){
		console.log("Modificare in worker");
		this.postMessage("modifica")
	}
}

function checkForChange(){
	postMessage("verifica")
	setTimeout("checkForChange()", 500)
}

checkForChange();