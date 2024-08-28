export interface Categoria{
  categoria_nombre: String;
  total_ventas: number;
}

export interface Provincia{
  provincia: String;
  total_ventas: number;
}

export interface NoVenta{
  categoria_nombre: String,
  total_no_vendidos: number
}


export interface UsuarioCompra {
  id_usuario: number;
  nombre: string;
  correo: string;
  total_compras: number;
}
