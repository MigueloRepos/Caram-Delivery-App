import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Page, WhatsAppButton } from "@/components/Shell";
import { ShareProductButton } from "@/components/ShareProductButton";
import { PRICE_LABEL, getCategory, getProduct } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/producto/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { name: p.name };
  },
  component: Detalle,
});

function Detalle() {
  const { id } = Route.useParams();
  const p = getProduct(id);
  const router = useRouter();
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  if (!p) return null;
  const cat = getCategory(p.category);

  return (
    <Page>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => router.history.back()}
          className="inline-flex items-center gap-1 text-sm font-medium text-text-muted cursor-pointer hover:text-text transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Volver
        </button>

        {cat && (
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            {cat.name}
          </span>
        )}
      </div>

      <div className="mt-3 md:grid md:grid-cols-2 md:gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-[2.5rem] bg-surface border border-border shadow-soft"
        >
          <img
            src={p.image}
            alt={p.name}
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-0 space-y-4"
        >
          <div>
            {cat && (
              <Link to="/categoria/$id" params={{ id: cat.id }} className="chip">
                {cat.name}
              </Link>
            )}
            <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-primary-dark">
              {p.name}
            </h1>
            <p className="mt-1 text-sm text-text-muted">{p.subtitle}</p>
            {p.description && (
              <p className="mt-2.5 text-sm text-text leading-relaxed">{p.description}</p>
            )}
          </div>

          <p className="rounded-2xl bg-secondary px-4 py-3 text-xs sm:text-sm font-bold text-primary-dark border border-primary/10">
            {PRICE_LABEL}
          </p>

          <div className="flex items-center gap-4 pt-1">
            <span className="text-sm font-bold text-text">Cantidad:</span>
            <div className="flex items-center rounded-full bg-surface border border-border shadow-soft">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-3 cursor-pointer text-primary-dark hover:bg-background rounded-full transition-colors"
                aria-label="Restar"
              >
                <Minus className="h-4 w-4" />
              </motion.button>
              <span className="w-8 text-center font-bold text-text" aria-live="polite">
                {qty}
              </span>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setQty((q) => q + 1)}
                className="p-3 cursor-pointer text-primary-dark hover:bg-background rounded-full transition-colors"
                aria-label="Sumar"
              >
                <Plus className="h-4 w-4" />
              </motion.button>
            </div>
          </div>

          {/* Action Buttons: Add to Cart, WhatsApp Order, and Share Product */}
          <div className="space-y-2.5 pt-2">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                add(p.id, qty);
                toast.success(`${qty} x ${p.name} añadido al carrito`);
              }}
              className="btn-primary w-full cursor-pointer shadow-md"
            >
              Añadir al carrito
            </motion.button>

            {(() => {
              const singleOrderMessage =
                `🛒 *CONSULTA DE PRODUCTO — CARAM*\n` +
                `━━━━━━━━━━━━━━━━━━━━\n\n` +
                `• Categoría: ${cat?.name ?? "Caram"}\n` +
                `• Producto: ${p.variant ? `Helado sabor ${p.variant}` : p.name}\n` +
                `• Cantidad: ${qty} unidad${qty === 1 ? "" : "es"}\n\n` +
                `━━━━━━━━━━━━━━━━━━━━\n` +
                `¡Hola Caram! Me gustaría pedir este producto. ¿Me confirman precio y disponibilidad? ¡Gracias!`;

              return (
                <WhatsAppButton
                  message={singleOrderMessage}
                  className="w-full"
                />
              );
            })()}

            {/* Share Product Button */}
            <ShareProductButton
              product={p}
              categoryName={cat?.name}
              className="w-full"
            />
          </div>
        </motion.div>
      </div>
    </Page>
  );
}
