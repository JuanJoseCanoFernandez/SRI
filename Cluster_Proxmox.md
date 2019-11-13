## CLUSTER DE SERVIDORES CON PROXMOX

### OBJETIVO

El objetivo de la práctica es: Conseguir un Cluster con dos nodos Proxmox.  

Para ello, vamos a necesitar una máquina linux, la cual va a ser servidor NFS y contendrá el almacenamiento  
de los contenedores los dos nodos.  

Posteriormente, arrancaremos un sistema operativo en un contenedor de un nodo a través del almacenamiento  
NFS.  

Y finalmente, migraremos esa máquina virtual de un nodo a otro para poder conseguir el Cluster.  

### PRERREQUISITOS

Necesitamos 3 máquinas virtuales:  
1. Una máquina Debian.  
2. Un nodo Proxmox.  
3. Otro nodo Proxmox.  

### SERVIDOR DEBIAN (SERVIDOR NFS)

Nada mas arrancar la máquina actualizamos los repositorios, ya que, vamos a instalar paquetes.  
Esta máuina debe tener en disposición dos tarjetas de red:

- Una en modo "bridge" para comunicarnos con los nodos (proxmox) de nuestro Cluster.  
- Otra con conexión a internet (pidiendo por DHCP).

~~~
auto ens33
iface ens33 inet static
address 10.10.2.254
netmask 255.255.255.0

auto ens37
iface ens37 inet dhcp
~~~

Posteriormente, es necesario que nuestra maquina funcione como router de la red local para que la dirección estática de los nodos sea traducida y pueda salir al exterior.  
Todo esto lo conseguimos agregando una regla NAT a nuestro sistema:
~~~
echo 1 > /proc/sys/net/ipv4/ip_forward
iptables -t nat -A POSTROUTING -o ens37 -j MASQUERADE
~~~

#### NFS

Sin salirnos del apartado de configuración en el servidor debian, entramos en la implementación del servidor NFS para compartir los contenedoress entre los distintos nodos.  

1. Paquetes necesarios para el servidor NFS:
~~~
apt-get install nfs-kernel-server nfs-common
~~~  

El primer paquete instala el servidor NFS y el segundo paquete instala un cliente NFS. Por tanto, este último paquete debería de estar en nuestros nodos Proxmox.  

2. Crear el directorio compartido:
~~~
mkdir /home/compartido/archivos
chown nobody:nogroup /home/compartido/archivos
chmod 755 /home/compartido/archivos

mkdir /var/www
chown root:root /var/www
chmod 755 /var/www
~~~  

Con "chown" damos permisos a los usuarios y sus grupos para luego poder acceder desde los Proxmox con cualquier usuario. En mi caso, le doy todos los privilegios  
aunque si se quisiese hacer mas seguro simplemente habria que ser mas explicito en estos permisos.  

3. Añadimos los clientes al archivo /etc/exports.  
~~~
home/compartido/archicos    ip_cliente(rw,sync,no_subtree_check)
/var/www    ip_cliente(rw,sync,fsid=0,crossmnt,no_subtree_check,no_root_squash)
~~~ 

Explicamos estas opciones:  

- /home/compartido/archivos = directorio compartido con permiso de lectura y escritura.
- ip_cliente = dirección IP del cliente nfs.
- rw = Permitir que ambos lean y escriban en el directorio compartido.
- sync = Responder a las solicitudes solo después de que los cambios se hayan confirmado en un almacenamiento estable. 
- no_root_squash = Permitir que el usuario root en la máquina cliente tenga el mismo nivel y permiso con root en el servidor para el directorio compartido.  

4. Reiniciar el servicio "Kernel nfs server" para guardar los cambios.  
~~~
service nfs-kernel-server restart
~~~  

### PROXMOX (CLIENTE NFS Y NODO)  

1. Comenzamos configurando una dirección ip estática en cada nodo y nos tenemos que fijar en el hostname de la máquina, ya que, tienen que llamarse de diferente manera,  
sino dará fallo. En caso de que el nombre sea el mismo, lo modificamos de la siguiente manera:  
~~~
/etc/hosts -> Cambiar el nombre de usuario en el dominio y en el nombre.
/etc/hostname -> Cambiar el nombre de usuario.
~~~  

2. Reiniciamos el sistema y en cuanto arranque actualizamos los repositorios. Seguiremos instalando el cliente NFS:  
~~~
apt-get install nfs-common ## Normalmente estará instalado en el sistema.
~~~  

3. Creamos los directorios donde montaremos el directorio de servidor:  
~~~  
mkdir -p /mnt/nfs/home/compartido/archivos
mkdir -p /var/www
~~~  

4. Montaremos los directorios del servidor:  
~~~
mount ip_servidor:/home/compartido/archivos /mnt/nfs/home/compartido/archivos
mount ip_servidor:/var/www /var/www
~~~  

5. Entramos en el navegador de nuestro servidor Debian y descargamos una plantilla de un sistema operativo que queramos instalar posteriormente en nuestro contenedor del  
Proxmox -> [Plantillas](download.proxmox.com/images/system). Nos descargamos un .tar.gz, el cual copiaremos a nuestro NFS.  

6. Volvemos al Proxmox y visualizaremos ese .tar.gz en nuestro directorio creado anteriormente.  

7. Crearemoe el contenedor con la imagen .tar.gz de la siguiente manera:  
~~~
pct create numero_de_contenedor_a_elegir /mnt/nfs/home/compartido/archivos/plantilla.tar.gz -storage local-lvm --password contraseña
~~~  
- Si queremos iniciar la máquina utilicaremos:  
~~~  
pct start numero_de_contenedor_a_elegir
pct console numero_de_contenedor_a_elegir
~~~ 
- Si por algun casual no podemos salir de ella, podemos acceder via ssh desde el servidor debian y pararla cerrando la terminal del Promox que esta en marcha o con el siguiente comando:  
~~~  
pct stop numero_de_contenedor_a_elegir
~~~  

### CREACIÓN DEL CLUSTER PROXMOX, AÑADIR OTRO NODO EL CUAL TENDRÁ UN HOSTNAME DIFERENTE Y MIGRAR LA MÁQUINA CONTENEDOR A ESTE NUEVO NODO.  

1. Creación del cluster:  
~~~
pvecm create CLUSTERNAME
~~~  

2. Añadir nodo al cluster:  
~~~ 
pvecm add IP_DE_UN_NODO_EXISTENTE ##Acceder vía SSH a la segunda máquina o simplemente ejecutar el comando en el ultimo nodo creado.  
~~~  

3. Listar nodos:  
pvecm node

4. Ver estado del cluster:  
~~~
pvecm status
~~~  

5. Migración:  
~~~
pct migrate id_maquina Hostname_del_segundo_nodo
~~~  

6. Comprobar que todo ha salido bien:  
~~~
pct list
~~~

### CONCLUSIÓN  

Un cluster puede ser muy útil en vista al funcionamiento de una empresa, te puede ofrecer muchos avances frente a organización, seguridad, eficiencias en encadenamientos productivos, etc.
