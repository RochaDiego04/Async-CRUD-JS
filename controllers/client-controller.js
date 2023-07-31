import { clientServices } from "../service/client-service.js";

const crearNuevaLinea = (nombre, email, id) => {
    const linea = document.createElement("TR");
    const contenido = `
      <td class="td" data-td>${nombre}</td>
      <td>${email}</td>
      <td>
        <ul class="table__button-control">
          <li>
            <a
              href="../screens/editar_cliente.html"
              class="simple-button simple-button--edit"
              >Editar</a
            >
          </li>
          <li>
            <button
              class="simple-button simple-button--delete"
              type="button"
              id=${id}
            >
              Eliminar
            </button>
          </li>
        </ul>
      </td>`;
    linea.innerHTML = contenido;

    const btnEditar = linea.querySelector("button");
    btnEditar.addEventListener('click', () => {
        const id = btnEditar.id;
        clientServices.eliminarCliente(id)
            .then( respuesta => {
                console.log(respuesta);
            })
            .catch( err => {
                alert('Ocurrió un error');
            })
    });

    return linea;
  };
  
  const table = document.querySelector("[data-table]");

clientServices.listaClientes().then(data => {
    data.forEach(perfil => {
        const { nombre, email, id } = perfil;
        const nuevaLinea = crearNuevaLinea(nombre, email, id);
        table.appendChild(nuevaLinea);
      });
})
.catch((error) => alert(`Ocurrió un error: ${error}`));
  
