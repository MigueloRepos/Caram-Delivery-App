import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Page, ProductCard } from "@/components/Shell";
import {
  CATEGORIES,
  PRODUCTS,
  getDulcesCategories,
  type Product,
} from "@/lib/catalog";
import { Search, X, IceCreamCone, Cake, Sparkles, ArrowRight, Filter } from "lucide-react";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo de Productos — Helados Caram" },
      {
        name: "description",
        content:
          "Busca y filtra entre todos nuestros sabores de helados y especialidades de dulcería artesanal en Helados Caram.",
      },
      { property: "og:title", content: "Catálogo de Productos — Helados Caram" },
      {
        property: "og:description",
        content: "Encuentra tus helados y dulces favoritos al instante.",
      },
    ],
  }),
  component: Catalogo,
});

type FilterType = "todos" | "helados" | "dulces";

const POPULAR_FLAVORS = [
  "Mantecado",
  "Tiramisú",
  "Chocolate",
  "Fresa",
  "Tres Leches",
  "Cupcakes",
  "Mini Cakes",
];

export default function Catalogo() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("todos");

  const normalize = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  // Real-time filter across both ice creams and sweets
  const filteredProducts = useMemo(() => {
    const q = normalize(searchQuery.trim());

    return PRODUCTS.filter((p) => {
      // Group filter check
      if (activeFilter === "helados" && p.category !== "helados") return false;
      if (activeFilter === "dulces" && p.category === "helados") return false;

      // Search query check
      if (!q) return true;

      const matchName = normalize(p.name).includes(q);
      const matchVariant = p.variant ? normalize(p.variant).includes(q) : false;
      const matchCategory = normalize(p.category).includes(q);
      const matchSubtitle = normalize(p.subtitle).includes(q);
      const matchDescription = p.description ? normalize(p.description).includes(q) : false;

      return matchName || matchVariant || matchCategory || matchSubtitle || matchDescription;
    });
  }, [searchQuery, activeFilter]);

  const heladosCount = PRODUCTS.filter((p) => p.category === "helados").length;
  const dulcesCount = PRODUCTS.filter((p) => p.category !== "helados").length;

  return (
    <Page>
      {/* Title & Introduction */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="pt-4 pb-2"
      >
        <h1 className="font-display text-3xl font-extrabold md:text-4xl text-primary-dark">
          Catálogo de Productos
        </h1>
        <p className="mt-1 text-xs md:text-sm text-text-muted">
          Encuentra rápidamente cualquier sabor de helado o postre artesanal por su nombre.
        </p>
      </motion.div>

      {/* Sticky Search Bar Section */}
      <div className="sticky top-[53px] z-20 -mx-5 bg-background/95 px-5 py-3 backdrop-blur-md border-b border-border shadow-xs transition-all">
        {/* Prominent Search Input Box */}
        <div className="relative">
          <label htmlFor="product-search" className="sr-only">
            Buscar helados o postres por nombre
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-primary">
            <Search className="h-4 w-4" />
          </div>
          <input
            id="product-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por sabor de helado o dulce (ej. Mantecado, Tiramisú, Cupcakes, Chocolate)..."
            className="w-full rounded-full border-2 border-primary/30 bg-surface py-2.5 pl-10 pr-10 text-xs md:text-sm font-medium text-text placeholder:text-text-muted shadow-soft focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          {searchQuery && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-text-muted hover:text-text cursor-pointer"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </div>

        {/* Quick Filter Tabs & Quick Flavor Chips */}
        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
          {/* Main Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5" role="tablist">
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => setActiveFilter("todos")}
              className={`chip text-[11px] py-1 px-3 cursor-pointer transition-colors ${
                activeFilter === "todos"
                  ? "bg-primary text-white font-bold border-primary shadow-xs"
                  : "hover:bg-surface"
              }`}
            >
              Todos ({PRODUCTS.length})
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => setActiveFilter("helados")}
              className={`chip text-[11px] py-1 px-3 flex items-center gap-1 cursor-pointer transition-colors ${
                activeFilter === "helados"
                  ? "bg-primary text-white font-bold border-primary shadow-xs"
                  : "hover:bg-surface"
              }`}
            >
              <IceCreamCone className="h-3 w-3" />
              <span>Helados ({heladosCount})</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => setActiveFilter("dulces")}
              className={`chip text-[11px] py-1 px-3 flex items-center gap-1 cursor-pointer transition-colors ${
                activeFilter === "dulces"
                  ? "bg-primary text-white font-bold border-primary shadow-xs"
                  : "hover:bg-surface"
              }`}
            >
              <Cake className="h-3 w-3" />
              <span>Dulcería ({dulcesCount})</span>
            </motion.button>
          </div>

          {/* Quick Clear Button */}
          {(searchQuery || activeFilter !== "todos") && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("todos");
              }}
              className="text-[11px] font-bold text-primary hover:underline shrink-0 cursor-pointer"
            >
              Restablecer filtros
            </motion.button>
          )}
        </div>

        {/* Popular Flavor Suggestions Bar */}
        <div className="mt-2 flex items-center gap-1.5 overflow-x-auto text-[10px] text-text-muted">
          <span className="font-bold uppercase tracking-wider text-primary shrink-0">
            Sugerencias:
          </span>
          {POPULAR_FLAVORS.map((flavor) => (
            <button
              key={flavor}
              onClick={() => setSearchQuery(flavor)}
              className="rounded-full bg-surface border border-border px-2 py-0.5 text-text hover:border-primary hover:text-primary transition cursor-pointer shrink-0"
            >
              {flavor}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results / Product List */}
      <div className="mt-6">
        {/* Results Feedback Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-text-muted">
            {searchQuery ? (
              <>
                Resultados para <strong className="text-primary-dark font-bold">"{searchQuery}"</strong> (
                {filteredProducts.length})
              </>
            ) : activeFilter !== "todos" ? (
              <>
                Mostrando {activeFilter === "helados" ? "Helados" : "Dulcería"} (
                {filteredProducts.length})
              </>
            ) : (
              `Todos los productos (${filteredProducts.length})`
            )}
          </span>

          {searchQuery && (
            <span className="text-[11px] text-primary font-bold">
              Búsqueda activa
            </span>
          )}
        </div>

        {/* Empty State */}
        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mt-8 rounded-3xl bg-surface border border-border p-8 text-center shadow-soft max-w-md mx-auto"
            >
              <Search className="mx-auto h-10 w-10 text-primary/60" />
              <h3 className="mt-3 font-display text-lg font-bold text-primary-dark">
                No encontramos productos con "{searchQuery}"
              </h3>
              <p className="mt-1 text-xs text-text-muted">
                Intenta buscar por otro nombre de sabor o selecciona una de nuestras sugerencias.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {POPULAR_FLAVORS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchQuery(suggestion)}
                    className="chip text-[11px] py-1 px-2.5 cursor-pointer hover:bg-secondary"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("todos");
                }}
                className="btn-primary mt-5 text-xs py-2 px-5 cursor-pointer"
              >
                Ver todos los productos
              </motion.button>
            </motion.div>
          ) : (
            /* Products Grid with Entrance */
            <motion.div
              key="products-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-4 md:grid-cols-4"
            >
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Helpful shortcut banner to Dulcería por Categorías */}
      {!searchQuery && activeFilter === "todos" && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="mt-12 rounded-3xl bg-surface p-6 shadow-soft border border-border"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles className="h-4 w-4" />
                <span>Especialidades de Repostería</span>
              </div>
              <h3 className="mt-1 font-display text-xl font-bold text-primary-dark">
                ¿Prefieres navegar por categorías de dulcería?
              </h3>
              <p className="mt-1 text-xs text-text-muted max-w-md">
                Accede a la sección de dulcería organizada con las 10 categorías: Cupcakes, Brazos de gitano, Cakes, Mini cakes, Capuchinos, Marquesitas, Merenguitos, Mantecados, Pays y Pasteles de hoja.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/dulces"
                className="btn-primary text-xs py-2.5 px-5 shrink-0 flex items-center gap-1.5"
              >
                <span>Ir a Dulcería por Categorías</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>
        </motion.section>
      )}
    </Page>
  );
}
