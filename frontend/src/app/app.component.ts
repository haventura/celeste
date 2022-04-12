import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  show_star_window: boolean = true;

  handle_event_show_star_window(){
    this.show_star_window = true;
  }


  handle_event_show_constellation_window(){
    this.show_star_window = false;
  }
}
