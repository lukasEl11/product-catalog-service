import { cacheWrapper } from '../cache/cache';
import Product, { IProduct } from '../models/product';

class ProductService {
  async createProduct(data: Partial<IProduct>): Promise<IProduct> {
    const product = new Product(data);
    return await product.save();
  }

  async updateProduct(
    id: string,
    data: Partial<IProduct>
  ): Promise<IProduct | null> {
    const product = await Product.findById(id);
    if (!product) return null;

    product.name = data.name || product.name;
    product.description = data.description || product.description;
    product.price = data.price || product.price;

    return await product.save();
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await Product.findByIdAndDelete(id);
    return result !== null;
  }

  async getAllProducts(): Promise<IProduct[]> {
    return await cacheWrapper<IProduct[]>(`product_list`, () =>
      Product.find({})
    );
  }

  async getProductById(id: string): Promise<IProduct | null> {
    return await cacheWrapper<IProduct | null>(`product:${id}`, () =>
      Product.findById(id)
    );
  }
}

export const productService = new ProductService();
