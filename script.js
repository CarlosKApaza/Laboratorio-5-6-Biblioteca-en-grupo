function limpiarFormularioLibro() {
    document.getElementById('formLibro').reset();
}

function guardarLibro() {
    const form = document.getElementById('formLibro');
    const formData = new FormData(form);

    fetch('libros/create.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) // Esperamos un JSON como respuesta
    .then(data => {
        if(data.status === "ok") {
            alert(data.mensaje); // Mensaje de éxito
            
            // Cerrar el modal de Bootstrap
            const modalEl = document.getElementById('modalLibro');
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();

            // Recargar la vista de la tabla
            cargarModulo('libros/lista.php');
        } else {
            alert("Error: " + data.mensaje);
        }
    })
    .catch(error => console.error('Error:', error));
}