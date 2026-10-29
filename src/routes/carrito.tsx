import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, Trash2, Clock, ArrowRight } from "lucide-react";
import { Page } from "@/components/Shell";
import { DeliverySelector, type DeliveryState } from "@/components/DeliverySelector";
import { OrderTracker } from "@/components/OrderTracker";
import { PRICE_LABEL, getCategory, getProduct } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { SCHEDULE, getDeliveryZone } from "@/lib/config";

export const Route = createFileRoute("/carrito")({
  component: Carrito,
});

export default function Carrito() {
  const { items, setQty, remove, clear, count } = useCart();

  const [deliveryState, setDeliveryState] = useState<DeliveryState>(() => {
    try {
      const saved = localStorage.getItem("caram-delivery-state");
      if (saved) {
        return JSON.parse(saved);
      }
      // Migration fallback from older keys
      const oldDelivery = localStorage.getItem("caram-is-delivery");
      const oldAddress = localStorage.getItem("caram-delivery-address") || "";
      const isDev = oldDelivery !== null ? JSON.parse(oldDelivery) : true;
      return {
        mode: isDev ? "delivery" : "pickup",
        zoneId: "centro",
        address: oldAddress,
      };
    } catch {
      return {
        mode: "delivery",
        zoneId: "centro",
        address: "",
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("caram-delivery-state", JSON.stringify(deliveryState));
      // Keep legacy keys in sync as fallback
      localStorage.setItem("caram-is-delivery", JSON.stringify(deliveryState.mode === "delivery"));
      localStorage.setItem("caram-delivery-address", deliveryState.address);
    } catch {
      /* ignore */
    }
  }, [deliveryState]);

  const selectedZone = getDeliveryZone(deliveryState.zoneId);
  const deliveryFee = deliveryState.mode === "delivery" ? selectedZone.feeCup : 0;

  return (
    <Page>
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-primary-dark">
            Tu pedido
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Paso 2 de 3: Revisa tus productos, selecciona la entrega y rastrea tu pedido
          </p>
        </div>
        {items.length > 0 && (
          <span className="text-xs font-bold text-primary self-start sm:self-auto">
            {count} producto(s) en total
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-8 space-y-10 max-w-2xl mx-auto">
          <div className="rounded-3xl bg-surface border border-border p-10 text-center shadow-soft">
            <p className="text-sm text-text-muted">Tu pedido está actualmente vacío.</p>
            <p className="text-xs text-text-muted mt-1">
              Explora nuestros helados artesanales o delicias de repostería para comenzar.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/catalogo" className="btn-primary text-xs py-2.5 px-6">
                Ver catálogo
              </Link>
              <Link to="/dulces" className="btn-accent text-xs py-2.5 px-6">
                Ver dulcería
              </Link>
            </div>
          </div>

          {/* Render Order Tracker even when cart is empty so user can track an existing order */}
          <OrderTracker defaultAddress={deliveryState.address} />
        </div>
      ) : (
        <div className="mt-6 space-y-12">
          <div className="md:grid md:grid-cols-[1fr_360px] md:gap-8 items-start">
            {/* Items List */}
            <ul className="space-y-3">
              <AnimatePresence mode="popLayout">
                {items.map((i) => {
                  const p = getProduct(i.id);
                  if (!p) return null;
                  const cat = getCategory(p.category);

                  return (
                    <motion.li
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, x: -20 }}
                      transition={{ duration: 0.25 }}
                      key={i.id}
                      className="flex items-center gap-3.5 rounded-3xl bg-surface border border-border p-3.5 shadow-soft"
                    >
                      <img
                        src={p.image}
                        alt=""
                        width={100}
                        height={100}
                        loading="lazy"
                        className="h-20 w-20 rounded-2xl object-cover shrink-0 ring-1 ring-border"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                          {cat?.name ?? p.subtitle}
                        </span>
                        <p className="font-display font-bold leading-tight text-text">
                          {p.variant ? `Helado — ${p.variant}` : p.name}
                        </p>
                        <p className="text-[11px] text-text-muted mt-0.5">{PRICE_LABEL}</p>
                        
                        <div className="mt-2.5 flex items-center rounded-full bg-secondary w-fit border border-primary/10">
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => setQty(i.id, i.qty - 1)}
                            className="p-1.5 cursor-pointer text-primary-dark hover:bg-white/50 rounded-full"
                            aria-label={`Restar ${p.name}`}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </motion.button>
                          <span className="w-7 text-center text-xs font-bold text-primary-dark">
                            {i.qty}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => setQty(i.id, i.qty + 1)}
                            className="p-1.5 cursor-pointer text-primary-dark hover:bg-white/50 rounded-full"
                            aria-label={`Sumar ${p.name}`}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </motion.button>
                        </div>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => remove(i.id)}
                        className="rounded-full p-2.5 text-text-muted hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                        aria-label={`Eliminar ${p.name}`}
                      >
                        <Trash2 className="h-5 w-5" />
                      </motion.button>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>

            {/* Aside Order Summary & Options */}
            <aside className="mt-6 md:mt-0 space-y-4 sticky top-[75px]">
              {/* Delivery Option Component */}
              <DeliverySelector
                value={deliveryState}
                onChange={setDeliveryState}
              />

              {/* Service Schedule Info Box */}
              <div className="rounded-2xl bg-secondary/60 p-4 border border-secondary text-xs">
                <div className="flex items-center gap-1.5 font-bold text-primary-dark mb-1">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Horarios de Atención:</span>
                </div>
                <p className="text-text mt-1">
                  • <strong>Mar a Sáb:</strong> {SCHEDULE.tueToSat}
                </p>
                <p className="text-text">
                  • <strong>Domingos:</strong> {SCHEDULE.sunday}
                </p>
                <p className="text-[11px] text-text-muted mt-1">
                  • Lunes: {SCHEDULE.monday}
                </p>
              </div>

              {/* Total and Actions Card */}
              <div className="rounded-3xl bg-surface border border-border p-5 shadow-soft">
                <div className="space-y-2 text-xs text-text border-b border-border pb-3">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Subtotal productos:</span>
                    <span className="font-bold text-primary-dark">{count} unidad(es)</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span>Modalidad:</span>
                    <span className="text-text font-bold">
                      {deliveryState.mode === "delivery" ? "Domicilio" : "Recogida en tienda"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-sm text-primary-dark pt-1">
                    <span>Coste adicional de envío:</span>
                    <span className="text-primary font-black">
                      {deliveryState.mode === "delivery"
                        ? `+$${deliveryFee} CUP`
                        : "$0 CUP (Gratis)"}
                    </span>
                  </div>
                </div>

                <p className="mt-2.5 text-[11px] text-text-muted">
                  Precios de productos por confirmar en WhatsApp según disponibilidad.
                </p>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/pedido-listo"
                    className="btn-primary mt-4 w-full text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Paso 3: Confirmar y Enviar Pedido</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>

                <button
                  onClick={clear}
                  className="mt-3 w-full text-xs font-semibold text-text-muted hover:text-red-600 transition underline cursor-pointer"
                >
                  Vaciar carrito
                </button>
              </div>
            </aside>
          </div>

          {/* Dedicated Order Tracker Section in Cart */}
          <OrderTracker defaultAddress={deliveryState.address} />
        </div>
      )}
    </Page>
  );
}
