export interface BackEndError{
    status: number;
    error: {
        timestamp:string;
        mensaje:string;
        detalles?: string[];
    }
}