let modalGlobal = null; 

// cargar contenido
function cargarContenido(ruta) {
    const contenedor = document.getElementById('contenido-principal');
    fetch(ruta)
        .then(response => response.text())
        .then(html => {
            contenedor.innerHTML = html;
        });
}

// 
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


// editar usuario
function editarUsuario(id) {
    const espacioModal = document.getElementById('espacio-modal');

    // 1. Pedimos el formulario
    fetch('usuarios/registro.php')
        .then(res => res.text())
        .then(htmlForm => {
            // Inyectamos el modal con estilo warning
            espacioModal.innerHTML = `
                <div class="modal fade" id="modalDinamico" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header bg-warning text-dark">
                                <h5 class="modal-title">Editar Usuario</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">${htmlForm}</div>
                        </div>
                    </div>
                </div>`;

            modalGlobal = new bootstrap.Modal(document.getElementById('modalDinamico'));

            // Retornamos el segundo fetch para seguir la cadena abajo
            return fetch(`usuarios/get.php?id=${id}`);
        })
        .then(res => res.json()) // Convertimos la respuesta del segundo fetch a JSON
        .then(usuario => {
            // Llenamos los campos con los datos del servidor
            document.getElementById('usuario_id').value = usuario.id;

            document.getElementById('usuario_nombre').value = usuario.nombre;
            document.getElementById('usuario_carnet').value = usuario.carnet;
            document.getElementById('usuario_telefono').value = usuario.telefono;
            document.getElementById('usuario_correo').value = usuario.correo;

            // Cambiamos el botón y mostramos
            document.querySelector('#formUsuario button[type="submit"]').textContent = "Actualizar Usuario";
            modalGlobal.show();
        })
        .catch(err => alert("Hubo un problema al cargar los datos: " + err));
}

// eliminar
function eliminarUsuario(id){
    if(confirm("¿Estás seguro de eliminar este Usuario?")) {
        const formData = new FormData();
        formData.append('id', id);

        fetch('usuarios/delete.php', {
            method: 'POST',
            body: formData
        })

        .then(response => response.json())
        .then(data => {
            if(data.status === "ok") {
                alert(data.mensaje);
                cargarContenido('usuarios/lista.php');
            } else {
                alert("Error: " + data.mensaje);
            }
        });
    }
}



//---------------------------------------- parte 2

// Modal para prestamo
function abrirModalPrestamo() {
    const espacioModal = document.getElementById('espacio-modal');
    
    fetch('prestamos/registro.php')
        .then(response => response.text())
        .then(htmlForm => {
            espacioModal.innerHTML = `
                <div class="modal fade" id="modalDinamico" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header bg-primary text-white">
                                <h5 class="modal-title">Registrar Nuevo Prestamo</h5>
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


// guardar prestamo
function guardarPrestamo() {
    const form = document.getElementById('formPrestamo');
    const formData = new FormData(form);

    fetch("prestamos/create.php", {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) 
    .then(data => {
        if(data.status === "ok") {
            alert(data.mensaje);
            modalGlobal.hide(); 
            cargarContenido('prestamos/lista.php'); 
        } else {
            alert("Error: " + data.mensaje);
        }
    })
    .catch(error => console.error('Hubo un error:', error));
}

// Cambiar estado del Préstamo (Devolver o Vencer)
function cambiarEstadoPrestamo(idPrestamo, nuevoEstado, idLibro) {
    if(confirm(`¿Estás seguro de marcar este préstamo como ${nuevoEstado}?`)) {
        
        const formData = new FormData();
        formData.append('id', idPrestamo);
        formData.append('estado', nuevoEstado);
        formData.append('id_libro', idLibro);

        fetch('prestamos/update_estado.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === "ok") {
                alert(data.mensaje);
                cargarContenido('prestamos/lista.php'); // Recargamos para ver el cambio
            } else {
                alert("Error: " + data.mensaje);
            }
        })
        .catch(error => console.error('Hubo un error:', error));
    }
}

// filtrar tabla
function filtrarTabla() {
    let estado = document.getElementById("filtroEstado").value.toUpperCase();
    let texto = document.getElementById("filtroTexto").value.toUpperCase();
    let filas = document.querySelectorAll("#tablaPrestamos tbody tr");

    filas.forEach(fila => {
        // Obtenemos los textos de las columnas: Libro (1), Usuario (2) y Estado (5)
        let colLibro = fila.cells[1].textContent.toUpperCase();
        let colUsuario = fila.cells[2].textContent.toUpperCase();
        let colEstado = fila.cells[5].textContent.toUpperCase();

        // Verificamos si coinciden
        let coincideEstado = (estado === "TODOS" || colEstado.includes(estado));
        let coincideTexto = (colLibro.includes(texto) || colUsuario.includes(texto));

        // Mostrar u ocultar la fila
        if (coincideEstado && coincideTexto) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }
    });
}

// eliminar prestamo
function eliminarPrestamo(id) {
    if(confirm("¿Estás seguro de eliminar el registro de este préstamo del historial?")) {
        const formData = new FormData();
        formData.append('id', id);

        fetch('prestamos/delete.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === "ok") {
                alert(data.mensaje);
                cargarContenido('prestamos/lista.php'); // Recargamos para que desaparezca
            } else {
                alert("Error: " + data.mensaje);
            }
        })
        .catch(error => console.error('Hubo un error:', error));
    }
}