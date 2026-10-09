export type ComponentCategory =
  | 'Display and Body'
  | 'Power and Charging'
  | 'Cameras'
  | 'Audio'
  | 'Connectivity'
  | 'Sensors'
  | 'Internal Hardware'
  | 'Buttons and Connectors'
  | 'Other Spare Parts';

export type RepairDifficulty = 'Beginner' | 'Moderate' | 'Advanced' | 'Expert';

export type AvailabilityStatus = 'In Stock' | 'Limited Stock' | 'Special Order' | 'Out of Stock';

export type QualityGrade = 'OEM Original' | 'Service Pack Original' | 'Premium Aftermarket' | 'Refurbished Grade A';

export interface MobileBrand {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  headquarters: string;
  foundedYear: number;
  popular: boolean;
  totalModelsSample: number;
  accentColor: string;
  bgTint: string;
  iconName: string;
  marketShareInfo: string;
  logoUrl: string;       // Official brand logo (Wikimedia CDN)
  heroImageUrl: string;  // Flagship phone product image
}

export interface MobileModel {
  id: string;
  brandId: string;
  brandName: string;
  name: string;
  slug: string;
  releaseYear: number;
  displayInfo: string;
  processorInfo: string;
  batteryCapacity: string;
  chargingSpeed: string;
  cameraSetup: string;
  popular: boolean;
  modelCode: string;
  dimensions: string;
  colorOptions: string[];
  imageUrl?: string;
}

export interface ComponentItem {
  id: string;
  componentNumber: number;
  name: string;
  slug: string;
  category: ComponentCategory;
  categorySlug: string;
  partNumber: string;
  priceINR: number;
  availability: AvailabilityStatus;
  qualityGrade: QualityGrade;
  repairDifficulty: RepairDifficulty;
  estimatedTimeMins: number;
  compatibleBrand: string;
  compatibleModel: string;
  compatibleModelId: string;
  compatibilityNote: string;
  isCrossCompatible: boolean;
  shortDescription: string;
  basicFunction: string;
  technicalSpecs: Record<string, string>;
  requiredTools: string[];
  installationTip: string;
  warrantyPeriod: string;
  iconName: string;
  imageUrl?: string;
}

export interface CategoryInfo {
  name: ComponentCategory;
  slug: string;
  description: string;
  iconName: string;
  componentCount: number;
}
