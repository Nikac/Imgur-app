import { Component, OnInit } from '@angular/core';

import { GalleryService } from '../services/gallery.service';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {
  album$: Observable<any>;
  seeDetails: boolean = false;
 
  constructor(private galleryService: GalleryService) {}

  ngOnInit() {
  	this.album$ = this.galleryService.newAlbumSubject
  		.pipe(
  			mergeMap( val => this.galleryService.getAlbum(val))
  		)

  }
}
