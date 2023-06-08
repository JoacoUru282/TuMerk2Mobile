import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";





@NgModule({

    declarations: [ SidebarComponent, HeaderComponent],
    imports: [CommonModule, IonicModule],
    exports: [ SidebarComponent, HeaderComponent]

})

export class ComponentsModule{}
