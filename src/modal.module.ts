
import { Modal } from "./modal/modal.model";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from "@angular/router";
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './modal/modal.service';
import { ModalOutletComponent } from "./modal/modal-outlet.component";

@NgModule({
    imports: [BrowserModule, RouterModule],
    declarations: [
        ModalComponent,
        ModalOutletComponent
    ],
    exports: [
        ModalComponent,
        ModalOutletComponent
    ]
})
export class ModalModule {
    static forRoot(modals:Modal[]): ModuleWithProviders{
        const routes:Routes = modals.map(t=> {
            return { path: t.name, component: t.component, outlet: 'modal'}
        });
        //return RouterModule.forRoot(routes);

        @NgModule({
            imports: [
                ModalModule,
                RouterModule.forRoot(routes),
            ]
        })
        class InternalModalModule {

        }

        return {
            ngModule: InternalModalModule,
            providers: [ModalService]
        }
    }


}
