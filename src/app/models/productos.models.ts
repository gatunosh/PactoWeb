export class ProductosModel{
    id_cat: object;
    nom_pro: string;
    desc_pro: string;
    uni_pro: number;
    sto_pro: number;
    pvp_pro: number;
    fecha_ela_pro: Date;
    fecha_cad_pro: Date;
}

export interface Producto{
    id_cat:object;
    nom_pro:string;
    desc_pro:string;
    uni_pro:number;
    sto_pro:number;
    pvp_pro:number;
    fecha_ela_pro:Date;
    fecha_cad_pro:Date;
}
