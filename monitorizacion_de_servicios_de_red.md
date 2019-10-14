## MONITORIZACIÓN DE SERVICIOS DE RED  


### CAMBIO PARA QUE ESCUCHE POR UN PUERTO DISTINTO  
Por defecto los servidores SSH utilizan el puerto 22 para las conexiones.  
Es recomendable cambiar este número de puerto, para evitar que bots o cibercriminales puedan intentar iniciar sesión,  
aunque por sí solo esto no proporciona seguridad, sí podremos pasar desapercibidos a los escaneos masivos desde Internet.

Si por ejemplo queremos usar el puerto 22445 debemos poner en el fichero de configuración lo siguiente:  
"PORT " puerto"


### CREA UNA LISTA BLANCA DE USUARIOS PERMITIDOS  
Por un lado, podemos crear una lista blanca por usuarios o por ips, vamos a crearla primero por ips y después por usuarios:  

Primero definimos el valor predeterminado de las políticas para borrar todo lo que está:   
iptables -P INPUT DROP   
iptables -P OUTPUT DROP  

Segundo creamos una nueva cadena:    
iptables -N allowed_ips     

Tercero si los usuarios que se conecten tienen la ip entre este rango permitimos el acceso.   
iptables -A allowed_ips -m iprange --src-range 30.1.168.192-50 j ACCEPT   

Por último, vemos todo el tráfico que entra y sale de la máquina a través de nuestra nueva cadena:   
iptables -A INPUT -j allowed_ips   
iptables -A OUTPUT -j allowed_ips  

Pasemos a la otra opción que había, crear una lista blanca por usuario:  
Simplemente tendríamos que editar el archivo sshd_config de esta manera:  
"AllowUsers "usuario"  

### PERMITIR ACCESO A ROOT SOLO CON CLAVE INSTALADA EN EL servidores  
Por defecto, cualquier usuario en el sistema operativo que tenga permisos de Shell, podrá iniciar sesión en el servidor.   
Además, debemos tener en cuenta que si tenemos activado el usuario root, también podrá conectarse al servidor de forma local o remota,   
evitando al atacante tener que «adivinar» el nombre de usuario. Por defecto, los bots siempre intentan atacar el puerto 22 y al usuario «root».   
Permitiendo al propio usuario root el acceso con clave instalada conseguiremos tener una mayor seguridad:  

Dentro del archivo sshd_config podemos permitir solo el acceso a root con la clave instalada en el servidor. De esta manera:  
"PermitRootLogin no"  

### ACTIVAR EL REGISTRO DE LOGS PARA EL SERVICIO SSHD  
Con el comando journalctl -u ssh ó journalctl -t sshd puedes consultar los logs.  

### PROBAR CONEXION VARIAS VECES, CON FALLO Y DE MANERA EXITOSA  
Cuando provocas un fallo te salen lineas como estas:  
"pam_unix(sshd:auth): authentication failure"  
"failed password for juanjo from 192.168.1.31 por 60024 ssh2"  

### MOSTRAR LOS ÚLTIMOS 10 MENSAJES GENEREADOS POR EL SERVICIO SSHD Y EXPORTALOS EN FORMATO JSON  
Para que estos últimos 10 mensajes se exporten en formato json sería de esta manera:  
"journalctl -u ssh -n > /home/juanjo/ssh.json"  

### CONFIGURAR JOURNALCTL PARA HACER PERSISTENTES LOS REGISTROS, PERO QUE NO OCUPEN MAS DE 100MG DE ESPACIO EN EL DISCO  
Con SystemMaxFileSize se determina el tamaño máximo del archivo de registro y con SytemMaxFiles se determina el número máximo de ficheros de registros que puede haber.  

### MOSTRAR LOS REGISTROS AUTORIZADOS DE ACCESO REMOTO DE LOS ULTIMOS 5 USUARIOS  
Para mostrar los registros de los últimos 5 usuarios primero listamos los usuarios que han creado registros log con:  
Journalctl –list-boots  
Por último lo con “journalctl -t sshd -b” vemos el ultimo usuario que ha añadido registros logs y que se haya autorizado con acceso remoto.   
Con opciones como -0 -1 -2 podemos ver los distintos usuarios que se han autorizado remotamente, jemplo: “journalctl -y sshd -b -1”, “journalctl -y sshd -b -2”,   
“journalctl -y sshd -b -3”, etc.  

### REVISAR LOS INTENTOS CON ERROR DE ACCESO GENERADOS POR EL SERVICIO SSHD EN LAS ÚLTIMAS 24 HORAS  
Primero vemos durante que transcurso del tiempo ha estado recopilando información los logs:  
"JOURNALCTL --until '24:00'"  
Posteriormente vemos los “warning” o peligros de los logs para el servidor de ssh:  
"journalctl --priority=warning"  
Y por último vemos los errores de los logs para el servidor de ssh:  
"journalctl --priority=err"  