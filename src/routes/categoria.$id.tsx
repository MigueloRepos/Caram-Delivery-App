import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Page, ProductCard } from "@/components/Shell";
import { CATEGORIES, PRODUCTS, getCategory } from "@/lib/catalog";

export const Route = createFileRoute("/categoria/$id")({
  loader: ({ params }) => {
    const c = getCategory(params.id);
    if (!c) throw notFound();
    return { name: c.name };
  },
  component: CategoriaPage,
});

function CategoriaPage() {
  const { id } = Route.useParams();
  const cat = getCategory(id);
  if (!cat) return null;

  const productsInCat = PRODUCTS.filter((p) => p.category === id);

  return (
    <Page>
      {/* Breadcrumb / Back Navigation */}
      <div className="mt-4 flex items-center justify-between">
        <Link
          to={cat.group === "dulces" ? "/dulces" : "/catalogo"}
          className="inline-flex items-center gap-1 text-xs font-semibold text-text-muted hover:text-text transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Volver a {cat.group === "dulces" ? "Dulcería" : "Catálogo"}</span>
        </Link>
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          {cat.group === "dulces" ? "Dulcería Caram" : "Heladería Caram"}
        </span>
      </div>

      {/* Categories chips horizontal scroll */}
      <div className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1" role="tablist" aria-label="Categorías">
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            to="/categoria/$id"
            params={{ id: c.id }}
            className="chip"
            aria-current={c.id === id ? "page" : undefined}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {/* Category Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6 flex items-center gap-4 rounded-3xl bg-surface border border-border p-5 shadow-soft"
      >
        <img
          src={cat.image}
          alt={cat.name}
          width={120}
          height={120}
          className="h-20 w-20 rounded-2xl object-cover ring-2 ring-primary/20 shrink-0"
        />
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-primary-dark">{cat.name}</h1>
          <p className="mt-1 text-xs md:text-sm text-text-muted">{cat.description}</p>
          <span className="mt-2 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-bold text-primary-dark">
            {id === "helados" ? "8 sabores confirmados" : `${productsInCat.length} producto(s)`}
          </span>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {productsInCat.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </Page>
  );
}
