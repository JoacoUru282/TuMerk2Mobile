import { Component, Inject  } from '@angular/core';
import { DtProductoCantidad } from '../dataTypes/DtProductoCantidad.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-quitar-producto',
  templateUrl: './agregar-quitar-producto.component.html',
  styleUrls: ['./agregar-quitar-producto.component.scss'],
})
export class AgregarQuitarProductoComponent {

  constructor(public dialogRef: MatDialogRef<AgregarQuitarProductoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  cantidadProductos: number = 0;
  productoCantidad: DtProductoCantidad[] = [];
  cantidadInicial: number = 1;

  incrementarCantidad() {
    this.cantidadProductos++;
  }

  decrementarCantidad() {
    if (this.cantidadProductos > 0) {
      this.cantidadProductos--;
    }
  }

  asignarProductos() {
    const productoCantidad: DtProductoCantidad = {
      id: this.data.id,
      nombre: this.data.nombre,
      cantidad: this.cantidadProductos,
      precio: Number(this.data.precio),
      subTotal: this.cantidadProductos * Number(this.data.precio)
    };

    const precio = Number(this.data.precio);
    if (isNaN(precio)) {
      console.error('El valor de this.data.precio no es válido');
      return;
    }

    productoCantidad.subTotal = this.cantidadProductos * precio;

    const productosGuardados = JSON.parse(localStorage.getItem('productosCantidad') || '[]') || [];

    const index = productosGuardados.findIndex((p: DtProductoCantidad) => p.id === productoCantidad.id);

    if (index !== -1) {
      productosGuardados[index].cantidad += productoCantidad.cantidad;
      productosGuardados[index].subTotal = this.actualizarSubTotal(productosGuardados[index]);
    } else {
      productoCantidad.subTotal = this.calcularSubTotal(productoCantidad);
      productosGuardados.push(productoCantidad);
    }

    localStorage.setItem('productosCantidad', JSON.stringify(productosGuardados));

    this.dialogRef.close(productosGuardados);
  }

  private calcularSubTotal(productoCantidad: DtProductoCantidad): number {
    const precio = Number(this.data.precio);
    return productoCantidad.cantidad * precio;
  }


  private actualizarSubTotal(productoCantidad: DtProductoCantidad): number {
    const precio = Number(this.data.precio);
    return productoCantidad.cantidad * precio;
  }

  cancelar() {
    this.dialogRef.close();
  }
}
