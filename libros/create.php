<?php
include "../conexion.php";

$titulo = $_POST['titulo'];
$autor = $_POST['autor'];
$isbn = $_POST['isbn'];
$categoria = $_POST['categoria'];
$stock = $_POST['stock'];


$sql = "INSERT INTO libros (titulo, autor, isbn, categoria, stock) 
        VALUES (?, ?, ?, ?, ?)";
$stmt = $con->prepare($sql);
$stmt->bind_param("ssssi", $titulo, $autor, $isbn, $categoria, $stock);


if($stmt->execute()) {
    echo json_encode(["status" => "ok", "mensaje" => "Libro registrado correctamente"]);
} else {
    echo json_encode(["status" => "error", "mensaje" => "Error al registrar: " . $con->error]);
}

?>