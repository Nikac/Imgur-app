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
          // filter through images array to get ids for the form
          res.data.images.filter(ids => this.ids.push(ids.id));
          this.album = res.data; 
          this.album.ids = this.ids;
          this.editMode =true;
        },
        err => console.log(err)
      )
  }

  // Save new album
  onSubmit(f: NgForm) {
    // this.newAlbum = f.value;
    // console.log(f.value);

    const fd = new FormData();
    fd.append('ids[]', f.value.ids);
    fd.append('title', f.value.title);
    fd.append('description', f.value.description);
    fd.append('cover', f.value.cover);

    fd.forEach((key, value) => {
      // console.log(key + '=' + value);
     
    }); 


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
      this.galleryService.newAlbum(fd)
        .subscribe(
            data => {
                console.log(data);
             
                this.form.reset();
            }
        )
    }
   
  };

}
