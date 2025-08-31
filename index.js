// Función para asignar los eventos a los botones y enlaces del DOM
function eventos() {
    document.querySelector("#ingreso").addEventListener("click", loginUI);
    document.querySelector("#btnCerrarSesion").addEventListener("click", cerrarSesionUI);
    document.querySelector("#btnCerrarSesion2").addEventListener("click", cerrarSesionUI);
    document.querySelector("#btnInicio").addEventListener("click", mostrarPantallaClienteUI);
    document.querySelector("#btnInicio2").addEventListener("click", mostrarPantallaPaseadorUI);
    document.querySelector("#btnEstado").addEventListener("click", mostrarEstadoContratacion);
    document.querySelector("#btnRegistro").addEventListener("click", registroUI);
    document.querySelector("#btnListado").addEventListener("click", mostrarPerrosAsignados);
    document.querySelector("#btnEstadisticas").addEventListener("click", mostrarEstadisticasPaseos);
    document.querySelector("#btnRegistroCompletado").addEventListener("click", nuevoUsuarioUI);
}

// Instancia única del sistema que maneja toda la lógica
let miSistema = new Sistema();

// Precarga los datos iniciales (clientes, paseadores, contrataciones)
miSistema.precargarTodo();

// Inicialización al cargar la página:
// - Asigna eventos a los botones
// - Oculta todas las secciones
// - Muestra la pantalla de login
eventos();
ocultarTodo();
mostrarLogin();

// Oculta todas las secciones con clase "secciones"
function ocultarTodo() {
    let lasSecciones = document.querySelectorAll(".secciones");
    for (let unaSeccion of lasSecciones) {
        unaSeccion.style.display = "none";
    }
}

// Muestra únicamente la sección del login y limpia mensajes
function mostrarLogin() {
    ocultarTodo();
    document.querySelector("#login").style.display = "block";
    document.querySelector("#msjProceso").innerHTML = "";
}

// Función que maneja el login cuando se clickea "Ingresar"
function loginUI() {
    let mensaje = "";
    // Limpia mensajes anteriores
    document.querySelector("#usuarioCreado").innerHTML = "";
    document.querySelector("#pErrorLogin").innerHTML = "";

    let usuario = document.querySelector("#userlogin").value;
    let contrasenia = document.querySelector("#passlogin").value;

    // Intenta loguear con usuario y contraseña en el sistema
    if (miSistema.login(usuario, contrasenia)) {
        // Si es cliente, muestra pantalla cliente
        if (miSistema.logueado.tipo === "CLIENTE") {
            mostrarPantallaClienteUI();
        }
        // Si es paseador, muestra pantalla paseador
        if (miSistema.logueado.tipo === "PASEADOR") {
            mostrarPantallaPaseadorUI();
        }
    } else {
        mensaje = `Verifique usuario y contraseña`;
    }
    document.querySelector("#pErrorLogin").innerHTML = mensaje;
}

// Muestra el combo (select) con paseadores disponibles para contratar
function mostrarCombo() {
    let comboConDatos = miSistema.armarComboPaseadores();
    document.querySelector("#contenedorCombo").innerHTML = comboConDatos;

    document.querySelector("#contratacion").style.display = "none";
    document.querySelector("#comboDesplegable").style.display = "block";
    document.querySelector("#exito").innerHTML = "";

    // Asigna evento para botón "Contratar" dentro del combo generado
    document.querySelector("#btnContratar").addEventListener("click", nuevaContratacionClienteUI);
}

