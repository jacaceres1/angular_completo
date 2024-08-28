export interface Pedidos {
  id_pedido: number,
  id_usuario: number,
  nombre_producto: string,
  descripcion_producto: string,
  precio_producto: number,
  usuario: string,
}


export interface TransaccionPedido {
  id_transaccion: number,
  id_pedido: number,
  id_usuario: number,
  codigo_transferencia: string,
  fecha_transferencia: Date,
  estado: boolean,
  estado_pedido: string
}
