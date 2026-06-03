<?php
include '../conexion.php';

$id = $_POST['id'];

// Jugada maestra de seguridad: Verificar el estado antes de borrar
$sqlCheck = "SELECT estado FROM prestamos WHERE id = ?";
$stmtCheck = $con->prepare($sqlCheck);
$stmtCheck->bind_param("i", $id);
$stmtCheck->execute();
$res = $stmtCheck->get_result();
$prestamo = $res->fetch_assoc();

// Si por alguna razón intentan borrar uno Activo, bloqueamos la acción
if($prestamo['estado'] === 'Activo') {
    echo json_encode(["status" => "error", "mensaje" => "No permitido: No se puede eliminar un préstamo que está Activo."]);
    exit;
}

// Si no está activo, procedemos a borrar
$sql = "DELETE FROM prestamos WHERE id = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "mensaje" => "Registro de préstamo eliminado correctamente."]);
} else {
    echo json_encode(["status" => "error", "mensaje" => "Error al eliminar: " . $con->error]);
}

$stmtCheck->close();
$stmt->close();
$con->close();
?>