# 1. Documentación: El Dashboard (`index.php` + `estilos.css`)

Esta es la capa principal del sistema. El objetivo aquí es lograr una **SPA (Single Page Application)**, es decir, una aplicación web donde el navegador nunca parpadea ni recarga la página por completo.

## Archivos Principales

### `index.php` (El Esqueleto y Contenedor)
* **¿Qué hace?** Es la única página real que el usuario carga en su navegador. Contiene el `head` (con las importaciones de Bootstrap y Google Fonts), el `aside` (el menú lateral de navegación oscuro) y un área clave: la etiqueta `<main id="contenido-principal">`.
* **Su secreto técnico:** Ese `<main>` actúa como un "lienzo en blanco". Es el lugar exacto donde JavaScript inyectará dinámicamente el código HTML de las tablas de libros o usuarios, dependiendo de la opción que el usuario cliquee en el menú.
* **El Modal Invisible:** Justo antes de cerrar la etiqueta `<body>`, existe un `<div id="espacio-modal"></div>`. Este contenedor está oculto por defecto, pero funciona como la "pista de aterrizaje" donde se inyectan y construyen los formularios de creación y edición instantes antes de mostrarse en pantalla con Bootstrap.

### `estilos.css` (La Piel y Estética)
* **¿Qué hace?** Sobrescribe el diseño genérico que provee Bootstrap. Mientras que Bootstrap se encarga de la *estructura* matemática (cuadrículas, márgenes, comportamiento responsivo y animaciones del modal), este archivo CSS define la *identidad visual* y estética del proyecto.
* **El truco técnico:** La jerarquía en HTML importa. Al colocar la etiqueta `<link rel="stylesheet" href="estilos.css">` estrictamente *después* del enlace CDN de Bootstrap en el `index.php`, las reglas de color, tipografías personalizadas (*Inter* y *Playfair Display*) y efectos *hover* adquieren mayor prioridad (especificidad), aplastando los estilos predeterminados de la librería.

---------------------------------------------------------------
# Módulo de Libros - Backend (API PHP)

Este directorio contiene los "endpoints" o micro-scripts de PHP que manejan la lógica del lado del servidor para la gestión de libros. Sigue una arquitectura basada en operaciones CRUD, comunicándose con el Frontend exclusivamente a través de Fetch API y formato JSON.

## Archivos y Responsabilidades

### 1. Vistas y Componentes HTML
Estos archivos no devuelven JSON, sino fragmentos de HTML que JavaScript inyecta en el DOM.
* **`lista.php` (Read All):** Ejecuta un `SELECT *` en la BD y construye la tabla HTML con todos los registros. Contiene los botones de "Editar" y "Eliminar" que disparan funciones JS pasándole el `id` del libro.
* **`registro.php` (Plantilla de Formulario):** Contiene únicamente las etiquetas `<form>` y `<input>`. No tiene `<body>` ni `<head>`. Se utiliza como plantilla tanto para CREAR como para EDITAR. Contiene un input oculto (`<input type="hidden" id="libro_id">`) fundamental para distinguir entre un registro nuevo y una actualización.

### 2. Controladores (Endpoints JSON)
Estos archivos reciben peticiones asíncronas, ejecutan comandos SQL y devuelven respuestas estrictamente en formato `JSON` (ej. `{"status":"ok"}`).
* **`create.php` (Create):** Recibe los datos vía método `POST`. Utiliza consultas preparadas (`prepare` y `bind_param`) para insertar un nuevo libro en la BD evitando inyecciones SQL.
* **`get.php` (Read Single):** Recibe un `id` vía método `GET`. Busca ese registro específico en la BD y devuelve un objeto JSON con sus datos. Es vital para rellenar el formulario antes de editar.
* **`update.php` (Update):** Recibe los datos del formulario y el `id` oculto vía `POST`. Ejecuta un `UPDATE` en la BD sobrescribiendo los datos antiguos.
* **`delete.php` (Delete):** Recibe un `id` vía `POST` y ejecuta la sentencia `DELETE` en la BD.


-------------------------------------------------------


# Documentación del Frontend Dinámico (`app.js`)

Este archivo es el "Director de Orquesta" del sistema. Utiliza JavaScript moderno (ES6+) y Fetch API para manejar eventos de usuario, comunicarse con el servidor de forma asíncrona y actualizar la Interfaz de Usuario (UI) dinámicamente.

## Flujo de Trabajo (Fetch API)
El sistema se basa en Promesas (`.then()`). El flujo estándar es:
1. JS captura una acción (ej. un clic).
2. JS usa `fetch()` para ir al servidor (PHP).
3. PHP responde con HTML (para vistas) o JSON (para datos/estados).
4. JS lee la respuesta y manipula el DOM (`innerHTML`) o lanza alertas (`alert`).

## Funciones Principales

### Navegación y Vistas
* **`cargarContenido(ruta)`:** Es la función principal de la SPA. Recibe la ruta de un archivo (ej. `libros/lista.php`), descarga su HTML y lo inyecta dentro del contenedor `<main id="contenido-principal">`. Incluye un "spinner" de carga mientras espera la respuesta.

### Operaciones CRUD
* **`abrirModalRegistro()`:** Descarga el HTML de `registro.php`, lo envuelve en la estructura de un Modal de Bootstrap y lo muestra en pantalla. Prepara el terreno para un `INSERT`.
* **`guardarLibro()`:** Captura los datos del formulario usando el objeto `FormData`. 
    * **Lógica condicional:** Lee el input oculto `#libro_id`. Si está vacío, la variable `ruta` se ajusta a `create.php`. Si tiene un número, se ajusta a `update.php`. 
    * Envía la petición, y si el servidor responde `status: ok`, cierra el modal y recarga la tabla invocando a `cargarContenido()`.
* **`editarLibro(id)`:** Tiene un flujo de dos pasos:
    1. Descarga el formulario (`registro.php`) y lo inyecta en el modal (cambiando su color a "warning" para indicar edición).
    2. Ejecuta un fetch a `get.php?id={id}`, recibe los datos del libro en formato JSON y llena automáticamente el valor (`.value`) de cada input, incluyendo el ID oculto.
* **`eliminarLibro(id)`:** Lanza una advertencia de confirmación (`confirm()`). Si el usuario acepta, envía el `id` mediante `FormData` a `delete.php`. Si la respuesta es exitosa, recarga la tabla para reflejar el cambio visualmente.

## Variables Globales
* **`let modalGlobal = null;`** Almacena la instancia del Modal de Bootstrap. Al declararse globalmente, permite que cualquier función (como `abrirModalRegistro` o `editarLibro`) pueda inicializarlo, y que `guardarLibro` pueda cerrarlo (`modalGlobal.hide()`).

----------------------------------------------------------------
