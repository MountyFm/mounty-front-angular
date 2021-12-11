import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from 'rxjs/operators';
import { Router } from "@angular/router";
import { AuthService } from "./app/services/auth/auth.service";
import { StorageService } from "./app/storage.service";
import { RefreshAccessTokenRequest } from "./app/dtos/auth";

@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {
    
  constructor(public router: Router, private authService: AuthService, private storageService: StorageService) {
  }
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    return next.handle(req).pipe(
      catchError((error) => {
        if(error.status == 401) {
            const accessToken = this.storageService.returnAccessToken();

            if(accessToken != null && accessToken.refreshToken != null) {
                let request = new RefreshAccessTokenRequest(accessToken.refreshToken);
                this.authService.refreshToken(request).subscribe(refreshedToken => {
                    refreshedToken.refreshToken = accessToken.refreshToken;
                    this.storageService.saveAccessToken(refreshedToken);
                    location.reload();
                })
            }
        } 
        console.log('error is intercept')
        console.error(error);
        return throwError(error.message);
      })
    )
  }
}