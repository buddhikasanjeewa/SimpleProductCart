import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  Input,
  input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../Model/product';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-addon-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './addon-list.component.html',
  styleUrl: './addon-list.component.css',
})
export class AddonListComponent implements OnInit {
  selectedAddon?: Product;
  calculatedPrice: number = 0.0;
  @Input() ProductTotal?: number;
  addons = signal<Product[]>([
    {
      id: 1,
      name: 'Cheese',
      description: 'Cheese small',
      sellingprice: 20,
      checked: false,
      imageUrl: 'assets/cheese.jpg',
    },
    {
      id: 2,
      name: 'Mayonnaise',
      description: 'Mayonnaise',
      sellingprice: 15,
      checked: false,
      imageUrl: 'assets/mayonnaise.jpg',
    },
    {
      id: 3,
      name: 'Souce',
      description: 'Souce',
      sellingprice: 20,
      checked: false,
      imageUrl: 'assets/souce.jpg',
    },
    {
      id: 4,
      name: 'Eggs',
      description: 'Eggs',
      sellingprice: 15,
      checked: false,
      imageUrl: 'assets/eggs.jpg',
    },
    {
      id: 4,
      name: 'Pepper',
      description: 'Pepper',
      sellingprice: 10,
      checked: false,
      imageUrl: 'assets/pepper.jpg',
    },
    {
      id: 4,
      name: 'Garlic',
      description: 'Garlic Cream',
      sellingprice: 12,
      checked: false,
      imageUrl: 'assets/garlic.jpg',
    },
  ]);
  selected: any;

  constructor() {
    this.selected = this.selectAddons;
  }
  ngOnInit(): void {
    this.calculatedPrice = this.ProductTotal ?? 0;
  }
  getTotal($event: Event, addon: Product) {
    this.calculatedPrice = this.ProductTotal ?? 0;
    if ($event.target && ($event.target as HTMLInputElement).checked) {
      this.calculatedPrice += addon.sellingprice;
    } else {
      this.calculatedPrice -= addon.sellingprice;
    }
    this.ProductTotal = this.calculatedPrice;
  }
  selectAddons(addon: Product) {
    this.selectedAddon = { ...addon };
  }

  addAddons() {
    if (!this.addons().some((addon) => addon.name === 'French Fries')) {
      this.addons.set([
        ...this.addons(),
        {
          id: this.addons().length + 1,
          name: 'French Fries',
          description: 'French Fries',
          sellingprice: 12,
          imageUrl: 'assets/frenchfries.jpg',
        },
      ]);
    }
  }
  clearAll() {
    this.addons.update((checkboxes) =>
      checkboxes.map((cb) => ({ ...cb, checked: false }))
    );
  }
}
