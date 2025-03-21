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

@Component({
  selector: 'app-addon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './addon-list.component.html',
  styleUrl: './addon-list.component.css',
})
export class AddonListComponent implements OnInit {
  selectedAddon?: Product;
  calculatedPrice: number = 0.0;
  @Input() ProductTotal?: number;
  addons = signal<Product[]>([
    { id: 1, name: 'Cheese', description: 'Cheese small', sellingprice: 20 },
    { id: 2, name: 'Mayons', description: 'Mayons', sellingprice: 15 },
    { id: 3, name: 'Souce', description: 'Souce', sellingprice: 20 },
    { id: 4, name: 'Eggs', description: 'Eggs', sellingprice: 15 },
    { id: 4, name: 'Garlic', description: 'Garlic', sellingprice: 10 },
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
    this.addons.set([
      ...this.addons(),
      {
        id: this.addons().length + 1,
        name: 'French Fries',
        description: 'French Fries',
        sellingprice: 12,
      },
    ]);
  }

  // Method to remove a product
  removeAddon(id: number) {
    // if ($event.target) {
    //   //this.addons.update((addons) => addons.filter((p) => p.id !== p.));
    //   const target = $event.target as HTMLElement;
    //   this.addons.update((addons) =>
    //     addons.filter((p) => p.id !== Number(target.id))
    //   );
    // }
    debugger;
    this.addons.update((addons) => addons.filter((p) => p.id !== Number(id)));
  }
}
