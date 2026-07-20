export interface Product {
  id: string;
  name: string;
  price: string;
  tag?: string;
  description?: string;
  imageUrl?: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
}

export interface CraftStep {
  title: string;
  description: string;
  imageUrl: string;
}

export interface CraftData {
  title: string;
  subtitle: string;
  steps: CraftStep[];
}

export interface Influencer {
  name: string;
  videoUrl: string;
}

export interface CommunityData {
  title: string;
  subtitle: string;
  influencers: Influencer[];
}
