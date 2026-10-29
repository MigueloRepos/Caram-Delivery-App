import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Page, ProductCard } from "@/components/Shell";
import { CATEGORIES, PRODUCTS, getDulcesCategories, type CategoryId } from "@/lib/catalog";
import { Cake, Sparkles, Filter, Search, X } from "lucide-react";

export const Route = createFileRoute("/dulces")({
  head: () => ({
    meta: [
      { title: "Dulcería Artesanal por Categorías — Helados Caram" },
      {
        name: "description",
        content:
          "Descubre nuestra dulcería artesanal organizada por categorías: Cupcakes, Brazos de gitano, Cakes, Mini cakes, Capuchinos, Marquesitas, Merenguitos, Mantecados, Pays y Pasteles de hoja.",
      },
      { property: "og:title", content: "Dulcería — Helados Caram" },
      { property: "og:description", content: "Nuestra selección de repostería artesanal por categorías." },
    ],
  }),
  component: Dulces,
});

function Dulces() {
  const dulcesCategories = getDulcesCategories();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | "todas">("todas");
  const [searchQuery, setSearchQuery] = useState("");

  const normalize = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filteredCategories =
    selectedCategory === "todas"
      ? dulcesCategories
      : dulcesCategories.filter((c) => c.id === selectedCategory);

  return (
    <Page>
      {/* Hero Banner Dulcería con Animación Motion */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 overflow-hidden rounded-[2.5rem] bg-hero p-6 sm:p-8 md:p-10 shadow-soft border border-border"
      >
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-primary">
          <Sparkles className="h-4 w-4" />
          <span>Repostería Tradicional Hecha a Mano</span>
        </div>
        <h1 className="mt-2 font-display text-3xl font-extrabold md:text-5xl text-primary-dark">
          Dulcería por Categorías
        </h1>
        <p className="mt-2 max-w-xl text-sm md:text-base text-text-muted leading-relaxed">
          Cada dulce es elaborado diariamente con ingredientes selectos. Explora nuestras 10 especialidades,
          selecciona tus favoritos y haz tu pedido directamente por WhatsApp.
        </p>

        {/* Category count pill */}
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-surface border border-border px-3.5 py-1 text-primary-dark shadow-xs font-bold">
            10 Especialidades Dulces
          </span>
          <span className="rounded-full bg-surface border border-border px-3.5 py-1 text-text shadow-xs">
            Recetas Tradicionales
          </span>
          <span className="rounded-full bg-surface border border-border px-3.5 py-1 text-text shadow-xs">
            Elaboración Diaria
          </span>
        </div>
      </motion.section>

      {/* Filter / Category Selector Bar & Search */}
      <div className="mt-8">
        <div className="relative mb-3">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar en dulcería (ej: cupcake, brazo de gitano, pay, merenguito)..."
            className="w-full rounded-full border border-border bg-surface py-2.5 pl-9 pr-9 text-xs text-text placeholder:text-text-muted shadow-soft focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted">
            <Search className="h-3.5 w-3.5" />
          </div>
          {searchQuery && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted hover:text-text cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </motion.button>
          )}
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-muted">
            <Filter className="h-3.5 w-3.5 text-primary" />
            <span>Filtrar por categoría</span>
          </div>
          {selectedCategory !== "todas" && (
            <button
              onClick={() => setSelectedCategory("todas")}
              className="text-xs font-bold text-primary hover:underline cursor-pointer"
            >
              Ver todas ({dulcesCategories.length})
            </button>
          )}
        </div>

        {/* Horizontal Scrollable Category Chips */}
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2" role="tablist">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setSelectedCategory("todas")}
            className={`chip cursor-pointer transition-colors ${
              selectedCategory === "todas"
                ? "bg-primary text-white font-bold border-primary shadow-xs"
                : "hover:bg-surface"
            }`}
          >
            Todas ({dulcesCategories.length})
          </motion.button>
          {dulcesCategories.map((c) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={c.id}
              type="button"
              onClick={() => setSelectedCategory(c.id)}
              className={`chip cursor-pointer transition-colors ${
                selectedCategory === c.id
                  ? "bg-primary text-white font-bold border-primary shadow-xs"
                  : "hover:bg-surface"
              }`}
            >
              {c.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Categories Visual Grid when "todas" is selected */}
      <AnimatePresence>
        {selectedCategory === "todas" && !searchQuery && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {dulcesCategories.map((cat, idx) => {
                const productCount = PRODUCTS.filter((p) => p.category === cat.id).length;
                return (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="group flex flex-col items-center rounded-2xl bg-surface border border-border p-3 text-center shadow-soft transition-colors hover:border-primary/50 hover:shadow-hover cursor-pointer"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      width={120}
                      height={120}
                      className="aspect-square w-18 h-18 rounded-full object-cover ring-2 ring-primary/15 transition-transform group-hover:scale-105"
                    />
                    <span className="mt-2 text-xs font-bold leading-tight text-text group-hover:text-primary transition-colors line-clamp-1">
                      {cat.name}
                    </span>
                    <span className="mt-0.5 text-[10px] text-text-muted font-medium">{productCount} producto</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Categorized Products Display */}
      <div className="mt-10 space-y-12">
        {filteredCategories.map((cat) => {
          const q = normalize(searchQuery.trim());
          const catProducts = PRODUCTS.filter((p) => {
            if (p.category !== cat.id) return false;
            if (!q) return true;
            return (
              normalize(p.name).includes(q) ||
              normalize(cat.name).includes(q) ||
              (p.description ? normalize(p.description).includes(q) : false)
            );
          });

          if (q && catProducts.length === 0) return null;

          return (
            <motion.section
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4 }}
              className="scroll-mt-20"
              id={`categoria-${cat.id}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border pb-3 gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src={cat.image}
                    alt=""
                    width={50}
                    height={50}
                    className="h-12 w-12 rounded-xl object-cover shadow-soft ring-1 ring-border"
                  />
                  <div>
                    <h2 className="font-display text-2xl font-extrabold text-primary-dark">{cat.name}</h2>
                    <p className="text-xs text-text-muted">{cat.description}</p>
                  </div>
                </div>
                <Link
                  to="/categoria/$id"
                  params={{ id: cat.id }}
                  className="text-xs font-bold text-primary hover:text-primary-dark hover:underline self-start sm:self-auto"
                >
                  Ver categoría individual →
                </Link>
              </div>

              {catProducts.length > 0 ? (
                <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {catProducts.map((p) => (
                    <ProductCard key={p.id} p={p} />
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-xs text-text-muted italic">
                  Próximamente más variedades en esta categoría.
                </p>
              )}
            </motion.section>
          );
        })}
      </div>
    </Page>
  );
}
