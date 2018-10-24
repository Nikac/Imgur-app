import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  url: string = 'https://api.imgur.com/3/gallery';

  constructor(private http: HttpClient) { }

  getComments(galleryHash: string) {
  	return this.http.get<any>(`${this.url}/`+ galleryHash +`/comments`);
  }

  newComment(galleryHash: string, comment: string) {
  	return this.http.post<any>(`${this.url}/`+ galleryHash +`/` + comment);
  }

}
