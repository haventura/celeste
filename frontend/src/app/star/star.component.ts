import { NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Star } from './star';
import { StarService } from './star.service';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  providers: [StarService],
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnInit {
  star_list: Star[] = [];
  selected_star: Star | undefined;
  edited_star: Star | undefined; // the star currently being edited
  new_star: Star | undefined;

  star_name_search: string = '';

  constructor(private starService: StarService) {}

  ngOnInit() {
    this.get_star_list();
  }

  handle_event_select_star(star_id: number) {
    this.edited_star = undefined;
    this.new_star = undefined;
    this.selected_star = this.star_list.find(
      (star) => star.star_id === star_id
    );
  }

  handle_event_edit_star(){
    this.edited_star = this.selected_star;
    this.selected_star = undefined;
    this.new_star = undefined;
  }

  handle_event_confirm_edit() {
    if(this.edited_star && this.edited_star.name){
      this.update_star();  
      this.selected_star = this.edited_star;
    }
    else{
      this.selected_star = this.star_list[0];
    }
    this.edited_star = undefined;
    this.new_star = undefined;
  }

  handle_event_new_star() {
    this.selected_star = undefined;
    this.edited_star = undefined;
    this.new_star = { name: 'New star' } as Star;
  }

  handle_event_confirm_new() {
    if(this.new_star && this.new_star.name){
      this.add_star();
    }
    else{
      this.selected_star = this.star_list[0];
    }
    this.edited_star = undefined;
    this.new_star = undefined;
  }

  handle_event_delete_star() {
    this.delete_star(this.selected_star!);
    this.selected_star = this.star_list[0];
    this.edited_star = undefined;
    this.new_star = undefined
  }

  get_star_list(): void {
    this.starService
      .get_star_list('')
      .subscribe(
        (star_list) => (
          (this.star_list = star_list), (this.selected_star = star_list[0])
        )
      );
  }

  add_star(): void{
    let new_star: Star = {} as Star;
    this.starService
          .add_star(this.new_star!)
          .subscribe((star) => ((this.star_list.push(star)), (this.selected_star = star)));
  }

  delete_star(star: Star): void {
    this.star_list = this.star_list.filter((d) => d !== star);
    this.starService.delete_star_by_id(star.star_id).subscribe();
  }

  search_star_name(star_name: string) {
    this.edited_star = undefined;
    if (star_name && star_name !== '') {
      this.starService
        .get_star_list(star_name)
        .subscribe((star_list) => (this.star_list = star_list));
    } else {
      this.get_star_list();
    }
  }

  update_star() {
    this.starService
      .update_star({
        ...this.edited_star!
      })
      .subscribe((star) => {
        // replace the star in the star_list list with update from server
        const index = star
          ? this.star_list.findIndex((d) => d.star_id === star.star_id)
          : -1;
        if (index > -1) {
          this.star_list[index] = star;         
        }
    }); 
  }
}
