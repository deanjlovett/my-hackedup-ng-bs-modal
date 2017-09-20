# ng-bootstrap-modal

A component for modal dialogs

## Pre-requisites

* bootstrap - npm install bootstrap
* angular - npm install angular

## Installation
 
 `npm install ng-bootstrap-modal --save`
 
## Configuration

Define one or more modals using the `modal` component.  Define sections in your modal dialog using the `modal-title`, `modal-body`, and `modal-footer` attributes. These define what will be placed inside the title, body, and footer sections of the modal dialog, respectively.

For example: 

`
import { Component } from '@angular/core';

@Component({
  template: '
    <modal>
        <div modal-title>First Modal</div>
        <div modal-body>
        <form>
        <div class="form-group">
          <label for="recipient-name" class="control-label">Recipient:</label>
          <input type="text" class="form-control" id="recipient-name">
        </div>
        <div class="form-group">
          <label for="message-text" class="control-label">Message:</label>
          <textarea class="form-control" id="message-text"></textarea>
        </div>
      </form>

        </div>
    </modal>
  '
})
export class FirstModalComponent {
}

`

Register one or more named modal dialogs using `ModalDialog.forRoot`:

`Import the 'ModalModule', and configure it with named 

import { ModalModule, Modal } from 'ng-bootstrap-modal';
import { FirstModalComponent } from "./first-modal.component";
import { SecondModalComponent } from './second-modal.component.';
import { ThirdModalComponent } from './third-modal.component';


const modals: Modal[] = [
  { name: 'first', component: FirstModalComponent}
];

@NgModule({
  imports: [ 
    BrowserModule,
    ModalModule.forRoot(modals)
  ],
  declarations: [ AppComponent, FirstModalComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
`

## Usage 

Inject the ModalService in a component, and call the `open` method.

**HTML**

`<modal-outlet></modal-outlet>

<button (click)="open('first')" class="btn btn-sm btn-primary">Open First</button>
<button (click)="open('second')" class="btn btn-sm btn-primary">Open Second</button>
<button (click)="open('third')" class="btn btn-sm btn-primary">Open Third</button>
`

**app.component.ts**
`
@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private modalService:ModalService) {
    
  }
  open(name: string) {
    this.modalService.open(name);
  }
}
`
 
## Build Targets

`npm run dev`
Compiles and builds the module.
 
