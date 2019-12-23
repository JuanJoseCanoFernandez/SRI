# DELEGACIÓN DE SUBDOMINIOS  

## Objetivo  

Partimos de 7 subredes con 7 subdominios de sri.iesiliberis.com.  
1. Realizaremos la planificación IPv6 con IP global de prefijo 2001:db8::/48  
Cada subred tendrá dos servidores, maestro y esclavo que gestionan un subdominio.  
Y los servidores de la primera subred además gestiona la zona del dominio sri.iesiliberis.com.

2. Configurar los servidores DNS bind9 maestro y esclavo.

3. Configurar los logs para filtrar según prioridad:  

4. Las pruebas deben registrarse en los archivos logs.

## Configuración de los servidores Bind9 maestro:  

Primero vamos a ver como tendrían que quedar los ficheros de configuración para  
que el servidor maestro y esclavo pueda gestionar subdominios:  

- named.conf.options: 
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

	//listen-on port 53 { 127.0.0.1; 198.168.1.1; };
	//listen-on-v6 port 53 { ::1; };

	//========================================================================
	// If BIND logs error messages about the root key being expired,
	// you will need to update your keys.  See https://www.isc.org/bind-keys
	//========================================================================
	dnssec-validation no;

	auth-nxdomain no;    # conform to RFC1035
	listen-on { 10.10.1.2; };
	listen-on-v6 { any; };
};
~~~
- named.conf.local:

~~~
//
// Do any local configuration here
//

// Consider adding the 1918 zones here, if they are not used in your
// organization
//include "/etc/bind/zones.rfc1918";
zone "sri.iesiliberis.com" {
	type master;
	file "/etc/bind/db.grupo2";
    forwarders {};
};

zone "juanjo.sri.iesiliberis.com" {
	type master;
	file "/etc/bind/db.grupo";
	forwarders {};
};

zone "0.0.0.0.d.c.b.a.8.b.d.0.1.0.0.2.ip6.arpa" {
	type master;
	file "/etc/bind/db.grupo.inversa";
	forwarders {};
};

zone "8.b.d.0.1.0.0.2.ip6.arpa" {
	type master;
	file "/etc/bind/db.grupo2.inversa";
	forwarders {};
};
~~~

- db.grupo: Fichero dirigido a dispositivos de mi red

~~~
;
; BIND data file for local loopback interface
;
$TTL	604800
@	IN	SOA	juanjo.sri.iesiliberis.com. root.juanjo.sri.iesiliberis.com. (
			      3		; Serial
			10800		; Refresh
			  7200		; Retry
			129600		; Expire
			 172800 )	; Negative Cache TTL
;
@	IN	NS	@
@	IN	AAAA	2001:db8:abcd::2
router	IN	AAAA	2001:db8:abcd:0000:1::1
servidores	IN	AAAA	2001:db8:abcd:0000:2::1
pc	IN	AAAA	2001:db8:abcd:0000:3::1
perisfericos	IN	AAAA	2001:db8:abcd:0000:4::1
~~~

- db.grupo2:

~~~
;
; BIND data file for local loopback interface
;
$TTL	604800
@	IN	SOA	sri.iesiliberis.com. root.sri.iesiliberis.com. (
			      3		; Serial
			10800		; Refresh
			  7200		; Retry
			129600		; Expire
			 172800 )	; Negative Cache TTL
;
@	IN	NS	juanjo
juanjo	IN	AAAA	2001:db8:abcd::2
@ORIGIN IN  NS  juanfran.sri.iesiliberis.com // con cada origin creamos cada subdominio
juanfran	IN	AAAA	2001:db8:aaaa::1
@ORIGIN IN  NS  alfonso.sri.iesiliberis.com
alfonso IN  AAAA    2001:db8:cafe::1
@ORIGIN IN  NS  carlos.sri.iesiliberis.com
carlos  IN  AAAA    2001:db8:caca::1
@ORIGIN IN  NS  chema.sri.iesiliberis.com
chema   IN  AAAA    2001:db8:dcba::1
@ORIGIN IN  NS  mario.sri.iesiliberis.com
mario   IN  AAAA    2001:db8:acac::1
@ORIGIN IN  NS  maruan.sri.iesiliberis.com
maruan  IN  AAAA    2001:db8:c0c0::1
~~~

- db.grupo.inversa:

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
@	IN	NS	localhost.
2.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0	IN	PTR	server.
1.0.0.0.0.0.0.0.0.0.0.0.1.0.0.0	IN	PTR	router.
1.0.0.0.0.0.0.0.0.0.0.0.2.0.0.0	IN	PTR	servidores.
1.0.0.0.0.0.0.0.0.0.0.0.3.0.0.0	IN	PTR	pc.
1.0.0.0.0.0.0.0.0.0.0.0.4.0.0.0	IN	PTR	perisfericos.
~~~

- db.grupo2.inversa:

~~~
;
; BIND reverse data file for local loopback interface
;
$TTL	604800
@	IN	SOA	sri.iesiliberis.com. root.sri.iesiliberis.com. (
			      1		; Serial
			 604800		; Refresh
			  86400		; Retry
			2419200		; Expire
			 604800 )	; Negative Cache TTL
;
@	IN	NS	localhost.
2.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.d.c.b.a	IN	PTR	juanjo.
1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.a.a.a.a	IN	PTR	juanfran.
2.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.e.f.a.c	IN	PTR	alfonso.
1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.a.c.a.c	IN	PTR	carlos.
1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.a.b.c.d	IN	PTR	chema.
1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.c.a.c.a	IN	PTR	mario.
1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.c.0.c	IN	PTR	maruan.
~~~

- resolv.conf

~~~
domain sri.iesiliberis.com
search sri.iesiliberis.com
domain juanjo.sri.iesiliberis.com
search juanjo.sri.iesiliberis.com
nameserver 2001:db8:abcd::1
~~~

Por último configuraremos el router para que todos los servidores esten unidos y  
y abriremos el puerto 53 en cada maquina BIND9.

## Comprobación de que funciona:

Desde la maquina anfitriona o master, haremos por ejemplo:

~~~
nslookup perisfericos.alfonso.sri.iesiliberis.com
nslookup 2001:db8:cafe::2
~~~

Si nos devuelve una respuesta donde nos indique el servidor, la ip y al dominio acorde al nslookup anterior.  
Podremos decir que funciona correctamente.

## Filtrar los logs:  

Definimos tres canales de logs (mensajes importantes del syslog, depuración media y mensajes de carga de zonas)  
y luego les asignamos categorías a cada uno.

~~~
logging {
      channel syslog_errors {
        syslog local1;
        severity error;
      };
      channel moderate_debug {
        severity debug 3;    // nivel 3 de depuración
        file "debug.log";    // al fichero debug.log
        print-time yes;      // fecha actual a las entradas del log
        print-category yes;  // imprimir el nombre de la categoría
        print-severity yes;  // imprimir el nivel de gravedad
      };
      channel no_info_messages {
        syslog local2;
        severity notice;
      };
      category parser {
        syslog_errors;
        default_syslog;
      };
      category lame-servers { null; };  // No guardar este tipo en los logs
      category load { no_info_messages; };
      category default {
        default_syslog;
        moderate_debug;
      };
    };
~~~
