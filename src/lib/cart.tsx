import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getCategory, getProduct } from "./catalog";
import { getDeliveryZone } from "./config";

export type CartItem = { id: string; qty: number };

export interface OrderDeliveryOptions {
  mode?: "pickup" | "delivery";
  isDelivery?: boolean;
  address?: string;
  deliveryAddress?: string;
  zoneId?: string;
  deliveryFee?: number;
}

type Ctx = {
  items: CartItem[];
  count: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<Ctx | null>(null);
const KEY = "caram-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem(KEY) || "[]"));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, loaded]);

  const add = (id: string, qty = 1) =>
    setItems((cur) => {
      const f = cur.find((i) => i.id === id);
      return f
        ? cur.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
        : [...cur, { id, qty }];
    });

  const setQty = (id: string, qty: number) =>
    setItems((cur) =>
      qty <= 0 ? cur.filter((i) => i.id !== id) : cur.map((i) => (i.id === id ? { ...i, qty } : i))
    );

  const remove = (id: string) => setItems((cur) => cur.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, count, add, setQty, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart fuera de CartProvider");
  return c;
}

export function buildOrderMessage(
  items: CartItem[],
  options?: OrderDeliveryOptions
): string {
  if (items.length === 0) {
    return "¡Hola Caram! Quisiera consultar precios y disponibilidad de sus productos.";
  }

  const isDeliveryMode =
    options?.mode === "delivery" ||
    (options?.mode === undefined && options?.isDelivery !== false);

  const heladosItems: { qty: number; name: string; categoryName: string }[] = [];
  const dulcesItems: { qty: number; name: string; categoryName: string }[] = [];

  for (const item of items) {
    const product = getProduct(item.id);
    if (!product) continue;
    const cat = getCategory(product.category);
    const catName = cat?.name ?? "Dulcería";

    if (product.category === "helados") {
      heladosItems.push({
        qty: item.qty,
        name: product.variant ? `Helado sabor ${product.variant}` : product.name,
        categoryName: "Helados",
      });
    } else {
      dulcesItems.push({
        qty: item.qty,
        name: product.name,
        categoryName: catName,
      });
    }
  }

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  let message = `🛒 *NUEVO PEDIDO — CARAM*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;

  if (heladosItems.length > 0) {
    message += `🍨 *HELADOS ARTESANALES:*\n`;
    heladosItems.forEach((it) => {
      message += `  • ${it.qty}x ${it.name}\n`;
    });
    message += `\n`;
  }

  if (dulcesItems.length > 0) {
    message += `🧁 *DULCERÍA ARTESANAL:*\n`;
    dulcesItems.forEach((it) => {
      message += `  • [${it.categoryName}] ${it.qty}x ${it.name}\n`;
    });
    message += `\n`;
  }

  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📦 *Total de artículos:* ${totalItems} unidad${totalItems === 1 ? "" : "es"}\n`;

  if (isDeliveryMode) {
    const zone = getDeliveryZone(options?.zoneId);
    const fee = options?.deliveryFee ?? zone.feeCup;
    const addr = (options?.address || options?.deliveryAddress)?.trim();

    message += `🛵 *Modalidad:* Servicio a Domicilio en Puerto Padre\n`;
    message += `🗺️ *Zona:* ${zone.name}\n`;
    message += `🏠 *Dirección exacta:* ${addr || "[Especificar en este chat]"}\n`;
    message += `💰 *Coste adicional de envío:* $${fee} CUP\n\n`;
    message += `¡Hola Caram! Quiero hacer este pedido a domicilio. ¿Me confirman disponibilidad y detalles de entrega? ¡Gracias!`;
  } else {
    message += `🏪 *Modalidad:* Recogida en tienda (Punto de Venta Caram)\n`;
    message += `💰 *Coste adicional de envío:* $0 CUP (Gratis)\n\n`;
    message += `¡Hola Caram! Quiero hacer este pedido para recogida en tienda. ¿Me confirman cuando esté listo? ¡Gracias!`;
  }

  return message;
}
