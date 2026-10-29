import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { PartyPopper, MessageSquareQuote, Truck, Clock, Store, MapPin } from "lucide-react";
import { Page, WhatsAppButton } from "@/components/Shell";
import { OrderTracker } from "@/components/OrderTracker";
import { PRICE_LABEL, getCategory, getProduct } from "@/lib/catalog";
import { buildOrderMessage, useCart } from "@/lib/cart";
import { SCHEDULE, WHATSAPP_DISPLAY, getDeliveryZone } from "@/lib/config";
import type { DeliveryState } from "@/components/DeliverySelector";

export const Route = createFileRoute("/pedido-listo")({
  component: Listo,
});

export default function Listo() {
  const { items } = useCart();
  const [deliveryState, setDeliveryState] = useState<DeliveryState>(() => {
    try {
      const saved = localStorage.getItem("caram-delivery-state");
      if (saved) return JSON.parse(saved);
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
      const saved = localStorage.getItem("caram-delivery-state");
      if (saved) {
        setDeliveryState(JSON.parse(saved));
      }
    } catch {
      /* ignore */
    }
  }, []);

  const selectedZone = getDeliveryZone(deliveryState.zoneId);

  const orderMessage = buildOrderMessage(items, {
    mode: deliveryState.mode,
    zoneId: deliveryState.zoneId,
    address: deliveryState.address,
    deliveryFee: selectedZone.feeCup,
  });

  return (
    <Page>
      <div className="space-y-10 max-w-2xl mx-auto">
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 rounded-[2.5rem] bg-surface border border-border p-6 sm:p-8 text-center shadow-soft"
        >
          <motion.div
            initial={{ scale: 0, rotate: -25 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.1 }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary shadow-xs"
          >
            <PartyPopper className="h-7 w-7" />
          </motion.div>

          <span className="mt-3 inline-block rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-primary-dark">
            Paso 3 de 3: Confirmación Final
          </span>

          <h1 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-primary-dark">
            ¡Tu pedido está listo!
          </h1>
          <p className="mt-1 text-xs text-text-muted">
            Revisa el desglose y haz clic en el botón para enviar tu pedido a nuestro WhatsApp oficial (
            <strong className="text-primary font-bold">{WHATSAPP_DISPLAY}</strong>).
          </p>

          {items.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-background/50 p-6 border border-border">
              <p className="text-sm text-text-muted">Aún no has añadido productos a tu pedido.</p>
              <Link to="/catalogo" className="btn-primary mt-4 inline-block text-xs py-2.5 px-6">
                Ver catálogo de productos
              </Link>
            </div>
          ) : (
            <>
              {/* Categorized Products Summary */}
              <div className="mt-5 rounded-2xl bg-background/70 border border-border p-4 text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary-dark block mb-2.5">
                  Resumen de artículos:
                </span>
                <ul className="space-y-2.5 text-xs">
                  {items.map((i) => {
                    const p = getProduct(i.id);
                    if (!p) return null;
                    const cat = getCategory(p.category);
                    return (
                      <li
                        key={i.id}
                        className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0 last:pb-0"
                      >
                        <div>
                          <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                            {cat?.name ?? "Caram"}
                          </span>
                          <span className="font-semibold text-text">
                            {p.variant ? `Helado sabor ${p.variant}` : p.name}
                          </span>
                        </div>
                        <span className="rounded-full bg-surface border border-border px-2.5 py-0.5 text-xs font-bold text-primary-dark shadow-2xs">
                          x{i.qty}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Delivery Mode Banner */}
              <div className="mt-3.5 rounded-2xl bg-secondary/50 p-3.5 border border-secondary text-left text-xs">
                <div className="flex items-center gap-1.5 font-bold text-primary-dark mb-1">
                  {deliveryState.mode === "delivery" ? (
                    <>
                      <Truck className="h-4 w-4 text-primary" />
                      <span>Servicio a Domicilio (Puerto Padre)</span>
                    </>
                  ) : (
                    <>
                      <Store className="h-4 w-4 text-primary" />
                      <span>Recogida en tienda (Punto de Venta Caram)</span>
                    </>
                  )}
                </div>

                {deliveryState.mode === "delivery" ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-primary-dark">
                      <span>Zona: {selectedZone.name}</span>
                      <span className="text-primary font-black">+${selectedZone.feeCup} CUP</span>
                    </div>
                    {deliveryState.address.trim() ? (
                      <p className="text-text-muted text-[11px] flex items-start gap-1 mt-1">
                        <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                        <span>
                          Dirección: <strong className="text-text">{deliveryState.address.trim()}</strong>
                        </span>
                      </p>
                    ) : (
                      <p className="text-text-muted text-[11px] italic mt-0.5">
                        📍 Se especificará la dirección exacta en el chat de WhatsApp.
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-text-muted">
                    Sin coste adicional ($0 CUP). Te avisaremos por WhatsApp cuando tu pedido esté listo para retirar.
                  </p>
                )}
              </div>

              {/* Service Hours Notice */}
              <div className="mt-3.5 rounded-2xl bg-accent/20 p-3.5 border border-accent/40 text-left text-xs">
                <div className="flex items-center gap-1.5 font-bold text-primary-dark mb-0.5">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Horarios de Atención:</span>
                </div>
                <p className="text-text text-[11px]">
                  Mar a Sáb: 10:00 am – 9:00 pm · Dom: 3:00 pm – 9:00 pm (Lunes cerrado)
                </p>
              </div>

              {/* Structured Message Preview */}
              <div className="mt-4 rounded-2xl border border-border bg-background/90 p-3 text-left">
                <div className="flex items-center justify-between gap-1.5 text-[11px] font-bold text-text-muted mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <MessageSquareQuote className="h-4 w-4 text-primary" />
                    <span>Mensaje preparado para WhatsApp:</span>
                  </div>
                  <span className="text-[10px] text-primary">{WHATSAPP_DISPLAY}</span>
                </div>
                <pre className="whitespace-pre-wrap font-sans text-xs text-text bg-surface p-3 rounded-xl border border-border max-h-40 overflow-y-auto leading-relaxed">
                  {orderMessage}
                </pre>
              </div>

              <p className="mt-3 text-xs text-text-muted font-medium">
                {PRICE_LABEL} (más ${deliveryState.mode === "delivery" ? `${selectedZone.feeCup} CUP de envío` : "0 CUP"}).
              </p>

              {/* Primary WhatsApp Button */}
              <WhatsAppButton
                message={orderMessage}
                label={`Enviar pedido por WhatsApp (${WHATSAPP_DISPLAY})`}
                className="mt-4 w-full"
              />

              <div className="mt-3 flex items-center justify-center gap-4 text-xs font-semibold">
                <Link
                  to="/carrito"
                  className="text-text-muted hover:text-primary transition underline"
                >
                  ← Modificar carrito o entrega
                </Link>
                <Link
                  to="/catalogo"
                  className="text-primary hover:text-primary-dark transition"
                >
                  + Añadir más productos
                </Link>
              </div>
            </>
          )}
        </motion.section>

        {/* Embedded Order Tracker on Order Final Page */}
        <OrderTracker defaultAddress={deliveryState.address} />
      </div>
    </Page>
  );
}
