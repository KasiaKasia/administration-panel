import { Product, ProductType } from './user-products/module-product';
import { Pipe, PipeTransform } from '@angular/core';
import { PagerService } from './pager.service';

@Pipe({
  name: 'Productsfilter',
 // pure: false
})

export class FilterPipe implements PipeTransform {

  constructor() {  }

  transform(items: any[], searchProductName: string, searchProductType: string, searchProductDesc: string) {

    if (items && items.length) {

      return items.filter(item => {

        if (searchProductName && item.productName.toLowerCase().indexOf(searchProductName.toLowerCase()) === -1) {
          return false;
        }

        if (searchProductType && item.productType.indexOf(searchProductType) === -1) {
          return false;
        }

        if (searchProductDesc && item.productDesc.toLowerCase().indexOf(searchProductDesc.toLowerCase()) === -1) {
          return false;
        }

        return true;

      });
    } else {

      return items;
    }
  }

}
