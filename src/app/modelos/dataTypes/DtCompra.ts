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