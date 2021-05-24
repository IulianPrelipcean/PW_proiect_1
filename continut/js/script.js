
// ----------------------   sectiunea 1  ---------------------------------

// functie care apeleaza toate functiile de la sectiunea 1
function afiseazaInformatii(){
    afiseazaDataCurenta();
    afiseazaAdresaUrl();
    afiseazaVersiuneBrowser();
    afiseazaNumeBrowser();
    afiseazaSistemDeOperare();
    getLocation();
    var time = setInterval(afiseazaOraCurenta, 1000) 
}


// afisarea datei 
function afiseazaDataCurenta(){
    var today =  new Date()
    var date = today.getFullYear()+ ' - ' + (today.getMonth()+1)+ ' - ' + today.getDate();
    document.getElementById("data_curenta").innerHTML = date;
}


// afisarea orei curente  
function afiseazaOraCurenta(){
    var d =  new Date()
    document.getElementById("ora_curenta").innerHTML = d.toLocaleTimeString();
}


// afisarea adresei url
function afiseazaAdresaUrl(){
    document.getElementById("adresa_url").innerHTML = window.location.href;
}


// afiseaza versiunea browserului
function afiseazaVersiuneBrowser(){
    document.getElementById("versiune_browser").innerHTML = navigator.appVersion;
}

// afiseaza numele browserului
function afiseazaNumeBrowser(){
    document.getElementById("nume_browser").innerHTML = navigator.appName;
}

// afiseaza sistemul de operare folosit
function afiseazaSistemDeOperare(){
    document.getElementById("sistem_operare").innerHTML = navigator.platform;
}

// afiseaza locatia
function getLocation() {
    var x = document.getElementById("locatie");
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    var x = document.getElementById("locatie");
    x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}


// ----------------------   sectiunea 2  ---------------------------------


function genereazaNumere(){
    random_array = []
    numere_preluate = []

    for (i=1; i<9; i++)
    {
        // se preiau numerele introduse de utilizator
        numere_preluate[i] = document.getElementById("numar_"+i).value.toUpperCase(0);

        // se genereaza si se afiseaza numerele alese
        document.getElementById("numarul" + i).innerHTML = "";
        random_array[i] = Math.floor(Math.random()  * 254 + 1);
        document.getElementById("numarul" + i).innerHTML += random_array[i].toString(16).toUpperCase(0);
    }

    // for(i=1; i<9; i++)
    // {
    //     console.log(numere_preluate[i])
    // }   
    numere_corecte = true;
    for(i=1; i<9; i++)
    {
        find = false;
        for(j=1; j<9; j++)
        {
            if(numere_preluate[i] == random_array[j])
            {
                find = true;
            }
        }
        if(find==false)
        {
            numere_corecte = false;
        }
    }

    if(numere_corecte == true)
    {
        document.getElementById("rezultat_extragere").innerHTML = "Felicitari, ai ales numerele castigatoare!";
    }
    else
    {
        document.getElementById("rezultat_extragere").innerHTML = "Mai incearca...";
    }

}


// ----------------------   sectiunea 3  ---------------------------------


