export interface Product {
  id: number;
  name: string;
  price: string;
  shortDescription: string;
  shortDescription2: string;
  colors: { name: string; hex: string }[];
  images: string[];
  otherSizes: { name: string; image: string }[];
  details: string[];
  material: string;
  madeIn: string;
  ref: string;
  completeLook: { name: string; price: string; image: string }[];
  tags: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "The Twisted shirt dress",
    price: "650",
    shortDescription: "A fluid, twisted silhouette.",
    shortDescription2: "Long sleeve shirt dress.",
    colors: [{ name: "Beige", hex: "#b6af9d" }],
    images: [
      "/product-1a.png",
      "/product-1b.png",
      "/product-1c.png",
      "/product-1d.png",
    ],
    otherSizes: [{ name: "The Twisted shirt dress", image: "/product-1a.png" }],
    details: [
      "Long sleeve shirt dress",
      "Twisted front detail",
      "Button closure",
      "Length: 120cm",
    ],
    material: "100% Viscose",
    madeIn: "Made in Portugal",
    ref: "Ref. DRS001",
    completeLook: [
      {
        name: "The Aurelia Pearl Bangle",
        price: "1900",
        image: "/product-13a.png",
      },
      {
        name: "The Nerida Starfish Necklace",
        price: "2000",
        image: "/product-13b.png",
      },
      {
        name: "Valentio Garavani Signature 80 Slingback Leather Heels",
        price: "420",
        image: "/product-13c.png",
      },
      { name: "Silver Horizon Mesh", price: "700", image: "/product-13d.png" },
    ],
    tags: ["Ready-to-wear", "Dresses", "New In", "Women"],
  },
  {
    id: 2,
    name: "The Valerie bag",
    price: "890",
    shortDescription: "The iconic Jacquemus bag.",
    shortDescription2: "Structured leather handbag.",
    colors: [
      { name: "Green", hex: "#a8c5a0" },
      { name: "Beige", hex: "#c4a882" },
      { name: "Black", hex: "#2c2c2c" },
      { name: "Brown", hex: "#A1591B" },
    ],
    images: [
      "/product-2a.png",
      "/product-2b.png",
      "/product-2c.png",
      "/product-2d.png",
    ],
    otherSizes: [
      { name: "The Valerie bag", image: "/product-2a.png" },
      { name: "The Valerie mini", image: "/product-2b.png" },
    ],
    details: [
      "Structured leather handbag",
      "Gold metal hardware",
      "Top handle",
      "Removable shoulder strap",
      "Interior zip pocket",
    ],
    material: "100% Leather",
    madeIn: "Made in Italy",
    ref: "Ref. BAG002",
    completeLook: [
      {
        name: "Classic Lynwood Coat",
        price: "3000",
        image: "/product-14a.jfif",
      },
      {
        name: "Monochrome Safari Slip",
        price: "700",
        image: "/product-14b.png",
      },
      {
        name: "Accessher Gold Plated Floral Jhumki Earrings with Kundan Detailing",
        price: "3500",
        image: "/product-14c.png",
      },
      { name: "Dappled Kitten Heel", price: "900", image: "/product-14d.jfif" },
    ],
    tags: ["Bags", "Handbags", "New In", "Women"],
  },
  {
    id: 3,
    name: "The Hippocampe large scarf",
    price: "340",
    shortDescription: "Silk printed large scarf.",
    shortDescription2: "Lightweight and versatile.",
    colors: [{ name: "Camel", hex: "#C3A68A" }],
    images: ["/product-3a.png", "/product-3b.jpeg", "/product-3c.jpeg"],
    otherSizes: [
      { name: "The Hippocampe large scarf", image: "/product-3a.png" },
      { name: "The Hippocampe small scarf", image: "/product-3b.jpeg" },
    ],
    details: [
      "Large silk printed scarf",
      "Hand rolled edges",
      "Dimensions: 90x90cm",
    ],
    material: "100% Silk",
    madeIn: "Made in France",
    ref: "Ref. SCF003",
    completeLook: [
      {
        name: "Brunello Cucinelli Cotton Rib-Knit Polo Shirt",
        price: "1900",
        image: "/product-15a.png",
      },
      {
        name: "Pinstripe Three-Quarter Blouse",
        price: "1500",
        image: "/product-15b.jfif",
      },
      {
        name: "AX Onyx Stealth Chronograph",
        price: "2000",
        image: "/product-15c.png",
      },
      {
        name: "Keds Champion sneakers",
        price: "1000",
        image: "/product-15d.png",
      },
    ],
    tags: ["Accessories", "Scarves", "Women"],
  },
  {
    id: 4,
    name: "Cole Haan Men's sneakers",
    price: "499",
    shortDescription: "Premium leather sneakers.",
    shortDescription2: "Comfortable everyday wear.",
    colors: [
      { name: "Tan", hex: "#968573" },
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#000000" },
    ],
    images: [
      "/product-4a.jpeg",
      "/product-4b.jpeg",
      "/product-4c.jpeg",
      "/product-4d.jpeg",
    ],
    otherSizes: [{ name: "Cole Haan sneakers", image: "/product-4a.jpeg" }],
    details: [
      "Premium leather upper",
      "Rubber sole",
      "Lace up closure",
      "Available in sizes 39-46",
    ],
    material: "100% Leather",
    madeIn: "Made in Italy",
    ref: "Ref. SNK004",
    completeLook: [
      {
        name: "Brunello Cucinelli Cotton Rib-Knit Polo Shirt",
        price: "699",
        image: "/product-16c.png",
      },
      {
        name: "Aideen Straight-Leg Denim Jeans",
        price: "890",
        image: "/product-16a.png",
      },
      {
        name: "Chaparral Stone Strand",
        price: "2000",
        image: "/product-16b.png",
      },
      { name: "The felt jacket", price: "890", image: "/product-6a.jpeg" },
    ],
    tags: ["Shoes", "Sneakers", "Men"],
  },
  {
    id: 5,
    name: "Aurelia Woven Pochette",
    price: "650",
    shortDescription: "A compact woven clutch for day and evening.",
    shortDescription2: "Elegant woven design with a minimalist finish.",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Pink", hex: "#EDB2DD" },
      { name: "Red", hex: "#D90B0B" },
      { name: "Blue", hex: "#9AC1E3" },
    ],
    images: ["/product-5a.jpeg", "/product-5b.jpeg"],
    otherSizes: [
      { name: "The Twisted shirt dress", image: "/product-5a.jpeg" },
    ],
    details: [
      "Short sleeve shirt dress",
      "Twisted front detail",
      "Button closure",
    ],
    material: "100% Cotton",
    madeIn: "Made in Portugal",
    ref: "Ref. DRS005",
    completeLook: [
      {
        name: "Slouch Waist Satin Maxi Dress",
        price: "900",
        image: "/product-17a.png",
      },
      { name: "The Prism Heel", price: "700", image: "/product-17b.jpeg" },
      { name: "Pearlescent Bloom", price: "1200", image: "/product-17c.jpeg" },
      { name: "Solstice Straw", price: "599", image: "/product-17d.jpeg" },
    ],
    tags: ["Ready-to-wear", "Dresses", "New In", "Women"],
  },
  {
    id: 6,
    name: "Wool blend felt jacket",
    price: "890",
    shortDescription: "Structured wool blend jacket.",
    shortDescription2: "Oversized silhouette.",
    colors: [
      { name: "Cream", hex: "#E3D8CB" },
      { name: "Black", hex: "#000000" },
      { name: "Ivory", hex: "#FFFCED" },
    ],
    images: [
      "/product-6a.jpeg",
      "/product-6b.jpeg",
      "/product-6c.jpeg",
      "/product-6d.jpeg",
      "/product-6e.jpeg",
      "/product-6f.jpeg",
    ],
    otherSizes: [{ name: "Wool blend felt jacket", image: "/product-6a.jpeg" }],
    details: [
      "Oversized wool blend jacket",
      "Notched lapel",
      "Two front pockets",
      "Single button closure",
    ],
    material: "70% Wool 30% Polyester",
    madeIn: "Made in Italy",
    ref: "Ref. JKT006",
    completeLook: [
      {
        name: "Alpine Mist Headwarmer",
        price: "499",
        image: "/product-17e.jpeg",
      },
      { name: "Azure Drift Denim", price: "600", image: "/product-18a.jpeg" },
      {
        name: "Kenzo Blue Cargo Trousers",
        price: "699",
        image: "/product-18b.jpeg",
      },
      {
        name: "Pagani Design Automatic Mens Watches Skeleton Mechanical Wrist",
        price: "50,000",
        image: "/product-18c.jpeg",
      },
    ],
    tags: ["Ready-to-wear", "Jackets", "New In", "Women"],
  },
  {
    id: 7,
    name: "The Hippocampe large scarf",
    price: "340",
    shortDescription: "Crafted from premium black leather.",
    shortDescription2:
      "Elegant silhouette designed for everyday sophistication.",
    colors: [{ name: "Black", hex: "#000000" }],
    images: ["/product-7a.jpg", "/product-7b.jpeg", "/product-7c.jpeg"],
    otherSizes: [
      { name: "The Hippocampe large scarf", image: "/product-7a.jpg" },
    ],
    details: [
      "Large silk printed scarf",
      "Hand rolled edges",
      "Dimensions: 90x90cm",
    ],
    material: "100% Silk",
    madeIn: "Made in France",
    ref: "Ref. SCF007",
    completeLook: [
      {
        name: "The Heirloom Damask Jacket",
        price: "12,500",
        image: "/product-19a.jpeg",
      },
      {
        name: "Men Luxury Leather Lace-Up Oxford Shoe",
        price: "400",
        image: "/product-19b.jpeg",
      },
      {
        name: "Charmeur 18k white gold and Black diamonds",
        price: "3500",
        image: "/product-19c.jpeg",
      },
      {
        name: "Contrast Couture Blazer",
        price: "10,000",
        image: "/product-19d.jpeg",
      },
    ],
    tags: ["Accessories", "Scarves", "Women"],
  },
  {
    id: 8,
    name: "The Tailored Saddle Bag",
    price: "1,500",
    shortDescription: "Structured saddle bag with timeless elegance.",
    shortDescription2: "Made from luxurious full-grain leather.",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Pink", hex: "#EDB2DD" },
      { name: "Red", hex: "#D90B0B" },
      { name: "Blue", hex: "#9AC1E3" },
    ],
    images: [
      "/product-8a.jpeg",
      "/product-8b.jpeg",
      "/product-8c.jpeg",
      "/product-8d.jpeg",
      "/product-8e.jpeg",
    ],
    otherSizes: [
      { name: "The Twisted shirt dress", image: "/product-8a.jpeg" },
    ],
    details: [
      "Summer shirt dress",
      "Twisted front detail",
      "Lightweight fabric",
    ],
    material: "100% Linen",
    madeIn: "Made in Portugal",
    ref: "Ref. DRS008",
    completeLook: [
      { name: "The Valerie bag", price: "890", image: "/product-2a.png" },
      { name: "The Hippocampe scarf", price: "340", image: "/product-3a.png" },
      { name: "The sneakers", price: "420", image: "/product-4a.jpeg" },
      { name: "The felt jacket", price: "890", image: "/product-6a.jpeg" },
    ],
    tags: ["Ready-to-wear", "Dresses", "Summer", "Women"],
  },
  {
    id: 9,
    name: "Tom Ford sunglasses",
    price: "2700",
    shortDescription: "A fluid, twisted silhouette.",
    shortDescription2: "Summer edition.",
    colors: [
      { name: "Pink", hex: "#d4a5a5" },
      { name: "Black", hex: "#2c2c2c" },
    ],
    images: ["/product-9a.jpeg", "/product-9b.png", "/product-9c.png"],
    otherSizes: [{ name: "Tom Ford sunglasses", image: "/product-9c.png" }],
    details: [
      "Summer shirt dress",
      "Twisted front detail",
      "Lightweight fabric",
    ],
    material: "100% Linen",
    madeIn: "Made in Portugal",
    ref: "Ref. DRS008",
    completeLook: [
      { name: "The Valerie bag", price: "890", image: "/product-2a.png" },
      { name: "The Hippocampe scarf", price: "340", image: "/product-3a.png" },
      { name: "The sneakers", price: "420", image: "/product-4a.jpeg" },
      { name: "The felt jacket", price: "890", image: "/product-6a.jpeg" },
    ],
    tags: ["Ready-to-wear", "Dresses", "Summer", "Women"],
  },
  {
    id: 10,
    name: "The Zenith Noir Shades",
    price: "3500",
    shortDescription: "A fluid, twisted silhouette.",
    shortDescription2: "Summer edition.",
    colors: [{ name: "Black", hex: "#2c2c2c" }],
    images: ["/product-10a.webp", "/product-10b.png", "/product-10c.png"],
    otherSizes: [
      { name: "The Zenith Noir Shades", image: "/product-10a.webp" },
    ],
    details: [
      "Summer shirt dress",
      "Twisted front detail",
      "Lightweight fabric",
    ],
    material: "100% Linen",
    madeIn: "Made in Portugal",
    ref: "Ref. DRS008",
    completeLook: [
      { name: "The Valerie bag", price: "890", image: "/product-2a.png" },
      { name: "The Hippocampe scarf", price: "340", image: "/product-3a.png" },
      { name: "The sneakers", price: "420", image: "/product-4a.jpeg" },
      { name: "The felt jacket", price: "890", image: "/product-6a.jpeg" },
    ],
    tags: ["Ready-to-wear", "Dresses", "Summer", "Women"],
  },
  {
    id: 11,
    name: "Monarch Silk Utility Shirt",
    price: "3500",
    shortDescription: "A fluid, twisted silhouette.",
    shortDescription2: "Summer edition.",
    colors: [{ name: "Black", hex: "#000000" }],
    images: ["/product-11a.webp", "/product-11bb.png"],
    otherSizes: [
      { name: "Monarch Silk Utility Shirt", image: "/product-11a.webp" },
      { name: "Monarch Silk Utility Shirt", image: "/product-11bb.png" },
    ],
    details: [
      "Summer shirt dress",
      "Twisted front detail",
      "Lightweight fabric",
    ],
    material: "100% Linen",
    madeIn: "Made in Portugal",
    ref: "Ref. DRS008",
    completeLook: [
      { name: "The Valerie bag", price: "890", image: "/product-2a.png" },
      { name: "The Hippocampe scarf", price: "340", image: "/product-3a.png" },
      { name: "The sneakers", price: "420", image: "/product-4a.jpeg" },
      { name: "The felt jacket", price: "890", image: "/product-6a.jpeg" },
    ],
    tags: ["Ready-to-wear", "Dresses", "Summer", "Women"],
  },
  {
    id: 12,
    name: "Nigeria 2026 Away Jersey - Men's",
    price: "100",
    shortDescription: "A fluid, twisted silhouette.",
    shortDescription2: "Summer edition.",
    colors: [{ name: "Black", hex: "#7DD296" }],
    images: ["/product-12a.png", "/product-12b.png", "/product-12c.jfif"],
    otherSizes: [
      { name: "Nigeria 2026 Away Jersey - Men's", image: "/product-12a.png" },
      { name: "Nigeria 2026 Away Jersey - Men's", image: "/product-12c.jfif" },
    ],
    details: [
      "Summer shirt dress",
      "Twisted front detail",
      "Lightweight fabric",
    ],
    material: "100% Linen",
    madeIn: "Made in Portugal",
    ref: "Ref. DRS008",
    completeLook: [
      { name: "The Valerie bag", price: "890", image: "/product-2a.png" },
      { name: "The Hippocampe scarf", price: "340", image: "/product-3a.png" },
      { name: "The sneakers", price: "420", image: "/product-4a.jpeg" },
      { name: "The felt jacket", price: "890", image: "/product-6a.jpeg" },
    ],
    tags: ["Ready-to-wear", "Dresses", "Summer", "Women"],
  },
];
