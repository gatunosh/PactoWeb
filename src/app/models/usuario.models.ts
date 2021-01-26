export class UsuarioModel {
    id: string;
    nombre: string;
    apellido: string;
    tlfc: string;
    email: string;
    password: string;
    tlfm: string;
    hectareas: number;
    sector: string;
    barrio: string;
    parroquia: string;
    estado: boolean;
    role: string;
}

export interface Usuario {
    id: string;
    nombre:string;
    apellido:string;
    tlfc:string;
    email:string;
    password:string;
    tlfm:string;
    hectareas:number;
    sector:string;
    barrio:string;
    parroquia:string;
    estado:boolean;
    role:string;
}
