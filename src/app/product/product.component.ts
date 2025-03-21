import {
  AfterContentInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../Model/product';
import { CommonModule } from '@angular/common';
import { ProductCartComponent } from '../product-cart/product-cart.component';
import { AddonListComponent } from '../addon-list/addon-list.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ProductCartComponent, AddonListComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent
  implements OnInit, OnChanges, DoCheck, OnDestroy, AfterContentInit
{
  @Input() product!: Product; // Input property
  @Input() cartitems: Product[] = [];
  @ContentChild('addons') 'addons'!: ElementRef;
  CartTotal: number = 0;
  ShowDiv: any;
  constructor() {
    // console.log('Product Component Constructor Called');
  }

  ngAfterContentInit(): void {
    console.log('ngOnContentInit called!');
    if (this.addons) {
      console.log('Projected content:', this.addons.nativeElement.innerText);
    }
  }
  removeItem(lproduct: Product) {
    const index = this.cartitems.indexOf(lproduct);
    if (index > -1) {
      this.cartitems.splice(index, 1);
      this.ShowDiv = false;
    }
  }
  addToCart(lproduct: Product) {
    if (this.cartitems.indexOf(lproduct) == -1) {
      this.cartitems.push(lproduct);
      this.ShowDiv = true;
      this.CartTotal = lproduct.sellingprice;
    }
    //  this.cartItems = [...this.cartItems, { name: 'Mouse', price: 50 }];
  }

  ngOnInit(): void {
    // console.log('ngOnInit: Component Initialized');
  }

  ngOnChanges(changes: SimpleChanges): void {
    debugger;
    if (changes['cart']) {
      console.log('Cart updated:', changes['cart'].currentValue);
    }
  }
  ngDoCheck(): void {
    // console.log('ngDoCheck: Change detection running');
  }

  ngOnDestroy(): void {
    // console.log('ngOnDestroy: Component is being destroyed');
  }
}
