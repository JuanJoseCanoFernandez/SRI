## Documentación práctica 0
### Direccionamiento
Para direccionar escogemos la red de la que partimos, 10.10.0.0/24 y FD00:1:1::/64.  
Posteriormente debemos saber el numero de host a direccionar, contando puerta de enlace, dirección de red y broadcast (para iIPV4). Para saber los bits de host y poder direccionar.  
Cuando ya esta la topología direccionada se pueden añadir en los routers para que estos puedan empezar a comunicarse (aunque no habrá convergencia todavía). Los comandos son los siguientes:
- ip address add address=(direccion_ip/prefijo) interface=(interfaz).  

En el caso de IPv6 requiere un paso previo ya que por defecto el módulo de este protocolo se encuentra deshabilitado por defecto, para habilitarlo y añadir una dirección:
- system package enable IPv6
- system reboot
- ipv6 address add address=(direccion_ipv6/prefijo) interface=(interfaz)