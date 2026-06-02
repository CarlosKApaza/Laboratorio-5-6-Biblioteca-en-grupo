<form id="formUsuario" action="javascript:guardarUsuario()">

    <input type="hidden" name="id" id="usuario_id" value="">

    <div class="mb-3">
        <label for="usuario_nombre">Nombre:</label>
        <input type="text" name="nombre" id="usuario_nombre" class="form-control" required>
    </div>

    <div class="mb-3">
        <label for="usuario_carnet">Carnet de Identidad:</label>
        <input type="text" name="carnet" id="usuario_carnet" class="form-control" required>
    </div>

    <div class="mb-3">
        <label for="usuario_telefono">Telefono:</label>
        <input type="text" name="telefono" id="usuario_telefono" class="form-control" required>
    </div>

    <div class="mb-3">
        <label for="usuario_correo">Correo:</label>
        <input type="text" name="correo" id="usuario_correo" class="form-control" required>

        <button type="submit" class="btn btn-primary w-100">Guardar Usuario</button>
    </div>
</form>