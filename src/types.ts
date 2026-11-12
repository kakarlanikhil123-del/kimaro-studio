export interface ProductFinish {
  id: string;
  name: string;
  hex: string;
  priceDelta: number;
  description: string;
}

export interface LensOption {
  id: string;
  name: string;
  fov: string;
  priceDelta: number;
  isDefault?: boolean;
}

export interface MountOption {
  id: string;
  name: string;
  priceDelta: number;
  isDefault?: boolean;
}

export interface AddonItem {
  id: string;
  name: string;
  price: number;
}

export interface ProductConfig {
  finish: ProductFinish;
  lens: LensOption;
  mount: MountOption;
  engraving: string;
  selectedAddons: AddonItem[];
}

export interface OrderItem {
  id: string;
  createdAt: string;
  isPreorder?: boolean;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
  };
  product: {
    model: string;
    finish: string;
    lens: string;
    mount: string;
    engraving: string | null;
  };
  addons: AddonItem[];
  paymentMethod: string;
  total: number;
  status: string;
  estimatedDelivery: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  likes: number;
}
