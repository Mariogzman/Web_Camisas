const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito'); // corregido

cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento); // corregido
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e) {
    e.preventDefault(); // corregido
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id') // corregido
    }
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width=100 />
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a> <!-- corregido -->
        </td>
    `;

    lista.appendChild(row);
}

function eliminarElemento(e) {
    e.preventDefault(); // corregido
    let elemento,
        elementoId;
    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id'); // corregido
    }
}

function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    return false;
}

// script.js

document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-icon a');

    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(link.href, '_blank');
        });
    });
});

// Función para mostrar un mensaje de éxito después de enviar el formulario
function mostrarMensajeExito() {
    // Mostrar un mensaje de éxito
    alert("¡Gracias! Tu mensaje ha sido enviado con éxito.");
    // Redireccionar a otra página (opcional)
}

// Esperar a que se cargue el DOM
document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar el formulario
    var form = document.querySelector("form");

    // Escuchar el evento submit del formulario
    form.addEventListener("submit", function(event) {
        // Prevenir el envío del formulario
        event.preventDefault();

        // Obtener los datos del formulario
        var formData = new FormData(form);

        // Enviar los datos del formulario utilizando Fetch API
        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Mostrar un mensaje de éxito
            mostrarMensajeExito();
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            // Mostrar un mensaje de error
            alert("Ocurrió un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.");
        });
    });
});

