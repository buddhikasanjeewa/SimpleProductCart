import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Product } from '../Model/product';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { AddonsComponent } from '../addons/addons.component';
import { AddonListComponent } from '../addon-list/addon-list.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductComponent,
    AddonsComponent,
    AddonListComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnChanges {
  // products: Product[] = [
  //   { id: 1, name: 'Rice', description: 'Samba Rice', sellingprice: 250.0 },
  //   {
  //     id: 2,
  //     name: 'Dhal',
  //     description: 'Imported Red Dhal',
  //     sellingprice: 150.0,
  //   },
  //   { id: 3, name: 'Eggs', description: 'Boiler Eggs', sellingprice: 33.0 },
  // ];
  @Input() products: any[] = [];
  selectedProducts?: Product;
  @ViewChild('productRef') productComponent!: ProductComponent;
  addons: Product[] = [];

  constructor() {}

  AddAddons() {}

  ngOnChanges(changes: SimpleChanges) {
    debugger;
    if (changes['products']) {
      console.log('Product list changed:', changes['products'].currentValue);
    }
  }

  selectProducts(products: Product): void {
    this.selectedProducts = { ...products }; // Passing a copy to trigger ngOnChanges
  }
}
