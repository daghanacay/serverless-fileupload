import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SecurityService } from './security.service';
import { FileGetModel } from '../model/constants';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class SecureHttpClientService {

  constructor(private http: HttpClient, private securityService: SecurityService) { }

  postWithApikey(endPoint, data) {
    const req = new HttpRequest('POST', `${environment.apiUrl}/` + endPoint, data, {
      headers: new HttpHeaders({
        'x-api-key': `${environment.apiKey}`
      })
    });

    return this.http.request(req);
  }

  getWithJWT(endPoint):Observable<FileGetModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.securityService.getIdToken(),
        'x-api-key': `${environment.apiKey}`
      })
    };

    return this.http.get<FileGetModel>(`${environment.apiUrl}/` + endPoint, httpOptions);
  }
}
