import { IonicStorageModule } from '@ionic/storage-angular';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { BackEndError } from 'src/app/modelos/dataTypes/BackEndError.interface';
import { ListaProductoI } from 'src/app/modelos/dataTypes/listaProducto.interface';
import { SidebarComponent } from 'src/app/plantillas/sidebar/sidebar.component';
import { ApiService } from 'src/app/servicios/api/api.service';
import { DataService } from 'src/app/servicios/api/data.service';
import { delay } from 'rxjs';



@Component({
  selector: 'app-folder',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public home!: string;
  private activatedRoute = inject(ActivatedRoute);
  cards : ListaProductoI[]; 
  nombre : String = '';
  contador : number = 0;

  lista: ListaProductoI[]; 
  message: any;
  
  


  constructor(private api: ApiService,private dataService: DataService) {}


  

  ngOnInit() {
    this.dataService.getData('nroLocal').then(value => {
      let numero = value;
      console.log(numero);
      this.generateItems(numero);
    }).catch(error => {
      console.error(error);
    });
  }
  
private generateItems(numero2) {

  for (let i = 0; i < 50; i++) {
    this.api.getProductosLocal(numero2, i).subscribe({
      next: (response: ListaProductoI[]) => {
        this.lista = response;
        console.log("nombre" + this.lista[i].nombre)
        this.cards=this.lista;
      },
      error: (err: BackEndError) => {
        this.message.showDialog('Error', 'Error')
      }
    });
    this.contador = this.contador +1;
  }
}

  

  onIonInfinite(ev: any) {
    this.ngOnInit();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 4000);
  }
}


