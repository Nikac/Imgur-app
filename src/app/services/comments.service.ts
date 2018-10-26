import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  url: string = 'https://api.imgur.com/3';

  constructor(private http: HttpClient) { }

  // get comments
  getComments(galleryHash: string) {
  	return this.http.get<any>(`${this.url}/gallery/`+ galleryHash +`/comments`);
  }

  // ovo treba prepraviti
  newComment(galleryHash: string, comment: string) {
  	return this.http.post<any>(`${this.url}/`+ galleryHash +`/` + comment);
  }

  // get children comments of comment
  getReplyComments(commentId: number) {
  	return this.http.get<any>(`${this.url}/comment/`+ commentId + `/replies`);
  }

  // vote for comment NE RADI!!!!! ne razumem api
  voteForComment(commentId: number, up: number) {
  	return this.http.post<any>(`${this.url}/comment/` +  commentId + `/vote/` + up);
  }

  // deleting comment
  deleteComment(commentId: number) {
  	return this.http.delete<any>(`${this.url}/comment/` + commentId);
  }

}
