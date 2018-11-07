import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

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
  replyNewComment: string;
  replyId: number;
  up: number;
  mainComment: any;
  image_id: string;
  errorMsg: string;

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
    // getting ID
    this.id = id;
    console.log(this.id);

    this.showComments = !this.showComments;
    // get all comments
    this.commentsService.getComments(this.id)
        .subscribe(
          res => {
            this.comments = res.data; 
            console.log(res.data);
          },
          err => console.log(err)
        )  
  }

  // leave comment
  onLeaveComment(mainComment) {
    // form data for API
    let fd = new FormData();
    fd.append('image_id', this.id);
    fd.append('comment', mainComment);
    
    // leave comment 
    this.commentsService.newComment(fd)
      .pipe(
        mergeMap( (value: any) => this.commentsService.getComment(value.data.id))
      )
      .subscribe(
        res => this.comments.push(res.data),
        err => console.log(err)
      )
    //reset input element
    this.mainComment = '';
    
  } 

  // open the input for leaving comment
  onAddComment(image_id: string, commentId: string) {
    this.commentId = commentId;
    this.image_id = image_id;
  }

  // on submit reply to a comment
  onSubmitReplyComment(f: NgForm) {
    let comment = f.value;
    // form data for API
    let fd = new FormData();
    fd.append('image_id', this.image_id);
    fd.append('comment', comment)

    this.commentsService.newCommentReply(this.commentId, fd)
      .pipe(
        mergeMap((value: any) => this.commentsService.getComment(value.data.id))
      )
      .subscribe(
        res => {
          this.replyNewComment = res.data.comment;
          this.repliesComments.push(this.replyNewComment);
        },
        err => console.log(err)
      )
  }

  // get all replies from comment parent
  onReadAllChildrenComments(id: number) {
    this.replyId = id;
    this.commentsService.getReplyComments(this.replyId)
      .subscribe(
        res => this.repliesComments = res.data.children,
        err => console.log(err)
      )
  }
  // deleteing comments
  onDeleteComment(id: string, index: number) {
    console.log(id);
    this.commentsService.deleteComment(id)
      .subscribe(
        res => {
          console.log(res);
          this.comments.splice(index, 1);
        },
        err => {
          console.log(err);
          if (err instanceof HttpErrorResponse && err.error.status === 404) {
            this.errorMsg = 'You can only delete your comment. Please choose only yor comment.';
          }
        }
      )
  }

  // vote for comment NE RADIIII res.data.ups res.data.id
  onVote(id: string) {
    // this.commentsService.voteForComment(id)
    //   .subscribe(
    //     res => {
    //       console.log(res);
          
    //     },
    //     err => console.log(err)
    //   )
  }

}
