import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { toast } from "sonner";
import { Image } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/CartContext";
import { CATEGORIES, FEATURED_PRODUCTS, PROMO } from "@/lib/catalog";
import { formatCOP } from "@/lib/format";

const AUTOPLAY_MS = 5000;

export default function RotatingMenu() {
  const products = FEATURED_PRODUCTS;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const swipeStart = useRef(null);
  const { add } = useCart();
  const total = products.length;

  useEffect(() => {
    if (paused || total < 2) return undefined;
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, total]);

  const go = (delta) => setIndex((prev) => (prev + delta + total) % total);

  const handleTouchStart = (event) => {
    setPaused(true);
    swipeStart.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (swipeStart.current === null) return;
    const delta = event.changedTouches[0].clientX - swipeStart.current;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
    swipeStart.current = null;
  };

  const handleAdd = (product) => {
    add(product.id);
    toast.success(`${product.name} agregado`, { description: `${formatCOP(product.price)} / ${product.unit}` });
  };

  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Menú rotatorio</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-4xl">Los favoritos de la casa</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            Desliza o usa las flechas para ver más cortes. Rota solo cada pocos segundos.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-xs font-bold text-foreground">
          {PROMO.text}
        </span>
      </div>

      <div
        className="relative mt-6 touch-pan-y overflow-hidden rounded-3xl border border-border bg-card shadow-sm sm:rounded-[2rem]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-full shrink-0">
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted md:aspect-auto md:min-h-[26rem]">
                  <Image src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur">
                    {CATEGORIES.find((category) => category.id === product.category)?.label ?? product.category}
                  </span>
                </div>
                <div className="flex flex-col justify-center gap-4 p-5 sm:p-9">
                  <div>
                    <h3 className="line-clamp-2 font-heading text-xl font-extrabold leading-tight sm:text-3xl">
                      {product.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm text-muted-foreground">
                      {product.note ?? `Vendido por ${product.unit}`}
                    </p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-3xl font-extrabold text-primary">{formatCOP(product.price)}</span>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">por {product.unit}</span>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button
                      onClick={() => handleAdd(product)}
                      size="lg"
                      className="h-12 w-full rounded-full text-sm font-semibold sm:w-auto sm:px-6"
                    >
                      <Plus className="mr-1.5 h-4 w-4" />
                      Agregar al pedido
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-12 w-full rounded-full border-foreground/20 sm:w-auto"
                    >
                      <a href="#catalogo">Ver más cortes</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Producto anterior"
          className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-background/90 p-2 shadow-md transition hover:bg-background md:grid"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Producto siguiente"
          className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-background/90 p-2 shadow-md transition hover:bg-background md:grid"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Producto anterior"
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition active:scale-95 md:hidden"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1">
          {products.map((product, dotIndex) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`Ver ${product.name}`}
              aria-current={dotIndex === index}
              className="grid h-9 place-items-center px-1"
            >
              <span
                className={`block h-2 rounded-full transition-all ${
                  dotIndex === index ? "w-7 bg-primary" : "w-2 bg-border"
                }`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Producto siguiente"
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition active:scale-95 md:hidden"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}