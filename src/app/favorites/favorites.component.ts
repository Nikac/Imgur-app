import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

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
  commentId: string;
  showAllComments = 5;
  showComments: boolean =false;
  showHideComments: string = 'Read comments';
  repliesComments = [];
  replyId: number;
  up: number;
  mainComment: any;

  constructor(private favoritesService: FavoritesService,
              private commentsService: CommentsService) { }

  ngOnInit() {
  	this.favoritesService.getFavoriteAlbums()
  	   .subscribe(
			   res => this.favAlbums = res.data,
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
    this.showComments = !this.showComments;
    this.commentsService.getComments(this.id)
        .subscribe(
          res => {
            this.comments = res.data; 
            console.log(res.data);
          },
          err => console.log(err)
        )
  }

  // treba napraviti da radiiii
  onLeaveComment(mainComment) {
    this.mainComment = mainComment;

    console.log(this.id + ' ' + this.mainComment);

    this.commentsService.newComment(this.id, this.mainComment)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
      // reset input element
      this.mainComment = '';
  } 

  // open the input for leaving comment
  onAddComment(id: string) {
    this.commentId = id;
  }

  // on submit Add image to album
  onSubmit(f: NgForm) {
    console.log(f.value);
    this.form.reset();
  }

  // get all replies from comment parent
  onReadAllChildrenComments(id: number) {
    this.replyId = id;
    this.commentsService.getReplyComments(this.replyId)
      .subscribe(
        res => {console.log(res.data); this.repliesComments = res.data.children; },
        err => console.log(err)
      )
  }

  // vote for comment NE RADIIII res.data.ups res.data.id
  onVote(id: string) {
    this.up ++;

    this.commentsService.getComment(id)
      .pipe(
        mergeMap((value: any) => this.commentsService.voteForComment(value.data.id, value.data.ups))
      )
      .subscribe(
        res => {
          console.log(res)

        },
        err => console.log(err)
      )

    // this.commentsService.voteForComment(id, this.up)
    //   .subscribe(
    //     res => {
    //       if (res.data === true) {
    //         this.comment.vote +=1;
    //       }
    //     },
    //     err => console.log(err)
    //   )
  }

}
