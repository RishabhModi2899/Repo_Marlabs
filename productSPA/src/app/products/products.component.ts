import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products = [
    { name: 'Product 1', description: 'Description of product 1', price: 100 },
    { name: 'Product 2', description: 'Description of product 2', price: 200 },
    { name: 'Product 3', description: 'Description of product 3', price: 300 },
    { name: 'Product 4', description: 'Description of product 4', price: 400 },
  ];
}
