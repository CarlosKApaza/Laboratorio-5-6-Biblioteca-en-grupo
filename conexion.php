<?php
$con = new mysqli("localhost", "root", "", "bd_biblioteca");

if ($con->connect_error) {
    die ("Error al conectarse: " . $con->connect_error); 
}
?>