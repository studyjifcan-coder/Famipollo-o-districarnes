import React from "react";
import { ChefHat, Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Image } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/CartContext";
import { findProduct } from "@/lib/catalog";
import { formatCOP } from "@/lib/format";
import { GENERAL_MESSAGE, whatsappLink } from "@/lib/whatsapp";

export default function AdvisorResult({ result }) {
  const { add } = useCart();
  const picks = (result?.picks ?? [])
    .map((pick) => ({ ...pick, product: findProduct(pick.product_id) }))
    .filter((pick) => pick.product);

  return (
    <div className="mt-8 rounded-3xl border border-background/15 bg-background/5 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-heading text-xl font-bold leading-tight sm:text-2xl">{result.headline}</h3>
          <p className="mt-1.5 text-sm text-background/70">{result.advice}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {picks.map(({ product, reason, quantity }) => (
          <article key={product.id} className="flex gap-3 rounded-2xl bg-background/10 p-3">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-background/20">
              <Image src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold leading-snug">{product.name}</p>
              <p className="text-xs text-background/60">
                {quantity} x {product.unit} · {formatCOP(product.price * quantity)}
              </p>
              <p className="mt-1 line-clamp-2 text-[11px] text-background/70">{reason}</p>
              <Button
                size="sm"
                onClick={() => {
                  add(product.id, quantity);
                  toast.success(`${quantity} x ${product.name} agregado`);
                }}
                className="mt-2 h-9 w-full rounded-full bg-accent px-3 text-xs font-bold text-accent-foreground hover:bg-accent/90"
              >
                <Plus className="mr-1 h-3.5 w-3.5" />
                Agregar
              </Button>
            </div>
          </article>
        ))}
      </div>

      {result.tips?.length > 0 && (
        <div className="mt-5 rounded-2xl border border-background/15 p-4">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
            <ChefHat className="h-4 w-4" />
            Cómo filetear y preparar
          </p>
          <ul className="mt-3 space-y-2.5">
            {result.tips.map((tip) => (
              <li key={tip.title} className="text-sm">
                <span className="font-semibold">{tip.title}: </span>
                <span className="text-background/70">{tip.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-background/60">¿Prefieres hablar con un asesor humano?</p>
        <Button
          asChild
          size="sm"
          className="rounded-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
        >
          <a href={whatsappLink(GENERAL_MESSAGE)} target="_blank" rel="noreferrer">
            Escribir por WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}