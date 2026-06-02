let modalGlobal = null; // Guardará la instancia del modal

// 1. CARGA DE VISTAS (TABLAS)
function cargarModulo(ruta) {
    const contenedor = document.getElementById('contenido-principal');
    contenedor.innerHTML = '<div class="text-center mt-5"><div class="spinner-border text-primary"></div><p>Cargando...</p></div>';

    fetch(ruta)
        .then(response => response.text())
        .then(html => {
            contenedor.innerHTML = html;
        });
}

// 2. ABRIR EL MODAL DINÁMICO
function abrirModalRegistro() {
    const espacioModal = document.getElementById('espacio-modal');
    
    // 1. Buscamos el archivo registro.php que tiene el <form> [cite: 65]
    fetch('libros/registro.php')
        .then(response => {
            if (!response.ok) throw new Error("No se encontró libros/registro.php");
            return response.text();
        })
        .then(htmlForm => {
            // 2. Inyectamos la estructura completa del Modal de Bootstrap [cite: 83]
            espacioModal.innerHTML = `
                <div class="modal fade" id="modalDinamico" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header bg-primary text-white">
                                <h5 class="modal-title">Registrar Nuevo Libro</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                ${htmlForm} 
                            </div>
                        </div>
                    </div>
                </div>`;
            
            // 3. Activamos el modal usando la librería de Bootstrap [cite: 153]
            const miModal = new bootstrap.Modal(document.getElementById('modalDinamico'));
            miModal.show();
        })
        .catch(error => alert(error));
}

// 3. GUARDAR EL LIBRO EN BD
function guardarLibro() {
    // Validar el stock negativo
    if (parseInt(document.getElementById('stock').value) < 0) {
        alert("El stock no puede ser negativo");
        return;
    }

    const form = document.getElementById('formLibro');
    const formData = new FormData(form);
    
    // Si el ID está vacío crea, si no, actualiza
    const idLibro = document.getElementById('libro_id').value;
    const ruta = (idLibro !== "") ? 'libros/update.php' : 'libros/create.php';

    fetch(ruta, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) // Espera la respuesta JSON desde create.php
    .then(data => {
        if(data.status === "ok") {
            alert(data.mensaje);
            modalGlobal.hide(); // Esconde el modal
            cargarModulo('libros/lista.php'); // Recarga la tabla de libros
        } else {
            alert("Error: " + data.mensaje);
        }
    })
    .catch(error => console.error('Hubo un error:', error));
}


function limpiarFormularioLibro(){
    
}