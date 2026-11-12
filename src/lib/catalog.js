export const WHATSAPP_NUMBER = "573213918180";
export const WHATSAPP_DISPLAY = "+57 321 391 8180";
export const FREE_DELIVERY_FROM = 100000;
export const DELIVERY_FEE = 6000;

export const PROMO = {
  min: 200000,
  percent: 10,
  text: "Compra $200.000 y llévate el 10% de descuento",
};

export const STORE = {
  name: "Famipollo",
  tagline: "Distribuidora de carnes",
  email: "info@famipollo.com.co",
  address: "Galería Santa Elena",
  city: "Cali, Valle del Cauca",
  hours: "Lunes a sábado · 7:00 a.m. a 6:00 p.m.",
  since: 2011,
  zones: "Norte, sur, centro, oeste y oriente de Cali",
};

export const CATEGORIES = [
  { id: "todos", label: "Todo el catálogo" },
  { id: "pollo", label: "Pollo" },
  { id: "res", label: "Res" },
  { id: "cerdo", label: "Cerdo" },
  { id: "pescado", label: "Pescados" },
  { id: "embutidos", label: "Embutidos" },
  { id: "lacteos", label: "Huevos y lácteos" },
];

export const PRODUCTS = [
  // Pollo
  {
    id: "pechuga-pollo",
    name: "Pechuga de pollo",
    category: "pollo",
    price: 8000,
    unit: "libra",
    note: "Filete limpio, sin hueso",
    featured: true,
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/ef95a2a75_generated_image.png",
  },
  {
    id: "pollo-entero",
    name: "Pollo entero natural",
    category: "pollo",
    price: 6500,
    unit: "libra",
    note: "Criollo, listo para preparar",
    featured: true,
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/fdbf3c4fa_generated_image.png",
  },
  {
    id: "muslos-pollo",
    name: "Muslos de pollo",
    category: "pollo",
    price: 5500,
    unit: "libra",
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/7c38c5872_generated_image.png",
  },
  {
    id: "pierna-marinada",
    name: "Pierna pernil marinada",
    category: "pollo",
    price: 5000,
    unit: "libra",
    note: "Adobada con especias de la casa",
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/6217bbcdc_generated_image.png",
  },
  {
    id: "alitas-pollo",
    name: "Alitas de pollo",
    category: "pollo",
    price: 7000,
    unit: "libra",
    note: "Ideales para freír o BBQ",
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/b2cc9bae9_generated_image.png",
  },
  {
    id: "contramuslo-pollo",
    name: "Contramuslo de pollo",
    category: "pollo",
    price: 6000,
    unit: "libra",
    note: "Jugoso, con piel",
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/3c3309217_generated_image.png",
  },

  // Res
  {
    id: "carne-fina",
    name: "Carne fina de res",
    category: "res",
    price: 19500,
    unit: "libra",
    note: "Cadera, bola, bota o centro",
    featured: true,
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/0782d4f6c_generated_image.png",
  },
  {
    id: "sobrebarriga",
    name: "Sobrebarriga de res",
    category: "res",
    price: 16800,
    unit: "libra",
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/c99eb2f54_generated_image.png",
  },
  {
    id: "lomo-res",
    name: "Lomo de res",
    category: "res",
    price: 34000,
    unit: "libra",
    note: "Corte premium para asar",
    featured: true,
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/4474d75e1_generated_image.png",
  },
  {
    id: "punta-anca",
    name: "Punta de anca",
    category: "res",
    price: 28000,
    unit: "libra",
    note: "Jugosa, perfecta para asar en tiras",
    featured: true,
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/92fd6bf03_generated_image.png",
  },
  {
    id: "churrasco-res",
    name: "Churrasco de res",
    category: "res",
    price: 22000,
    unit: "libra",
    note: "Corte delgado para parrilla",
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/c4e996635_generated_image.png",
  },
  {
    id: "costilla-res",
    name: "Costilla de res",
    category: "res",
    price: 18000,
    unit: "libra",
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/d2960a5e3_generated_image.png",
  },
  {
    id: "carne-molida",
    name: "Carne molida de res",
    category: "res",
    price: 15000,
    unit: "libra",
    note: "Molida al momento, 90/10",
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/a10f1fc5e_generated_image.png",
  },

  // Cerdo
  {
    id: "chuleta-cerdo",
    name: "Chuleta de cerdo",
    category: "cerdo",
    price: 11500,
    unit: "libra",
    featured: true,
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/3cd01d356_generated_image.png",
  },
  {
    id: "costilla-cerdo",
    name: "Costilla de cerdo",
    category: "cerdo",
    price: 12500,
    unit: "libra",
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/b22fd08d7_generated_image.png",
  },
  {
    id: "lomo-cerdo",
    name: "Lomo de cerdo",
    category: "cerdo",
    price: 14000,
    unit: "libra",
    note: "Magro y suave",
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/151796973_generated_image.png",
  },
  {
    id: "tocineta",
    name: "Tocineta ahumada",
    category: "cerdo",
    price: 16000,
    unit: "libra",
    note: "Rebanada delgada, ahumado natural",
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/ea11fac2c_generated_image.png",
  },

  // Pescados
  {
    id: "filete-tilapia",
    name: "Filete de tilapia",
    category: "pescado",
    price: 13500,
    unit: "libra",
    note: "Limpio, sin espinas",
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/8d51d2e8e_generated_image.png",
  },
  {
    id: "salmon",
    name: "Salmón fresco",
    category: "pescado",
    price: 32000,
    unit: "libra",
    note: "Corte premium, rico en omega 3",
    featured: true,
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/586e72145_generated_image.png",
  },

  // Embutidos
  {
    id: "chorizo-artesanal",
    name: "Chorizo artesanal",
    category: "embutidos",
    price: 9000,
    unit: "libra",
    note: "Receta de la casa, 6 unidades por libra",
    featured: true,
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/82dd63195_generated_image.png",
  },

  // Huevos y lácteos
  {
    id: "huevos-aaa",
    name: "Cubeta de huevos AAA",
    category: "lacteos",
    price: 17000,
    unit: "cubeta x 30",
    note: "Extra, tamaño grande",
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/b53a9df41_generated_image.png",
  },
  {
    id: "queso-campesino",
    name: "Queso campesino",
    category: "lacteos",
    price: 12000,
    unit: "libra",
    note: "Fresco, de finca",
    image: "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/f8df92e20_generated_image.png",
  },
];

export const HERO_IMAGE =
  "https://media.base44.com/images/public/6af51c3e1247b7d911a1ed67/152709b93_generated_image.png";

export const FEATURED_PRODUCTS = PRODUCTS.filter((product) => product.featured);

export function findProduct(id) {
  return PRODUCTS.find((product) => product.id === id);
}