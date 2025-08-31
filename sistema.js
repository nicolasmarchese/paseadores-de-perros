class Sistema {
    constructor() {
        // Listas principales para almacenar la información del sistema
        this.listaContrataciones = new Array();      // Contrataciones registradas (pendientes, aceptadas, etc.)
        this.contratacionesPendientes = new Array(); // Sublista auxiliar de contrataciones pendientes
        this.listaPaseadores = new Array();          // Paseadores registrados (precargados)
        this.listaClientes = new Array();            // Clientes registrados
        this.logueado = null;                        // Usuario actualmente logueado (cliente o paseador)
    }

    // Valida que una contraseña cumpla los requisitos: 
    // mínimo 6 caracteres, al menos una mayúscula, una minúscula y un número
    validarDatos(pUsuario, pContrasenia) {
        let largoContra = pContrasenia.length;
        let correcto = false;

        if (largoContra > 5) {
            let tieneMayus = false;
            let tieneMinus = false;
            let tieneNumero = false;
            
            for (let i = 0; i < largoContra; i++) {
                let char = pContrasenia.charAt(i);
                if (char >= 'A' && char <= 'Z') tieneMayus = true;
                else if (char >= 'a' && char <= 'z') tieneMinus = true;
                else if (char >= '0' && char <= '9') tieneNumero = true;
            }

            if (tieneMayus && tieneMinus && tieneNumero) correcto = true;
        }

        return correcto;
    }

    nombrePerroTieneNum(pNombreperro){

        let perroTieneNumero = false;
        let valido = true;

        for (let i=0; i < pNombreperro.length; i++){
            let char = pNombreperro.charAt(i);

            if(char >='0' && char <='9'){
                perroTieneNumero = true;
            }
        }

          if(perroTieneNumero){
                valido = false 
            }

        return !valido;
    }

    // Verifica si el nombre de usuario es único entre los clientes (sin importar mayúsculas)
    esUsuarioUnico(pUsuario) {
        let usuarioMin = pUsuario.toLowerCase();
        let existe = false;

        for (let i = 0; i < this.listaClientes.length; i++) {
            if (this.listaClientes[i].usuario.toLowerCase() === usuarioMin) {
                existe = true;
            }
        }

        return !existe;
    }

    // Agrega un cliente precargado al sistema
    precargarUnCliente(pNombre, pUsuario, pContrasenia, pPerronombre, pPerrotamanio) {
        let clienteX = new Cliente();
        clienteX.nombre = pNombre;
        clienteX.usuario = pUsuario;
        clienteX.contrasenia = pContrasenia;
        clienteX.perronombre = pPerronombre;
        clienteX.perrotamanio = pPerrotamanio;
        this.listaClientes.push(clienteX);
    }

    // Agrega un paseador precargado al sistema
    precargarUnPaseador(pUsuario, pContrasenia, pNombre) {
        let paseadorX = new Paseador();
        paseadorX.nombre = pNombre;
        paseadorX.usuario = pUsuario;
        paseadorX.contrasenia = pContrasenia;
        this.listaPaseadores.push(paseadorX);
    }

    // Registra un nuevo cliente creado por el usuario
    registrarUsuario(pNombre, pUsuario, pContrasenia, pPerronombre, pPerrotamanio) {
        let nuevoUsuario = new Cliente();
        nuevoUsuario.nombre = pNombre;
        nuevoUsuario.usuario = pUsuario;
        nuevoUsuario.contrasenia = pContrasenia;
        nuevoUsuario.perronombre = pPerronombre;
        nuevoUsuario.perrotamanio = pPerrotamanio;
        this.listaClientes.push(nuevoUsuario);
    }

    // Intenta loguear a un cliente o paseador verificando usuario y contraseña
    login(pUsuario, pContrasenia) {
        let valido = false;
        let i = 0;

        while (!valido && i < this.listaClientes.length) {
            let clienteX = this.listaClientes[i];
            if (clienteX.usuario === pUsuario && clienteX.contrasenia === pContrasenia) {
                valido = true;
                this.logueado = clienteX;
                console.log(`Bienvenido ${clienteX.usuario}`);
            }
            i++;
        }

        let x = 0;
        while (!valido && x < this.listaPaseadores.length) {
            let paseadorX = this.listaPaseadores[x];
            if (paseadorX.usuario === pUsuario && paseadorX.contrasenia === pContrasenia) {
                valido = true;
                this.logueado = paseadorX;
                console.log(`Bienvenido ${paseadorX.usuario}`);
            }
            x++;
        }

        return valido;
    }

    // Cierra sesión del usuario actual
    cerrarSesion() {
        this.logueado = null;
        console.log(`Sesion cerrada`);
    }

    // Devuelve un combo HTML con los paseadores disponibles para el cliente logueado
    armarComboPaseadores() {
        let combo = `<select id="selPaseadores">`;
        let disponibles = this.obtenerPaseadoresDisponibles();

        if(disponibles.length > 0){
            for (let i = 0; i < disponibles.length; i++) {
            let unPaseador = disponibles[i];
            combo += `<option value="${unPaseador.id}">${unPaseador.nombre}</option>`;
        }
        }else{
            combo += `<option>-Sin paseador disponible-</option>`
        }

        combo += `</select><br><br><input id="btnContratar" type="button" value="Contratar"/><br>`;
        return combo;
    }

    // Calcula el cupo que ocupa un perro según su tamaño
    obtenerCupoPerro(tamanio) {
        let cupo = 0;
        if (tamanio === "Chico") cupo = 1;
        else if (tamanio === "Mediano") cupo = 2;
        else if (tamanio === "Grande") cupo = 4;
        return cupo;
    }

    // Retorna paseadores disponibles considerando cupos y compatibilidad de tamaños
    obtenerPaseadoresDisponibles() {
        let paseadoresDisponibles = new Array();
        let cliente = this.logueado;

        if (cliente === null || cliente.tipo !== "CLIENTE") return null;

        let cupoNecesario = this.obtenerCupoPerro(cliente.perrotamanio);

        for (let i = 0; i < this.listaPaseadores.length; i++) {
            let unPaseador = this.listaPaseadores[i];
            let cupoUsado = 0;
            let tienePequenio = false;
            let tieneGrande = false;

            for (let j = 0; j < this.listaContrataciones.length; j++) {
                let contrato = this.listaContrataciones[j];
                if (contrato.estado === "aceptada" && contrato.Paseador.id === unPaseador.id) {
                    let tam = contrato.Cliente.perrotamanio;
                    cupoUsado += this.obtenerCupoPerro(tam);
                    if (tam === "Chico") tienePequenio = true;
                    if (tam === "Grande") tieneGrande = true;
                }
            }

            let cupoDisponible = unPaseador.cupos - cupoUsado;

            let incompatibilidad = 
                (cliente.perrotamanio === "Chico" && tieneGrande) ||
                (cliente.perrotamanio === "Grande" && tienePequenio);

            if (!incompatibilidad && cupoDisponible >= cupoNecesario) {
                paseadoresDisponibles.push(unPaseador);
            }
        }

        return paseadoresDisponibles;
    }

    // Genera contenido HTML con el estado de la contratación pendiente del cliente
    armarMuestraContratacion(pCliente) {
        let contratacion = this.obtenerContratacionPendiente(pCliente);
        let contenido = "";
        let textoEstado = "";

        if (contratacion !== null && contratacion.estado === "pendiente") {
            let paseador = contratacion.Paseador;
            textoEstado = "Pendiente de aceptación";

            contenido += `
                <h2>Estado de tu contratación</h2>
                <div class="info-perro">
                  <strong>Nombre del paseador:</strong> ${paseador.nombre} <br>
                  <strong>Precio:</strong> $300 <br>
                  <strong>Estado:</strong> ${textoEstado}
                </div>
                <div class="botones">
                    <button class="cancelar" id="btnCancelar">Cancelar Contratación</button>
                </div>`;
        } else {
            contenido += `
                <h2>Estado de tu contratación</h2>
                <div class="info-perro">
                  No tienes ninguna contratación pendiente
                </div>`;
        }

        return contenido;
    }

    // Crea una nueva contratación entre un cliente y un paseador
    nuevaContratacionCliente(pPaseador, pCliente) {
        let contratacionNueva = new Contratacion();
        contratacionNueva.Paseador = pPaseador;
        contratacionNueva.Cliente = pCliente;
        this.listaContrataciones.push(contratacionNueva);
    }

    // Busca un paseador por su ID
    buscarPaseadorPorId(pId) {
        let elPaseador = null;
        for (let i = 0; i < this.listaPaseadores.length; i++) {
            if (this.listaPaseadores[i].id === pId) {
                elPaseador = this.listaPaseadores[i];
            }
        }
        return elPaseador;
    }

    // Verifica si el cliente tiene una contratación activa (pendiente o aceptada)
    tieneContratacionActiva(pCliente) {
        let tiene = false;
        for (let i = 0; i < this.listaContrataciones.length; i++) {
            let contratacion = this.listaContrataciones[i];
            if (contratacion.Cliente === pCliente &&
                (contratacion.estado === "pendiente" || contratacion.estado === "aceptada")) {
                tiene = true;
            }
        }
        return tiene;
    }

    // Retorna la contratación pendiente del cliente (si existe)
    obtenerContratacionPendiente(pCliente) {
        let laContratacion = null;
        for (let i = 0; i < this.listaContrataciones.length; i++) {
            let contratacion = this.listaContrataciones[i];
            if (contratacion.Cliente === pCliente && contratacion.estado === "pendiente") {
                laContratacion = contratacion;
            }
        }
        return laContratacion;
    }

    // Cancela una contratación pendiente por ID
    cancelarContratacionPendiente(pId) {
        let contratacion = this.buscarContratacionporId(pId);
        if (contratacion !== null && contratacion.estado === "pendiente") {
            contratacion.estado = "cancelada";
        }
    }

    // Busca una contratación por su ID
    buscarContratacionporId(pId) {
        let laContratacion = null;
        for (let i = 0; i < this.listaContrataciones.length; i++) {
            if (this.listaContrataciones[i].id === pId) {
                laContratacion = this.listaContrataciones[i];
            }
        }
        return laContratacion;
    }

    // Genera una tabla HTML con la cantidad de perros asignados por paseador
    armarDatosPaseadores() {

        let tabla = ` <h2>Asignaciones actuales de paseadores</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Perros asignados</th>
                        <th>Cupos ocupados</th>
                    </tr>
                </thead>
                <tbody>
        `;

        for (let i = 0; i < this.listaPaseadores.length; i++) {
            let paseador = this.listaPaseadores[i];
            let asignados = 0;
            let cupoUsado = 0;

            for (let j = 0; j < this.listaContrataciones.length; j++) {
                let contratacion = this.listaContrataciones[j];
                
                if (contratacion.Paseador === paseador && contratacion.estado === "aceptada") {
                    asignados++;
                    let cliente = contratacion.Cliente
                    let tam = cliente.perrotamanio;
                    cupoUsado += this.obtenerCupoPerro(tam);
                }     
            }

            if(asignados > 0){
            tabla += `
                <tr>
                    <td>${paseador.nombre}</td>
                    <td>${asignados}</td>
                    <td>${cupoUsado}</td>
                </tr>`;
            }

            
        }

        tabla += `
                </tbody>
            </table>`;

        return tabla;
    }

    // Obtiene todas las contrataciones pendientes para un paseador específico
    obtenerContratacionesPendientes(pPaseador) {
        this.contratacionesPendientes = [];
        for (let i = 0; i < this.listaContrataciones.length; i++) {
            let contratacion = this.listaContrataciones[i];
            if (contratacion.Paseador === pPaseador && contratacion.estado === "pendiente") {
                this.contratacionesPendientes.push(contratacion);
            }
        }
        return this.contratacionesPendientes;
    }

    // Arma una vista HTML de contrataciones pendientes para un paseador
    armarMuestraPendientes(pPaseador) {
        let contrataciones = this.obtenerContratacionesPendientes(pPaseador);
        let contenido = "";

        if (contrataciones.length > 0) {
            for (let i = 0; i < contrataciones.length; i++) {
                let contratacion = contrataciones[i];
                let cliente = contratacion.Cliente;
                let nombrePerro = cliente.perronombre;
                let tamanioPerro = cliente.perrotamanio;

                contenido += `
                    <div>
                        <div>
                            <strong>Nombre del perro:</strong> ${nombrePerro}<br>
                            <strong>Tamaño:</strong> ${tamanioPerro} <br>
                            <strong>Cliente:</strong> ${cliente.usuario} <br>
                            <strong>Estado:</strong> Pendiente de aceptación
                        </div>
                        <br>
                        <div class="botones">
                            <button class="procesar" id="btnProcesar_${contratacion.id}">Procesar</button>
                        </div>
                        <br>
                    </div>`;
            }
        } else {
            contenido = `
                <div class="info-perro">
                    No tienes ninguna contratación pendiente.
                </div>`;
        }

        return contenido;
    }

    // Procesa la contratación: la acepta o la rechaza según cupos y compatibilidad
    procesarContratacionPaseador(pId) {
        let contratacion = this.buscarContratacionporId(pId);

        if (contratacion !== null && contratacion.estado === "pendiente") {
            let paseador = contratacion.Paseador;
            let cliente = contratacion.Cliente;

            let cupoUsado = 0;
            let tienePequenio = false;
            let tieneGrande = false;

            for (let i = 0; i < this.listaContrataciones.length; i++) {
                let c = this.listaContrataciones[i];
                if (c.Paseador === paseador && c.estado === "aceptada") {
                    let tam = c.Cliente.perrotamanio;
                    cupoUsado += this.obtenerCupoPerro(tam);
                    if (tam === "Chico") tienePequenio = true;
                    if (tam === "Grande") tieneGrande = true;
                }
            }

            let cupoDisponible = paseador.cupos - cupoUsado;
            let cupoCliente = this.obtenerCupoPerro(cliente.perrotamanio);

            let hayIncompatibilidad = 
                (cliente.perrotamanio === "Chico" && tieneGrande) ||
                (cliente.perrotamanio === "Grande" && tienePequenio);

            if (!hayIncompatibilidad && cupoDisponible >= cupoCliente) {
                contratacion.estado = "aceptada";
            } else {
                contratacion.estado = "rechazada";
            }
        }
    }

    // Muestra información del paseador logueado sobre sus perros asignados
    armarDatosPerrosAsignados() {
        let paseadorLogueado = this.logueado;
        let contenido = `<h2>Datos de contrataciones para ${paseadorLogueado.nombre}</h2>`;
        let cupoUsado = 0;
        let perrosAceptados = new Array();

        for (let j = 0; j < this.listaContrataciones.length; j++) {
            let contratacion = this.listaContrataciones[j];
            if (contratacion.estado === "aceptada" && contratacion.Paseador.id === paseadorLogueado.id) {
                let cliente = contratacion.Cliente;
                perrosAceptados.push(cliente);
                let tam = cliente.perrotamanio;
                cupoUsado += this.obtenerCupoPerro(tam);
            }
        }

        if (perrosAceptados.length > 0) {
            for (let k = 0; k < perrosAceptados.length; k++) {
                let clienteAceptado = perrosAceptados[k];
                contenido += `
                    <div>
                        <strong>Nombre:</strong> ${clienteAceptado.perronombre}<br>
                        <strong>Tamaño:</strong> ${clienteAceptado.perrotamanio}<br>
                        <strong>Dueño:</strong> ${clienteAceptado.nombre}<br>
                    </div><br><hr>`;
            }

            let cupoMax = paseadorLogueado.cupos;
            let porcentaje = ((cupoUsado * 100) / cupoMax);
            if (porcentaje > 100) porcentaje = 100;

            contenido += `
                <div>
                    <p><strong>Cupos ocupados:</strong> ${cupoUsado}</p>
                    <p><strong>Cupos máximos:</strong> ${cupoMax}</p>
                    <p><strong>Porcentaje de ocupación:</strong> ${porcentaje.toFixed(0)}%</p>
                </div>`;
        } else {
            contenido += `<p>No hay perros asignados actualmente.</p>`;
        }

        return contenido;
    }

    // Llama a las funciones de precarga definidas en otro archivo
    precargarTodo() {
        precargaClientes();
        precargaPaseadores();
        precargaContrataciones();
    }
}

