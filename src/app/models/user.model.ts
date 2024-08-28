export interface Address{
  id_direcciones?: number;
  calleP: string;
  calleS: string;
  ciudad: string;
  provincia: string;
  celular: string;
  referencia: string;
  id_usuario?: number;
}

export interface User {
  id_usuario?: number;
  usuario: string;
  contrasenia: string;
  correo: string;
  nombre_usuario: string;
  apellido_usuario: string;
  rol_usuario: number;
  url_foto?: string;
  addresses?: Address[];
}


export interface LoginResponse{
  token: string;
  email: string;
  auth: boolean;
  role: number;
  userId: string;
  userRol: string;
}
