import { realtimeRequest } from '../utils/realtimeDatabase.js';

export class CarouselModel {
  static async get() {
    const carousel = await realtimeRequest('carousel');
    return carousel || { images: [] };
  }

  static async update(data) {
    return data;
  }
}
