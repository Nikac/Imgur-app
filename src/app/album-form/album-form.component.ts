import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { GalleryService } from '../services/gallery.service';
import { Album } from '../models/album.model';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css']
})
export class AlbumFormComponent implements OnInit{
  @ViewChild('f') form: NgForm;
  album = {};
  album.ids = [];
  editMode: boolean = false;
  newAlbum = {};

  constructor(private galleryService: GalleryService) { }

  ngOnInit() { 
    // getting id 
   this.galleryService.newAlbumID
      .pipe(
        // merging id with getAlbum(id)
        mergeMap(val => this.galleryService.getAlbum(val))
      )
      .subscribe(
        res => { 
          this.album = res.data; 
          // filter through images array to get ids for the form
          this.album.images.filter(ids => this.ids.push(ids.id));
          console.log(this.ids);
          this.album.ids = this.ids;
          this.editMode =true;
        },
        err => console.log(err)
      )
  };

  // Save new album
  onSubmit(f: NgForm) {
    this.newAlbum = f.value;

    // if album object is not empty update
    if (this.editMode) {
          // update album
          this.galleryService.updateAlbum(this.album.id, this.album)
            .subscribe(
              res => {
                console.log(res);
                this.album = res;
                // this.galleryService.getUpdatedAlbum(this.album);
              },
              err => console.log(err)
            )
    } else {
      // if its not empty create new one
      this.galleryService.newAlbum(this.newAlbum)
        .subscribe(
            res => {
                this.newAlbum = res.data;
                this.galleryService.getAlbum(this.newAlbum.id)
                  .subscribe(
                    res => this.galleryService.getNewAlbum(this.newAlbum.id), 
                    err => console.log(err)
                  )
                this.form.reset();
            }
        )
    } 
  };
}
