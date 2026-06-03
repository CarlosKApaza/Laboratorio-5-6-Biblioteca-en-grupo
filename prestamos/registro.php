<?php
// Necesitamos conexión porque este formulario sí consulta a la BD antes de dibujarse
include '../conexion.php';

// 1. Traemos los libros que tengan stock disponible
$sqlLibros = "SELECT id, titulo, stock FROM libros WHERE stock > 0";
$resultadoLibros = $con->query($sqlLibros);

// 2. Traemos todos los usuarios
$sqlUsuarios = "SELECT id, nombre, carnet FROM usuarios";
$resultadoUsuarios = $con->query($sqlUsuarios);
?>

<form id="formPrestamo" action="javascript:guardarPrestamo()">
    <input type="hidden" name="id" id="prestamo_id" value="">

    <div class="mb-3">
        <label for="id_libro">Seleccionar Libro:</label>
        <select name="id_libro" id="id_libro" class="form-control" required>
            <option value="">-- Elige un libro --</option>
            <?php while($libro = $resultadoLibros->fetch_assoc()) { ?>
                <option value="<?php echo $libro['id']; ?>">
                    <?php echo $libro['titulo']; ?> (Stock: <?php echo $libro['stock']; ?>)
                </option>
            <?php } ?>
        </select>
    </div>

    <div class="mb-3">
        <label for="id_usuario">Seleccionar Usuario:</label>
        <select name="id_usuario" id="id_usuario" class="form-control" required>
            <option value="">-- Elige un usuario --</option>
            <?php while($usuario = $resultadoUsuarios->fetch_assoc()) { ?>
                <option value="<?php echo $usuario['id']; ?>">
                    <?php echo $usuario['nombre']; ?> - Carnet: <?php echo $usuario['carnet']; ?>
                </option>
            <?php } ?>
        </select>
    </div>

    <div class="mb-3">
        <label for="fecha_prestamo">Fecha de Préstamo:</label>
        <input type="date" name="fecha_prestamo" id="fecha_prestamo" class="form-control" value="<?php echo date('Y-m-d'); ?>" required>
    </div>

    <div class="mb-3">
        <label for="fecha_devolucion">Fecha de Devolución Esperada:</label>
        <input type="date" name="fecha_devolucion" id="fecha_devolucion" class="form-control" required>
    </div>

    <div class="mb-3">
        <label for="observaciones">Observaciones (Opcional):</label>
        <textarea name="observaciones" id="observaciones" class="form-control" rows="2" placeholder="Ej: Libro con la tapa un poco doblada..."></textarea>
    </div>

    <button type="submit" class="btn btn-primary w-100">Registrar Préstamo</button>
</form>