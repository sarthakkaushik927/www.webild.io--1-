import { realtimeRequest } from '../utils/realtimeDatabase.js';

const defaultCommunity = {
  title: 'Loved By Snack Enthusiasts Everywhere',
  subtitle: 'Health-conscious foodies trust Kruxnut for their daily crunch.',
  influencers: [],
};

export class CommunityModel {
  static async get() {
    const community = await realtimeRequest('community');
    return community ? { ...defaultCommunity, ...community } : defaultCommunity;
  }

  static async update(data) {
    return data;
  }
}
