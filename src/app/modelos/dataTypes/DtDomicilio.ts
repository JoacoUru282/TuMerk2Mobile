export class DtAltaDomicilio {
    calle: string;
    numero: string;
    apartamento: string;
    esquina: string;
  
    constructor(calle: string, numero: string, apartamento: string, esquina: string) {
      this.calle = calle;
      this.numero = numero;
      this.apartamento = apartamento;
      this.esquina = esquina;
    } 
}

  export interface DtDireccionCompleta {
    id: number;
    direccionCompleta: string;
    cantidadSeleccionada: number;
}

export interface DtDireccionUser{
  id: number;
  calle: string;
  esquina: string;
  numero: number;
  apartamento: number;
  direccionCompleta: string;
}
