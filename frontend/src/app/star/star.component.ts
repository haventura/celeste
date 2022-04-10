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

  select(star_id:number){
    this.edited_star = undefined;
    this.selected_star = this.star_list.find(star => star.star_id === star_id);
  }

  get_star_list(): void {
    this.starService
      .get_star_list('')
      .subscribe((star_list) => (this.star_list = star_list, this.selected_star = star_list[0]));
  }

  add(name: string, description: string): void {
    this.edited_star = undefined;
    name = name.trim();
    description = description.trim();
    if (!name) {
      return;
    }
    // The server will generate the id for this new star
    const new_star: Star = { name, description } as Star;
    this.starService
      .add_star(new_star)
      .subscribe((star) => this.star_list.push(star));
  }

  delete(star: Star): void {
    this.star_list = this.star_list.filter((d) => d !== star);
    this.starService.delete_star_by_id(star.star_id).subscribe();
  }

  edit(
    name: string,
    description: string,
    right_ascension: string,
    declination: string,
    apparent_magnitude: string,
    mass: string,
    radius: string,
    age: string
  ) {
    this.update(
      name,
      description,
      right_ascension,
      declination,
      apparent_magnitude as unknown as number,
      mass as unknown as number,
      radius as unknown as number,
      age as unknown as number
    );
    this.edited_star = undefined;
  }

  search(star_name: string) {
    this.edited_star = undefined;
    if (star_name !== '' && star_name !== null) {
      this.starService
        .get_star_list(star_name)
        .subscribe((star_list) => (this.star_list = star_list));
    } else {
      this.get_star_list();
    }
  }

  update(
    name: string,
    description: string,
    right_ascension: string,
    declination: string,
    apparent_magnitude: number,
    mass: number,
    radius: number,
    age: number
  ) {
    if (name && this.edited_star) {
      this.starService
        .update_star({
          ...this.edited_star,
          name: name,
          description: description,
          right_ascension: right_ascension,
          declination: declination,
          apparent_magnitude: apparent_magnitude,
          mass: mass,
          radius: radius,
          age: age,
        })
        .subscribe((star) => {
          // replace the star in the star_list list with update from server
          const index = star
            ? this.star_list.findIndex((d) => d.star_id === star.star_id)
            : -1;
          if (index > -1) {
            this.star_list[index] = star;
            this.selected_star = star;
          }
        });
      this.edited_star = undefined;
    }
  }
}
