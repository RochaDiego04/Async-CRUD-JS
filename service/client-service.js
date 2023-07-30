
// Abrir HTTP (método, url)

/*
Create - POST
Read - GET
Update - PUT
Delete - DELETE
*/

const listaClientes = () => // Fetch utiliza GET por defecto
    fetch("http://localhost:3000/perfil").then( respuesta => respuesta.json());

export const clientServices = {
  listaClientes
};
