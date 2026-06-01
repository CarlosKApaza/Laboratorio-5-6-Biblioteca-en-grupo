// Variable global para el modal de Bootstrap
let modalGlobal = null;

// ==========================================
// MÓDULO DE LIBROS
// ==========================================

function abrirModalRegistro() {
    const espacioModal = document.getElementById('espacio-modal');
    
    // Fetch para traer el formulario desde registro.php
    fetch('libros/registro.php')
        .then(response => response.text())
        .then(htmlForm => {
            // Construimos la estructura del modal de Bootstrap y le metemos el formulario
            espacioModal.innerHTML = `
                <div class="modal fade" id="miModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="tituloModal">Registrar Libro</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                ${htmlForm} 
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Inicializamos y mostramos el modal
            modalGlobal = new bootstrap.Modal(document.getElementById('miModal'));
            modalGlobal.show();
        });
}

function guardarLibro() {
    // Validar stock [cite: 89]
    if (parseInt(document.getElementById('stock').value) < 0) {
        alert("El stock no puede ser negativo");
        return;
    }

    const form = document.getElementById('formLibro');
    const formData = new FormData(form);
    
    // Si hay un ID, vamos a update.php, si no, a create.php [cite: 67]
    const idLibro = document.getElementById('libro_id').value;
    const ruta = (idLibro !== "") ? 'libros/update.php' : 'libros/create.php';

    fetch(ruta, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === "ok") {
            alert(data.mensaje);
            modalGlobal.hide(); // Ocultamos el modal
            cargarModulo('libros/lista.php'); // Recargamos la tabla
        } else {
            alert("Error: " + data.mensaje);
        }
    })
    .catch(error => console.error('Error:', error));
}

// (Mantenemos tu función de eliminar igual, pero en este archivo)
function eliminarLibro(id) {
    if(confirm("¿Estás seguro de eliminar este libro?")) {
        const formData = new FormData();
        formData.append('id', id);

        fetch('libros/delete.php', { method: 'POST', body: formData })
            .then(res => res.json())
            .then(res => {
                alert(res.mensaje);
                if(res.status === 'ok') cargarModulo('libros/lista.php');
            });
    }
}