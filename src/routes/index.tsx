import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Cake, IceCreamCone, Sparkles, ShieldCheck, Truck, Clock } from "lucide-react";
import { Page, ProductCard, WhatsAppButton } from "@/components/Shell";
import { HowToOrder } from "@/components/HowToOrder";
import { CATEGORIES, PRODUCTS, getDulcesCategories } from "@/lib/catalog";
import { BRAND, WHATSAPP_DISPLAY } from "@/lib/config";
import hero from "@/assets/helados.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const dulcesCategories = getDulcesCategories();
  const heladosProducts = PRODUCTS.filter((p) => p.category === "helados");

  return (
    <Page>
      {/* Hero Principal con Jerarquía Visual, Paleta Oficial y Animaciones Motion */}
      <section className="mt-6 overflow-hidden rounded-[2.5rem] bg-hero border border-border md:grid md:grid-cols-12 md:items-center shadow-soft">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="p-7 sm:p-10 md:p-12 md:col-span-7 flex flex-col items-start justify-center"
        >
          {/* Badge de Marca / Detalle Promocional en Amarillo Caram (#FCD40A) con texto Azul Profundo (#02289E) */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1 text-xs font-extrabold text-primary-dark shadow-xs mb-4"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Receta 100% Artesanal · Puerto Padre</span>
          </motion.div>

          {/* Logo oficial y Eslogan */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex items-baseline gap-1 font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-primary"
          >
            <span>{BRAND.name.toLowerCase()}</span>
            <span className="text-accent text-6xl leading-none">.</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="mt-1 text-base sm:text-lg font-bold text-primary-dark"
          >
            «{BRAND.slogan}»
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold leading-[1.2] text-text"
          >
            Helados y repostería artesanal hechos con verdadera pasión
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-3 text-sm text-text-muted leading-relaxed max-w-lg"
          >
            Disfruta de nuestros 8 sabores de helados tradicionales y 10 especialidades de dulcería recién elaboradas. Consulta precios y pide directamente por WhatsApp.
          </motion.p>

          {/* Acciones principales: Botón azul (#0159E0) con texto blanco y Botón secundario en amarillo (#FCD40A) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.5 }}
            className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
          >
            <WhatsAppButton
              message="¡Hola Caram! Quiero hacer un pedido de helados y dulcería."
              label="Pedir ahora por WhatsApp"
              className="w-full sm:w-auto"
            />
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/catalogo"
                className="btn-accent text-center w-full sm:w-auto flex items-center justify-center gap-1.5"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Fotografía Real Protagonista con fade y scale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 relative bg-background/40 h-full flex items-center justify-center p-3 md:p-0"
        >
          <img
            src={hero}
            alt="Helados artesanales Caram servidos en copa"
            width={1024}
            height={1024}
            loading="eager"
            className="aspect-square w-full object-cover rounded-[2rem] md:rounded-none md:rounded-r-[2.5rem]"
          />
        </motion.div>
      </section>

      {/* Tarjetas de Confianza, Domicilio y Horarios con Staggered Viewport Entrance */}
      <motion.ul
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
        className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center"
      >
        <motion.li
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-start gap-3.5 rounded-2xl bg-surface border border-border p-4 shadow-soft"
        >
          <div className="rounded-full bg-secondary/30 p-2.5 text-primary shrink-0">
            <Truck className="h-5 w-5" />
          </div>
          <div className="text-left">
            <span className="block text-xs font-bold text-text">Domicilio en Puerto Padre</span>
            <span className="text-[11px] font-semibold text-primary-dark">Coste adicional según zona</span>
          </div>
        </motion.li>

        <motion.li
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-start gap-3.5 rounded-2xl bg-surface border border-border p-4 shadow-soft"
        >
          <div className="rounded-full bg-secondary/30 p-2.5 text-primary shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div className="text-left">
            <span className="block text-xs font-bold text-text">Horarios de Atención</span>
            <span className="text-[11px] text-text-muted">Mar-Sáb 10am–9pm · Dom 3pm–9pm</span>
          </div>
        </motion.li>

        <motion.li
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-start gap-3.5 rounded-2xl bg-surface border border-border p-4 shadow-soft"
        >
          <div className="rounded-full bg-secondary/30 p-2.5 text-primary shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="text-left">
            <span className="block text-xs font-bold text-text">WhatsApp Oficial</span>
            <span className="text-[11px] font-bold text-primary">{WHATSAPP_DISPLAY}</span>
          </div>
        </motion.li>
      </motion.ul>

      {/* Componente Visual 'Cómo Pedir' (3 Pasos: Elige Productos, Revisa Carrito, Envía WhatsApp) */}
      <HowToOrder />

      {/* Sabores de Helados Destacados (Fondo crema, tarjetas blancas con fotos reales) */}
      <section className="mt-14" aria-labelledby="helados-section-title">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border pb-3"
        >
          <div>
            <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary">
              <IceCreamCone className="h-4 w-4" />
              <span>Nuestros Helados</span>
            </div>
            <h2 id="helados-section-title" className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-primary-dark">
              8 Sabores Confirmados
            </h2>
            <p className="text-xs text-text-muted">
              Cremosos, refrescantes y elaborados con recetas tradicionales.
            </p>
          </div>
          <Link
            to="/categoria/$id"
            params={{ id: "helados" }}
            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark transition"
          >
            <span>Ver todos los sabores</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        {/* Grid de Productos Helados */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {heladosProducts.slice(0, 4).map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* Sección Destacada: Dulcería por Categorías */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mt-16 rounded-[2.5rem] bg-surface border border-border p-6 sm:p-8 md:p-10 shadow-soft"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-5">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary">
              <Cake className="h-4 w-4" />
              <span>Repostería Tradicional</span>
            </div>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-primary-dark">
              Dulcería por Categorías
            </h2>
            <p className="text-xs text-text-muted mt-1 max-w-xl">
              Descubre nuestras 10 especialidades horneadas y almibaradas: Cupcakes, Brazos de gitano, Cakes, Mini cakes, Capuchinos, Marquesitas, Merenguitos, Mantecados, Pays y Pasteles de hoja.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/dulces"
              className="btn-primary text-xs py-2 px-5 self-start sm:self-auto shrink-0 flex items-center gap-1.5"
            >
              <span>Ver toda la Dulcería</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* Grid de Categorías de Dulces */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {dulcesCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              whileHover={{ y: -3 }}
            >
              <Link
                to="/categoria/$id"
                params={{ id: cat.id }}
                className="group flex flex-col items-center rounded-2xl bg-background/60 p-3.5 text-center border border-border transition-colors hover:border-primary hover:bg-surface hover:shadow-hover h-full"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  width={120}
                  height={120}
                  className="aspect-square w-18 h-18 rounded-full object-cover ring-2 ring-primary/15 transition-transform duration-300 group-hover:scale-105"
                />
                <span className="mt-2.5 text-xs font-bold leading-tight text-text group-hover:text-primary transition-colors line-clamp-1">
                  {cat.name}
                </span>
                <span className="mt-1 text-[10px] text-text-muted line-clamp-1">
                  {cat.description}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Banner de Pedido / Llamada a la Acción para WhatsApp con Alta Conversión */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mt-16 rounded-[2.5rem] bg-gradient-to-br from-surface to-background border border-border p-8 sm:p-10 text-center shadow-soft"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 rounded-full bg-accent/30 text-primary-dark px-3.5 py-1 text-xs font-extrabold mb-3"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>Atención Inmediata</span>
        </motion.div>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-primary-dark">
          ¿Tienes antojo de algo dulce y delicioso?
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-text-muted max-w-lg mx-auto leading-relaxed">
          Escríbenos directamente por WhatsApp ({WHATSAPP_DISPLAY}). Te confirmamos disponibilidad, precios y entrega al instante sin complicaciones.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <WhatsAppButton
            message="¡Hola Caram! Quisiera consultar precios y disponibilidad para hacer un pedido."
            label="Escribir por WhatsApp"
            className="w-full sm:w-auto"
          />
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/catalogo"
              className="btn-accent w-full sm:w-auto text-center flex items-center justify-center gap-1.5"
            >
              <span>Ver Catálogo Completo</span>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </Page>
  );
}
