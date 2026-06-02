<?php
include '../conexion.php';

// recibimos los datos, incluyendo el id
$id = $_POST['id'];
$titulo = $_POST['titulo'];
$autor = $_POST['autor'];
$isbn = $_POST['isbn'];
$categoria = $_POST['categoria'];
$stock = $_POST['stock'];

$sql = "UPDATE libros SET titulo=?, autor=?, isbn=?, categoria=?, stock=?
        WHERE id=?";

$stmt = $con->prepare($sql);
// 4 string (titulo, autor, isbn, categoria) y 2 enteros (stock, id)
$stmt->bind_param("ssssii", $titulo, $autor, $isbn, $categoria, $stock, $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "mensaje" => "Libro actualizado correctamente"]);
} else {
    echo json_encode(["status" => "error", "mensaje" => "Error al actualizar: " . $con->error]);
}

$stmt->close();
$con->close();

?>