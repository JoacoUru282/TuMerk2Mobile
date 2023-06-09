export class DtUsuario{
    id?: number
    email?: string | null
    cedula?: string
    nombre?: string | null
    apellido?: string
    rol?: string
    activo?: boolean
}

export interface DtGetUsuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    cedula: string;
    rol: string;
    activo: boolean;
    cupon: number;
    direcciones: DtDireccionUser[];
}



export interface DtModificarUsuario {
    contrasenia?: string;
    cedula?: string;
    nombre?: string;
    apellido?: string;
}

export interface DtDireccionUser{
    id: number;
    calle: string;
    esquina?: string;
    numero: number;
    apartamento?: number;
    direccionCompleta: string;
  }

export interface DtTokenUser{
    token: string;
    tipo: string;
    expiracion?: string;
}