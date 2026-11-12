import { ProductFinish, LensOption, MountOption, AddonItem } from '../types';

export const FINISHES: ProductFinish[] = [
  {
    id: 'obsidian',
    name: 'Matte Obsidian',
    hex: '#18191d',
    priceDelta: 0,
    description: 'Understated ultra-matte basalt powder coating with anti-fingerprint ceramic seal.'
  },
  {
    id: 'titanium',
    name: 'Cosmic Titanium',
    hex: '#474952',
    priceDelta: 25,
    description: 'Micro-bead blasted aerospace grade titanium alloy with cold metallic luster.'
  },
  {
    id: 'silver',
    name: 'Anodized Silver',
    hex: '#8d929b',
    priceDelta: 15,
    description: 'Raw machined aircraft aluminum featuring diamond-cut dual chamfer borders.'
  },
  {
    id: 'bronze',
    name: 'Desert Bronze',
    hex: '#5c4d40',
    priceDelta: 30,
    description: 'Limited collector run with deep hand-burnished architectural bronze patina.'
  }
];

export const LENSES: LensOption[] = [
  {
    id: 'leica-35',
    name: 'Leica 35mm F/1.8 ASPH',
    fov: '78° Cinematic',
    priceDelta: 0,
    isDefault: true
  },
  {
    id: 'noct-50',
    name: 'Noctilux Studio 50mm F/1.4',
    fov: '46° Natural Portrait',
    priceDelta: 45,
    isDefault: false
  },
  {
    id: 'wide-24',
    name: 'Ultra Wide 24mm F/2.0',
    fov: '94° Executive Boardroom',
    priceDelta: 30,
    isDefault: false
  }
];

export const MOUNTS: MountOption[] = [
  {
    id: 'monitor',
    name: 'Magnetic Precision Monitor Perch',
    priceDelta: 0,
    isDefault: true
  },
  {
    id: 'heavy-arm',
    name: 'Kimaro Articulated Studio Desk Arm',
    priceDelta: 55,
    isDefault: false
  },
  {
    id: 'tripod-plate',
    name: 'Arca-Swiss Low Profile Desktop Stand',
    priceDelta: 35,
    isDefault: false
  }
];

export const ADDONS: AddonItem[] = [
  {
    id: 'privacy-cap',
    name: 'Magnetic Aluminum Privacy Shutter Cap',
    price: 20
  },
  {
    id: 'filter-nd',
    name: 'Magnetic Variable ND 2-5 Stop Glass Filter',
    price: 40
  },
  {
    id: 'braided-cable-3m',
    name: '3m Braided High-Speed 10Gbps USB-C Cable',
    price: 25
  }
];
