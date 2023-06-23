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
export interface DtReclamo {
    id: number
    fecha: string
    estado: estadoReclamo
    descripcionEstado: string
    motivo: tipoReclamo
    descripcionMotivo: string
    texto: string
    idCompra: number
    mensajes: DtMensajeReclamo[]
}

/**Esquema MensajeDTO*/
export interface DtMensajeReclamo {
    id: number
    fecha: string
    sucursal: boolean
    texto: string
}