# Configurar un servidor DNS(BIND9) en linux y un servidor secundario de respaldo en Windows Server.

## Servidor Primario -> Linux

### Preparación

Lo primero que tenemos que hacer es tener nuestra maquina Linux con los repositorios actualizados y  
lista para empezar a instalar paquetes.  

Instalamos: bind9 bind9utils bind-utils  

### Empezamos la configuracion del servidor  

El directorio del servidor bind9 se localiza en /etc/bind, ahi tendremos tanto las zonas directas como  
las inversas de nuestro dns(es recomendable acceder al directorio como root). Dentro de el veremos varios  
ficheros, gran parte de ellos son plantillas hechas para que a partir de ahí creemos nuestros ficheros propios.

Una vez estamos dentro, entraremos en el fichero named.conf.local, el cual separará nuestras zonas del DNS.  
En mi caso las zonas quedaron tal que así, ya que yo tenia una ipv4 "10.10.1.0" y una ipv6 "2001:Db8:abcd::/64" :  

~~~
/zona directa en ipv4 e ipv6/
zone "juanjo.sri.iesiliberis.com" {  /aqui le damos un nombre a nuestra zona/
    type master;                     /seleccionamos que esta zona va a ser primaria o tipo master/
    file "/etc/bind/db.local.directa"             /localizamos que fichero tiene que leer/
};

/zona inversa en ipv4/
zone "1.10.10.in-addr.arpa" {  
    type master;
    file "/etc/bind/db.10" 
};

/zona inversa en ipv6/
zone "0.0.0.0.d.c.b.a.8.d.b.0.1.0.0.2.ip6.arpa" {  
    type master;
    file "/etc/bind/db.2001" 
};
~~~

Una vez hecho esto debemos crear estos ficheros a partir de otros de esta manera: cp db.local db.local.directa y sucesivamente.  

A continuación se muestran los ficheros que anteriormente he puesto en las zonas:

/db.local.directa/
~~~
;
; BIND data file for local loopback interface
;
$TTL	604800
@	IN	SOA	juanjo.sri.iesiliberis.com. root.juanjo.sri.iesiliberis.com. (
			      2		; Serial
			 604800		; Refresh
			  86400		; Retry
			2419200		; Expire
			 604800 )	; Negative Cache TTL
;
@   IN  NS  server
@	IN	NS	server6.
@   IN  A   127.0.0.1
@	IN	AAAA	::1/128
@	IN	AAAA	::1
windows IN  A   10.10.1.2
host IN  A   10.10.1.3
windows6	IN	AAAA	2001:db8:abcd::2
host6	IN	AAAA	2001:db8:abcd::3
~~~

/db.10/
~~~
;
; BIND reverse data file for local loopback interface
;
$TTL	604800
@	IN	SOA	juanjo.sri.iesiliberis.com. root.juanjo.sri.iesiliberis.com. (
			      1		; Serial
			 604800		; Refresh
			  86400		; Retry
			2419200		; Expire
			 604800 )	; Negative Cache TTL
;
@	IN	NS	juanjo.sri.iesiliberis.com.
1	IN	PTR	juanjo.sri.iesiliberis.com.
2	IN	PTR	windows.
3	IN	PTR	host.
~~~

/db.2001/
~~~
;
; BIND reverse data file for local loopback interface
;
$TTL	604800
@	IN	SOA	localhost. root.localhost. (
			      1		; Serial
			 604800		; Refresh
			  86400		; Retry
			2419200		; Expire
			 604800 )	; Negative Cache TTL
;
@	IN	NS	juanjo.
3.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0	IN	PTR	host6.
2.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0	IN	PTR	windows6.
~~~

Posteriormente editaremos el named.conf.options para que quede de esta manera:

~~~
options {
	directory "/var/cache/bind";

	// If there is a firewall between you and nameservers you want
	// to talk to, you may need to fix the firewall to allow multiple
	// ports to talk.  See http://www.kb.cert.org/vuls/id/800113

	// If your ISP provided one or more IP addresses for stable 
	// nameservers, you probably want to use them as forwarders.  
	// Uncomment the following block, and insert the addresses replacing 
	// the all-0's placeholder.

	forwarders {
	0.0.0.0;
	8.8.8.8;
	 };

	listen-on port 53 { 127.0.0.1; 198.168.1.1; };

	//========================================================================
	// If BIND logs error messages about the root key being expired,
	// you will need to update your keys.  See https://www.isc.org/bind-keys
	//========================================================================
	dnssec-validation auto;

	auth-nxdomain no;    # conform to RFC1035
	listen-on { 10.10.1.2; };
	listen-on-v6 { any; };
};

~~~

Editaremos el /etc/resolv.com donde añadiremos las siguientes lineas:

- search /dominio/
- domain /dominio/
- nameserver /ip del servidor/

Por último editaremos el /etc/network/interfaces para tener una ip estatica, algo esencial en todo servidor.  
Y haremos un "nslookup" seguido de una ip si queremos comprobar las zonas inversas o un nombre dns si queremos  
comprobar las opciones directas.

## Servidor Secundario -> Windows Server

1. Comenzamos configurando las ips estaticas tanto en ipv4 y en ipv6.

2. Entraremos en la opcion de crear roles y características y crearemos un servidor dns. Posteriormente  
Posteriormente entraremos en herramientas y pulsaremos la opcion de DNS. Se nos abrira una ventana donde nos aparece   
en forma de arbol las zonas directas e inversas. En cada una crearemos una nueva zona y seguiremos los pasos que nos   
indica. 

3. Por último, como resultado el servidor secundario obtendrá la configuración del servidor primario, el cual, en este   
caso es Linux.

