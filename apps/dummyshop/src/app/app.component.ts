import { Component, afterNextRender } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'dummyshop-workspace-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dummyshop';
  constructor() {
    afterNextRender(() => {
      console.log(window.location.pathname)
    })
  }
}
