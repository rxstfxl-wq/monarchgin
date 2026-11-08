import { Product, CurrencyConfig } from '../types';

export const CURRENCIES: Record<string, CurrencyConfig> = {
  ZAR: {
    code: 'ZAR',
    symbol: 'R ',
    rate: 1,
    label: 'ZAR (R)',
  },
  USD: {
    code: 'USD',
    symbol: '$',
    rate: 0.055,
    label: 'USD ($)',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rate: 0.043,
    label: 'GBP (£)',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rate: 0.051,
    label: 'EUR (€)',
  },
};

export const PRODUCTS: Product[] = [
  {
    id: 'cactus-gin',
    number: '001',
    name: 'CACTUS GIN',
    expression: 'Classic West-Coast Botanicals',
    subtitle: 'Classic West-Coast Botanicals',
    priceZAR: 680,
    bottleSize: '750ml',
    abv: '43.0% Vol.',
    accentColor: 'desert-clay',
    accentHex: '#AD6230',
    image: '/assets/brand/cactus-gin.webp',
    modelUrl: '/Media/bottle.fbx',
    description:
      'A dry, aromatic gin distilled with sun-cured Kalahari prickly pear, wild coastal juniper, rooibos and zesty desert botanicals. Crafted with deep mineral clarity and vibrant succulents.',
    story:
      'Inspired by the resilient flora of the West Coast desert and arid plains. In an environment shaped by intense sun and ocean fog, succulents store vitality and transform harsh light into delicate sweetness.',
    botanicals: [
      { name: 'Kalahari Prickly Pear', note: 'Honeyed desert nectar & subtle herbaceous melon', origin: 'Kalahari Basin' },
      { name: 'Wild Coastal Juniper', note: 'Crisp pine and balsamic resin', origin: 'Western Cape Ridge' },
      { name: 'Red Rooibos', note: 'Earthy wood, gentle tannins and warm amber depth', origin: 'Cederberg' },
      { name: 'Sun-Dried Citrus Peel', note: 'Zesty orange rind and candied bergamot', origin: 'Citrusdal Valley' },
      { name: 'Cracked Coriander', note: 'Warm pepper, ginger sparks and lemon coriander', origin: 'Coastal Plain' },
      { name: 'Angelica Root', note: 'Musky, grounding earthiness anchoring the botanical oils', origin: 'Cape Fynbos' },
    ],
    tastingNotes: {
      nose: 'Bright succulent freshness, crisp crushed juniper needles, sun-warmed citrus oils, and a delicate honeyed desert blossom aroma.',
      palate: 'Silky and medium-bodied with an immediate wave of green agave sweetness, savory pine, and subtle dry rooibos spice.',
      finish: 'Long, dry, and mineral. Lingering grapefruit pith, faint cracked pepper, and the crisp clarity of desert rain on warm stone.',
    },
    servingSuggestion: {
      glass: 'Heavy-bottom lowball or stemmed balloon glass',
      garnish: 'Dehydrated blood orange wheel & a bruised sprig of desert rosemary',
      ritual: 'Pour 50ml over a single carved block of crystal ice. Allow to rest for sixty seconds before topping with premium dry Indian tonic.',
      perfectServe: 'The West-Coast Sundowner: 50ml Cactus Gin, 150ml Mediterranean Tonic, twist of charred grapefruit, crystal ice.',
    },
    details: {
      origin: 'West Coast, South Africa',
      distillation: 'Copper pot single-batch distillation with vapor basket infusion',
      batchSize: 'Small batch · 600 bottles per run',
      temperature: 'Serve lightly chilled at 12°C–14°C',
    },
  },
  {
    id: 'lavender-mint',
    number: '002',
    name: 'LAVENDER & MINT',
    expression: 'Floral & Herbal Expression',
    subtitle: 'Floral & Herbal Expression',
    priceZAR: 680,
    bottleSize: '750ml',
    abv: '43.0% Vol.',
    accentColor: 'dried-rose',
    accentHex: '#794338',
    image: '/assets/brand/lavender-gin.webp',
    description:
      'An ethereal, floral botanical spirit combining estate-grown Highveld French lavender with indigenous wild spearmint, cooling peppermint leaves, and delicate aromatic spice.',
    story:
      'Created to capture the cooling twilight after a scorching African afternoon. As the evening sea breeze sweeps over the hills, botanical fields release their most delicate aromatic volatiles.',
    botanicals: [
      { name: 'Highveld Lavender', note: 'Fragrant purple floral blossoms, sweet and non-soapy', origin: 'Drakensberg Escarpment' },
      { name: 'Wild Indigenous Spearmint', note: 'Cooling mountain mint, sweet herbal brightness', origin: 'Cape Mountain Catchments' },
      { name: 'Peppermint Leaf', note: 'Crisp menthol snap and botanical freshness', origin: 'Western Cape Foothills' },
      { name: 'Orris Root', note: 'Violet-like elegance and natural aromatic stabilizer', origin: 'Heritage Botanical Garden' },
      { name: 'Green Cardamom', note: 'Resinous, exotic herbal warmth and sweet spice', origin: 'Estate Greenhouse' },
      { name: 'Wild Bergamot', note: 'Subtle Earl Grey tea nuances and bitter citrus peel', origin: 'Cape Mist Belt' },
    ],
    tastingNotes: {
      nose: 'Delicate floral perfume reminiscent of a sun-drenched herbal garden, accompanied by gentle spearmint freshness and crushed lavender petals.',
      palate: 'Velvety and exceptionally smooth. The floral notes are soft and sophisticated, balanced by a crystalline burst of cooling mint and sweet citrus.',
      finish: 'Clean, cooling, and exceptionally refreshing. A lingering whisper of violet, cardamon warmth, and fresh mountain stream water.',
    },
    servingSuggestion: {
      glass: 'Stemmed crystal copa or delicate highball',
      garnish: 'Freshly slapped spearmint leaf & a dried lavender sprig',
      ritual: 'Gently slap a sprig of fresh mint against the palm of your hand to awaken the essential oils. Swirl 50ml gin with ice and Elderflower tonic.',
      perfectServe: 'The Twilight Highball: 50ml Lavender & Mint Gin, 120ml Elderflower Tonic, dash of lime juice, fresh mint sprig.',
    },
    details: {
      origin: 'Western Cape Foothills, South Africa',
      distillation: 'Dual maceration and low-temperature vacuum extraction for delicate floras',
      batchSize: 'Small batch · 600 bottles per run',
      temperature: 'Serve chilled at 8°C–10°C',
    },
  },
];
