 // =============================
// Precarga de CLIENTES
// =============================

// Carga un conjunto de clientes al sistema.
// Se crean 20 objetos Cliente con sus datos básicos:
// Cada cliente tiene nombre, usuario, contraseña, nombre del perro y tamaño del perro.
// Cada uno es validado con la función validarDatos antes de ser agregado al sistema.
// Solo se agregan si la contraseña es válida (mayúscula, minúscula, número, mínimo 6 caracteres).

function precargaClientes() {
    let cliente1 = new Cliente();
    cliente1.nombre = "Juan";
    cliente1.usuario = "juan01";
    cliente1.contrasenia = "Abc120";
    cliente1.perronombre = "Rocky";
    cliente1.perrotamanio = "Chico";

    let cliente2 = new Cliente();
    cliente2.nombre = "Camilo";
    cliente2.usuario = "camilo02";
    cliente2.contrasenia = "Abc121";
    cliente2.perronombre = "Oto";
    cliente2.perrotamanio = "Mediano";

    let cliente3 = new Cliente();
    cliente3.nombre = "Ivan";
    cliente3.usuario = "ivan03";
    cliente3.contrasenia = "Abc122";
    cliente3.perronombre = "Marlon";
    cliente3.perrotamanio = "Grande";

    let cliente4 = new Cliente();
    cliente4.nombre = "Jose";
    cliente4.usuario = "jose04";
    cliente4.contrasenia = "Abc123";
    cliente4.perronombre = "Duki";
    cliente4.perrotamanio = "Chico";

    let cliente5 = new Cliente();
    cliente5.nombre = "Julio";
    cliente5.usuario = "julio05";
    cliente5.contrasenia = "Abc124";
    cliente5.perronombre = "Tuki";
    cliente5.perrotamanio = "Mediano";

    let cliente6 = new Cliente();
    cliente6.nombre = "Jorge";
    cliente6.usuario = "jorge06";
    cliente6.contrasenia = "Abc126";
    cliente6.perronombre = "Pipo";
    cliente6.perrotamanio = "Grande";

    let cliente7 = new Cliente();
    cliente7.nombre = "Andres";
    cliente7.usuario = "andres07";
    cliente7.contrasenia = "Abc127";
    cliente7.perronombre = "Nala";
    cliente7.perrotamanio = "Chico";

    let cliente8 = new Cliente();
    cliente8.nombre = "Mateo";
    cliente8.usuario = "mateo08";
    cliente8.contrasenia = "Abc128";
    cliente8.perronombre = "Cuca";
    cliente8.perrotamanio = "Mediano";

    let cliente9 = new Cliente();
    cliente9.nombre = "Luis";
    cliente9.usuario = "luis09";
    cliente9.contrasenia = "Abc129";
    cliente9.perronombre = "Pipi";
    cliente9.perrotamanio = "Grande";

    let cliente10 = new Cliente();
    cliente10.nombre = "Alex";
    cliente10.usuario = "alex10";
    cliente10.contrasenia = "Abc130";
    cliente10.perronombre = "Oli";
    cliente10.perrotamanio = "Chico";

    let cliente11 = new Cliente();
    cliente11.nombre = "Gaston";
    cliente11.usuario = "gaston11";
    cliente11.contrasenia = "Abc131";
    cliente11.perronombre = "Rey";
    cliente11.perrotamanio = "Mediano";

    let cliente12 = new Cliente();
    cliente12.nombre = "Hugo";
    cliente12.usuario = "hugo12";
    cliente12.contrasenia = "Abc132";
    cliente12.perronombre = "Coco";
    cliente12.perrotamanio = "Grande";

    let cliente13 = new Cliente();
    cliente13.nombre = "Ana";
    cliente13.usuario = "ana13";
    cliente13.contrasenia = "Abc133";
    cliente13.perronombre = "Rufus";
    cliente13.perrotamanio = "Chico";

    let cliente14 = new Cliente();
    cliente14.nombre = "Sofia";
    cliente14.usuario = "sofia14";
    cliente14.contrasenia = "Abc134";
    cliente14.perronombre = "Pola";
    cliente14.perrotamanio = "Mediano";

    let cliente15 = new Cliente();
    cliente15.nombre = "Maria";
    cliente15.usuario = "maria15";
    cliente15.contrasenia = "Abc135";
    cliente15.perronombre = "Leon";
    cliente15.perrotamanio = "Grande";

    let cliente16 = new Cliente();
    cliente16.nombre = "Belen";
    cliente16.usuario = "belen16";
    cliente16.contrasenia = "Abc136";
    cliente16.perronombre = "Soko";
    cliente16.perrotamanio = "Chico";

    let cliente17 = new Cliente();
    cliente17.nombre = "Emilia";
    cliente17.usuario = "emilia17";
    cliente17.contrasenia = "Abc137";
    cliente17.perronombre = "Fito";
    cliente17.perrotamanio = "Mediano";

    let cliente18 = new Cliente();
    cliente18.nombre = "Lucia";
    cliente18.usuario = "lucia18";
    cliente18.contrasenia = "Abc138";
    cliente18.perronombre = "Charly";
    cliente18.perrotamanio = "Grande";

    let cliente19 = new Cliente();
    cliente19.nombre = "Nadia";
    cliente19.usuario = "nadia19";
    cliente19.contrasenia = "Abc139";
    cliente19.perronombre = "Pity";
    cliente19.perrotamanio = "Chico";

    let cliente20 = new Cliente();
    cliente20.nombre = "Gimena";
    cliente20.usuario = "gimena20";
    cliente20.contrasenia = "Abc140";
    cliente20.perronombre = "Hermes";
    cliente20.perrotamanio = "Mediano";

    // Valida y agrega cada cliente al sistema si pasa la verificación
    for (let cliente of [
        cliente1, cliente2, cliente3, cliente4, cliente5,
        cliente6, cliente7, cliente8, cliente9, cliente10,
        cliente11, cliente12, cliente13, cliente14, cliente15,
        cliente16, cliente17, cliente18, cliente19, cliente20
    ]) {
        if (miSistema.validarDatos(cliente.usuario, cliente.contrasenia)) {
            miSistema.precargarUnCliente(cliente.nombre, cliente.usuario, cliente.contrasenia, cliente.perronombre, cliente.perrotamanio);
        }
    }
}

