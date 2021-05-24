
function incarcaPersoane() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {

			var  parser, xmlDoc;

			var text = this.responseText;

			parser = new DOMParser();
			xmlDoc = parser.parseFromString(text,"text/xml");

			person = xmlDoc.getElementsByTagName("numar")[0].childNodes[0].nodeValue;

			//console.log("persoane: " + person);

			person_tag = xmlDoc.getElementsByTagName("persoana");

			response_text = "<table class=\"persoane\"><tr>" +
			"<th>ID</th>" + 
			"<th>Nume</th>" +
			"<th>Prenume</th>" +
			"<th>Varsta</th>" +
			"<th>Strada</th>" +
			"<th>Numar</th>" +
			"<th>Localitate</th>" +
			"<th>Judet</th>" +
			"<th>Tara</th>" +
			"</tr>"

			for (i=0; i<person_tag.length; i++)
			{
				nume = xmlDoc.getElementsByTagName("nume")[i].childNodes[0].nodeValue;
				prenume = xmlDoc.getElementsByTagName("prenume")[i].childNodes[0].nodeValue;
				varsta = xmlDoc.getElementsByTagName("varsta")[i].childNodes[0].nodeValue;
				strada = xmlDoc.getElementsByTagName("strada")[i].childNodes[0].nodeValue;
				numar = xmlDoc.getElementsByTagName("numar")[i].childNodes[0].nodeValue;
				localitate = xmlDoc.getElementsByTagName("localitate")[i].childNodes[0].nodeValue;
				judet = xmlDoc.getElementsByTagName("judet")[i].childNodes[0].nodeValue;
				tara = xmlDoc.getElementsByTagName("tara")[i].childNodes[0].nodeValue;

				response_text += "<tr>" + 
				"<td>" + (i+1) + "</td>" + 
				"<td>" + nume + "</td>" + 
				"<td>" + prenume + "</td>" + 
				"<td>" + varsta + "</td>" + 
				"<td>" + strada + "</td>" + 
				"<td>" + numar + "</td>" + 
				"<td>" + localitate + "</td>" + 
				"<td>" + judet + "</td>" + 
				"<td>" + tara + "</td>" + 
				"</tr>";
			}

			response_text += "</table>"

			document.getElementById("continut").innerHTML = response_text;
			//console.log("text : " +response_text)

		}
	};
	xhttp.open("GET", "/Resurse/persoane.xml", true);
	xhttp.send();
}





