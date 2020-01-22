import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';

import * as fromApp from '../store/app.reducer';
import * as ConfigActions from '../store/config.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>, private flashMessage: FlashMessagesService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = req.clone({params: req.params.append('apikey', 'mLQxOBM0eKpDpXJabA50Xts1qnMUG4mG')});
    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        this.flashMessage.show(error.message, {cssClass: 'alert-danger', timeout: 4000});
        this.store.dispatch(ConfigActions.setError({ error: error.message }));
        return throwError(error);
      })
    );
  }
}