// Función que ejecuta la contratación de un paseador seleccionado por el cliente
function nuevaContratacionClienteUI() {
    let idPaseador = document.querySelector("#selPaseadores").value;
    let mensaje = "";

    if (!isNaN(idPaseador)) {
        let idPaseadorNum = Number(idPaseador);
        let paseadorElegido = miSistema.buscarPaseadorPorId(idPaseadorNum);
        let clienteActual = miSistema.logueado;

        if (paseadorElegido !== null && clienteActual !== null) {
            if (miSistema.tieneContratacionActiva(clienteActual)) {
                mensaje = `<hr><br>Ya tienes una contratación activa, cancélala para contratar otro paseador. Si tu contratación fue aceptada, espera a que termine el paseo para contratar de nuevo.`;
            } else {
                miSistema.nuevaContratacionCliente(paseadorElegido, clienteActual);
                mensaje = `<hr><br>Paseador contratado con éxito! Puedes ver más detalles en la pestaña "Pendientes"`;
            }
        } else {
            mensaje = `<hr><br>Error al contratar paseador.`;
        }
    }

    console.log(miSistema.listaContrataciones);

    document.querySelector("#exito").innerHTML = mensaje;
}

// Muestra el estado de la contratación actual del cliente
function mostrarEstadoContratacion() {
    document.querySelector("#informacion").style.display = "none";
    document.querySelector("#comboDesplegable").style.display = "none";
    document.querySelector("#contratacion").style.display = "block";

    let cliente = miSistema.logueado;
    let contratacionArmada = miSistema.armarMuestraContratacion(cliente);

    document.querySelector("#contratacion").innerHTML = contratacionArmada;

    let contratacion = miSistema.obtenerContratacionPendiente(cliente);

    // Si hay una contratación pendiente, agrega evento al botón cancelar
    if (contratacion !== null) {
        document.querySelector("#btnCancelar").addEventListener("click", function () {
            cancelarContratacionPendienteUI();
        });
    }
}

// Cancela la contratación pendiente del cliente y actualiza la vista
function cancelarContratacionPendienteUI() {
    let cliente = miSistema.logueado;
    let contratacion = miSistema.obtenerContratacionPendiente(cliente);

    if (contratacion !== null) {
        miSistema.cancelarContratacionPendiente(contratacion.id);
        mostrarEstadoContratacion();
    }
}

// Muestra la tabla con los paseadores y cantidad de perros asignados
function mostrarPerrosAsignados() {
    document.querySelector("#comboDesplegable").style.display = "none";
    document.querySelector("#contratacion").style.display = "none";
    document.querySelector("#informacion").style.display = "block";

    let tabla = miSistema.armarDatosPaseadores();
    document.querySelector("#informacion").innerHTML = tabla;
}

// Muestra la lista de contrataciones pendientes para el paseador logueado
function contratacionesPendientesPaseadorUI() {
    document.querySelector("#gestionPerrosAsignados").style.display = "block";

    let paseador = miSistema.logueado;
    let armadoPendientes = miSistema.armarMuestraPendientes(paseador);

    document.querySelector("#gestionPerrosAsignados").innerHTML = `<h2>Contrataciones pendientes</h2>` + armadoPendientes;

    // Asigna eventos a los botones "Procesar" de cada contratación pendiente
    let contrataciones = miSistema.obtenerContratacionesPendientes(paseador);
    for (let i = 0; i < contrataciones.length; i++) {
        let id = contrataciones[i].id;
        let boton = document.querySelector(`#btnProcesar_${id}`);
        if (boton) {
            boton.addEventListener("click", function () {
                procesarContratacionPaseadorUI(id);
            });
        }
    }
}

// Procesa la contratación (aceptar o rechazar) y actualiza el mensaje de estado
function procesarContratacionPaseadorUI(pId) {
    let mensaje = "";
    let contratacion = miSistema.buscarContratacionporId(pId);
    if (contratacion !== null && contratacion.estado === "pendiente") {
        miSistema.procesarContratacionPaseador(pId);

        if (contratacion.estado === "rechazada") {
            mensaje = "Contratacion rechazada: Sin cupo o incompatibilidad.";
        } else if (contratacion.estado === "aceptada") {
            mensaje = "Contratacion aceptada.";
        }
    }

    document.querySelector("#msjProceso").innerHTML = mensaje;
    document.querySelector("#msjProceso").style.display = "block";

    // Actualiza la lista de contrataciones pendientes
    contratacionesPendientesPaseadorUI();
}

