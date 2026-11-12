import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/site/ProductCard";
import { CATEGORIES } from "@/lib/catalog";

export default function ProductCatalog({ products, eyebrow, title, description, showFilters = true }) {
  const [category, setCategory] = useState("todos");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "todos" || product.category === category;
      const matchesSearch = !term || product.name.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [products, category, query]);

  return (
    <section id="catalogo" className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
          {description && <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">{description}</p>}
        </div>
        {showFilters && (
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar corte..."
              className="h-11 rounded-full border-border bg-card pl-9"
            />
          </div>
        )}
      </div>

      {showFilters && (
        <div className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition active:scale-[0.98] ${
                category === item.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-border bg-card p-10 text-center">
          <p className="font-heading text-lg font-bold">No encontramos ese corte</p>
          <p className="mt-1 text-sm text-muted-foreground">Prueba con otra palabra o escríbenos por WhatsApp.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}