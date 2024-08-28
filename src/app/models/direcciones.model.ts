export interface Direccion {
  calleP: string;
  calleS: string;
  ciudad: string;
  provincia: string;
  celular: string;
  referencia: string;
}

export interface Usuario {
  id_usuario: number;
  nombres_usuario: string;
  apellidos_usuario: string;
  direcciones: Direccion[];
}
