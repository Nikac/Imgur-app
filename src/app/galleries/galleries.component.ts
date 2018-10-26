import { Component, OnInit } from '@angular/core';

import { GalleryService } from '../services/gallery.service';
import { Album } from '../models/album.model';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.css']
})
export class GalleriesComponent implements OnInit {
  album: Album; 
  albums = [];
  updateAlbum: Album;
  albumHash: string;
  showForm: boolean = false;
  albumDetails: boolean = false;
  albumId: string;

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
     // GET all albums
     this.galleryService.getAlbums().subscribe(result => this.albums = result.data)  
     this.galleryService.newCreatedAlbum
      .pipe(
        mergeMap(value => this.galleryService.getAlbum(value))
      ).subscribe(
        res => this.albums.push(res.data),
        err => console.log(err)
      )
  }

  // Read Album
  onRead(id: string) {
    this.albumDetails = true;
    this.galleryService.getAlbumSubject(id);
  };
  
  // Add new album
  onAdd(id: string) {
    this.showForm = !this.showForm;
    this.galleryService.getAlbum(id)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  };

  // Update album
  onUpdate(id: string) {
      // this.albumId = id;
      this.showForm = true;
      this.galleryService.getAlbumId(id);
  };

  // Delete album
  onDelete(id: string, i: number) {
     this.albumHash =id;
     this.galleryService.deleteAlbum(this.albumHash)
            .subscribe(
                data => console.log(data),
                err => console.log(err)
            )
    this.albums.splice(i, 1);
  };

}
