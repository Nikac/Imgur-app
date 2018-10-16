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
  value: any;

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
     // GET all albums
     this.galleryService.getAlbums().subscribe(result => this.albums = result )
  }


  // Read Album
  onRead(id: string) {
    this.albumDetails = true;
    this.galleryService.getAlbumSubject(id);
  }
  
  // Add new album
  onAdd() {
    this.showForm = !this.showForm;
  }

  // Update album
  onUpdate(id: string) {
      this.showForm = true;
      this.galleryService.getAlbumId(id);
  };

  // Delete album
  onDelete(id: string, i: number) {
     this.albumHash =id;
     this.galleryService.deleteAlbum(this.albumHash)
            .subscribe(
                data => this.albums.splice(i, 1),
                err => console.log(err)
            )
  }

}
