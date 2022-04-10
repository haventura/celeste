import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Star } from './star';
import { StarService } from './star.service';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  providers: [StarService],
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
  star_list: Star[] = [];
  edited_star: Star | undefined; // the star currently being edited

  star_name = '';
  star_description = '';
  star_right_ascension = '';
  star_declination = '';
  star_apparent_magnitude = 0.0;
  star_mass = 0.0;
  star_radius = 0.0;
  star_age = 0.0;

  constructor(private starService: StarService) {}

  @ViewChild('edited_star_name')
  set edited_star_name(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }
  ngOnInit() {
    this.get_star_list();
  }

  get_star_list(): void {
    this.starService.get_star_list("")
      .subscribe(star_list => (this.star_list = star_list));
  }

  add(name: string, description: string): void {
    this.edited_star = undefined;
    name = name.trim();
    description = description.trim();
    if (!name) {
      return;
    }
    // The server will generate the id for this new star
    const new_star: Star = {name, description} as Star;
    this.starService
      .add_star(new_star)
      .subscribe(star => this.star_list.push(star));
  }

  delete(star: Star): void {
    this.star_list = this.star_list.filter(d => d !== star);
    this.starService
      .delete_star_by_id(star.star_id)
      .subscribe();
  }

  edit(star_name: string, star_description: string) {
    this.update(star_name, star_description);
    this.edited_star = undefined;
  }

  search(star_name: string) {
    this.edited_star = undefined;
    if (star_name !== "" && star_name !== null) {
      this.starService
        .get_star_list(star_name)
        .subscribe(star_list => (this.star_list = star_list));
    } else {
      this.get_star_list();
    }
  }

  update(star_name: string, star_description: string) {
    if (star_name && this.edited_star && (this.edited_star.name !== star_name || this.edited_star.description !== star_description)) {
      this.starService
        .update_star({...this.edited_star, name: star_name, description: star_description})
        .subscribe(star => {
          // replace the star in the star_list list with update from server
          const index = star ? this.star_list.findIndex(d => d.star_id === star.star_id) : -1;
          if (index > -1) {
            this.star_list[index] = star;
          }
        });
      this.edited_star = undefined;
    }
  }
}
