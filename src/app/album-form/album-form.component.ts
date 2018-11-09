import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";

import { GalleryService } from '../services/gallery.service';
import { Album } from '../models/album.model';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css']
})
export class AlbumFormComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  album = {
    id: '',
    title: '',
    description: '',
    cover: '',
    images: []
  };
  editMode: boolean = false;
  newAlbum: Album= {
    id: '',
    title: '',
    description: '',
    cover: '',
    images: []
  };
  albumId: string;
  ids: string[] = [];

  constructor(private galleryService: GalleryService) { }

  ngOnInit() { 
    // getting id 
   this.galleryService.newAlbumID
      .pipe(
        untilComponentDestroyed(this),
        // merging id with getAlbum(id)
        mergeMap(val => this.galleryService.getAlbum(val))
      )
      .subscribe(
        res => { 
          this.album = res.data; 
        
          // filter through images array to get ids for the form   TREBA NAMESTIT DA radi
          this.album.images.filter(album => this.ids.push(album.id));
          console.log(this.album.images);
          this.editMode =true;
        },
        err => console.log(err)
      )
  };

  // Save new album or update
  onSubmit(f: NgForm) {
    this.newAlbum = f.value;

    console.log(this.album.id, this.newAlbum);

    let fd = new FormData();
    // treba ispraviti ovo
    // fd.append('deletehashes', this.album.images);
    fd.append('title', this.newAlbum.title);
    fd.append('description', this.newAlbum.description);
    fd.append('cover', this.newAlbum.cover);


    // if album object is not empty update
    if (this.editMode) {
          // update album
          this.galleryService.updateAlbum(this.album.id, fd)
            .pipe(
              untilComponentDestroyed(this)
            )
            .subscribe(
              res => {
                console.log(res);
                this.album = res;
                // this.galleryService.getUpdatedAlbum(this.album);
                this.form.reset();
              },
              err => console.log(err)
            )
    } else {
      // if its not empty create new one
      this.galleryService.newAlbum(this.newAlbum)
        .pipe(
            untilComponentDestroyed(this)
        )
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

  ngOnDestroy() {}
}
