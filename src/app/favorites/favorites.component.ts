import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites$: Observable<any>;
  favAlbums = [];
  album = {};

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit() {
  	  this.favoritesService.getFavoriteAlbums()
  	  	.subscribe(
			res => {this.favAlbums = res.data; console.log(res.data);}
  	  	)
  }

  onDelete(id: string, i: number) {
  	this.favoritesService.deleteImage(id)
  			.subscribe(
  				res => {
  					console.log(res);
  					this.album = res.data;
  					this.favAlbums.splice(i, 1);
  				}
  			)
  }

}
