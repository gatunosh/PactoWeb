export interface Capacitacion{
    _id:string;
    prof_cap:[{
        _id:string;
        id_enti:string; 
    }];
    tem_cap: string;
    fech_ini_cap: string;
    fech_fin_cap: string;
    hora_ini_cap: string;
    hora_fin_cap: string;
    asis_cap: [{
        _id: string;
        id_soc:string;
        cert_asis: boolean;
        cert_part: boolean;
    }];
}

export class CapacitacionModel{
    _id:string;
    prof_cap:[{

        id_enti:string; 
    }];
    tem_cap: string;
    fech_ini_cap: string;
    fech_fin_cap: string;
    hora_ini_cap: string;
    hora_fin_cap: string;
    asis_cap: [{
        id_soc:string;
        cert_asis: boolean;
        cert_part: boolean;
    }];
}
