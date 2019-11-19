## Instalación servicio SNMP y agente Pandora en Windows Server 2019
### Servicio SNMP.  
Una vez terminamos la instalación de la máquina virtual de Windows Server 2019 nos digimos al Administrador del  
servidor. En la zona superior entramos en la pestaña de Administrar. Una vez desplegada, hacemos click en "Agregar  
roles y características". Relaizado esto se nos abre una ventana nueva. Dentro, avanzamos pulsando en siguiente  
hasta el apartado llamado "Características". Buscamos una característica llamada "Servicio SNMP" y marcamos tanto  
esa característica como las que incluye. Una vez lo hemos marcado hacemos click en "Instalar". Pasados unos minutos  
finaliza la instalación.  
### Agente Pandora  
Para activar el agente SNMP y permitir que el servidor pueda monitorizarnos debemos abrir el editor de directivas de  
grupo local. Para ello accedemos a "Ejecutar" con la combinación de teclas "Windows+R". Dentro introducimos  
gpedit.msc. Una vez dentro del editor nos dirigimos a plantillas administrativas y posteriormente a Red. Entre  
todas las cxarpetas que nos aparecen entramos en "SNMP". Nos aparecen 3 posibilidades de configuración. La primera  
de ellas, llamada "Especificar Comunidades" es aquella que sirve para determinar a qué grupo de Agentes vamos a  
pertenecer. Entramos dentro y marcamos la casilla "Habilitar". Una vez realizado esto entramos en el botón "mostrar"  
que aparece al lado de Comunidades. Una vez dentro añadimos el grupo de Agentes al que tenemos que pertenecer, en  
mi caso "AGENTES". Aplicamos y salimos. Justo debajo de esta directiva aparece otra llamada "Especificar administradores  
Permitidos" en la cual debemos entrar también. Repetimos el procedimiento de la directiva anterior marcando la casilla  
"Habilitar" y añadiendo en "Administradores Permitidos" la dirección IP de la máquina que contiene el servidor Pandora.  
Una vez realizado esto aplicamos los cambios y estamos listos para que el Servidor nos pueda monitorizar.