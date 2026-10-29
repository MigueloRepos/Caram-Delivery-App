import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, LayoutGrid, IceCreamCone, ShoppingBag, MessageCircle, Cake, Sparkles, Truck } from "lucide-react";
import { useCart } from "@/lib/cart";
import { BRAND, WHATSAPP_DISPLAY, SCHEDULE, DELIVERY, whatsappUrl } from "@/lib/config";
import type { Product } from "@/lib/catalog";
import { PRICE_LABEL } from "@/lib/catalog";
import { ShareProductButton } from "@/components/ShareProductButton";

export function Logo() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-1 font-display text-2xl font-extrabold tracking-tight text-primary hover:opacity-95 transition"
      aria-label="Caram, inicio"
    >
      <motion.span whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
        {BRAND.name.toLowerCase()}
      </motion.span>
      <span className="text-accent text-3xl leading-none">.</span>
    </Link>
  );
}

export function Header() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur-md border-b border-border shadow-xs">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
        <Logo />
        <nav className="hidden gap-7 text-sm font-semibold md:flex items-center" aria-label="Navegación Principal">
          <Link to="/" className="nav-link" activeOptions={{ exact: true }}>
            Inicio
          </Link>
          <Link to="/catalogo" className="nav-link" activeOptions={{ exact: true }}>
            Productos
          </Link>
          <Link to="/categoria/$id" params={{ id: "helados" }} className="nav-link">
            Helados
          </Link>
          <Link to="/dulces" className="nav-link">
            Dulces
          </Link>
        </nav>
        <Link
          to="/carrito"
          className="relative flex items-center justify-center rounded-full bg-surface border border-border p-2.5 shadow-soft transition hover:border-primary/50 hover:shadow-hover min-w-[44px] min-h-[44px]"
          aria-label={`Carrito de pedidos, ${count} productos seleccionados`}
        >
          <ShoppingBag className="h-5 w-5 text-primary-dark" />
          <AnimatePresence>
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: "spring", stiffness: 600, damping: 20 }}
                className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-white shadow-xs"
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>
    </header>
  );
}

function BottomNav() {
  const { count } = useCart();
  const item =
    "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[10px] font-semibold text-text-muted transition-colors data-[status=active]:text-primary min-h-[44px]";
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/98 backdrop-blur-md md:hidden shadow-lg"
      aria-label="Navegación móvil inferior"
    >
      <div className="mx-auto flex max-w-md">
        <Link to="/" className={item} activeOptions={{ exact: true }}>
          <Home className="h-5 w-5" />
          <span>Inicio</span>
        </Link>
        <Link to="/catalogo" className={item}>
          <LayoutGrid className="h-5 w-5" />
          <span>Productos</span>
        </Link>
        <Link to="/categoria/$id" params={{ id: "helados" }} className={item}>
          <IceCreamCone className="h-5 w-5" />
          <span>Helados</span>
        </Link>
        <Link to="/dulces" className={item}>
          <Cake className="h-5 w-5" />
          <span>Dulces</span>
        </Link>
        <Link to="/carrito" className={item}>
          <div className="relative">
            <ShoppingBag className="h-5 w-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 600, damping: 20 }}
                  className="absolute -right-2 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] font-bold text-white"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <span>Carrito</span>
        </Link>
      </div>
    </nav>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-text flex flex-col justify-between pb-24 md:pb-0">
      <div>
        <Header />
        <main className="mx-auto max-w-5xl px-5">{children}</main>
      </div>
      
      {/* Footer elegante en Azul Profundo (#02289E) */}
      <footer className="mt-16 bg-primary-dark text-white border-t border-border/20">
        <div className="mx-auto max-w-5xl px-5 py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-center md:text-left">
            {/* Brand Info */}
            <div className="md:col-span-5">
              <div className="flex items-center justify-center md:justify-start gap-1 font-display text-2xl font-extrabold tracking-tight">
                <span>{BRAND.name.toLowerCase()}</span>
                <span className="text-accent text-3xl leading-none">.</span>
              </div>
              <p className="mt-1 text-sm font-medium text-white/90">
                «{BRAND.slogan}»
              </p>
              <p className="mt-2 text-xs text-white/70 leading-relaxed">
                Helados y repostería 100% artesanal en Puerto Padre. Atención y pedidos directos por WhatsApp al{" "}
                <strong className="text-accent font-bold">{WHATSAPP_DISPLAY}</strong>.
              </p>
              <p className="mt-2 text-[11px] text-white/60">
                🛵 {DELIVERY.notice}.
              </p>
            </div>

            {/* Horarios de Servicio */}
            <div className="md:col-span-4 text-xs text-white/80">
              <span className="text-accent font-bold uppercase tracking-wider block mb-2">
                Horarios de Atención:
              </span>
              <p className="font-semibold text-white">
                • Martes a Sábado: <span className="text-accent">{SCHEDULE.tueToSat}</span>
              </p>
              <p className="font-semibold text-white mt-1">
                • Domingos: <span className="text-accent">{SCHEDULE.sunday}</span>
              </p>
              <p className="text-white/60 mt-1">
                • Lunes: {SCHEDULE.monday}
              </p>
            </div>

            {/* Navigation Links */}
            <div className="md:col-span-3 flex flex-col items-center md:items-start gap-2.5 text-xs font-semibold text-white/85">
              <span className="text-accent font-bold uppercase tracking-wider block mb-1">
                Enlaces Rápidos
              </span>
              <Link to="/" className="hover:text-accent transition">
                Inicio
              </Link>
              <Link to="/catalogo" className="hover:text-accent transition">
                Catálogo de Productos
              </Link>
              <Link to="/categoria/$id" params={{ id: "helados" }} className="hover:text-accent transition">
                Helados Artesanales
              </Link>
              <Link to="/dulces" className="hover:text-accent transition">
                Dulcería por Categorías
              </Link>
              <Link to="/carrito" className="hover:text-accent transition">
                Mi Carrito de Pedido
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-3 text-center sm:text-left">
            <span>© Helados {BRAND.name} · {BRAND.slogan}</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-accent font-semibold">
              Puerto Padre, Las Tunas · Tel: {WHATSAPP_DISPLAY}
            </span>
          </div>
        </div>
      </footer>

      <BottomNav />
    </div>
  );
}

