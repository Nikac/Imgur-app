import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ngform } from '@angulr/forms';

import { FavoritesService } from '../services/favorites.service';
import { CommentsService } from  '../services/comments.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  @ViewChild('f') form:NgForm;

  favorites$: Observable<any>;
  favAlbums = [];
  album = {};
  comments = [];
  id: string;
  comment: string;
  showForm: false;
  commentId: number;
  showAllComments = 5;

  constructor(private favoritesService: FavoritesService,
              private commentsService: CommentsService) { }

  ngOnInit() {
  	this.favoritesService.getFavoriteAlbums()
  	   .subscribe(
			   res => {this.favAlbums = res.data; console.log(res.data);},
         err => console.log(err)
  	 )
  }

  // on click delete image from favoite album
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

  // on click read all comments from clicked album
  onRead(id: string) {
    this.id = id;
    this.commentsService.getComments(this.id)
        .subscribe(
          res => {
            this.comments = res.data; 
            console.log(res.data)
          },
          err => console.log(err)
        )
  }

  // open the input for leaving comment
  onAddComment(id: string) {
    this.commentId = id;
  }

  onSubmit(f: ngForm) {
    console.log(f.value);
    this.form.reset();
  }

}
