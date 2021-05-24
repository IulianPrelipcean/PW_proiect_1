 
import socket
import os
import gzip
import json

content_type = {
	"html": "text/html",
	"css" : "text/css",
	"js" : "application/js",
	"png" : "text/png",
	"jpg" : "text/jpeg",
	"jpeg" : "text/jpeg",
	"gif" : "text/gif", 
	"ico" : "image/x-icon",
	"json": "application/json",
	"xml" : "application/xml"
}


# creeaza un server socket
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serversocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)		# adresa va fi refolosita 
# specifica ca serverul va rula pe portul 5678, accesibil de pe orice ip al serverului
serversocket.bind(('', 5678))
# serverul poate accepta conexiuni; specifica cati clienti pot astepta la coada
serversocket.listen(5)


def getFileContent(file_path_from_request, file_type):
	file_path_general = "/home/iulian0user/Facultate/Anul_3/Semestrul_2/Programare_web/continut/"	
	file_path_real = file_path_general + file_path_from_request

	try:
		if( file_type == "ico" or file_type == "png" ):
			f = open(file_path_real, "rb")
		else:
			f = open(file_path_real, "r", encoding="utf-8")
		content = f.read()
	except OSError:
		content = ""

	return content


def getFileSize(file_path_from_request):
	file_path_general = "/home/iulian0user/Facultate/Anul_3/Semestrul_2/Programare_web/continut/"	
	file_path_real = file_path_general + file_path_from_request
	file_size = os.path.getsize(file_path_real)
	return file_size



while True:
	print ('#########################################################################')
	print ('Serverul asculta potentiali clienti.')
	# asteapta conectarea unui client la server
	# metoda `accept` este blocanta => clientsocket, care reprezinta socket-ul corespunzator clientului conectat
	(clientsocket, address) = serversocket.accept()
	print ('S-a conectat un client.')
	# se proceseaza cererea si se citeste prima linie de text
	cerere = ''
	linieDeStart = ''
	while True:
		data = clientsocket.recv(1024)		
		cerere = cerere + data.decode()
		print ('S-a citit mesajul: \n---------------------------\n' + cerere + '\n---------------------------')
		pozitie = cerere.find('\r\n')
		print ('\n\npozitie = ' + str(pozitie) + '\n\n')
		
		if (pozitie > -1):
			linieDeStart = cerere[0:pozitie]
			print ('S-a citit linia de start din cerere: ##### ' + linieDeStart + ' #####')
			break
	print ('S-a terminat cititrea.')

	# interpretarea sirului de caractere `linieDeStart` pentru a extrage numele resursei cerute
	request_array = linieDeStart.split(" ")	

	# request_type contine tipul de cerere: GET/POST/... 
	request_type = request_array[0]

	if(request_type == "GET"):
		# file_type va contine la indexul[1] tipul fisierului: html/css/ico/png/js...
		file_type = request_array[1].split(".")
		print("type = ", file_type)


		# request_array contine la indexul[1] numele fisierului care trebuie incarcat: index.html/invat_js.html.....
		file_request = request_array[1]
		file_content = getFileContent(file_request, file_type[1])
		

		content_compressed = gzip.compress(bytes("", "utf-8"))
		if (file_content == ""):
			response = "HTTP/1.1 404 Not Found"
		else:
			# construim raspunsul
			response = "HTTP/1.1 200 OK" + "\n"
			response += "Contet-Lenght: " + str(getFileSize(file_request)) + "\n"
			response += "Contet-Type: " + str(content_type[file_type[1]]) + "\n"
			response += "Content-Encoding: " + "gzip" + "\n"
			response += "Server: " + socket.gethostname() + "\n"
			response += "\r\n"

			if(file_type[1] == "ico" or file_type[1] == "png"):
				content_compressed = gzip.compress(file_content)
			else:
				content_compressed = gzip.compress(bytes(file_content, "utf-8"))

		# trimitem raspunsul la client
		clientsocket.send(bytes(response, 'utf-8') + content_compressed)
		
		#str(len(mesaj.encode('utf-8')))

		clientsocket.close()
		print ('S-a terminat comunicarea cu clientul.')	
	elif(request_type == "POST"):
		if(request_array[1] == "/api/utilizatori"):
			# preiau din cerere utilizatorul si parola trimise cu headerul "Data-content"
			poz = cerere.find('Data-content')

			print("last: " + cerere[poz:])

			# preiau userul si parola (2 metode)
			#user_data = (cerere[poz:].split(":")[1]).split("&")
			data_from_cerere = cerere[poz:].split(":")
			user_data = data_from_cerere[1].split("&")

			print("data user: " + str(user_data))

			user_dict = {}
			user_dict["utilizator"] = user_data[0]
			user_dict["parola"] = user_data[1]


			with open("/home/iulian0user/Facultate/Anul_3/Semestrul_2/Programare_web/continut/Resurse/utilizatori.json", "r+") as json_file:
				data = json.load(json_file)
				print("jsondata  : " + str(data))
				data.append(user_dict)
				#data.update(user_dict)
				json_file.seek(0)
				json.dump(data, json_file)


			


	