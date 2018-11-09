import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  url: string = 'https://api.imgur.com/3';

  public newAlbum = new Subject<any>();

  constructor(private http: HttpClient) { }

  // GET favorite album
  getFavoriteAlbums() {
  	return this.http.get<any>(`${this.url}/account/Guzina/favorites`)
  }

  // DELETE image from favorite album
  deleteImage(id: string) {
  	return this.http.delete<any>(`${this.url}/image/` + id)
  }

  // Post image to favorite album 
  addImage(albumId: string, image) {
  	return this.http.post<any>(`${this.url}/album/` + albumId +  `/add`, image)
  }

  getAlbum(image) {
    this.newAlbum.next(image);
  }

}
