export interface Product {
  userid?: string;
  productName: string;
  productType: ProductType;
  productDesc?: string;
}


export enum ProductType {
  Standard = 1,
  Premium = 2,
  Enterprise = 3,
}
