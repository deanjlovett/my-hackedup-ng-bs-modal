import { Component } from '@angular/core';
import { ModalService } from '../modal/services/modal.service';
import { Observable } from 'rxjs/Observable';
import { Confirm } from './confirm/confirm.model';


@Component({
  selector: 'sa-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  message: string;
  info: Confirm;
  constructor(private modalService: ModalService) {
    this.title = 'Hello World!';
    this.message = '';
    this.info = {
      name: 'John',
      phone: 'Smith',
      birthdate: new Date(),
      myTitle: 'This is my Title Text, entered by Dean', // djl, new
      myVerbage: 'This is my Verbage' // djl, new
    }; 
  }
  trigger() {
    this.modalService.open('popup', this.info)
      .subscribe(t => {
        this.message = 'Confirmed successfully!';
        this.info = t;
      }, 
      () => {
        this.message = 'Cancelled';
      });
  }
}
