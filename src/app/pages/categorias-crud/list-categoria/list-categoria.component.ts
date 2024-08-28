import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/componentes/confirm-dialog/confirm-dialog.component';
import { Categorias } from 'src/app/models/categorias.model';
import { CategoriaService } from 'src/app/services/categorias/categoria.service';

@Component({
  selector: 'app-list-categoria',
  templateUrl: './list-categoria.component.html',
  styleUrls: ['./list-categoria.component.css']
})
export class ListCategoriaComponent implements OnInit {

  categorias: Categorias[] = [];
  categoriaIdToDelete: number | null = null;
  @ViewChild(ConfirmDialogComponent) customModal!: ConfirmDialogComponent;
  id_rol: string | null = null;
  constructor(private categoriaS: CategoriaService, private router: Router) {
    this.id_rol = localStorage.getItem('userRol');
  }

  ngOnInit(): void {
    this.validarID();
  }

  validarID(){
    if (this.id_rol !== null) {
      this.obtenerCategorias();
    } else {
      this.router.navigate(['/'])
    }
  }

  obtenerCategorias(): void{
    this.categoriaS.getCategorias().subscribe(data => {
      this.categorias = data;
    }, (error) => {
      console.log('err al recuperar la información');
    });
  }
  agregarCategoria(){
    this.router.navigate(['add-categoria']);
  }

  editarCategoria(id: number){
    this.router.navigate(['edit-categoria', id]);
  }

  eliminarCategoria(id: number): void{
    this.categoriaIdToDelete = id;
    this.customModal.open();
  }

  handleModalClose(confirm: boolean): void {
    if (confirm && this.categoriaIdToDelete !== null) {
      this.categoriaS.deleteCategoria(this.categoriaIdToDelete).subscribe(response => {
        this.obtenerCategorias(); // Refrescar la lista de productos
      }, error => {
        console.error('Error al eliminar el producto', error);
      });
    }
    this.categoriaIdToDelete = null;
  }


}
