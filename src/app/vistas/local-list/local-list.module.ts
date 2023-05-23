import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalListPageRoutingModule } from './local-list-routing.module';

import { LocalListPage } from './local-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalListPageRoutingModule
  ],
  declarations: [LocalListPage]
})
export class LocalListPageModule {}
