import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../../interceptor/loader.service';

@Component({
  selector: 'dummyshop-workspace-spinner',
  standalone: true,
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) { }
}