<?php
include '../conexion.php';

$sql = "SELECT p.id, p.id_libro, l.titulo AS libro, u.nombre AS usuario, p.fecha_prestamo, p.fecha_devolucion, p.estado 
        FROM prestamos p 
        INNER JOIN libros l ON p.id_libro = l.id 
        INNER JOIN usuarios u ON p.id_usuario = u.id
        ORDER BY p.id DESC";

$resultado = $con->query($sql);
// Capturamos la fecha de hoy para comparar
$hoy = date('Y-m-d');
?>

<div class="d-flex justify-content-between align-items-center mb-3">
    <h3>Lista de Préstamos</h3>
    <button class="btn btn-primary" onclick="abrirModalPrestamo()">+ Nuevo Préstamo</button>
</div>

<div class="row mb-3">
    <div class="col-md-4">
        <select id="filtroEstado" class="form-control" onchange="filtrarTabla()">
            <option value="Todos">Todos los estados</option>
            <option value="Activo">Activo</option>
            <option value="Devuelto">Devuelto</option>
            <option value="Vencido">Vencido</option>
        </select>
    </div>
    <div class="col-md-8">
        <input type="text" id="filtroTexto" class="form-control" placeholder="Buscar por nombre de libro o usuario..." onkeyup="filtrarTabla()">
    </div>
</div>

<div class="table-responsive">
    <table class="table table-hover" id="tablaPrestamos">
        <thead class="table-dark">
            <tr>
                <th>ID</th>
                <th>Libro</th>
                <th>Usuario</th>
                <th>Préstamo</th>
                <th>Devolución</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php while($prestamo = $resultado->fetch_assoc()) { 
                
                $colorBadge = "bg-success"; 
                if($prestamo['estado'] == 'Activo') $colorBadge = "bg-primary"; 
                if($prestamo['estado'] == 'Vencido') $colorBadge = "bg-danger"; 

                // Lógica de Vencimiento: Si está Activo y la fecha ya pasó 
                $claseFila = "";
                if($prestamo['estado'] == 'Activo' && $prestamo['fecha_devolucion'] < $hoy) {
                    $claseFila = "table-danger"; // Clase de Bootstrap para pintar la fila de rojo
                }
            ?>
            <tr class="<?php echo $claseFila; ?>">
                <td><?php echo $prestamo['id']; ?></td>
                <td><?php echo $prestamo['libro']; ?></td>
                <td><?php echo $prestamo['usuario']; ?></td>
                <td><?php echo $prestamo['fecha_prestamo']; ?></td>
                <td><?php echo $prestamo['fecha_devolucion']; ?></td>
                <td>
                    <span class="badge <?php echo $colorBadge; ?>"><?php echo $prestamo['estado']; ?></span>
                </td>
                <td>
                    <?php if($prestamo['estado'] == 'Activo') { ?>
                        <button class="btn btn-sm btn-success mb-1" onclick="cambiarEstadoPrestamo(<?php echo $prestamo['id']; ?>, 'Devuelto', <?php echo $prestamo['id_libro']; ?>)">Devolver</button>
                        <button class="btn btn-sm btn-danger mb-1" onclick="cambiarEstadoPrestamo(<?php echo $prestamo['id']; ?>, 'Vencido', <?php echo $prestamo['id_libro']; ?>)">Vencido</button>
                    <?php } else { ?>
                        <span class="text-muted" style="font-size: 0.85rem;">Completado</span>
                        <button class="btn btn-sm btn-outline-danger" onclick="eliminarPrestamo(<?php echo $prestamo['id']; ?>)">Eliminar</button>
                    <?php } ?>
                </td>
            </tr>
            <?php } ?>
        </tbody>
    </table>
</div>