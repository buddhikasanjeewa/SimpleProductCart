import { Component, Input, input, OnInit } from '@angular/core';
import { Product } from '../Model/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './addons.component.html',
  styleUrl: './addons.component.css',
})
export class AddonsComponent implements OnInit {
  ngOnInit(): void {}
  @Input() addon?: Product;
}
