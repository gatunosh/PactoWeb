export class ReunionesModel{
    _id:string;  
    tema_reun:String;
    tipo_reun:String;
    fec_reu: string;
    hor_reu: string;
    mul_reu: number;
    id_asoc_reu: string;
    asistencia: [
            {
              _id: string;
              id_soc: string;
              asist_socio: boolean;
            },
            {
              _id: string;
              id_soc: string;
              asist_socio: boolean;
            }
        ]
}
export interface Reuniones{
    _id:string;
    tema_reun:String;
    tipo_reun:String;
    fec_reu: string;
    hor_reu: string;
    mul_reu: number;
    id_asoc_reu: string;
    asistencia: [
            {
              _id: string;
              id_soc: string;
              asist_socio: boolean;
            },
            {
              _id: string;
              id_soc: string;
              asist_socio: boolean;
            }
        ]
}
