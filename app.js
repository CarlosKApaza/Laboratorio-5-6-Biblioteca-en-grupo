let modalGlobal = null; // Guardará la instancia del modal

// 1. CARGA DE VISTAS (TABLAS)
function cargarContenido(ruta) {
    const contenedor = document.getElementById('contenido-principal');
    contenedor.innerHTML = '<div class="text-center mt-5"><div class="spinner-border text-primary"></div><p>Cargando...</p></div>';

    fetch(ruta)
        .then(response => response.text())
        .then(html => {
            contenedor.innerHTML = html;
        });
}

// modal registro libros
function abrirModalRegistro() {
    const espacioModal = document.getElementById('espacio-modal');
    
    fetch('libros/registro.php')
        .then(response => {
            if (!response.ok) throw new Error("No se encontró libros/registro.php");
            return response.text();
        })
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
        .catch(error => alert(error));
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

// editar
function editarLibro(id){
    const espacioModal = document.getElementById('espacio-modal');

    // llamamos el formulario de libros
    fetch('libros/registro.php')
        .then(response => {
            if (!response.ok) throw new Error("No se encontro registro.php");
            return response.text();
        })
        .then(htmlForm => {
            // contruimos el modalcon bg-warning (amarillo)
        espacioModal.innerHTML = `
        <div class="modal fade" id="modalDinamico" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-warning text-dark">
                            <h5 class="modal-title">Editar Libro</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                            <div class="modal-body">
                            ${htmlForm} 
                            </div>
                     </div>
                </div>
        </div>`;
        modalGlobal = new bootstrap.Modal(document.getElementById('modalDinamico'));

        // buscamos en la BD a buscar la info del libro especifico
        fetch(`libros/get.php?id=${id}`)
            .then(response => response.json())
            .then(libro => {
                
                // llenamos el formulario con datos que nos devolvio get.php
                document.getElementById('libro_id').value = libro.id; 
                document.getElementById('titulo').value = libro.titulo;
                document.getElementById('autor').value = libro.autor;
                document.getElementById('isbn').value = libro.isbn;
                document.getElementById('categoria').value = libro.categoria;
                document.getElementById('stock').value = libro.stock;
                
                // cambiamos el texto del boton a actualizar
                document.querySelector('#formLibro button[type="submit"]').textContent = "Actualizar Libro";

                modalGlobal.show();                
            })
            .catch(error => alert("Error al buscar los datos del libro: " + error));
        }) 
        .catch(error => alert("Erro al cargar el modal: "));
}