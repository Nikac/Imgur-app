import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  url: string = 'https://api.imgur.com/3/';

  constructor(private http: HttpClient) { }

  // GET favorite album
  getFavoriteAlbums() {
  	return this.http.get<any>(`${this.url}account/Guzina/favorites`)
  }

  // DELETE image from favorite album
  deleteImage(id: string) {
  	return this.http.delete<any>(`${this.url}/image/` + id)
  }

}
