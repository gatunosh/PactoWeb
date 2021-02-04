export class ProductosModel{
    _id:string;
    id_cat: string;
    aso_ps: string;
    nom_pro: string;
    desc_pro: string;
    uni_pro: number;
    sto_pro: number;
    pvp_pro: number;
}

export interface Producto{
    _id:string;
    id_cat:string;
    aso_ps: string;
    nom_pro:string;
    desc_pro:string;
    uni_pro:number;
    sto_pro:number;
    pvp_pro:number;
}

export class ProductosSocioModel{
    _id:string;
    id_pro: string;
    id_soc: string;
    aso_ps: string;
    can_ps: number;
    pre_ps: number;
    fech_ps:Date;
    fecha_ela_pro:Date;
    fecha_cad_pro: Date;
}

export interface Productosocio{
    _id:string;
    id_pro: string;
    id_soc: string;
    aso_ps: string;
    can_ps: number;
    pre_ps: number;
    fech_ps:Date;
    fecha_ela_pro:Date;
    fecha_cad_pro: Date;
}


