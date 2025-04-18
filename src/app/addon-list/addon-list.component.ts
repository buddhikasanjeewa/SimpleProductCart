import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  Input,
  input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../Model/product';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddonsComponent } from '../addons/addons.component';

@Component({
  selector: 'app-addon-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AddonsComponent],
  templateUrl: './addon-list.component.html',
  styleUrl: './addon-list.component.css',
})
export class AddonListComponent implements OnInit {
  @Output() productTotalChange = new EventEmitter<number>();

  selectedAddon?: Product;
  calculatedPrice: number = 0.0;

  @Input() ProductTotal?: number;
  @Input() OrignalProductTotal?: number;
  addons = signal<Product[]>([
    {
      id: 1,
      name: 'Cheese',
      description: 'Cheese small',
      sellingprice: 20,
      checked: false,
      imageUrl: '../../assets/images/cheese.jpg',
    },
    {
      id: 2,
      name: 'Mayonnaise',
      description: 'Mayonnaise',
      sellingprice: 15,
      checked: false,
      imageUrl: '../../assets/images/mayonaise.jpg',
    },
    {
      id: 3,
      name: 'Souce',
      description: 'Souce',
      sellingprice: 20,
      checked: false,
      imageUrl: '../../assets/images/souce.avif',
    },
    {
      id: 4,
      name: 'Eggs',
      description: 'Eggs',
      sellingprice: 15,
      checked: false,
      imageUrl: '../../assets/images/eggs.jpg',
    },
    {
      id: 5,
      name: 'Pepper',
      description: 'Pepper',
      sellingprice: 10,
      checked: false,
      imageUrl: '../../assets/images/pepper.jpg',
    },
    {
      id: 6,
      name: 'Garlic',
      description: 'Garlic Cream',
      sellingprice: 12,
      checked: false,
      imageUrl: '../../assets/images/garlic.jpg',
    },
  ]);
  selected: any;

  constructor() {
    this.selected = this.selectAddons;
  }

  ngOnInit(): void {
    // this.OrignalProductTotal = this.ProductTotal ?? 0;
  }
  getTotal($event: Event, addon: Product) {
    this.calculatedPrice = this.ProductTotal ?? 0;
    if ($event.target && ($event.target as HTMLInputElement).checked) {
      this.calculatedPrice += addon.sellingprice;
    } else {
      this.calculatedPrice -= addon.sellingprice;
    }
    this.ProductTotal = this.calculatedPrice;

    // Emit the updated ProductTotal to the parent
    this.productTotalChange.emit(this.ProductTotal);
  }
  selectAddons(addon: Product) {
    this.selectedAddon = { ...addon };
  }

  removeAddon() {
    debugger;
    if (this.addons().some((addon) => addon.name === 'French Fries')) {
      const productToRemove = this.addons().find(
        (addon) => addon.id === this.addons().length
      );
      if (productToRemove) {
        // if (productToRemove.checked) {
        //   this.calculatedPrice -= productToRemove.sellingprice;
        //   this.ProductTotal = this.calculatedPrice;
        // }
        this.calculatedPrice = this.OrignalProductTotal ?? 0;
        this.ProductTotal = this.OrignalProductTotal ?? 0;
        this.addons.set(
          this.addons().filter((addon) => addon.id !== this.addons().length)
        );
      }
    }
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
          imageUrl: '../../assets/images/frenchfries.jpg',
        },
      ]);
    }
  }
  clearAll() {
    debugger;
    // Deduct the total price of all selected addons

    const totalDeduction = this.addons()
      .filter((addon) => addon.checked)
      .reduce((sum, addon) => sum + addon.sellingprice, 0);

    this.calculatedPrice = (this.ProductTotal ?? 0) - totalDeduction;
    this.ProductTotal = this.calculatedPrice;

    // Emit the updated ProductTotal to the parent
    this.productTotalChange.emit(this.ProductTotal);
    this.addons.update((checkboxes) =>
      checkboxes.map((cb) => ({ ...cb, checked: false }))
    );
  }
}
