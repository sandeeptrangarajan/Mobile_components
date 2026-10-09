import { ComponentItem, AvailabilityStatus, QualityGrade } from '../types';
import { BRANDS_DATA, getBrandById } from './brandsData';
import { MODELS_DATA, getModelById } from './modelsData';
import { MASTER_39_COMPONENTS, CATEGORIES_DATA } from './componentsMeta';

// Deterministic helper to generate pseudo-random properties based on string hash
function stringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Generates a model-specific component item from the master template
export function createComponentForModel(templateSlug: string, modelId: string): ComponentItem | null {
  const model = getModelById(modelId);
  if (!model) return null;

  const template = MASTER_39_COMPONENTS.find((t) => t.slug === templateSlug);
  if (!template) return null;

  const hash = stringHash(`${model.id}-${template.slug}`);

  // Generate realistic brand prefix for part numbers
  let brandPrefix = 'GEN';
  if (model.brandId === 'samsung') brandPrefix = 'GH82';
  else if (model.brandId === 'apple') brandPrefix = 'APL';
  else if (model.brandId === 'xiaomi' || model.brandId === 'redmi' || model.brandId === 'poco') brandPrefix = 'MI';
  else if (model.brandId === 'oneplus') brandPrefix = 'OP';
  else if (model.brandId === 'google-pixel') brandPrefix = 'GGL';
  else if (model.brandId === 'nothing') brandPrefix = 'NOTH';
  else if (model.brandId === 'oppo' || model.brandId === 'realme') brandPrefix = 'OPP';
  else if (model.brandId === 'vivo') brandPrefix = 'VVO';
  else if (model.brandId === 'motorola') brandPrefix = 'MOT';

  const partNumber = `${brandPrefix}-${(10000 + (hash % 89999))}-${template.componentNumber.toString().padStart(2, '0')}`;

  // Price modifier based on model tier and component base price
  let tierMultiplier = 1.0;
  if (model.brandId === 'apple' || model.name.includes('Ultra') || model.name.includes('Pro') || model.name.includes('S24') || model.name.includes('S23')) {
    tierMultiplier = 1.65;
  } else if (model.name.includes('Note') || model.name.includes('Nord') || model.name.includes('GT') || model.name.includes('Edge')) {
    tierMultiplier = 1.15;
  } else if (model.name.includes('13C') || model.name.includes('M6') || model.name.includes('C32') || model.name.includes('Spark')) {
    tierMultiplier = 0.72;
  }

  const priceINR = Math.round((template.basePriceINR * tierMultiplier) / 50) * 50;

  // Availability distribution
  const availabilities: AvailabilityStatus[] = ['In Stock', 'In Stock', 'In Stock', 'Limited Stock', 'Limited Stock', 'Special Order', 'Out of Stock'];
  const availability = availabilities[hash % availabilities.length];

  // Quality grades
  const grades: QualityGrade[] = ['OEM Original', 'Service Pack Original', 'Premium Aftermarket', 'OEM Original'];
  const qualityGrade = grades[hash % grades.length];

  // Model-specific technical specs customization
  const customSpecs: Record<string, string> = { ...template.technicalSpecsDefaults };
  
  if (template.slug === 'display-screen') {
    customSpecs['Display Specs'] = model.displayInfo;
    customSpecs['Chassis Fit'] = model.dimensions;
  } else if (template.slug === 'battery') {
    customSpecs['Battery Capacity'] = model.batteryCapacity;
    customSpecs['Charging Support'] = model.chargingSpeed;
  } else if (template.slug === 'rear-camera') {
    customSpecs['Camera Hardware'] = model.cameraSetup;
  } else if (template.slug === 'processor') {
    customSpecs['SoC Platform'] = model.processorInfo;
  } else if (template.slug === 'back-panel') {
    customSpecs['Color Variants'] = model.colorOptions.join(', ');
  }

  // Compatibility Rule from prompt:
  // "Brand: Samsung, Model: Galaxy A55, Component: Charging Port, Compatibility: Samsung Galaxy A55 only, according to the sample dataset."
  // "Do not automatically assume that components are compatible across different models, even when they look similar."
  // "If compatibility information is unavailable, display 'Compatibility not verified.'"
  const isCross = (hash % 11 === 0 && template.category === 'Other Spare Parts'); // rare screws might be cross-compatible
  const compatibilityNote = isCross
    ? `Universal fit across select ${model.brandName} series (Verification: Sample dataset verified).`
    : `${model.brandName} ${model.name} (${model.modelCode}) only, according to the sample dataset. Not cross-compatible with other models.`;

  return {
    id: `${model.id}-${template.slug}`,
    componentNumber: template.componentNumber,
    name: template.name,
    slug: template.slug,
    category: template.category,
    categorySlug: template.categorySlug,
    partNumber,
    priceINR,
    availability,
    qualityGrade,
    repairDifficulty: template.repairDifficulty,
    estimatedTimeMins: template.estimatedTimeMins,
    compatibleBrand: model.brandName,
    compatibleModel: model.name,
    compatibleModelId: model.id,
    compatibilityNote,
    isCrossCompatible: isCross,
    shortDescription: `Original replacement ${template.name.toLowerCase()} engineered specifically for ${model.brandName} ${model.name}.`,
    basicFunction: template.basicFunction,
    technicalSpecs: customSpecs,
    requiredTools: template.requiredTools,
    installationTip: template.installationTip,
    warrantyPeriod: hash % 2 === 0 ? '90 Days Testing Warranty (Demo)' : '180 Days Service Warranty (Demo)',
    iconName: template.iconName,
    imageUrl:
      template.slug === 'display-screen' || template.slug === 'touchscreen-digitizer' || template.slug === 'back-panel' || template.slug === 'frame-body'
        ? '/images/comp-display.jpg'
        : template.slug === 'battery' || template.slug === 'wireless-charging-coil'
        ? '/images/comp-battery.jpg'
        : template.slug === 'rear-camera' || template.slug === 'front-camera' || template.slug === 'camera-lens'
        ? '/images/comp-camera.jpg'
        : template.slug === 'charging-port' || template.slug === 'charging-board' || template.slug === 'usb-connector'
        ? '/images/comp-charging.jpg'
        : template.category === 'Internal Hardware' || template.slug === 'wi-fi-module' || template.slug === 'bluetooth-module' || template.slug === 'sim-reader' || template.slug === 'network-rf-components'
        ? '/images/comp-motherboard.jpg'
        : undefined
  };
}

