import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, X, IceCreamCone, Tag, Flame } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { whatsappUrl, WHATSAPP_DISPLAY } from "@/lib/config";

interface PromoItem {
  id: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  title: string;
  subtitle: string;
  linkText: string;
  linkTo: string;
}

const PROMO_ITEMS: PromoItem[] = [
  {
    id: "seasonal-flavor",
    badge: "Sabor de Temporada",
    badgeBg: "bg-accent",
    badgeText: "text-primary-dark",
    title: "Tiramisú Especial & Moscatel Artesanal",
    subtitle: "Elaborados diariamente con recetas tradicionales",
    linkText: "Ver Sabores",
    linkTo: "/categoria/helados",
  },
  {
    id: "special-offer",
    badge: "Oferta de la Semana",
    badgeBg: "bg-primary text-white",
    badgeText: "text-white",
    title: "10% de descuento en pedidos mayores a 5 helados",
    subtitle: "Descuento automático al pedir por WhatsApp",
    linkText: "Pedir Promo",
    linkTo: "/catalogo",
  },
  {
    id: "bakery-fresh",
    badge: "Nuevos Dulces",
    badgeBg: "bg-emerald-500",
    badgeText: "text-white",
    title: "Cupcakes, Brazos de Gitano y Mini Cakes Recién Horneados",
    subtitle: "10 especialidades de repostería disponibles hoy",
    linkText: "Explorar Dulcería",
    linkTo: "/dulces",
  },
];

export function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Auto rotate banner every 5 seconds
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMO_ITEMS.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const currentPromo = PROMO_ITEMS[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="sticky top-[53px] z-20 -mx-5 mb-3 bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white px-4 py-2.5 shadow-md backdrop-blur-md border-b border-primary/30"
    >
      <div className="mx-auto max-w-5xl flex items-center justify-between gap-3 text-xs">
        {/* Left icon badge */}
        <div className="hidden sm:flex items-center justify-center h-8 w-8 rounded-full bg-white/10 shrink-0 text-accent">
          <Flame className="h-4 w-4 animate-pulse" />
        </div>

        {/* Dynamic Content */}
        <div className="flex-1 min-w-0 flex items-center gap-2.5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPromo.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5 min-w-0"
            >
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider shrink-0 ${currentPromo.badgeBg} ${currentPromo.badgeText}`}
              >
                <Tag className="h-2.5 w-2.5" />
                <span>{currentPromo.badge}</span>
              </span>

              <div className="min-w-0 truncate">
                <span className="font-bold text-white truncate block sm:inline">
                  {currentPromo.title}
                </span>
                <span className="hidden md:inline text-white/80 font-normal text-[11px] ml-1.5">
                  — {currentPromo.subtitle}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA Link & Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={currentPromo.linkTo}
            className="btn-accent py-1 px-3 text-[11px] font-bold rounded-full flex items-center gap-1 hover:scale-102 transition-transform shadow-xs"
          >
            <span>{currentPromo.linkText}</span>
            <ArrowRight className="h-3 w-3" />
          </Link>

          {/* Dots Indicator */}
          <div className="hidden md:flex items-center gap-1 px-1">
            {PROMO_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex
                    ? "w-4 bg-accent"
                    : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Ver promoción ${idx + 1}`}
              />
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Cerrar banner promocional"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
