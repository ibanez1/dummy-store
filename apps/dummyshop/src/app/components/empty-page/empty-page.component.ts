import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dummyshop-workspace-empty-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-page.component.html',
  styleUrl: './empty-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EmptyPageComponent{}
