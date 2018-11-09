import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Album } from '../models/album.model';

import { Subject, throwError }  from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class GalleryService {
  url: string = 'https://api.imgur.com/3';

  constructor(private http: HttpClient) { }

  public newAlbumSubject = new Subject<any>();
  public newAlbumID = new Subject<any>();
  public newGalleryHash = new Subject<any>();
  public newCreatedAlbum = new Subject<any>();
  // public newUpdatedAlbum = new Subject<any>();

  // GET albums
  getAlbums() {
  	return this.http.get<any[]>(`${this.url}/account/Guzina/albums/`);
  }

  // POST album
  newAlbum(album: Album) {
    return this.http.post<any>(`${this.url}/album/`, album );
  }

  // GET album
  getAlbum(id:string) {
    return this.http.get<any>(`${this.url}/album/` + id);
  }

  // Put album
  updateAlbum(id: string, album) {
    return this.http.put<any>(`${this.url}/album/` + id, album);
  }

  // Delete album
  deleteAlbum(id: string) {
    return this.http.delete<any>(`${this.url}/album/`+ id)
  }

  // subject for passing ID for reading album
  getAlbumSubject(id: string) {
    this.newAlbumSubject.next(id);
  } 

  // subject for passing ID for updating album
  getAlbumId(id: string) {
    this.newAlbumID.next(id);
  }


  getGalleryHash(id: string) {
    this.newGalleryHash.next(id);
  }

  getNewAlbum(id: string) {
    this.newCreatedAlbum.next(id);
  }

  // getUpdatedAlbum(album: Album) {
  //   this.newUpdatedAlbum.next(album);
  // }
}
