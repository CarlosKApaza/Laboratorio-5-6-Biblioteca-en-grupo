<?php

include '../conexion.php';

$id = $_POST['id'];

$sql = "DELETE FROM usuarios WHERE id = ? ";

$stmt = $con->prepare($sql);
$stmt->bind_param("i", $id);

if($stmt->execute()) {
    echo json_encode(["status" => "ok", "mensaje" => "Usuario eliminado correctamente"]);
} else {
    echo json_encode(["status" => "error", "mensaje" => "Error al eliminar: " . $con->error]);
}
?>