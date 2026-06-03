<?php
include '../conexion.php';

$id = $_POST['id'];
$estado = $_POST['estado']; // Puede ser 'Devuelto' o 'Vencido'
$id_libro = $_POST['id_libro'];

// Actualizamos el estado del préstamo
$sql = "UPDATE prestamos SET estado = ? WHERE id = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("si", $estado, $id);

if ($stmt->execute()) {
    
    // Si el nuevo estado es 'Devuelto', le devolvemos +1 al stock del libro
    if ($estado === 'Devuelto') {
        $sqlStock = "UPDATE libros SET stock = stock + 1 WHERE id = ?";
        $stmtStock = $con->prepare($sqlStock);
        $stmtStock->bind_param("i", $id_libro);
        $stmtStock->execute();
        $stmtStock->close();
    }

    echo json_encode(["status" => "ok", "mensaje" => "Estado cambiado a $estado correctamente."]);
} else {
    echo json_encode(["status" => "error", "mensaje" => "Error al cambiar estado: " . $con->error]);
}

$stmt->close();
$con->close();
?>