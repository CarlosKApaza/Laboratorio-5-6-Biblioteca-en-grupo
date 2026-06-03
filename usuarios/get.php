<?php
include '../conexion.php';

$id = $_GET['id'];

$sql = "SELECT * FROM usuarios WHERE id = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();

$resultado = $stmt->get_result();
$usuario = $resultado->fetch_assoc();

// Devuelve los datos de ese único libro en formato JSON
echo json_encode($usuario);
?>