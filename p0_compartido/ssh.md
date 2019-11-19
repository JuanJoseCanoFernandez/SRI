## Documentación práctica 0
### SSH
El protocolo SSH es un protocolo de administración remota que 
permite a los usuarios administrar dispositivos a distancia utilizando para el 
acceso un usuario y una contraseña del equipo al que se está intentando acceder.
En este caso el objetivo no es solo poder conectar los equipos vía SSH sino que 
hay que conseguir acceder sin que solicite una contraseña. Para hacer esto es necesario
que existan unas claves públicas en cada uno de los equipos que deben ser 
compartidas al resto de sistemas de la red. La obtención de las claves es distinta
en función del sistema operativo que se utiliza.  
En el caso de Windows es necesario utilizar un programa que saque esas claves, 
por ejemplo "Putty". En los sistemas Linux basta con escribir el comando "ssh-keygen -t rsa"
y darle una ubicación donde guardarla.  
Posteriormente las claves se pasan de unos sistemas a otros y ya podremos acceder a estos sin contraseña.