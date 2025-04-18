import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { Product } from './Model/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  removeProduct() {
    const exists = this.products.some((product: Product) => product.id === 4);

    if (exists) {
      this.products.pop();
    }
  }
  addProduct() {
    const exists = this.products.some((product: Product) => product.id === 4);

    if (!exists) {
      this.products = [
        ...this.products,
        {
          id: 4,
          name: 'Kottu',
          description: 'Cheese Kottu Full',
          sellingprice: 1250.0,
          imageUrl: '../../assets/images/kottu.jpg',
        },
      ];
    }
  }
  title = 'AngularProductTest';
  products: Product[] = [
    {
      id: 1,
      name: 'Pizza',
      description: 'Large Pizza',
      sellingprice: 2250.0,
      imageUrl: '../../assets/images/pizza.jpg',
    },
    {
      id: 2,
      name: 'Briyani',
      description: 'Medum Size BiriyAni',
      sellingprice: 950.0,
      imageUrl: '../../assets/images/biriyani.jpg',
    },
    {
      id: 3,
      name: 'Noodless',
      description: 'Noodless fujll',
      sellingprice: 330.0,
      imageUrl: '../../assets/images/noodless.jpg',
    },
  ];
}
