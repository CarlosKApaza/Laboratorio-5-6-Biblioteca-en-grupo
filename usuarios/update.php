<?php
include '../conexion.php';

// recibimos los datos, incluyendo el id
$id = $_POST['id'];
$nombre = $_POST['nombre'];
$carnet = $_POST['carnet'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];

$sql = "UPDATE usuarios SET nombre=?, carnet=?, telefono=?, correo=?
        WHERE id=?";

$stmt = $con->prepare($sql);
$stmt->bind_param("ssssi", $nombre, $carnet, $telefono, $correo, $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "mensaje" => "Usuario actualizado correctamente"]);
} else {
    echo json_encode(["status" => "error", "mensaje" => "Error al actualizar: " . $con->error]);
}

$stmt->close();
$con->close();

?>