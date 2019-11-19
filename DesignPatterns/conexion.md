## Conexión a una base de datos usando el patrón de diseño Singleton y PDO.  

class ConnectDb {  
> creamos una instancia 
  private static $instance = null;    
  private $conn;  
  
  private $host = 'localhost';  
  private $user = 'administrador';  
  private $pass = 'administrador';  
  private $name = 'tienda';  
     
 > la base de datos es establecida con un constructor privado.  
  
  private function __construct()  
  {  
    $this->conn = new PDO("mysql:host={$this->host};  
    dbname={$this->name}", $this->user,$this->pass,  
    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));  
  }  
    
  public static function getInstance()  
  {  
    if(!self::$instance)  
    {  
      self::$instance = new ConnectDb();  
    }  
     
    return self::$instance;  
  }  
    
  public function getConnection()  
  {  
    return $this->conn;  
  }  
}  

> creamos varias conexiones para comprobar que este patrón de diseño solo realiza una conexión.  

$instance = ConnectDb::getInstance();  
$conn = $instance->getConnection();  
var_dump($conn);  
  
$instance = ConnectDb::getInstance();  
$conn = $instance->getConnection();  
var_dump($conn);  
  
$instance = ConnectDb::getInstance();  
$conn = $instance->getConnection();  
var_dump($conn);  