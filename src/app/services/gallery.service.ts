import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GalleryService {

  constructor(private http: HttpClient) { }


  getAlbums() {
    // let headers =  new HttpHeaders().set('Authorization', 'Bearer 308b3c89fbbdceee1827a1f19ce88886d3a541d0')

  	return this.http.get<any[]>('https://api.imgur.com/3/account/Guzina/albums/');
  }

  newAlbum(album: any) {
    let headers = new HttpHeaders().appned('content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');

    return this.http.post<any>('https://api.imgur.com/3/album', album , headers);
  }
}
