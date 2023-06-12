import { estadoReclamo, tipoReclamo } from "../enums/Reclamo";

export interface DtCompra{
    id: number;
    fecha: Date;
    estado: string;
    descripcionEstado: string;
    tipoPago: string;
    descripcionTipoPago: string;
    entregaDomicilio: string;
    nombreLocal: string;
    subtotal: number;
    descuento: number;
    total: 0;
    carrito: [
        {
            nombreProducto: string;
            precio: number;
            cantidad: number;
        }
    ]
}

export interface DtAltaCompra{
    idDireccion?: number;
    nroLocal: number;
    idComprador: number;
    carrito: DtAltaArticulo[];

}

export interface DtAltaArticulo{
    idProducto: number;
    cantidad: number;
}

/**Esquema ReclamoAltaDTO*/
export class DtAltaReclamo {
    motivo: string
    texto: string
    idCompra: number

    constructor(motivo: string, texto: string, idCompra: number) {
        this.motivo = motivo;
        this.texto = texto;
        this.idCompra = idCompra;
    }
}

/**Esquema MensajeAltaDTO*/
export class DtAltaMensajeReclamo {
    sucursal: boolean
    texto: string
    idReclamo: number

    constructor(sucursal: boolean, texto: string, idReclamo: number) {
        this.sucursal = sucursal;
        this.texto = texto;
        this.idReclamo = idReclamo;
    }
}

/**Esquema ReclamoDTO*/
export class DtReclamo {
    id: number
    fecha: string
    estado: estadoReclamo
    descripcionEstado: string
    motivo: tipoReclamo
    descripcionMotivo: string
    texto: string
    mensajes: DtMensajeReclamo[]

    constructor(id: number, fecha:string, estado: estadoReclamo, descripcionEstado: string, descripcionMotivo: string, motivo: tipoReclamo, texto: string, mensajes: DtMensajeReclamo[]) {
        this.id = id
        this.fecha = fecha
        this.estado = estado
        this.motivo = motivo
        this.texto = texto
        this.descripcionEstado = descripcionEstado
        this.descripcionMotivo = descripcionMotivo
        this.mensajes = mensajes
    }
}

/**Esquema MensajeDTO*/
export class DtMensajeReclamo {
    id: number
    fecha: string
    sucursal: boolean
    texto: string

    constructor(id: number, sucursal: boolean, texto: string, fecha: string) {
        this.id = id
        this.sucursal = sucursal;
        this.texto = texto;
        this.fecha = fecha;
    }
}