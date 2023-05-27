import { Component, OnInit } from '@angular/core';
import { DtCategoria } from 'src/app/modelos/dataTypes/DtCategoria';
import { ApiService } from 'src/app/servicios/api/api.service';
import { DataService } from 'src/app/servicios/api/data.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent  implements OnInit {

  constructor(private api: ApiService, private dataService: DataService, private storage: Storage, private router: Router) { }

  categorias: DtCategoria[] = [];
  showCategories: boolean = false;

  ngOnInit(): void {
    this.obtenerCategorias(true);
  }

  logout(){
    this.storage.clear();
    this.router.navigate(['/login']);
  }

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }

  obtenerCategorias(boolean: boolean){
    this.api.categoriasLocal(boolean).subscribe({
      next: (response) => {
        this.categorias = response 
      }
    });
  }

  verProductos(categoria: DtCategoria){
    this.dataService.setData('idCategoria', categoria.id);
    this.router.navigate(['listadoProductos']).then(() => {
      location.reload();
    });
  }

  
}
