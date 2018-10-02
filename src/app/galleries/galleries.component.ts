import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GalleryService } from '../services/gallery.service';
import { Album } from '../models/album.model';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.css']
})
export class GalleriesComponent implements OnInit {
  albums: Album[] = [];
  album: Album = {};

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
    this.galleryService.getAlbums()
      .subscribe(
        (result: Album[]) => {
          console.log(result);
          this.albums = result;
        }
      );
  }

  // form
  albumForm = new FormGroup({
    title: new FormControl('' , Validators.required),
    description: new FormControl('' , Validators.required),
    ids: new FormControl([] , Validators.required),
    cover: new FormControl('' , Validators.required),
  });


  onSubmit() {
    console.log(this.albumForm.value);
   
  }

  // geting inputs for validating the form
  get title() {
    return this.albumForm.get('title');
  }

  get ids() {
    return this.albumForm.get('ids');
  }

   get description() {
    return this.albumForm.get('description');
  }

  get cover() {
    return this.albumForm.get('cover');
  }

}
