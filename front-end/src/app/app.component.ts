import { Component, ErrorHandler, OnInit, ChangeDetectorRef } from '@angular/core';
import { ErrorHandlerService } from './services/error-handler.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private title:string = 'app';
  errorMsg = '';
  errService : ErrorHandlerService;
  constructor(errorHandler:ErrorHandler, private ref: ChangeDetectorRef){ 
    // cast Error handler to ErrorHandler Service
    this.errService = <ErrorHandlerService> errorHandler ;
  }

  ngOnInit(){
    this.errService.change$.subscribe(
      val=>{
        this.errorMsg = val;
        // Force detect change. Without this we need to click login twice to see the login errors
        this.ref.detectChanges();
      }
    );
  }

}