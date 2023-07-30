import { clientServices } from "../service/client-service.js";

const cliente = {
    nombre: '',
    email: ''
}

const inputNombre = document.querySelector('[data-nombre]');
const inputEmail = document.querySelector('[data-email]');
const btnSubmit = document.querySelector('[type="submit"]');

const formulario = document.querySelector('[data-form]');



eventListeners();
function eventListeners() {
    inputNombre.addEventListener('input', validar);
    inputEmail.addEventListener('input', validar);
    
    formulario.addEventListener('submit', crearNuevoCliente);
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


function crearNuevoCliente(e) {
    const {nombre, email} = cliente;
    e.preventDefault();
    eliminarAlertas();

    clientServices.crearCliente(nombre, email)
    .then( respuesta => {
        window.location.href = '/screens/registro_completado.html';
    }).catch( err => `Hubo un error: ${err}`);

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
        btnSubmit.classList.add('opacity-50');
        btnSubmit.style.cursor = 'default';
        btnSubmit.disabled = true;
        return
    }
    btnSubmit.classList.remove('opacity-50');
    btnSubmit.style.cursor = 'pointer';
    btnSubmit.disabled = false;
}

function resetFormulario() {
    // Reiniciar el objeto
    cliente.nombre = '';
    cliente.email = '';


    console.log(cliente);

    formulario.reset();
    comprobarCliente();
}