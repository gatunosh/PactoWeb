export class ProductosModel{
    _id:string;
    id_cat: string;
    nom_pro: string;
    desc_pro: string;
    uni_pro: number;
    sto_pro: number;
    pvp_pro: number;
    fecha_ela_pro: Date;
    fecha_cad_pro: Date;
}

export interface Producto{
    _id:string;
    id_cat:string;
    nom_pro:string;
    desc_pro:string;
    uni_pro:number;
    sto_pro:number;
    pvp_pro:number;
    fecha_ela_pro:Date;
    fecha_cad_pro:Date;
}
