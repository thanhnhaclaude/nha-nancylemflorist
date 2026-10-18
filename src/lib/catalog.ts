export type CollectionSlug = "love-romance" | "birthday" | "thank-you" | "sympathy" | "signature" | "plants";

export type Collection = {
  slug: CollectionSlug;
  name: string;
  kicker: string;
  intro: string;
  image: string;
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  imageAlt: string;
  collections: CollectionSlug[];
  short: string;
  description: string;
  stems: string[];
  palette: string;
  /** Plants and dried pieces come in one size */
  singleSize?: boolean;
  badge?: string;
};

export const collections: Collection[] = [
  {
    slug: "love-romance",
    name: "Love & Romance",
    kicker: "Say it without saying it",
    intro: "Velvet roses, garden peonies and blush-toned bouquets for anniversaries, first dates and every ordinary day worth celebrating.",
    image: "/images/heart-of-flowers.jpg",
  },
  {
    slug: "birthday",
    name: "Birthday",
    kicker: "Another trip around the sun",
    intro: "Loud color, big personality. Bouquets that walk into the room before the birthday person does.",
    image: "/images/sunflower-hydrangea.jpg",
  },
  {
    slug: "thank-you",
    name: "Thank You & Just Because",
    kicker: "Small gestures, big feelings",
    intro: "Easygoing, market-fresh flowers for thank-yous, get-wells, new homes and no reason at all.",
    image: "/images/meadow-on-wood.jpg",
  },
  {
    slug: "sympathy",
    name: "Sympathy",
    kicker: "With deepest care",
    intro: "Quiet whites and soft neutrals, arranged with restraint and delivered with discretion to homes and services.",
    image: "/images/white-poppies.jpg",
  },
  {
    slug: "signature",
    name: "Signature Collection",
    kicker: "The studio's finest",
    intro: "Our most ambitious designs: rare stems, generous proportions and the kind of composition people photograph.",
    image: "/images/hero-moody-bouquet.jpg",
  },
  {
    slug: "plants",
    name: "Plants",
    kicker: "Green that stays",
    intro: "Easy-care potted plants in ceramic planters — a living gift that outlasts the moment.",
    image: "/images/fiddle-leaf-fig.jpg",
  },
];

