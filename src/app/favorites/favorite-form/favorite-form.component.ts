import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";

import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorite-form',
  templateUrl: './favorite-form.component.html',
  styleUrls: ['./favorite-form.component.css']
})
export class FavoriteFormComponent implements OnInit, OnDestroy {
  imageUrl: File = null;
  ids: string;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit() {}

  // on submit add image to album
  onSubmit() {
    this.ids= this.deleteHashes;

    // form new image
  	// const fd = new FormData();
   //  fd.append('ids', this.ids);
    
    this.favoritesService.getAlbum(this.ids);  
    // reset form
    this.imageForm.setValue({
      ids: ''
    })
  	// this.favoritesService.addImage(albumId, fd)
    //  .pipe(
        //   untilComponentDestroyed(this)
        // )
  	// 	.subscribe(
  	// 		res => console.log(res),
  	// 		err => console.log(err)
  	// 	)
  }

  // comment form
  imageForm = new FormGroup({
  		ids: new FormControl('', Validators.required),
  	});

  get deleteHashes() { return this.imageForm.get('ids').value }

  ngOnDestroy() {}

}

