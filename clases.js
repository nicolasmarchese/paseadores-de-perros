// Clase que representa a un cliente del sistema
class Cliente {
    // Variable estática para generar IDs únicos e incrementales para cada cliente
    static idClientes = 0;

    constructor() {
        // Se asigna un ID único autoincremental al cliente
        this.id = Cliente.idClientes++;

        // Datos del cliente
        this.nombre = "";           // Nombre real del cliente
        this.usuario = "";          // Nombre de usuario único (case-insensitive)
        this.contrasenia = "";      // Contraseña del cliente (con validaciones requeridas)

        // Información del perro del cliente
        this.perronombre = "";      // Nombre del perro
        this.perrotamanio = "";     // Tamaño del perro: "grande", "mediano" o "chico"

        // Tipo de perfil (útil para identificar el tipo de usuario logueado)
        this.tipo = "CLIENTE";
    }
}

// Clase que representa a un paseador
class Paseador {
    // Variable estática para generar IDs únicos e incrementales para cada paseador
    static idPaseadores = 0;

    constructor() {
        // Se asigna un ID único autoincremental al paseador
        this.id = Paseador.idPaseadores++;

        // Datos del paseador
        this.nombre = "";           // Nombre del paseador
        this.usuario = "";          // Nombre de usuario
        this.contrasenia = "";      // Contraseña

        // Cupos disponibles en su camioneta (valor inicial por defecto: 5)
        this.cupos = 5;

        // Tipo de perfil
        this.tipo = "PASEADOR";
    }
}

// Clase que representa una contratación entre un cliente y un paseador
class Contratacion {
    // Variable estática para generar IDs únicos e incrementales para cada contratación
    static idContrataciones = 0;

    constructor() {
        // Se asigna un ID único autoincremental a la contratación
        this.id = Contratacion.idContrataciones++;

        // Estado inicial de la contratación (puede cambiar luego a "aceptada" o "rechazada")
        this.estado = "pendiente";

        // Relación con los objetos cliente y paseador involucrados en la contratación
        this.Paseador = null;
        this.Cliente = null;
    }
}

// Un atributo estático (en JavaScript se declara con static) es una propiedad de la clase, no de las instancias (objetos) que creás a partir de esa clase.
// “Para asegurarme de que cada cliente, paseador y contratación tenga un identificador único, usé un atributo estático en la clase.
//  Eso me permite llevar un contador que se incrementa cada vez que se crea una nueva instancia. 
// Como ese atributo es compartido por todos los objetos, garantiza que no se repitan los IDs.”