export const products: Product[] = [
  {
    slug: "midnight-garden",
    name: "The Midnight Garden",
    price: 165,
    image: "/images/hero-moody-bouquet.jpg",
    imageAlt: "Dark, moody bouquet of red ranunculus, protea, anemones and garden roses",
    collections: ["signature", "love-romance"],
    short: "Protea, ranunculus and anemone in deep jewel tones.",
    description:
      "Our studio's signature. A dramatic, garden-style composition of king protea, crimson ranunculus, purple anemones and spray roses, finished with dark foliage and hand-tied in a loose, editorial silhouette.",
    stems: ["King protea", "Ranunculus", "Anemone", "Spray roses", "Seasonal foliage"],
    palette: "Crimson · plum · coral",
    badge: "Best seller",
  },
  {
    slug: "two-dozen-red-roses",
    name: "Two Dozen Red Roses",
    price: 145,
    image: "/images/red-roses-texture.jpg",
    imageAlt: "A dense arrangement of deep red roses",
    collections: ["love-romance"],
    short: "24 long-stem premium red roses. The classic, done properly.",
    description:
      "Twenty-four long-stem red roses with large, velvety heads, conditioned for 24 hours before design so they open fully and last. Wrapped in our signature paper or arranged in a clear glass vase.",
    stems: ["24 premium red roses", "Eucalyptus"],
    palette: "True red",
    badge: "Valentine's favorite",
  },
  {
    slug: "peony-season",
    name: "Peony Season",
    price: 185,
    image: "/images/pink-peonies.jpg",
    imageAlt: "Lush pink peonies in full bloom",
    collections: ["signature", "love-romance"],
    short: "Fluffy, fragrant pink peonies at their absolute peak.",
    description:
      "An abundant armful of pink peonies and peony-style garden roses. When peonies are out of season we substitute the most comparable garden roses and let you know before delivery.",
    stems: ["Peonies or garden roses", "Spray roses", "Seasonal greenery"],
    palette: "Blush · candy pink",
  },
  {
    slug: "first-blush",
    name: "First Blush",
    price: 95,
    image: "/images/pink-rose-wrapped.jpg",
    imageAlt: "Hand-wrapped bouquet of pink and white roses with waxflower",
    collections: ["love-romance", "birthday"],
    short: "Pink roses, carnations and waxflower in a hand-wrapped bouquet.",
    description:
      "Sweet without being saccharine. Soft pink roses, ruffled carnations and waxflower, hand-wrapped in white paper and tied with silk ribbon.",
    stems: ["Pink roses", "Carnations", "Waxflower", "Pittosporum"],
    palette: "Pink · ivory",
  },
  {
    slug: "coral-crush",
    name: "Coral Crush",
    price: 110,
    image: "/images/coral-roses-vase.jpg",
    imageAlt: "Coral and peach roses with spray roses in a glass vase",
    collections: ["birthday", "thank-you"],
    short: "Coral roses and spray roses with a little wild greenery.",
    description:
      "A warm, cheerful vase of coral and peach roses, spray roses and wispy accents. Arrives arranged in a clear glass vase, ready to set on the table.",
    stems: ["Coral roses", "Spray roses", "Wax flower", "Seasonal accents"],
    palette: "Coral · peach · apricot",
  },
  {
    slug: "golden-hour",
    name: "Golden Hour",
    price: 98,
    image: "/images/sunset-vase.jpg",
    imageAlt: "Orange roses, snapdragons and thistle in a glass vase",
    collections: ["birthday", "thank-you"],
    short: "Orange roses, snapdragons and thistle in sunset shades.",
    description:
      "Bottled sunset. Tangerine roses and tall snapdragons with a pop of blue thistle, arranged loose and airy in a clear glass vase.",
    stems: ["Orange roses", "Snapdragons", "Thistle", "Tulips (seasonal)"],
    palette: "Tangerine · red · steel blue",
  },
  {
    slug: "sunny-disposition",
    name: "Sunny Disposition",
    price: 125,
    image: "/images/sunflower-hydrangea.jpg",
    imageAlt: "Vibrant arrangement of sunflowers, hydrangea and orange roses",
    collections: ["birthday", "thank-you"],
    short: "Sunflowers, hydrangea and roses. Pure, unapologetic joy.",
    description:
      "A big, generous, color-everywhere arrangement of sunflowers, pink hydrangea, orange roses and green bells — the bouquet equivalent of a party.",
    stems: ["Sunflowers", "Hydrangea", "Orange roses", "Bells of Ireland"],
    palette: "Sunflower · pink · orange",
    badge: "New",
  },
  {
    slug: "tulip-fever",
    name: "Tulip Fever",
    price: 79,
    image: "/images/tulip-vase.jpg",
    imageAlt: "Double pink tulips in a glass vase with twine",
    collections: ["thank-you", "birthday"],
    short: "Fifteen double tulips, simply arranged.",
    description:
      "Fifteen double-petal tulips gathered in a clear vase with natural twine. Tulips keep growing after they're cut — expect them to stretch, bend and dance.",
    stems: ["15 double tulips"],
    palette: "Fuchsia · white",
  },
  {
    slug: "meadow-market",
    name: "Meadow Market",
    price: 89,
    image: "/images/meadow-on-wood.jpg",
    imageAlt: "Colorful mixed wildflower bouquet with sunflower, alstroemeria and ageratum",
    collections: ["thank-you", "birthday"],
    short: "A just-picked mix of the market's brightest stems.",
    description:
      "Our designer's pick of the day's most colorful market stems — think sunflower, alstroemeria, ageratum, chamomile and solidago. Every one is a little different.",
    stems: ["Sunflower", "Alstroemeria", "Ageratum", "Chamomile", "Solidago"],
    palette: "Rainbow",
  },
  {
    slug: "peach-ribbon",
    name: "Peach Ribbon",
    price: 105,
    image: "/images/peach-ribbon-jar.jpg",
    imageAlt: "Peach garden roses and eucalyptus wrapped with a silk ribbon",
    collections: ["thank-you", "love-romance"],
    short: "Peach garden roses with eucalyptus and a silk bow.",
    description:
      "Soft peach garden roses, white spray roses and silver-dollar eucalyptus, wrapped in kraft and finished with a hand-tied silk ribbon.",
    stems: ["Garden roses", "Spray roses", "Eucalyptus"],
    palette: "Peach · ivory · sage",
  },
  {
    slug: "garden-party",
    name: "Garden Party",
    price: 135,
    image: "/images/garden-roses-cube.jpg",
    imageAlt: "Garden roses in pink, cream and yellow in a square glass vase",
    collections: ["signature", "birthday"],
    short: "Fragrant garden roses in a modern glass cube.",
    description:
      "Big-headed, fragrant garden roses in cream, pink and butter yellow, arranged low and lush in a square glass cube — made for the dinner table.",
    stems: ["Garden roses", "Spray roses"],
    palette: "Cream · pink · butter",
  },
  {
    slug: "lush-atelier",
    name: "Lush Atelier",
    price: 225,
    image: "/images/lush-garden-bouquet.jpg",
    imageAlt: "Large luxurious bouquet of garden roses, scabiosa, astilbe and berries",
    collections: ["signature"],
    short: "Our largest hand-tied design. Rare stems, generous scale.",
    description:
      "The bouquet we make when a client says “spare no expense.” Garden roses, scabiosa, astilbe, hypericum berries and textural seed pods, composed with a florist's eye for movement.",
    stems: ["Garden roses", "Scabiosa", "Astilbe", "Hypericum", "Seed pods"],
    palette: "Blush · lilac · burgundy",
    badge: "Studio pick",
  },
  {
    slug: "pastel-field",
    name: "Pastel Field",
    price: 115,
    image: "/images/pastel-wildflowers.jpg",
    imageAlt: "Pastel bouquet of snapdragons, scabiosa and daisies",
    collections: ["birthday", "thank-you"],
    short: "Lilac, blush and white in an airy, wild silhouette.",
    description:
      "Tall snapdragons, scabiosa, daisies and lisianthus in a soft pastel palette, arranged airy and wild like a cottage garden in June.",
    stems: ["Snapdragons", "Scabiosa", "Daisies", "Lisianthus"],
    palette: "Lilac · blush · white",
  },
  {
    slug: "hand-tied-wildflowers",
    name: "Hand-Tied Wildflowers",
    price: 72,
    image: "/images/hand-held-wildflowers.jpg",
    imageAlt: "Kraft-wrapped wildflower bouquet with a sunflower held in hand",
    collections: ["thank-you", "birthday"],
    short: "A cheerful kraft-wrapped bunch. Our most giftable price.",
    description:
      "A casual, kraft-wrapped bundle of sunflower, olive branch and seasonal wildflowers. Perfect for a thank-you, a new neighbor or a Tuesday.",
    stems: ["Sunflower", "Olive branch", "Seasonal wildflowers"],
    palette: "Golden · green",
  },
  {
    slug: "sun-kissed",
    name: "Sun Kissed",
    price: 82,
    image: "/images/sunflowers-close.jpg",
    imageAlt: "A big bunch of bright yellow sunflowers",
    collections: ["birthday"],
    short: "Ten big, bright sunflowers. Instant mood lift.",
    description:
      "Ten oversized sunflowers with their own leaves, wrapped simply so the flowers do the talking.",
    stems: ["10 sunflowers"],
    palette: "Yellow",
  },
  {
    slug: "everlasting-blush",
    name: "Everlasting Blush",
    price: 75,
    image: "/images/dried-peach-bouquet.jpg",
    imageAlt: "Dried flower bouquet in peach paper with a ribbon",
    collections: ["thank-you", "love-romance"],
    short: "A dried bouquet that keeps its charm for months.",
    description:
      "Preserved and dried stems — bunny tails, strawflower, limonium and pampas — wrapped in peach paper. No water, no wilting; it looks this good for a year or more.",
    stems: ["Bunny tails", "Strawflower", "Limonium", "Pampas"],
    palette: "Peach · sand",
    singleSize: true,
  },
  {
    slug: "pure-grace",
    name: "Pure Grace",
    price: 120,
    image: "/images/white-kraft-bouquet.jpg",
    imageAlt: "White roses, hydrangea and greenery wrapped in kraft paper",
    collections: ["sympathy"],
    short: "White roses and hydrangea for the home of the bereaved.",
    description:
      "A calm, all-white bouquet of roses, hydrangea, lisianthus and soft greenery. Delivered to homes with a handwritten card. We'll gladly add a vase at no charge for sympathy orders delivered to a residence.",
    stems: ["White roses", "Hydrangea", "Lisianthus", "Greenery"],
    palette: "White · green",
  },
  {
    slug: "quiet-poppies",
    name: "Quiet Poppies",
    price: 85,
    image: "/images/white-poppies.jpg",
    imageAlt: "White Iceland poppies in an amber glass vase",
    collections: ["sympathy", "thank-you"],
    short: "Delicate white poppies in an amber bud vase.",
    description:
      "A minimal arrangement of white Iceland poppies in an amber glass vase. Gentle and understated — a small light on a hard day.",
    stems: ["Iceland poppies"],
    palette: "White · amber",
  },
  {
    slug: "soft-remembrance",
    name: "Soft Remembrance",
    price: 150,
    image: "/images/peach-white-blooms.jpg",
    imageAlt: "Peach and white stock flowers, roses and chamomile",
    collections: ["sympathy"],
    short: "Peach and ivory stock, roses and chamomile for services.",
    description:
      "A generous arrangement of peach and ivory stock, roses and chamomile, suitable for funeral services, memorials and celebration-of-life gatherings. We coordinate delivery timing with the venue.",
    stems: ["Stock", "Roses", "Chamomile", "Greenery"],
    palette: "Peach · ivory",
  },
  {
    slug: "fiddle-leaf-fig",
    name: "Fiddle Leaf Fig",
    price: 95,
    image: "/images/fiddle-leaf-fig.jpg",
    imageAlt: "Young fiddle leaf fig tree against a white wall",
    collections: ["plants"],
    short: "A sculptural indoor tree, about 3 ft tall.",
    description:
      "A young fiddle leaf fig, roughly three feet tall, potted in a neutral ceramic planter with a care card. Loves bright, indirect light.",
    stems: ["Ficus lyrata", "Ceramic planter", "Care card"],
    palette: "Green",
    singleSize: true,
  },
  {
    slug: "anthurium-red",
    name: "Anthurium Red",
    price: 68,
    image: "/images/anthurium.jpg",
    imageAlt: "Glossy red anthurium flowers and leaves",
    collections: ["plants", "love-romance"],
    short: "Glossy red blooms that keep flowering for months.",
    description:
      "A flowering anthurium with glossy heart-shaped red blooms, potted in a ceramic planter. One of the longest-lasting flowering houseplants.",
    stems: ["Anthurium andraeanum", "Ceramic planter", "Care card"],
    palette: "Red · green",
    singleSize: true,
  },
  {
    slug: "desk-succulent",
    name: "Desk Succulent",
    price: 42,
    image: "/images/succulent-pot.jpg",
    imageAlt: "Haworthia succulent in a mint-green pot",
    collections: ["plants", "thank-you"],
    short: "A nearly unkillable haworthia in a mint pot.",
    description:
      "A striped haworthia succulent in a matte mint pot. Needs water about every two weeks. The perfect office thank-you.",
    stems: ["Haworthia", "Ceramic pot"],
    palette: "Mint · green",
    singleSize: true,
  },
];

