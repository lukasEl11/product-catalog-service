import { cacheWrapper } from '../cache/cache';
import Product, { IProduct } from '../models/product';

class ProductService {
  /**
   * Create & store product in DB
   *
   * @param {Partial<IProduct>} data
   * @return {*}  {Promise<IProduct>}
   * @memberof ProductService
   */
  async createProduct(data: Partial<IProduct>): Promise<IProduct> {
    const product = new Product(data);
    return await product.save();
  }

  /**
   * Update product and store in db
   *
   * @param {string} id
   * @param {Partial<IProduct>} data
   * @return {*}  {(Promise<IProduct | null>)}
   * @memberof ProductService
   */
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

  /**
   * Delete product
   *
   * @param {string} id
   * @return {*}  {Promise<boolean>}
   * @memberof ProductService
   */
  async deleteProduct(id: string): Promise<boolean> {
    const result = await Product.findByIdAndDelete(id);
    return result !== null;
  }

  /**
   * Get all products
   *
   * @return {*}  {Promise<IProduct[]>}
   * @memberof ProductService
   */
  async getAllProducts(): Promise<IProduct[]> {
    return await cacheWrapper<IProduct[]>(`product_list`, () =>
      Product.find({})
    );
  }

  /**
   * Get product by id
   *
   * @param {string} id
   * @return {*}  {(Promise<IProduct | null>)}
   * @memberof ProductService
   */
  async getProductById(id: string): Promise<IProduct | null> {
    return await cacheWrapper<IProduct | null>(`product:${id}`, () =>
      Product.findById(id)
    );
  }

  /**
   * Update product average rating and store
   *
   * @param {string} productId
   * @param {string} avgRating
   * @return {*}
   * @memberof ProductService
   */
  async updateProductAvgRating(
    productId: string,
    avgRating: string
  ): Promise<void> {
    const product = await Product.findById(productId);
    if (!product) return;

    product.avgRating = Number(avgRating) || product.avgRating;
    await product.save();
  }
}

export const productService = new ProductService();