export function WhatsAppButton({
  message,
  label = "Pedir por WhatsApp",
  className = "",
}: {
  message: string;
  label?: string;
  className?: string;
}) {
  const url = whatsappUrl(message);
  if (!url)
    return (
      <div className={className}>
        <button
          type="button"
          disabled
          className="btn-whatsapp w-full min-h-[44px]"
          aria-describedby="wa-note"
        >
          <MessageCircle className="h-5 w-5" />
          <span>{label}</span>
        </button>
        <p id="wa-note" className="mt-2 text-center text-xs text-text-muted">
          WhatsApp aún no configurado: añade el número en WHATSAPP_PHONE (formato internacional sin “+”).
        </p>
      </div>
    );
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`btn-whatsapp min-h-[44px] ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      <span>{label}</span>
    </motion.a>
  );
}

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-surface border border-border/80 shadow-soft transition-colors duration-200 hover:border-primary/40 hover:shadow-hover"
    >
      <div>
        {/* 1. Imagen del producto */}
        <Link to="/producto/$id" params={{ id: p.id }} className="block overflow-hidden bg-background/50 relative">
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <span className="absolute top-2.5 left-2.5 rounded-full bg-secondary/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-primary-dark uppercase tracking-wider">
            {p.category === "helados" ? "Helado" : "Dulce"}
          </span>
        </Link>

        <div className="p-4 space-y-2">
          {/* 2. Nombre del producto */}
          <Link
            to="/producto/$id"
            params={{ id: p.id }}
            className="font-display text-base font-extrabold leading-tight text-text hover:text-primary transition-colors block line-clamp-1"
          >
            {p.name}
          </Link>

          {/* 3. Descripción */}
          <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
            {p.description || p.subtitle}
          </p>

          {/* 4. Precio */}
          <p className="text-xs font-bold text-primary-dark">
            {PRICE_LABEL}
          </p>

          {/* 5. Domicilio disponible */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary/60 px-2.5 py-1 text-[10px] font-bold text-primary-dark border border-primary/10">
            <Truck className="h-3 w-3 text-primary shrink-0" />
            <span>Domicilio disponible</span>
          </div>
        </div>
      </div>

      {/* Action Buttons Container */}
      <div className="p-4 pt-0 space-y-2">
        {/* 6. Botón compartir */}
        <ShareProductButton
          product={p}
          categoryName={p.category === "helados" ? "Helados Artesanales" : "Dulcería"}
          className="w-full"
        />

        {/* 7. Botón añadir al carrito */}
        <motion.button
          onClick={() => add(p.id)}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.15 }}
          className="w-full rounded-full bg-primary hover:bg-primary-dark py-2.5 px-4 text-xs font-bold text-white transition-colors shadow-xs hover:shadow-md cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5"
          aria-label={`Añadir ${p.name} al carrito`}
        >
          <span>Añadir al carrito</span>
        </motion.button>
      </div>
    </motion.article>
  );
}
