import { Component, Input, OnInit, signal } from '@angular/core';
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
export class DesertListComponent implements OnInit {
  selectedDesert?: Product;
  @Input() ProductTotal?: number;
  calculatedPrice: number = 0.0;
  @Input() OrignalProductTotal?: number;
  getTotal($event: Event, desert: Product) {
    this.calculatedPrice = this.ProductTotal ?? 0;
    if ($event.target && ($event.target as HTMLInputElement).checked) {
      this.calculatedPrice += desert.sellingprice;
    } else {
      this.calculatedPrice -= desert.sellingprice;
    }
    this.ProductTotal = this.calculatedPrice;
  }
  ngOnInit(): void {
    this.calculatedPrice = this.ProductTotal ?? 0;
    this.deserts.update((checkboxes) =>
      checkboxes.map((cb) => ({ ...cb, checked: false }))
    );
  }

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
    if (!this.deserts().some((desert) => desert.name === 'Water Melon')) {
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
    if (this.deserts().some((desert) => desert.name === 'Water Melon')) {
      const productToRemove = this.deserts().find(
        (desert) => desert.id === this.deserts().length
      );
      if (productToRemove) {
        // if (productToRemove.checked) {
        //   this.calculatedPrice -= productToRemove.sellingprice;
        //   this.ProductTotal = this.calculatedPrice;
        // }
        this.calculatedPrice = this.OrignalProductTotal ?? 0;
        this.ProductTotal = this.OrignalProductTotal ?? 0;
        this.deserts.set(
          this.deserts().filter((desert) => desert.id !== this.deserts().length)
        );
      }
    }
  }

  clearAll() {
    this.deserts.update((checkboxes) =>
      checkboxes.map((cb) => ({ ...cb, checked: false }))
    );
    this.calculatedPrice = this.ProductTotal ?? 0;
  }
}
