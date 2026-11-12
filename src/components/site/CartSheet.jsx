import React from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Progress } from "@/components/ui/progress";
import { useCart } from "@/components/cart/CartContext";
import { FREE_DELIVERY_FROM, PROMO } from "@/lib/catalog";
import { formatCOP } from "@/lib/format";

export default function CartSheet() {
  const { items, isOpen, closeCart, setQty, remove, subtotal, delivery, discount, missingForPromo, total, count } =
    useCart();
  const missing = Math.max(FREE_DELIVERY_FROM - subtotal, 0);
  const progress = Math.min((subtotal / FREE_DELIVERY_FROM) * 100, 100);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4 text-left">
          <SheetTitle className="font-heading text-xl">Tu pedido ({count})</SheetTitle>
          <SheetDescription>Domicilio gratis en Cali desde {formatCOP(FREE_DELIVERY_FROM)}.</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-secondary text-primary">
              <ShoppingBasket className="h-6 w-6" />
            </span>
            <p className="font-heading text-lg">Tu carrito está vacío</p>
            <p className="text-sm text-muted-foreground">Agrega pollo, res o cerdo por libra y paga contraentrega.</p>
            <Button asChild className="mt-2 rounded-full">
              <Link to="/catalogo" onClick={closeCart}>
                Ver catálogo
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <Image src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatCOP(item.price)} / {item.unit}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center rounded-full border border-border">
                          <button
                            type="button"
                            onClick={() => setQty(item.id, item.qty - 1)}
                            className="grid h-7 w-7 place-items-center text-muted-foreground transition hover:text-foreground"
                            aria-label={`Quitar una unidad de ${item.name}`}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(item.id, item.qty + 1)}
                            className="grid h-7 w-7 place-items-center text-muted-foreground transition hover:text-foreground"
                            aria-label={`Agregar una unidad de ${item.name}`}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="ml-auto text-sm font-bold">{formatCOP(item.lineTotal)}</span>
                        <button
                          type="button"
                          onClick={() => remove(item.id)}
                          className="text-muted-foreground transition hover:text-destructive"
                          aria-label={`Eliminar ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border bg-card px-5 py-4">
              <p className="mb-3 rounded-xl bg-accent/20 px-3 py-2 text-[11px] font-semibold leading-snug">
                {discount > 0
                  ? `¡Aplicaste el ${PROMO.percent}% de descuento!`
                  : `${PROMO.text} · te faltan ${formatCOP(missingForPromo)}`}
              </p>
              {missing > 0 && (
                <div className="mb-3">
                  <p className="mb-1.5 text-xs text-muted-foreground">
                    Te faltan <span className="font-semibold text-foreground">{formatCOP(missing)}</span> para el domicilio gratis.
                  </p>
                  <Progress value={progress} className="h-1.5" />
                </div>
              )}
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-medium">{formatCOP(subtotal)}</dd>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-whatsapp">
                    <dt>Descuento {PROMO.percent}%</dt>
                    <dd className="font-medium">-{formatCOP(discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Domicilio</dt>
                  <dd className="font-medium">{delivery === 0 ? "Gratis" : formatCOP(delivery)}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-base">
                  <dt className="font-heading font-bold">Total</dt>
                  <dd className="font-heading font-bold text-primary">{formatCOP(total)}</dd>
                </div>
              </dl>
              <Button asChild size="lg" className="mt-4 w-full rounded-full">
                <Link to="/pedido" onClick={closeCart}>
                  Finalizar pedido
                </Link>
              </Button>
              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                Confirmas y pagas contraentrega en Cali.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}