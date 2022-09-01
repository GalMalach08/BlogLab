import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private toastr:ToastrService,
    private accountService:AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if(error) {
          switch(error.status) {
            case 400:
              this.hanleError400(error)
              break;
            case 401:
              this.hanleError401(error)
              break;
            case 500: 
              this.hanleError500(error)
              break;
            default:
              this.handleUnExcpectedError(error)
              break;
          }

        }
        return throwError(() => new Error(error))
      })
    )
  }


  hanleError400 = (error: any) => {
    if(!!error.error && Array.isArray(error.error)) {
      let errorMessage = ''
      for (const key in error.error) {
        if(!!error.error[key]) {
          const errorElement = error.error[key]
          errorMessage = (`${errorMessage}${errorElement.code} - ${errorElement.description}\n`)
        }
      }
      console.log(error.error)
      this.toastr.error(errorMessage, error.statusText)
    } else if(!!error?.error.errors?.Content && typeof error.error.errors.Content === 'object') {
      let errorObj = error.error.errors.Content
      let errorMessage = ''
      for (const key in errorObj) {
        if(errorObj[key]) {
          const errorElement = errorObj[key]
          errorMessage = (`${errorMessage}${errorElement}\n`)
        }
      }
      console.log(error.error)
      this.toastr.error(errorMessage, error.statusText)
    } else if(!!error.error) {
        let errorMessage = typeof error.error === 'string' ? error.error : 'There was a validation Error'
        console.log(error.error)
        this.toastr.error(errorMessage, error.statusText)
    } else {
        this.toastr.error(error.statusText,error.status)
        console.log(error)
    }
  }

  hanleError401 = (error: any) => {
    this.accountService.logOut()
    // route to the login page
    this.toastr.error('Please login to your account', error.statusText)
    console.log(error)
  }

  hanleError500 = (error: any) => {
    this.toastr.error('Please Contact The Administrator, An error happend in the server')
    console.log(error)
  }

  handleUnExcpectedError = (error: any) => {
    this.toastr.error('Something unexpected happened')
    console.log(error)
  }
  
}
