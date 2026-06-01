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
                    <button class="btn btn-sm btn-danger" onclick="eliminarLibro(<?php echo $libro['id']; ?>)">Eliminar</button>
                </td>
            </tr>
            <?php } ?>
        </tbody>
    </table>
</div>

<div class="modal fade" id="modalLibro" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Registrar Libro</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                
                <form  id="formLibro"  action="javascript:guardarLibro()">
                    
                    <div class="mb-3">
                        <label>Título:</label>
                        <input type="text" name="titulo" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label>Autor:</label>
                        <input type="text" name="autor" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label>ISBN:</label>
                        <input type="text" name="isbn" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label>Categoría:</label>
                        <input type="text" name="categoria" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label>Stock inicial:</label>
                        <input type="number" name="stock" class="form-control" min="0" value="1" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Guardar Libro</button>
                </form>

            </div>
        </div>
    </div>
</div>