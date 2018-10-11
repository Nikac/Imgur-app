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
  albums$: Observable<Album[]>;
  updateAlbum: Album;
  albumHash: string;
  showForm: boolean = false;

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
     // GET all albums
      this.albums$ = this.galleryService.getAlbums();
              
  }

  // ngOnChanges() {
  //   this.albums;
  // }


  // Read Album
  onRead(id: string) {
    this.albumHash = id;
    this.galleryService.getAlbumSubject(id);
  }
  
  // Add new album
  onAdd() {
    this.showForm = !this.showForm;
  }

  // Update album
  onUpdate(id: string) {
    this.albumHash = id;

    this.galleryService.getAlbum(this.albumHash)
            .subscribe(
                data => {
                  this.updateAlbum = data.data;
                  console.log(this.updateAlbum); 
                  this.showForm = true;
                }
          )
  };

  // Delete album
  onDelete(id: string) {
     this.albumHash =id;
     this.galleryService.deleteAlbum(this.albumHash)
            .subscribe(
                data => console.log(data),
                err => console.log(err)
            )
  }

}
