import { IProduct } from './product';

class ProductDto implements Partial<IProduct> {
  id: string;
  name: string;
  description: string;
  price: number;
  avgRating: number;

  constructor(product: IProduct) {
    this.id = product._id as string;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.avgRating = product.avgRating;
  }
}

export default ProductDto;
