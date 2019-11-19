<?php
class ConnectDb {
  // Hold the class instance.
  public static $instance = null;
  public $conn;
  
  public $host = 'localhost';
  public $user = 'administrador';
  public $pass = 'administrador';
  public $name = 'tienda';
   
  // The db connection is established in the private constructor.
  public function __construct()
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
  public function sentenciasSQL($sql){
    $this->conn;
    $resultado = execute($sql);
    return $resultado;	
  }
}
$instance = ConnectDb::getInstance();
$conn = $instance->getConnection();
var_dump($conn);

$instance = ConnectDb::getInstance();
$conn = $instance->getConnection();
var_dump($conn);

$instance = ConnectDb::getInstance();
$conn = $instance->getConnection();
var_dump($conn);

$intance = ConnectDb::getInstance();
$result = $instance -> sentenciasSQL("SELECT * FROM cliente");
while($cliente = mysql_fetch_array($result)){
  echo $cliente['nombre']." ".$cliente['apellido']." ".$cliente['password']." ".$cliente['dni']." ".$cliente['correo']." ".$cliente['ciudad'];

?>