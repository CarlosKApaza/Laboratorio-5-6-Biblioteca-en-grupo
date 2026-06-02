<?php
include '../conexion.php';

$sql = "SELECT * FROM usuarios ORDER BY id DESC";

$resultado = $con->query($sql);
?>

<div class="d-flex justify-content-between align-items-center mb-3">
    <h3>Lista de Usuarios</h3>
   <button class="btn btn-primary" onclick="abrirModalUsuario()">
    + Nuevo Usuario
</button>
</div>

<div class="table-responsive">
    <table class="table table-striped table-hover">
        <thead class="table-dark">
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Carnet</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php while($usuario = $resultado->fetch_assoc()) { ?>
            <tr>
                <td><?php echo $usuario['id']; ?></td>
                <td><?php echo $usuario['nombre']; ?></td>
                <td><?php echo $usuario['carnet']; ?></td>
                <td><?php echo $usuario['telefono']; ?></td>
                <td><?php echo $usuario['correo']; ?></td>
                
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editarUsuario(<?php echo $usuario['id']; ?>)">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(<?php echo $usuario['id']; ?>)">Eliminar</button>
                </td>
            </tr>
            <?php } ?>
        </tbody>
    </table>
</div>
