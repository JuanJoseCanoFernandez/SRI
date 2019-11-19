## Documentación práctica 0
### Relay 
DHCP Relay es un protocolo que se utiliza cuando ya existe un servidor DHCP en la red
y sirve para que todas las peticiones que llegan al router solicitando una dirección IP
sean reenviadas al router (o dispositivo) con el servidor DHCP y este asigne una dirección del pool
correspondiente.  
Para configurar un DHCP Relay en un router Mikrotik debemos utilizar los siguientes comandos:
- Configuración en router servidor DHCP:
    - ip pool add name="nombre" ranges=primera_ip-ultima_ip
    - ip dhcp-server add interface=DHCP_Relay relay=gateway_relay address-pool=nombre name=nombre_dhcp disabled=no
    - ip dhcp-server network add address=direccion_red/prefijo gateway=puerta_enlace dns-server=dns
- Configuración en router DHCP relay:
    - ip dhcp-relay add name=nombre interface=interfaz dhcp-server=servidor_dhcp local-address=puerta_enlace disabled=no