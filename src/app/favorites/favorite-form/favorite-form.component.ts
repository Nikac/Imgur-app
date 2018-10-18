import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-favorite-form',
  templateUrl: './favorite-form.component.html',
  styleUrls: ['./favorite-form.component.css']
})
export class FavoriteFormComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  constructor() { }

  ngOnInit() {}

  onSubmit(f: NgForm) {
  	console.log(f.value);

  	this.form.reset();
  }

}
