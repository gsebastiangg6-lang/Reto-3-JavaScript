// URL de la API pública solicitada en el reto
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Referencias a los elementos del DOM
const cuerpoTabla = document.getElementById('cuerpo-tabla');
const statusBadge = document.getElementById('status-badge');

// Función principal para obtener los contactos desde la API y mostrarlos en la tabla
function obtenerContactos() {
  fetch(API_URL)
    .then(respuesta => {
      // Verificamos que la petición HTTP haya sido exitosa (status 200-299)
      if (!respuesta.ok) {
        throw new Error(`Error en la petición HTTP: ${respuesta.status}`);
      }
      // Convertimos la respuesta a formato JSON
      return respuesta.json();
    })
    .then(usuarios => {
      // REQUERIMIENTO DE CONSOLA: Mensaje indicando que los datos fueron obtenidos correctamente
      console.log('¡Datos obtenidos correctamente desde la API de JSONPlaceholder!');
      console.log(`Recurso consumido: ${API_URL}`);
      console.log(usuarios);

      // Actualizamos el indicador visual en la página
      statusBadge.textContent = `${usuarios.length} contactos cargados`;
      statusBadge.className = 'badge badge-success';

      // Limpiamos el mensaje de carga inicial de la tabla
      cuerpoTabla.innerHTML = '';

      // Recorremos el arreglo de usuarios e insertamos cada fila dinámicamente
      usuarios.forEach(usuario => {
        const fila = document.createElement('tr');

        // Nota: En la API de JSONPlaceholder, la empresa viene dentro del objeto usuario.company.name
        fila.innerHTML = `
          <td class="nombre-col">${usuario.name}</td>
          <td class="email-col"><a href="mailto:${usuario.email}">${usuario.email}</a></td>
          <td>${usuario.phone}</td>
          <td class="empresa-col"><span>${usuario.company.name}</span></td>
        `;

        cuerpoTabla.appendChild(fila);
      });
    })
    .catch(error => {
      console.error('Hubo un error al obtener los datos de la API:', error);
      statusBadge.textContent = 'Error de conexión';
      statusBadge.className = 'badge badge-error';
      cuerpoTabla.innerHTML = `
        <tr>
          <td colspan="4" class="loading-message">
            No se pudieron cargar los datos. Verifica tu conexión a internet.
          </td>
        </tr>
      `;
    });
}

// Ejecutamos la función automáticamente al cargar la página
document.addEventListener('DOMContentLoaded', obtenerContactos);
