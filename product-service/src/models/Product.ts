import mongoose, { Document, Schema } from 'mongoose';
import { invalideCache } from '../cache/cache';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
}

const productSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

productSchema.post('save', (product: IProduct, next) => {
  invalideCache(`product:${product.id}`);
  invalideCache(`product_list`);
  next();
});

productSchema.post('findOneAndDelete', (product: IProduct, next) => {
  invalideCache(`product:${product.id}`);
  invalideCache(`product_list`);
  next();
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
