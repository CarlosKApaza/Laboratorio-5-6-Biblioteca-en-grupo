<form id="formLibro" action="javascript:guardarLibro()">
    <input type="hidden" name="id" id="libro_id" value="">
    
    <div class="mb-3">
        <label>Título:</label>
        <input type="text" name="titulo" id="titulo" class="form-control" required>
    </div>
    <div class="mb-3">
        <label>Autor:</label>
        <input type="text" name="autor" id="autor" class="form-control" required>
    </div>
    <div class="mb-3">
        <label>ISBN:</label>
        <input type="text" name="isbn" id="isbn" class="form-control">
    </div>
    <div class="mb-3">
        <label>Categoría:</label>
        <input type="text" name="categoria" id="categoria" class="form-control">
    </div>
    <div class="mb-3">
        <label>Stock inicial:</label>
        <input type="number" name="stock" id="stock" class="form-control" min="0" value="1" required>
    </div>
    
    <button type="submit" class="btn btn-primary w-100">Guardar Libro</button>
</form>