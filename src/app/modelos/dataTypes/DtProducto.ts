export class DtAltaProducto {
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    idCategoria: number;
  
    constructor(nombre: string, descripcion: string, precio: number, imagen: string, idCategoria: number) {
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.precio = precio;
      this.imagen = imagen;
      this.idCategoria = idCategoria;
    }
  }
  
 /** Esquema ProductoDTO */
  export interface DtGetProducto {
    id: number
    nombre: string
    descripcion: string
    precio: number
    imagen: string
    idCategoria: number
    cantidadStock:  number
    promocion: DtPromocion
 }

 export interface DtPromocion{
  id: number
  porcentajeDescuento: number
 }

 export interface DtProductoStorage{
  id: number;
  nombre: string;
  precio: number;
  cantidadSeleccionada: number;
 }
 
 /** Esquema StockAltaDTO*/
 export class DtAltaStock{
   idProducto: number
   idPromocion?: number
   cantidad: number
 
   constructor(idProducto: number, idPromocion: number, cantidad: number) {
     this.idProducto = idProducto;
     this.idPromocion = idPromocion;
     this.cantidad = cantidad;
   }


 }