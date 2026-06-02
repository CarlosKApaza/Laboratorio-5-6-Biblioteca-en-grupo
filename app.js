let modalGlobal = null; // Guardará la instancia del modal
// cargar contenido
function cargarContenido(ruta) {
    const contenedor = document.getElementById('contenido-principal');
    fetch(ruta)
        .then(response => response.text())
        .then(html => {
            contenedor.innerHTML = html;
        });
}

// Modal Reigstro Lirbo
// Modal Registro Libros (Versión simplificada)
function abrirModalRegistro() {
    const espacioModal = document.getElementById('espacio-modal');
    
    fetch('libros/registro.php')
        .then(response => response.text()) // Directo a obtener el texto
        .then(htmlForm => {
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
            
            modalGlobal = new bootstrap.Modal(document.getElementById('modalDinamico'));
            modalGlobal.show();
        })
        .catch(error => alert("Error al cargar formulario de libros: " + error));
}

// guardar libro
function guardarLibro() {
    if (parseInt(document.getElementById('stock').value) < 0) {
        alert("El stock no puede ser negativo");
        return;
    }

    const form = document.getElementById('formLibro');
    const formData = new FormData(form);
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
            modalGlobal.hide(); 
            cargarContenido('libros/lista.php'); 
        } else {
            alert("Error: " + data.mensaje);
        }
    })
    .catch(error => console.error('Hubo un error:', error));
}

// editar
function editarLibro(id) {
    const espacioModal = document.getElementById('espacio-modal');

    // 1. Pedimos el formulario
    fetch('libros/registro.php')
        .then(res => res.text())
        .then(htmlForm => {
            // Inyectamos el modal con estilo warning
            espacioModal.innerHTML = `
                <div class="modal fade" id="modalDinamico" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header bg-warning text-dark">
                                <h5 class="modal-title">Editar Libro</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">${htmlForm}</div>
                        </div>
                    </div>
                </div>`;

            modalGlobal = new bootstrap.Modal(document.getElementById('modalDinamico'));

            // Retornamos el segundo fetch para seguir la cadena abajo
            return fetch(`libros/get.php?id=${id}`);
        })
        .then(res => res.json()) // Convertimos la respuesta del segundo fetch a JSON
        .then(libro => {
            // Llenamos los campos con los datos del servidor
            document.getElementById('libro_id').value = libro.id;
            document.getElementById('titulo').value = libro.titulo;
            document.getElementById('autor').value = libro.autor;
            document.getElementById('isbn').value = libro.isbn;
            document.getElementById('categoria').value = libro.categoria;
            document.getElementById('stock').value = libro.stock;

            // Cambiamos el botón y mostramos
            document.querySelector('#formLibro button[type="submit"]').textContent = "Actualizar Libro";
            modalGlobal.show();
        })
        .catch(err => alert("Hubo un problema al cargar los datos: " + err));
}


// eliminar
function eliminarLibro(id){
    if(confirm("¿Estás seguro de eliminar este libro?")) {
        const formData = new FormData();
        formData.append('id', id);

        fetch('libros/delete.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === "ok") {
                alert(data.mensaje);
                cargarContenido('libros/lista.php');
            } else {
                alert("Error: " + data.mensaje);
            }
        });
    }
}




//------------------------------------------------------------------------------------

// Modal para nuevo Usuario
function abrirModalUsuario() {
    const espacioModal = document.getElementById('espacio-modal');
    
    fetch('usuarios/registro.php')
        .then(response => response.text())
        .then(htmlForm => {
            espacioModal.innerHTML = `
                <div class="modal fade" id="modalDinamico" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header bg-primary text-white">
                                <h5 class="modal-title">Registrar Nuevo Usuario</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                ${htmlForm} 
                            </div>
                        </div>
                    </div>
                </div>`;
            
            modalGlobal = new bootstrap.Modal(document.getElementById('modalDinamico'));
            modalGlobal.show();
        })
        .catch(error => alert("Error al cargar formulario de usuario: " + error));
}


// guardar usuario
function guardarUsuario() {
    const form = document.getElementById('formUsuario');
    const formData = new FormData(form);

    // leemos el id oculto del usuario
    const idUsuario = document.getElementById('usuario_id').value;
    // decidimos la ruta
    const ruta = (idUsuario !== "") ? 'usuarios/update.php' : 'usuarios/create.php';

    fetch(ruta, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) 
    .then(data => {
        if(data.status === "ok") {
            alert(data.mensaje);
            modalGlobal.hide(); 
            cargarContenido('usuarios/lista.php'); // recargamos la tabla de usuarios
        } else {
            alert("Error: " + data.mensaje);
        }
    })
    .catch(error => console.error('Hubo un error:', error));
}