// =============================
// Precarga de PASEADORES
// =============================

// Carga un conjunto de paseadores al sistema.
// Se crean 5 paseadores con nombre, usuario y contraseña.
// También se valida cada usuario antes de agregarlo al sistema.

function precargaPaseadores() {

    let paseador1 = new Paseador();
    paseador1.nombre = "Lucas";
    paseador1.usuario = "lucas21";
    paseador1.contrasenia = "Cba123";

    let paseador2 = new Paseador();
    paseador2.nombre = "Marcos";
    paseador2.usuario = "marcos22";
    paseador2.contrasenia = "Cba124";

    let paseador3 = new Paseador();
    paseador3.nombre = "Pedro";
    paseador3.usuario = "pedro23";
    paseador3.contrasenia = "Cba125";

    let paseador4 = new Paseador();
    paseador4.nombre = "Rocio";
    paseador4.usuario = "rocio24";
    paseador4.contrasenia = "Cba126";

    let paseador5 = new Paseador();
    paseador5.nombre = "Laura";
    paseador5.usuario = "laura25";
    paseador5.contrasenia = "Cba127";

    // Validación antes de agregar cada paseador
    for (let paseador of [paseador1, paseador2, paseador3, paseador4, paseador5]) {
        if (miSistema.validarDatos(paseador.usuario, paseador.contrasenia)) {
            miSistema.precargarUnPaseador(paseador.usuario, paseador.contrasenia, paseador.nombre);
        }
    }
}

// =============================
// Precarga de CONTRATACIONES
// =============================

// Precarga algunas contrataciones al sistema, usando los primeros 10 clientes y 2 paseadores.
// Se asignan contrataciones predefinidas entre clientes y paseadores ya cargados.
// Cada contratación tiene un estado inicial: pendiente, aceptada o rechazada.

function precargaContrataciones() {
     // Se seleccionan los primeros 10 clientes y 2 paseadores precargados
    let cliente1 = miSistema.listaClientes[0];
    let cliente2 = miSistema.listaClientes[1];
    let cliente3 = miSistema.listaClientes[2];
    let cliente4 = miSistema.listaClientes[3];
    let cliente5 = miSistema.listaClientes[4];
    let cliente6 = miSistema.listaClientes[5];
    let cliente7 = miSistema.listaClientes[6];
    let cliente8 = miSistema.listaClientes[7];
    let cliente9 = miSistema.listaClientes[8];
    let cliente10 = miSistema.listaClientes[9];

    let paseador1 = miSistema.listaPaseadores[0];
    let paseador2 = miSistema.listaPaseadores[1];

     // Se define un array con los emparejamientos entre clientes y paseadores y su estado

    let contrataciones = [
        { cliente: cliente1, paseador: paseador1, estado: "pendiente" },
        { cliente: cliente2, paseador: paseador1, estado: "pendiente" },
        { cliente: cliente3, paseador: paseador1, estado: "pendiente" },
        { cliente: cliente4, paseador: paseador2, estado: "aceptada" },
        { cliente: cliente5, paseador: paseador2, estado: "rechazada" },
        { cliente: cliente6, paseador: paseador1, estado: "pendiente" },
        { cliente: cliente7, paseador: paseador1, estado: "aceptada" },
        { cliente: cliente8, paseador: paseador2, estado: "rechazada" },
        { cliente: cliente9, paseador: paseador2, estado: "pendiente" },
        { cliente: cliente10, paseador: paseador1, estado: "aceptada" }
    ];
 // Se recorren y se instancian (se agregan al sistema) como objetos (instancias de Contratacion) Contratacion con su estado
    for (let i = 0; i < contrataciones.length; i++) {
        let c = new Contratacion();
        c.Cliente = contrataciones[i].cliente;
        c.Paseador = contrataciones[i].paseador;
        c.estado = contrataciones[i].estado;
        miSistema.listaContrataciones.push(c);
    }
}


//  Podés mencionar que si el sistema creciera o necesitara una carga dinámica de datos, podrías usar estructuras como arrays de objetos y un bucle para evitar repetición de código. 
// Eso mostraría iniciativa para escalar el proyecto.
