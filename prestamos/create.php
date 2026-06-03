<?php
include "../conexion.php";

// Recibimos los datos del formulario (los 'name' del HTML)
$id_libro = $_POST['id_libro'];
$id_usuario = $_POST['id_usuario'];
$fecha_prestamo = $_POST['fecha_prestamo'];
$fecha_devolucion = $_POST['fecha_devolucion'];
$observaciones = $_POST['observaciones'];

// Verificar que el libro tenga stock disponible
$sqlCheck = "SELECT stock FROM libros WHERE id = ?";
$stmtCheck = $con->prepare($sqlCheck);
$stmtCheck->bind_param("i", $id_libro);
$stmtCheck->execute();
$resCheck = $stmtCheck->get_result();
$libro = $resCheck->fetch_assoc();

// Verificar que el libro tenga stock disponible
if ($libro['stock'] <= 0) {
    echo json_encode(["status" => "error", "mensaje" => "Error: El libro seleccionado ya no tiene stock disponible."]);
    exit; 
}

// Insertar el préstamo (Por defecto el estado será 'Activo' en la BD)
$sqlInsert = "INSERT INTO prestamos (id_libro, id_usuario, fecha_prestamo, fecha_devolucion, observaciones) 
              VALUES (?, ?, ?, ?, ?)";

$stmtInsert = $con->prepare($sqlInsert);
$stmtInsert->bind_param("iisss", $id_libro, $id_usuario, $fecha_prestamo, $fecha_devolucion, $observaciones);

if($stmtInsert->execute()) {
    
    // Restarle 1 al stock del libro
    $sqlUpdateStock = "UPDATE libros SET stock = stock - 1 WHERE id = ?";
    $stmtStock = $con->prepare($sqlUpdateStock);
    $stmtStock->bind_param("i", $id_libro);
    $stmtStock->execute();

    echo json_encode(["status" => "ok", "mensaje" => "Préstamo registrado con éxito. Stock del libro actualizado."]);
} else {
    echo json_encode(["status" => "error", "mensaje" => "Error al registrar el préstamo: " . $con->error]);
}

$stmtCheck->close();
$stmtInsert->close();
if(isset($stmtStock)) $stmtStock->close();
$con->close();
?>