import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/do';

@Injectable()

export class MyInterceptor implements HttpInterceptor {
	
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		let request = req.clone({
			headers: new HttpHeaders().append('Authorization', 'Bearer beb7fb0135f13e770527466d6b69c2b9e529126f')
									
		});

		return next.handle(request);
	}
}