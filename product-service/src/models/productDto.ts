import { IProduct } from './product';

class ProductDto implements Partial<IProduct> {
  id: string;
  name: string;
  description: string;
  price: number;

  constructor(product: IProduct) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
  }
}

export default ProductDto;