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