function deseneazaFunction(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    
    var x_coordinate_initial = 0;
    var y_coordinate_initial = 0;
    var x_coordinate = 0;
    var y_coordinate = 0;
    
    //var clear = false;
    
    function printMousePos(event) {
    
        // preluam culorile de la input
        let culoare_margine = document.querySelector("#culoare_margine");
        let culoare_umplere = document.querySelector("#culoare_umplere");
    
        // preluam pozitia canvasului pentru ca se modifica la scroll
        var element = document.getElementById('myCanvas');
        var viewportOffset = element.getBoundingClientRect();
        var top = viewportOffset.top;       // top = distanta relativa(in functie de scroll) din susul paginii
    
        //console.log(top);
        
    
        if(x_coordinate_initial == 0 || y_coordinate_initial == 0)      // pentru primul punct ales inca nu desenam
        {   
            x_coordinate_initial = event.clientX - 50;
            y_coordinate_initial = event.clientY - top;
        }
        else        // desenam fiindca avem punctele 
        {
            // avand in vedere ca ferestra de desenare are coordonate la 0,0 trebuie sa aducem coordonatele 
            // mouse-ului in interiorul canvasului
            x_coordinate = event.clientX - 50 - x_coordinate_initial;       
            y_coordinate = event.clientY - top - y_coordinate_initial;
    
    
    
            ctx.strokeStyle = culoare_margine.value; 
            ctx.strokeRect(x_coordinate_initial, y_coordinate_initial, x_coordinate, y_coordinate);
    
            ctx.fillRect(x_coordinate_initial, y_coordinate_initial, x_coordinate, y_coordinate);
            ctx.fillStyle = culoare_umplere.value;
            ctx.fill();
    
            // console.log("interior");
            // console.log("x_init= " + x_coordinate_initial);
            // console.log("y_init = " + y_coordinate_initial);
    
            // console.log("x= " + x_coordinate);
            // console.log("y = " + y_coordinate);
    
    
            x_coordinate_initial = 0;
            y_coordinate_initial = 0;
            x_coordinate = 0;
            y_coordinate = 0;
        }
    
        // console.log("exterior");
        // console.log("x_init= " + x_coordinate_initial);
        // console.log("y_init = " + y_coordinate_initial);
    
        // console.log("x= " + x_coordinate);
        // console.log("y = " + y_coordinate);
    }
      
    //document.addEventListener("click", printMousePos);
    
    
    this.stergeDesenVar = function stergeDesen(){
        ctx.clearRect(0,0, 500, 300);
        clear=true;
        deseneazaFunction()
        //ctx.clear()
    }
    
    canvas.addEventListener('mousedown', e => {
        document.addEventListener("click", printMousePos);
    });

}






// ----------------------   sectiunea 4  ---------------------------------

 
var arrHead = new Array();
arrHead = [''];

function createTable(){
    var din_table = document.createElement('table');
    din_table.setAttribute('id', 'dinTable');
    din_table.setAttribute('border', '1px');

    var tr = din_table.insertRow(-1);
    for(var i=0; i<arrHead.length; i++)
    {
        var th = document.createElement('th');
        th.innerHTML = arrHead[i];
        tr.appendChild(th);
    }

    var div = document.getElementById('continut_tabel');
    div.appendChild(din_table);
}

function adaugaRand(){
    var din_table = document.getElementById('dinTable');

    var numar_rand = document.getElementById("numar_rand"); //numarul unde va fi introdus randul
    var total_randuri = din_table.rows.length;  // numarul de randuri existente
    var tr;
    var culoare_rand = document.getElementById("culoare_element_rand");

    //console.log("culoare" + culoare_rand.value);
    console.log("gg= " + numar_rand.value);
    console.log("dd= " + total_randuri);


    // daca nu se specifica o valoare pentru rand i se atribuie ca valoare nr totala de randuri
    if(numar_rand.value == '')
    {
        numar_rand.value = total_randuri;
    }

    // primul rand se introduce separat
    if(total_randuri == 1)
    {
        tr = din_table.insertRow(total_randuri);
    }
    else
    {
        // pt un numar de rand invalid se introduce la final randul
        if(numar_rand.value < total_randuri)
        {
            tr = din_table.insertRow(numar_rand.value);
        }
        else
        {
            tr = din_table.insertRow(total_randuri);
        }
    }

    // pentru randul introdus se adauga celulele
    for(var i=0; i<arrHead.length; i++)
    {
        var td = document.createElement('td');
        td = tr.insertCell(i);
        td.style.backgroundColor = culoare_rand.value;  // setam culoarea de fundal a celulei
    }
}