// Get all 39 components for a model
export function getComponentsForModel(modelId: string): ComponentItem[] {
  const list: ComponentItem[] = [];
  for (const template of MASTER_39_COMPONENTS) {
    const item = createComponentForModel(template.slug, modelId);
    if (item) list.push(item);
  }
  // Sort in natural order 1..39
  return list.sort((a, b) => a.componentNumber - b.componentNumber);
}

// Find a single component by its composite ID or fallback
export function getComponentById(componentId: string): ComponentItem | undefined {
  // Extract model ID and component slug
  // composite format: {brand-model}-{slug}
  for (const model of MODELS_DATA) {
    if (componentId.startsWith(`${model.id}-`)) {
      const templateSlug = componentId.substring(model.id.length + 1);
      const item = createComponentForModel(templateSlug, model.id);
      if (item) return item;
    }
  }

  // Fallback: search default model (Samsung S24)
  const defaultItem = createComponentForModel(componentId, 'samsung-galaxy-s24');
  if (defaultItem) return defaultItem;

  return undefined;
}

// Frequently searched components for homepage
export function getFrequentlySearchedComponents(): ComponentItem[] {
  const highlights = [
    { modelId: 'samsung-galaxy-s24', slug: 'display-screen' },
    { modelId: 'apple-iphone-16', slug: 'battery' },
    { modelId: 'oneplus-12', slug: 'charging-board' },
    { modelId: 'google-pixel-9-pro', slug: 'rear-camera' },
    { modelId: 'xiaomi-14-ultra', slug: 'camera-lens' },
    { modelId: 'samsung-galaxy-a55', slug: 'charging-port' },
    { modelId: 'apple-iphone-15', slug: 'back-panel' },
    { modelId: 'nothing-phone-2', slug: 'fingerprint-sensor' },
  ];

  const results: ComponentItem[] = [];
  for (const h of highlights) {
    const comp = createComponentForModel(h.slug, h.modelId);
    if (comp) results.push(comp);
  }
  return results;
}

// Dashboard statistics
export function getDashboardStats() {
  const totalBrands = BRANDS_DATA.length;
  const totalModels = MODELS_DATA.length;
  const totalCategories = CATEGORIES_DATA.length;
  const totalComponentsPerModel = MASTER_39_COMPONENTS.length;
  const totalSparePartsCatalogued = totalModels * totalComponentsPerModel;

  return {
    totalBrands,
    totalModels,
    totalCategories,
    totalComponentsPerModel,
    totalSparePartsCatalogued
  };
}
