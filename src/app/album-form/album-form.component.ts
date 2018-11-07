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
  album = {
    id: '',
    title: '',
    description: '',
    cover: '',
    images: []
  };
  ids: string[] = [];
  editMode: boolean = false;
  newAlbum = {
    id: '',
    title: '',
    description: '',
    cover: '',
    images: []
  };

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
          this.album.images.filter(album => this.ids.push(album.id));
          console.log(this.ids);
          this.album.images = this.ids;
          this.editMode =true;
        },
        err => console.log(err)
      )
  };

  // Save new album or update
  onSubmit(f: NgForm) {
    this.newAlbum = f.value;

    let fd = new FormData();
    // treba ispraviti ovo
    // fd.append('ids', this.album.images);
    fd.append('title', this.album.title);
    fd.append('description', this.album.description);
    fd.append('cover', this.album.cover);

    // if album object is not empty update
    if (this.editMode) {
          // update album
          this.galleryService.updateAlbum(this.album.id, fd)
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
