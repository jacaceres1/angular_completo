export interface Transaccion{
  id_transaccion: number,
  id_pedido: number,
  id_usuario: number,
  codigo_transferencia: string,
  fecha_transferencia: Date,
  estado: boolean,
  estado_pedido: string
}