export const sizes = [
  { id: "classic", label: "Classic", add: 0, note: "As pictured" },
  { id: "deluxe", label: "Deluxe", add: 35, note: "About 30% more stems" },
  { id: "grand", label: "Grand", add: 75, note: "About 60% more stems" },
] as const;

export const addOns = [
  { id: "vase", label: "Hand-blown glass vase", price: 25 },
  { id: "chocolates", label: "Artisan chocolate box", price: 18 },
  { id: "candle", label: "Fig & cedar soy candle", price: 32 },
  { id: "balloon", label: "Mylar balloon", price: 12 },
] as const;

export const DELIVERY_FEE = 15.99;
export const FREE_DELIVERY_OVER = 150;

export type SizeId = (typeof sizes)[number]["id"];
export type AddOnId = (typeof addOns)[number]["id"];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function productsIn(slug: CollectionSlug) {
  return products.filter((p) => p.collections.includes(slug));
}

export function quote(product: Product, sizeId: SizeId, addOnIds: AddOnId[]) {
  const size = product.singleSize ? sizes[0] : sizes.find((s) => s.id === sizeId) ?? sizes[0];
  const item = product.price + size.add;
  const extras = addOns.filter((a) => addOnIds.includes(a.id)).reduce((sum, a) => sum + a.price, 0);
  const subtotal = item + extras;
  const delivery = subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  return { size, item, extras, subtotal, delivery, total: Math.round((subtotal + delivery) * 100) / 100 };
}

export type CartLine = { slug: string; size: string; addOns: string[]; qty: number };

/** Price a whole cart from the catalog. Unknown products are dropped. */
export function priceCart(lines: CartLine[]) {
  const items = lines.flatMap((line) => {
    const product = getProduct(line.slug);
    if (!product) return [];
    const q = quote(product, line.size as SizeId, line.addOns as AddOnId[]);
    const unit = q.item + q.extras;
    return [
      {
        ...line,
        product,
        size: product.singleSize ? "classic" : q.size.id,
        sizeLabel: product.singleSize ? "" : q.size.label,
        addOnLabels: addOns.filter((a) => line.addOns.includes(a.id)).map((a) => a.label),
        unit,
        lineTotal: unit * line.qty,
      },
    ];
  });
  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  return { items, subtotal, delivery, total: Math.round((subtotal + delivery) * 100) / 100 };
}

export const usd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: n % 1 ? 2 : 0 }).format(n);
