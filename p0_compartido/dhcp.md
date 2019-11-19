## Documentación práctica 0
### DHCP
DHCP es el protocolo de configuración de host dinámico, donde un servidor DHCP asigna de manera automática una dirección IP (tanto IPv4 como IPv6) 
de manera que reduce el trabajo del administrador significativamente. Cuando el host se conecta a una red donde existe un servidor DHCP este le presta 
una dirección de un pool (rango de direcciones) mientras esté conectado a esa red.  
Para configurar un servidor DHCP en un router mikrotik debemos utilizar los siguientes comandos:
- ip dhcp-server setup (se iniciará la configuración guiada).
    - dhcp server interface: (interfaz de salida)
    - dhcp address space: (direccion_red/prefijo)
    - gateway for dhcp network: (puerta de enlace)
    - addresses to give out: (primera_direccion-ultima_direccion)
    - dns servers: (DNS)
    - lease time: (tiempo)