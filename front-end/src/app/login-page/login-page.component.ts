import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { environment as env } from '../../environments/environment'
import { CognitoCallback } from '../interface/login-callback'; 
import { SecurityService } from '../services/security.service';
// Java scropt integration
declare let AWSCognito: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, CognitoCallback {
  username:string;
  password:string;
  returnUrl: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private securityService: SecurityService) { }

  onLogin(){
    if (this.username && this.password) {
      // return back to the page the is routed before login
      this.securityService.authenticateUserPool(this.username,this.password, this);
    }
  }

  error(message:string){
    throw new Error('Cannot Login');
  }

  success(message: string, result: any){
    this.router.navigateByUrl(this.returnUrl);
  }
  
  ngOnInit() {
    // Subscribe to route cahgnes so we know the previous page
    this.route.queryParams
    .subscribe(params => this.returnUrl = params['return'] || '/file-upload');

    if(this.securityService.isValid()){
      this.router.navigateByUrl(this.returnUrl);
    }

  }

}