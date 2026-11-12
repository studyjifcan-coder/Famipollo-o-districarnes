import React from "react";
import { Plus, Tag } from "lucide-react";
import { toast } from "sonner";
import { Image } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/CartContext";
import { CATEGORIES, PROMO } from "@/lib/catalog";
import { formatCOP } from "@/lib/format";

export default function ProductCard({ product }) {
  const { add } = useCart();
  const category = CATEGORIES.find((item) => item.id === product.category);

  const handleAdd = () => {
    add(product.id);
    toast.success(`${product.name} agregado`, { description: `${formatCOP(product.price)} / ${product.unit}` });
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground backdrop-blur">
          {category?.label ?? product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-lg font-bold leading-snug">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{product.note ?? `Vendido por ${product.unit}`}</p>
        <p className="mt-3 flex items-start gap-1.5 rounded-xl bg-accent/20 px-2.5 py-2 text-[11px] font-semibold leading-snug">
          <Tag className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
          {PROMO.text}
        </p>
        <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-baseline gap-2">
            <p className="font-heading text-2xl font-extrabold leading-none text-primary">{formatCOP(product.price)}</p>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">por {product.unit}</p>
          </div>
          <Button
            onClick={handleAdd}
            className="h-11 w-full rounded-full text-sm font-semibold sm:w-auto sm:px-5"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Agregar
          </Button>
        </div>
      </div>
    </article>
  );
}