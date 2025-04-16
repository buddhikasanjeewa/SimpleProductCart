import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Product } from '../Model/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-drinklist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drinklist.component.html',
  styleUrl: './drinklist.component.css',
})
export class DrinklistComponent {
  @Output() productTotalChange = new EventEmitter<number>();

  selectedDrinks?: Product;
  calculatedPrice: number = 0.0;

  @Input() ProductTotal?: number;
  @Input() OrignalProductTotal?: number;
  drinks = signal<Product[]>([
    {
      id: 1,
      name: 'Coca Cola',
      description: 'Coca Cola buddy',
      sellingprice: 14,
      checked: false,
      imageUrl: '../../assets/images/cocacola.jpg',
    },
    {
      id: 2,
      name: 'Nescafe',
      description: 'Nescafe',
      sellingprice: 12,
      checked: false,
      imageUrl: '../../assets/images/nescafe.jpg',
    },
    {
      id: 3,
      name: 'NesTea',
      description: 'NesTea',
      sellingprice: 20,
      checked: false,
      imageUrl: '../../assets/images/nestea.jpg',
    },
    {
      id: 4,
      name: 'Milo',
      description: 'Milo shaseey',
      sellingprice: 15,
      checked: false,
      imageUrl: '../../assets/images/milo.jpg',
    },
    {
      id: 5,
      name: 'Cream Soda',
      description: 'Cream Soda buddy',
      sellingprice: 10,
      checked: false,
      imageUrl: '../../assets/images/creamsoda.jpeg',
    },
    {
      id: 6,
      name: 'Necto',
      description: 'Necto Buddy',
      sellingprice: 12,
      checked: false,
      imageUrl: '../../assets/images/necto_bottle.png',
    },
  ]);
  selected: any;
  constructor() {
    this.selected = this.selectedDrinks;
  }
  selectDrinks(drink: Product) {
    this.selectedDrinks = { ...drink };
  }
  getTotal($event: Event, drink: Product) {
    this.calculatedPrice = this.ProductTotal ?? 0;
    if ($event.target && ($event.target as HTMLInputElement).checked) {
      this.calculatedPrice += drink.sellingprice;
    } else {
      this.calculatedPrice -= drink.sellingprice;
    }
    this.ProductTotal = this.calculatedPrice;

    // Emit the updated ProductTotal to the parent
    this.productTotalChange.emit(this.ProductTotal);
  }
  removeDrinks() {
    debugger;
    if (this.drinks().some((drink) => drink.name === 'Fanta')) {
      const productToRemove = this.drinks().find(
        (drink) => drink.id === this.drinks().length
      );
      if (productToRemove) {
        // if (productToRemove.checked) {
        //   this.calculatedPrice -= productToRemove.sellingprice;
        //   this.ProductTotal = this.calculatedPrice;
        // }
        this.calculatedPrice = this.OrignalProductTotal ?? 0;
        this.ProductTotal = this.OrignalProductTotal ?? 0;
        this.drinks.set(
          this.drinks().filter((drink) => drink.id !== this.drinks().length)
        );
      }
    }
  }
  addDrinks() {
    if (!this.drinks().some((drink) => drink.name === 'Fanta')) {
      this.drinks.set([
        ...this.drinks(),
        {
          id: this.drinks().length + 1,
          name: 'Fanta',
          description: 'Fanta Buddy',
          sellingprice: 12,
          imageUrl: '../../assets/images/fanta.jpg',
        },
      ]);
    }
  }
  clearAll() {
    debugger;
    // Deduct the total price of all selected addons

    const totalDeduction = this.drinks()
      .filter((drink) => drink.checked)
      .reduce((sum, drink) => sum + drink.sellingprice, 0);

    this.calculatedPrice = (this.ProductTotal ?? 0) - totalDeduction;
    this.ProductTotal = this.calculatedPrice;

    // Emit the updated ProductTotal to the parent
    this.productTotalChange.emit(this.ProductTotal);
    this.drinks.update((checkboxes) =>
      checkboxes.map((cb) => ({ ...cb, checked: false }))
    );
  }
}
