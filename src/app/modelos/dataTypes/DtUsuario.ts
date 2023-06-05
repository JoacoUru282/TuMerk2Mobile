import { DtDireccionUser } from "./DtDomicilio"
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
    direcciones: DtDireccionUser;
}



export class DtModificarUsuario {
    contrasenia: string;
    cedula: string;
    nombre: string;
    apellido: string;

    constructor(nombre: string, apellido: string, contrasenia: string, cedula: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.contrasenia = contrasenia;
        this.cedula = cedula;

    }
}