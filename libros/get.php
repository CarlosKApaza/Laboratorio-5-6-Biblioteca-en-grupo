<?php
include '../conexion.php';

$id = $_GET['id'];

$sql = "SELECT * FROM libros WHERE id = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();

$resultado = $stmt->get_result();
$libro = $resultado->fetch_assoc();

// Devuelve los datos de ese único libro en formato JSON
echo json_encode($libro);
?>