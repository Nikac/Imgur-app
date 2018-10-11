import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Album } from '../models/album.model';

import { Subject }  from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})

export class GalleryService {
  url: string = 'https://api.imgur.com/3';

  constructor(private http: HttpClient) { }

  public newAlbumSubject = new Subject<any>();

  // GET albums
  getAlbums() {
    // let headers =  new HttpHeaders().set('Authorization', 'Bearer 308b3c89fbbdceee1827a1f19ce88886d3a541d0')
  	return this.http.get<any[]>(`${this.url}/account/Guzina/albums/`);
  }

  // POST album
  newAlbum(album: Album) {
    return this.http.post<any>(`${this.url}/album`, album );
  }

  // GET album
  getAlbum(id:string) {
    return this.http.get<any>(`${this.url}/album/` + id);
  }

  // Put album
  updateAlbum(id: string, album: Album) {
    return this.http.put<any>(`${this.url}/album/` + id, album);
  }

  // Delete album
  deleteAlbum(id: string) {
    return this.http.delete<any>(`${this.url}/album/`+ id);
  }

  getAlbumSubject(id: string) {
    this.newAlbumSubject.next(id);
  } 
}
