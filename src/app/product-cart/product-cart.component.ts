import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../Model/product';
import { AddonListComponent } from '../addon-list/addon-list.component';
import { DesertListComponent } from '../desert-list/desert-list.component';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [CommonModule, AddonListComponent, DesertListComponent],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css',
})
export class ProductCartComponent implements OnChanges {
  @Input() cart?: Product[] = [];
  @Input() divShow: any;
  @Input() cartTotal?: number;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cart']) {
      console.log('Cart updated:', changes['cart'].currentValue);
    }
  }
  updateProductTotal(newTotal: number) {
    this.cartTotal = newTotal;
  }
}
