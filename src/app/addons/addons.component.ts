import { Component, Input, input } from '@angular/core';
import { Product } from '../Model/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './addons.component.html',
  styleUrl: './addons.component.css',
})
export class AddonsComponent {
  @Input() addon?: Product;
}
