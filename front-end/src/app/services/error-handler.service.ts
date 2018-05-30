import { Injectable, Output, EventEmitter, ErrorHandler } from '@angular/core';



@Injectable()
export class ErrorHandlerService  implements ErrorHandler {

  constructor() { }

  change$: EventEmitter<string> = new EventEmitter();

  handleError(error) {
    this.change$.emit(error.message || error.rejection.message);
 }

}
