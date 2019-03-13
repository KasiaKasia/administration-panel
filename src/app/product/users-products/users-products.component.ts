import { Component, OnInit } from '@angular/core';
import { ProductType } from '../user-products/module-product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { AuthService } from '../../auth.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-users-products',
  templateUrl: './users-products.component.html',
  styleUrls: ['./users-products.component.css']
})
export class UsersProductsComponent implements OnInit {

  product_name: string;
  product_type: ProductType;
  ProductType = ProductType;
  product_desc: string;
  productsUsers: any;
  arrayUser = [];
  arrayCount = [];
  arrayColors = [];
  counter = 0;
  chart = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getUsersProducts();
    this.getRandomColor();
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  getUsersProducts() {

    this.productsService.getUsersProducts().subscribe(res => {

      this.productsUsers = res.data;
      this.arrayUser = res.data[0].name;

      for (let user of this.arrayUser) {
        this.arrayCount.push(Number(res.data[this.counter++].count));
        this.arrayColors.push(this.getRandomColor());
      }

      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.arrayUser,
          datasets: [
            {
              label: 'Ilość produktów',
              backgroundColor: this.arrayColors,
              data: this.arrayCount
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true
          }
        }
      });

    });
  }
}
