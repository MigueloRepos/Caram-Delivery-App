import helados from "@/assets/helados.jpg";
import cake from "@/assets/cake.jpg";
import brazo from "@/assets/brazo.jpg";
import marquesitas from "@/assets/marquesitas2.jpg";
import minicake from "@/assets/minicake.jpg";
import capuchinos from "@/assets/capuchinos.jpg";
import dulcesImg from "@/assets/dulces.jpg";
import cupcakes from "@/assets/cupcakes.jpg";
import merenguitos from "@/assets/merenguitos.jpg";
import mantecadosDulce from "@/assets/mantecados-dulce.jpg";
import pays from "@/assets/pays.jpg";
import pastelesDeHoja from "@/assets/pasteles-de-hoja.jpg";

const flavorImgs = import.meta.glob("@/assets/f-*.jpg", { eager: true, import: "default" }) as Record<string, string>;

export const DULCES_IMAGE = dulcesImg;

export type CategoryId =
  | "helados"
  | "cupcakes"
  | "brazo-de-gitano"
  | "cake"
  | "mini-cake"
  | "capuchinos"
  | "marquesitas"
  | "merenguitos"
  | "mantecados"
  | "pays"
  | "pasteles-de-hoja";

export interface Category {
  id: CategoryId;
  name: string;
  image: string;
  group: "helados" | "dulces";
  description: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  image: string;
  subtitle: string;
  description?: string;
  variant?: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "helados",
    name: "Helados",
    image: helados,
    group: "helados",
    description: "Cremosos helados artesanales en 8 sabores tradicionales",
  },
  {
    id: "cupcakes",
    name: "Cupcakes",
    image: cupcakes,
    group: "dulces",
    description: "Suaves ponquecitos decorados con cremas y caramelo",
  },
  {
    id: "brazo-de-gitano",
    name: "Brazos de gitano",
    image: brazo,
    group: "dulces",
    description: "Bizcocho enrollado relleno y cubierto con delicadeza",
  },
  {
    id: "cake",
    name: "Cakes",
    image: cake,
    group: "dulces",
    description: "Tartas y pasteles esponjosos con decorado artesanal",
  },
  {
    id: "mini-cake",
    name: "Mini cakes",
    image: minicake,
    group: "dulces",
    description: "Porciones individuales elegantes para compartir",
  },
  {
    id: "capuchinos",
    name: "Capuchinos",
    image: capuchinos,
    group: "dulces",
    description: "Dulce tradicional cubano bañado en rico almíbar",
  },
  {
    id: "marquesitas",
    name: "Marquesitas",
    image: marquesitas,
    group: "dulces",
    description: "Bocaditos crujientes y dulces con toque especial",
  },
  {
    id: "merenguitos",
    name: "Merenguitos",
    image: merenguitos,
    group: "dulces",
    description: "Crujientes por fuera y aireados por dentro",
  },
  {
    id: "mantecados",
    name: "Mantecados",
    image: mantecadosDulce,
    group: "dulces",
    description: "Polvorones y mantecados caseros con canela y azúcar",
  },
  {
    id: "pays",
    name: "Pays",
    image: pays,
    group: "dulces",
    description: "Tartas con base crocante y rellenos cremosos y frutales",
  },
  {
    id: "pasteles-de-hoja",
    name: "Pasteles de hoja",
    image: pastelesDeHoja,
    group: "dulces",
    description: "Hojaldre fino y dorado con rellenos tradicionales",
  },
];

export const FLAVORS = [
  "Mantecado",
  "Tiramisú",
  "Fresa",
  "Tres Leches",
  "Moscatel",
  "Limón",
  "Naranja-Piña",
  "Chocolate",
];

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-");

export const PRODUCTS: Product[] = [
  ...FLAVORS.map((f) => ({
    id: `helado-${slug(f)}`,
    name: f,
    variant: f,
    category: "helados" as const,
    image:
      Object.entries(flavorImgs).find(([k]) => k.endsWith(`f-${slug(f)}.jpg`))?.[1] ?? helados,
    subtitle: "Helado artesanal",
    description: `Delicioso helado artesanal sabor ${f}, preparado con ingredientes frescos y la receta tradicional de Helados Caram.`,
  })),
  {
    id: "cupcake-artesanal",
    name: "Cupcake Artesanal",
    category: "cupcakes",
    image: cupcakes,
    subtitle: "Dulcería Caram",
    description: "Esponjoso cupcake decorado con suave crema pastelera y delicado hilo de caramelo.",
  },
  {
    id: "brazo-de-gitano",
    name: "Brazo de Gitano",
    category: "brazo-de-gitano",
    image: brazo,
    subtitle: "Dulcería Caram",
    description: "Rollo de bizcocho tradicional relleno con crema pastelera suave y acabado espolvoreado.",
  },
  {
    id: "cake-caram",
    name: "Cake Tradicional Caram",
    category: "cake",
    image: cake,
    subtitle: "Dulcería Caram",
    description: "Tarta esponjosa elaborada artesanalmente con cobertura especial y textura suave.",
  },
  {
    id: "mini-cake",
    name: "Mini Cake Especial",
    category: "mini-cake",
    image: minicake,
    subtitle: "Dulcería Caram",
    description: "Porción individual de cake artesanal con decoración delicada.",
  },
  {
    id: "capuchinos",
    name: "Capuchinos Tradicionales",
    category: "capuchinos",
    image: capuchinos,
    subtitle: "Dulcería Caram",
    description: "Dulce tradicional cubano en forma cónica, empapado en aromático almíbar.",
  },
  {
    id: "marquesitas",
    name: "Marquesitas Caram",
    category: "marquesitas",
    image: marquesitas,
    subtitle: "Dulcería Caram",
    description: "Bocaditos dulces con textura crujiente y toque dorado tradicional.",
  },
  {
    id: "merenguitos",
    name: "Merenguitos Horneados",
    category: "merenguitos",
    image: merenguitos,
    subtitle: "Dulcería Caram",
    description: "Crujientes por fuera y aireados por dentro, horneados a fuego lento.",
  },
  {
    id: "mantecados",
    name: "Mantecados Caseros",
    category: "mantecados",
    image: mantecadosDulce,
    subtitle: "Dulcería Caram",
    description: "Polvorones y mantecados caseros preparados con canela y azúcar pulverizada.",
  },
  {
    id: "pays",
    name: "Pay Artesanal",
    category: "pays",
    image: pays,
    subtitle: "Dulcería Caram",
    description: "Tarta con base crujiente de hojaldre, crema suave y frutas seleccionadas.",
  },
  {
    id: "pasteles-de-hoja",
    name: "Pasteles de Hoja",
    category: "pasteles-de-hoja",
    image: pastelesDeHoja,
    subtitle: "Dulcería Caram",
    description: "Crujiente hojaldre horneado en capas finas doradas con suave glaseado.",
  },
];

export const PRICE_LABEL = "Precio por confirmar en WhatsApp";

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const getCategory = (id: string) => CATEGORIES.find((c) => c.id === id);
export const getDulcesCategories = () => CATEGORIES.filter((c) => c.group === "dulces");
