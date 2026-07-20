import { ProductModel } from '../models/ProductModel.js';

export class ProductService {
  static async getAllProducts() {
    return await ProductModel.getAll();
  }

  static async getProductById(id) {
    return await ProductModel.getById(id);
  }

  static async createProduct(productData) {
    if (!productData.name) {
      throw new Error("Product must have a name.");
    }
    return await ProductModel.create(productData);
  }

  static async updateProduct(id, productData) {
    return await ProductModel.update(id, productData);
  }

  static async deleteProduct(id) {
    return await ProductModel.delete(id);
  }
}