// Muestra estadísticas de perros asignados para el paseador
function mostrarEstadisticasPaseos() {
    document.querySelector("#gestionPerrosAsignados").style.display = "none";
    document.querySelector("#estadisticasPaseos").style.display = "block";
    document.querySelector("#msjProceso").style.display = "none";

    let mostrarDatos = miSistema.armarDatosPerrosAsignados();
    document.querySelector("#estadisticasPaseos").innerHTML = mostrarDatos;
}

// Muestra la pantalla principal para el cliente logueado, con las secciones visibles correspondientes
function mostrarPantallaClienteUI() {
    if (miSistema.logueado !== null) {
        ocultarTodo();
        document.querySelector("#divCerrarSesion").style.display = "block";
        document.querySelector("#divPaseadores").style.display = "block";
        document.querySelector("#divContrataciones").style.display = "block";
        document.querySelector("#divPerfil").style.display = "block";
        mostrarCombo();
    } else {
        loginUI();
    }
}

// Muestra la pantalla principal para el paseador logueado
function mostrarPantallaPaseadorUI() {
    if (miSistema.logueado !== null) {
        ocultarTodo();
        document.querySelector("#divCerrarSesionP").style.display = "block";
        document.querySelector("#divEstadisticas").style.display = "block";
        document.querySelector("#divPerfilP").style.display = "block";
        contratacionesPendientesPaseadorUI();
    } else {
        loginUI();
    }
}

// Cierra sesión y muestra la pantalla de login
function cerrarSesionUI() {
    ocultarTodo();
    miSistema.cerrarSesion();
    mostrarLogin();
}

// Muestra el formulario de registro de nuevo usuario
function registroUI() {
    ocultarTodo();
    document.querySelector("#registrarse").style.display = "block";
    document.querySelector("#pRegistro").innerHTML = "";
}

// Función que crea un nuevo usuario en el sistema a partir de los datos del formulario de registro
function nuevoUsuarioUI() {
    document.querySelector("#pErrorLogin").innerHTML = "";

    let nombre = document.querySelector("#nombreregistro").value;
    let usuario = document.querySelector("#userregistro").value;
    let contrasenia = document.querySelector("#passregistro").value;
    let nombrePerro = document.querySelector("#nombrePerro").value;
    let tamanio = document.querySelector("#tamano").value;

    let mensaje = "";
    let valido = true;

    // Validaciones básicas para los campos requeridos
    if (!nombre || !usuario || !contrasenia || !nombrePerro) {
        mensaje = "Por favor completá todos los campos correctamente.";
        valido = false;
    } else if (!tamanio || (tamanio !== "Grande" && tamanio !== "Mediano" && tamanio !== "Chico")) {
        mensaje = "El tamaño del perro debe ser grande, mediano o chico.";
        valido = false;
    } else if (!miSistema.esUsuarioUnico(usuario)) {
        mensaje = "Ese nombre de usuario ya está registrado.";
        valido = false;
    } else if (!miSistema.validarDatos(usuario, contrasenia)) {
        mensaje = "La contraseña debe tener más de 5 caracteres, incluir una mayúscula, una minúscula y un número.";
        valido = false;
    } else if(miSistema.nombrePerroTieneNum(nombrePerro)){
        mensaje = "El nombre del perro no puede contener numeros"
        valido = false;
    }

    // Si pasa validaciones, registra y vuelve a pantalla login
    if (valido) {
        miSistema.registrarUsuario(nombre, usuario, contrasenia, nombrePerro, tamanio);
        document.querySelector("#usuarioCreado").innerHTML = "Usuario creado con éxito!";
        mostrarLogin();
    } else {
        // Si hay errores, muestra mensaje correspondiente
        document.querySelector("#pRegistro").innerHTML = mensaje;
    }
}

