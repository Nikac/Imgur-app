import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// import {do} 'rxjs/add/operator/do';

 @Injectable()

export class MyInterceptor implements HttpInterceptor {
	
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		let request = req.clone({
			headers: new HttpHeaders().append('Authorization', 'Bearer 308b3c89fbbdceee1827a1f19ce88886d3a541d0');
		});

		return next	
				.handle(request)
			// 	.do(
			// 	success => console.log(success),
			// 	error => console.error(error)
			// );
	}
}