import { clientServices } from "../service/client-service.js";

const cliente = {
    nombre: '',
    email: ''
}

const inputNombre = document.querySelector('[data-nombre]');
const inputEmail = document.querySelector('[data-email]');
const btnEditar = document.querySelector('[type="submit"]');

const formulario = document.querySelector('[data-form]');

const url = new URL(window.location);
const id = url.searchParams.get("id");

const obtenerInformacion = async () => {
    if (id === null) {
        window.location.href = "../screens/error.html";
    }

    try {
        const perfil = await clientServices.detalleCliente(id);
        if (perfil.nombre && perfil.email){
            const {nombre, email} = perfil;
            inputNombre.value = nombre;
            inputEmail.value = email;
            cliente.nombre = nombre;
            cliente.email = email;
            comprobarCliente();
        }
        else {
            throw new Error();
        }
    } catch(error) {
        console.log(`Error extrayendo datos del cliente con id ${id}`);
        window.location.href = "/screens/error.html";
    }
}

obtenerInformacion();

eventListeners();
function eventListeners() {
    inputNombre.addEventListener('input', validar);
    inputEmail.addEventListener('input', validar);
    
    formulario.addEventListener('submit', actualizarCliente);
}

function validar(e) {
    if(e.target.value.trim() === ''){
        mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement)
        cliente[e.target.name] = '';
        comprobarCliente();
        return; 
    }
    
    if(e.target.id === 'email' && !validarEmail(e.target.value)){
        mostrarAlerta('El email no es valido',  e.target.parentElement);
        cliente[e.target.name] = '';
        comprobarCliente();
        return;
    }

    limpiarAlerta(e.target.parentElement);

    cliente[e.target.name] = e.target.value.trim().toLowerCase();

    comprobarCliente();
}



function validarEmail(email) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    const resultado = regex.test(email)
    return resultado;    
}


function actualizarCliente(e) {
    const {nombre, email} = cliente;
    e.preventDefault();
    eliminarAlertas();
    
    clientServices.actualizarCliente(nombre, email, id)
    .then(() => {
        window.location.href = '/screens/edicion_concluida.html';
    })

    resetFormulario();
}

function eliminarAlertas() {
    const alertas = formulario.querySelectorAll('.bg-red-600');
    alertas.forEach(alerta => {
        alerta.remove();
    });
}

function mostrarAlerta(mensaje, referencia) {
    const alerta = referencia.querySelector('.bg-red-600');
    if(alerta){
        alerta.remove();
    }

    const error = document.createElement('DIV');
    error.textContent = mensaje;
    error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

    referencia.appendChild(error)
}

function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector('.bg-red-600');
    if(alerta){
        alerta.remove();
    }
}

function comprobarCliente() {
    if(Object.values(cliente).includes('')){
        btnEditar.classList.add('opacity-50');
        btnEditar.style.cursor = 'default';
        btnEditar.disabled = true;
        return
    }
    btnEditar.classList.remove('opacity-50');
    btnEditar.style.cursor = 'pointer';
    btnEditar.disabled = false;
}

function resetFormulario() {
    // Reiniciar el objeto
    cliente.nombre = '';
    cliente.email = '';

    formulario.reset();
    comprobarCliente();
}