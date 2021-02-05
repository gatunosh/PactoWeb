export class UsuarioModel {
    _id: string;
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
    id_asociacion: [
        {
            _id: "601b2a0429daa20017047ec6",
            id_asociacion: "601875ad0211e700174585dc"
        }
    ]
}


export interface Usuario {
    _id: string;
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
    id_asociacion: [
        {
            _id: "601b2a0429daa20017047ec6",
            id_asociacion: "601875ad0211e700174585dc"
        }
    ]
}