function adaugaColoana(){
    var din_table = document.getElementById('dinTable');

    var numar_coloana = document.getElementById("numar_coloana");           // numarul unde va fi introdus coloana
    var total_coloane = din_table.rows[0].cells.length;                     // numarul de coloane existente
    var total_randuri = din_table.rows.length;                              // numarul de randuri existente
    var culoare_coloana = document.getElementById("culoare_element_coloana");     // culoarea coloanei

    console.log("gg= " + numar_coloana.value);
    console.log("tot= " + total_coloane);


    // daca nu se specifica o valoare pentru rand i se atribuie ca valoare nr totala de randuri
    if(numar_coloana.value == '')
    {
        numar_coloana.value = total_coloane;
    }

    
    // pt un numar de rand invalid se introduce la final randul
    if(numar_coloana.value < total_coloane)
    {
        for(var i=0; i<total_randuri; i++)
        {
            var row_temp = document.getElementById('dinTable').rows[i];         // preia un rand (randul i)
            td = row_temp.insertCell(numar_coloana.value);                      // adauga o celula la pozitia "numar_coloana"
            td.style.backgroundColor = culoare_coloana.value;           // setam culoarea de fundal a celulei
        }
        arrHead.push('');
    }
    else
    {
        for(var i=0; i<total_randuri; i++)
        {
            var row_temp = document.getElementById('dinTable').rows[i];         // preia un rand (randul i)
            td = row_temp.insertCell(total_coloane);                            // adauga o celula la pozitia "numar_coloana"
            td.style.backgroundColor = culoare_coloana.value;           // setam culoarea de fundal a celulei
        }
        arrHead.push('');
    }
    
}



// -------------------------  lab7 --------------------

function schimbaContinut(resursa, jsFisier, jsFunctie){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("continut").innerHTML = this.responseText;
            if (jsFisier) {
                var elementScript = document.createElement('script');
                elementScript.onload = function () {
                    console.log("hello");
                    if (jsFunctie) {
                        window[jsFunctie]();
                    }
                };
                elementScript.src = jsFisier;
                document.head.appendChild(elementScript);
            } else {
                if (jsFunctie) {
                    window[jsFunctie]();
                }
            }
        }
    };

    fisier = resursa + ".html"
    console.log(fisier)
    xhttp.open("GET", fisier, true);
    xhttp.send();
}


function validareUtilizator() {
    // se preiau datele introduse de utilizator
	nume_utilizator_formular = document.getElementById("utilizator").value;
	parola_formular = document.getElementById("parola").value;

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
            // se preiau datele din fisierul "utilizatori.json"
			var text = this.responseText;
			obj = JSON.parse(text);

            //console.log("lungime: " + obj.length)

            // in for se verifica daca datele introduse sunt valide, urmate de un mesaj de informare
            for (var i=0; i<obj.length; i++)
            {
                nume_utilizator = obj[i].utilizator;
                parola = obj[i].parola;
                //console.log("nume ==== " + nume_utilizator)
            

                if(nume_utilizator_formular == nume_utilizator && parola_formular == parola)
                {
                    document.getElementById("mesaj_validare").innerHTML = "Datele sunt corecte!";
                    break;  // daca gasim un user iesim pentru a nu suprapune mesajul de validare

                }
                else{
                    document.getElementById("mesaj_validare").innerHTML = "Parola sau nume de utilizator incorecte!";
                }
            }
		}
	};
	xhttp.open("GET", "/Resurse/utilizatori.json", true);
	xhttp.send();
}


function cerereUtilizatori(){           // functie de salvare a datelor din "inregistrare.html"
    // se preiau doar valorile din campurile utilizator si parola
    utilizator = document.getElementById("nume_utilizator").value;
	parola = document.getElementById("parola").value;

    var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function(){
    //     if(this.readyState = 4 && this.status == 200){
    //     }
    // };

    xhttp.open("POST", "/api/utilizatori", true);
    xhttp.setRequestHeader('Content-Type', 'application/json')
    xhttp.send("Data-content:" + utilizator+"&"+parola);

}

// cand este apelata schimba clasa care face modificarile asupra barei de meniu
function responsiveNav() {  
    var x = document.getElementById("myMenubar");
    if (x.className === "menuBar") {
      x.className += " responsiveMenu";
    } else {
      x.className = "menuBar";
    }
}


