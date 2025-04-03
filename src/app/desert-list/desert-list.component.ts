import { Component, Input, signal } from '@angular/core';
import { Product } from '../Model/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-desert-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './desert-list.component.html',
  styleUrl: './desert-list.component.css',
})
export class DesertListComponent {
  selectedDesert?: Product;
  @Input() ProductTotal?: number;
  calculatedPrice: number = 0.0;
  deserts = signal<Product[]>([
    {
      id: 1,
      name: 'Fruit Salad',
      description: 'Tasty and healthy fruit salad',
      sellingprice: 15,
      checked: false,
      imageUrl: '../../assets/images/fruitsalad.jpg',
    },
    {
      id: 2,
      name: 'ICE Cream',
      description: 'Chocate Ice Cream',
      sellingprice: 13,
      checked: false,
      imageUrl: '../../assets/images/icecream.jpeg',
    },
    {
      id: 3,
      name: 'Watalappan',
      description: 'Watalappan',
      sellingprice: 12,
      checked: false,
      imageUrl: '../../assets/images/watalappan.jpeg',
    },
  ]);
  selectDeserts(desert: Product) {
    this.selectedDesert = { ...desert };
  }
  addDesert() {
    if (!this.deserts().some((desert) => desert.name === 'French Fries')) {
      this.deserts.set([
        ...this.deserts(),
        {
          id: this.deserts().length + 1,
          name: 'Water Melon',
          description: 'Water Melon Small',
          sellingprice: 10,
          imageUrl: '../../assets/images/frenchfries.jpg',
        },
      ]);
    }
  }
  removeDesert() {
    this.deserts().pop();
    this.calculatedPrice = this.ProductTotal ?? 0;
  }

  clearAll() {
    this.deserts.update((checkboxes) =>
      checkboxes.map((cb) => ({ ...cb, checked: false }))
    );
    this.calculatedPrice = this.ProductTotal ?? 0;
  }
}
