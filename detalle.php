<?PHP
$hostname="localhost";
$database="id9784671_bd_sustento";
$username="id9784671_bd_sustento";
$passwordd="Unicahsagrado16";
$con = mysqli_connect($hostname,$username,$passwordd,$database);
$json = file_get_contents('php://input');
$obj = json_decode($json,true);

$id = $obj['id'];

$sql = "SELECT codProd,nomProd, descProd, cantProd, precioProd, imagenProd FROM productos WHERE codProd='$id'";
 
$result = $con->query($sql);
 
if ($result->num_rows >0) {
 
 
 while($row[] = $result->fetch_assoc()) {
 
 $tem = $row;
 
 $json = json_encode($tem);
 
 
 }
 
} else {
 echo "No Results Found.";
}
 echo $json;
$con->close();
?>