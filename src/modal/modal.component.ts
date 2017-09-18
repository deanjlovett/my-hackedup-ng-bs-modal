import { Component, Inject } from '@angular/core';
import { ModalService } from "./modal.service";

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  constructor(private modalService:ModalService) {
    
  }
  close() {
    this.modalService.close();
  }
}