export interface ListaProductoI{    
    "id": number,
    "nombre": "string",
    "descripcion": "string",
    "precio": number,
    "imagen": [
        "string"
    ],
    "idCategoria": number,
    "cantidadStock": number,
    "promocion": {
        "id": number,
        "descuento": number
    }
      
      
}