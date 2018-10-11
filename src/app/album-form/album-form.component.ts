import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { GalleryService } from '../services/gallery.service';
import { Album } from '../models/album.model';


@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css']
})
export class AlbumFormComponent implements OnInit {
  album = {};

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {}

  // Save new album
  onSubmit(f: NgForm) {
  	console.log(f.value);
    
    this.galleryService.newAlbum(f.value)
      .subscribe(
          data => {
              this.album = data;
              console.log(this.album);
          }
      )
  };

}
