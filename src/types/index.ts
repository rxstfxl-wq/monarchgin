export type CurrencyCode = 'ZAR' | 'USD' | 'GBP' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to ZAR = 1
  label: string;
}

export interface BotanicalIngredient {
  name: string;
  note: string;
  origin?: string;
}

export interface Product {
  id: string;
  number: string;
  name: string;
  expression: string;
  subtitle: string;
  priceZAR: number;
  bottleSize: string;
  abv: string;
  accentColor: string;
  accentHex: string;
  image: string;
  modelUrl?: string;
  description: string;
  story: string;
  botanicals: BotanicalIngredient[];
  tastingNotes: {
    nose: string;
    palate: string;
    finish: string;
  };
  servingSuggestion: {
    glass: string;
    garnish: string;
    ritual: string;
    perfectServe: string;
  };
  details: {
    origin: string;
    distillation: string;
    batchSize: string;
    temperature: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PageId = 'home' | 'about' | 'shop' | 'contact';

export interface ContactSubmission {
  name: string;
  email: string;
  category: 'general' | 'stockists' | 'trade' | 'collaborations';
  subject: string;
  message: string;
}
