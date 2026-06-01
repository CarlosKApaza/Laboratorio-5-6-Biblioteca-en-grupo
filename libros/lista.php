<?php
include '../conexion.php';
$sql = "SELECT * FROM libros ORDER BY id DESC";
$resultado = $con->query($sql);
?>

<div class="d-flex justify-content-between align-items-center mb-3">
    <h3>Catálogo de Libros</h3>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalLibro" onclick="limpiarFormularioLibro()">
        + Nuevo Libro
    </button>
</div>

<div class="table-responsive">
    <table class="table table-striped table-hover">
        <thead class="table-dark">
            <tr>
                <th>ID</th><th>Título</th><th>Autor</th><th>ISBN</th><th>Categoría</th><th>Stock</th><th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php while($libro = $resultado->fetch_assoc()) { ?>
            <tr>
                <td><?php echo $libro['id']; ?></td>
                <td><?php echo $libro['titulo']; ?></td>
                <td><?php echo $libro['autor']; ?></td>
                <td><?php echo $libro['isbn']; ?></td>
                <td><?php echo $libro['categoria']; ?></td>
                <td>
                    <span class="badge <?php echo ($libro['stock'] > 0) ? 'bg-success' : 'bg-danger'; ?>">
                        <?php echo $libro['stock']; ?>
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editarLibro(<?php echo $libro['id']; ?>)">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarLibro(<?php echo $libro['id']; ?>)">Eliminar</button>
                </td>
            </tr>
            <?php } ?>
        </tbody>
    </table>
</div>
