# ng-bootstrap-modal

A component for modal dialogs.

Demo: https://angular-patterns.github.io/ng-bootstrap-modal/

## Pre-requisites

Angular5+

## Installation

npm install ng-bootstrap-modal --save

## Importing the Module

If you are **not** using routes:

```
@NgModule({
  imports:      [ 
      BrowserModule,
      ModalModule.forRoot([ { name: 'popup', component: ConfirmDialogComponent}])

    ],
  declarations: [ AppComponent, ConfirmDialogComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
  ],
  exports: [AppComponent]
})
export class AppModule {
}
```
If you are using routes:

```
@NgModule({
  imports:      [ 
      BrowserModule,
      RouterModalModule.forRoot([ { name: 'popup', component: ConfirmDialogComponent}]),
      RouterModule.forRoot([...])
    ],
  declarations: [ AppComponent, ConfirmDialogComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
  ],
  exports: [AppComponent]
})
export class AppModule {
}
```

## Creating Component Dialogs

Create a component dialog. Three components are available to use in the Dialog component template:

1. modal-dialog -> element
2. modal-header -> attribute
3. modal-body -> attribute
4. modal-footer (optional) -> attribute

**dialog.component.html**
There are three sections that you can customize - modal-header, modal-body, and modal-footer.

```
<modal-dialog>
    <h4 class="modal-title" modal-header>
    ...
    </h4>
    <div modal-body>
    ...
    </div>
    <div modal-footer>
    ...    
    </div>
</modal-dialog>

```

For example, you can customize the footer by adding your own buttons:

```
<div modal-footer>
    <button class="btn btn-primary btn-md" (click)="submit()">Submit</button>
    <button class="btn btn-default btn-md" (click)="cancel()">Cancel</button>
</div>
```

**dialog.component.ts**

Inject `ModalService`. 

1. Call `ok(param)` with an optional parameter to accept. This will trigger the Ok event handler.
2. Call `cancel()` to cancel.  This will trigger the Cancel event handler.

Calling either will close the dialog and invoke the event handler.

```
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'ng-bootstrap-modal';

@Component({
    selector: 'nx-dialog',
    templateUrl: 'dialog.component.html'
})

export class DialogComponent implements OnInit {
    constructor(private modalService:ModalService) {
    }

    ngOnInit() {
    }

    submit() {
         this.modalService.ok();
    }
    cancel() {
         this.modalService.cancel();
    }
}
```

## Registering Component Dialogs

You can register a component dialog with either a `RouterModalModule` or a `ModalModule`.

Both modules have a static `forRoot` method where you can register component dialogs by name.

For example: 

```
ModalDialog.forRoot([
    { name: 'test', component: DialogComponent },
    { name: 'alert', component: AlertDialogComponent },
    { name: 'confirm', component: ConfirmDialogComponent }
])
```
You can then trigger the dialog by injecting `ModalService` and calling its `open` method:

```
constructor(private modalService: ModalService) {
    
}

onOpenTest() {
    this.modalService.open('test');
}
onOpenAlert() {
    this.modalService.open('alert');
}
onOpenConfirm() {
    this.modalService.open('confirm');
}
```



## Handling Ok and Cancel events

You can subscribe to the Ok and Cancel events from the return value from the `open` method.

For example:

```
  onOpenAlert() {
    this.modalService.open('alert')
      .subscribe(t => {
        this.message = 'Confirmed successfully!';
        this.info = t;
      }, 
      () => {
        this.message = 'Cancelled';
      });
  }
```

## Passing Data to your Dialog Component

The second parameter to the `open` method accepts a parameter that you can pass to your dialog component.

```
  onOpenAlert() {
    this.modalService.open('alert', 'hey there');
  }

```

You can access the value from the dialog component by injecting `ModalService` and calling its `getValue()` method.

```
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'ng-bootstrap-modal';

@Component({
    selector: 'nx-dialog',
    templateUrl: 'dialog.component.html'
})

export class DialogComponent implements OnInit {
    param:string;
    constructor(private modalService:ModalService) {
        this.param = this.modalService.getValue();
    }

    ngOnInit() {
    }

    submit() {
         this.modalService.ok();
    }
    cancel() {
         this.modalService.cancel();
    }
}
```

## Passing Data from the Dialog back to the Ok Handler 

The Ok method from the `ModalService` accepts an optional parameter that can be passed back to the Ok handler.

```
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'ng-bootstrap-modal';

@Component({
    selector: 'nx-dialog',
    templateUrl: 'dialog.component.html'
})

export class DialogComponent implements OnInit {
    param:string;
    constructor(private modalService:ModalService) {
        this.param = this.modalService.getValue();
    }

    ngOnInit() {
    }

    submit() {
         this.param = 'something else';
         this.modalService.ok(this.param);
    }
    cancel() {
         this.modalService.cancel();
    }
}
```

The calling component can handle the returned value: 

```
  onOpenAlert() {
    this.modalService.open('alert')
      .subscribe(t => {
        alert(t); // alerts 'something else';
      });
  }
```