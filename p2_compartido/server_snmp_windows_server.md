# SERVIDOR SNMP.  

## OBJETIVO.  

**El objetivo de mi equipo era conseguir monitorizar los OIDs de cada agente visualizando gráficas, estadísticas, etc.**

### BUSCAMOS LAS MEJORES HERRAMIENTAS PARA EL PROYECTO.  

Como servidor capaz de centralizar remotamente cualquier cliente snmp hemos escogido el servidor "PANDORA".  
Teníamos más opciones como el conocido servidor Cacti, el servidor Nagios, pero nos decantamos por Pandora,  
ya que, Cacti esta mas enfocado en el apartado gráfico, Nagios en los diferentes estados de los clientes y  
Pandora englobaba ambos aspectos.  

### CONSEGUIR LAS HERRAMIENTAS NECESARIAS.  

Todo el proyecto se iba a basar en una red que nosotros habíamos montado, por tanto,  
empezamos comprobando que esa red funcionaba. En especial protocolos como el DHCP, el  
DHCP RELAY, el OSPF y como extra en este proyecto teníamo la activación del protocolo  
SNMP, protocolo estándar de internet par administrar dispositivos de redes IP.  

Posteriormente a esto, teníamos una red convergente. Ya nos podíamos centrar en la configuración  
de Pandora y sus componentes.

En mi caso utilicé Windows Server como máquina virtual para instalar Pandora. ¿Cómo lo hice?  
Sencillo, navegas hasta la página oficial de [Pandora](https://pandorafms.org/es/) y descargas el .exe adecuado para tu equipo.  
Lo mas característico a la hora de instalar Pandora es cuando te da la opcion para modificar la ip de  
tu servidor, en mi caso lo deje en "localhost" ya que no quería que me diera ningun problema si  
cambiaba la ip de mi máquina haciendo cualquier prueba. Nada mas terminar la instalación se nos  
abría Pandora en una terminal a través del navegador en modo gráfico. Pero nuestro sistema no  
puede hacer un monitoreo de la red sino tenemos instalado el protocolo simple de administració  
de red (SNMP) en nuestro sistema. Para ello, deberemos de agregar una herramienta de rol, la cual,  
nos permitirá instalarnos el servidor SNMP.

### PROCEDIMIENTO PARA CENTRALIZAR LOS DIFERENTES AGENTES.

Para monitorizar de forma remota un equipo a traves del protocolo SNMP v2 accederemos a la consola  
de Pandora y seguiremos los siguientes pasos:  

1. Se debe crear un grupo donde añadiremos todos los agentes que vayamos a monotorizar. Para ello,  
entramos en "profiles > manage agent group" y utilizamos la opción "create" para crear un grupo.  
2. Pulsaremos sobre el apartado "resources > manage agents" para crear el agente que finalmente  
monitorizaremos y rellenaremos los campos del agente(su ip, su alias, al grupo al que pertenece, etc).  
3.   





