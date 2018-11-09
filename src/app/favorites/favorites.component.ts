import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { untilComponentDestroyed } from "@w11k/ngx-componentdestroyed";

import { FavoritesService } from '../services/favorites.service';
import { CommentsService } from  '../services/comments.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  @ViewChild('f') form:NgForm;

  favAlbums = [];
  album = {};
  comments = [];
  id: string;
  comment: string;
  showForm: boolean = false;;
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
  albumId: string;
  // isVoted: boolean = false;

  constructor(private favoritesService: FavoritesService,
              private commentsService: CommentsService) { }

  ngOnInit() {
  	this.favoritesService.getFavoriteAlbums()
  	   .subscribe(
			   res => this.favAlbums = res.data ,
         err => console.log(err)
  	 )

    this.favoritesService.newAlbum
      .pipe(
        untilComponentDestroyed(this),
        mergeMap( value => this.favoritesService.addImage(this.albumId, value))
      )
      .subscribe(
        res => console.log(res),
        err => {
          if (err instanceof HttpErrorResponse && err.error.status === 403) {
            this.errorMsg = 'You cant change other albums, you can only make changes in yours favorite albums.'
          }
        }
      )
  }

  // on click delete image from favoite album
  onDelete(id: string, i: number) {
  	this.favoritesService.deleteImage(id)
        .pipe(
          untilComponentDestroyed(this)
        )
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
    // show comments
    this.showComments = !this.showComments;
    // get all comments
    this.commentsService.getComments(this.id)
        .pipe(
          untilComponentDestroyed(this)
        )
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
        untilComponentDestroyed(this),
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
        untilComponentDestroyed(this),
        mergeMap((value: any) => this.commentsService.getComment(value.data.id))
      )
      .subscribe(
        res => {
          this.replyNewComment = res.data.comment;
          this.repliesComments.push(this.replyNewComment);
          // f.value = '';
        },
        err => console.log(err)
      )
  }

  // get all replies from comment parent
  onReadAllChildrenComments(id: number) {
    this.replyId = id;
    this.commentsService.getReplyComments(this.replyId)
      .pipe(
        untilComponentDestroyed(this)
      )
      .subscribe(
        res => this.repliesComments = res.data.children,
        err => console.log(err)
      )
  }
  // deleteing comments
  onDeleteComment(id: number, index: number) {
    console.log(id);
    this.commentsService.deleteComment(id)
      .pipe(
        untilComponentDestroyed(this)
      )
      .subscribe(
        res => {
          console.log(res);
          this.comments.splice(index, 1);
        },
        err => {
          console.log(err);
          if (err instanceof HttpErrorResponse && (err.error.status === 404 || err.error.status === 403 )) {
            this.errorMsg = 'You can only delete your comment. Please choose only yor comment.';
          }
        }
      )
  }

  // vote for comment 
  onVote(id: string, comment) {
    this.up = comment.ups;

    this.commentsService.voteForComment(id, this.up)
      .pipe(
        untilComponentDestroyed(this)
      )
      .subscribe(
        res => {
          comment.ups +=1;             
        },
        err => console.log(err)
      )
  }

  onAddImage(albumId: string) {
    this.showForm = !this.showForm;
    this.albumId = albumId;
   
  }

  ngOnDestroy() {}

}
