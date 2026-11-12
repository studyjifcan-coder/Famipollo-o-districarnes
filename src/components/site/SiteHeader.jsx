import React from "react";
import { Link } from "@tanstack/react-router";
import { MessageCircle, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/CartContext";
import CartSheet from "@/components/site/CartSheet";
import { FREE_DELIVERY_FROM, WHATSAPP_DISPLAY } from "@/lib/catalog";
import { formatCOP } from "@/lib/format";
import { GENERAL_MESSAGE, whatsappLink } from "@/lib/whatsapp";

const navLinks = [
  { label: "Catálogo", to: "/catalogo" },
  { label: "Nosotros", hash: "nosotros" },
  { label: "Contacto", hash: "contacto" },
];

export default function SiteHeader() {
  const { count, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-foreground text-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 text-[11px] sm:text-xs">
          <p className="truncate opacity-90">
            Domicilio gratis en Cali desde {formatCOP(FREE_DELIVERY_FROM)} · Pago contraentrega
          </p>
          <a
            href={whatsappLink(GENERAL_MESSAGE)}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 font-semibold sm:flex"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            {WHATSAPP_DISPLAY}
          </a>
        </div>
      </div>

      <div className="border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary font-heading text-lg font-extrabold text-primary-foreground">
              F
            </span>
            <span className="leading-none">
              <span className="block font-heading text-lg font-extrabold tracking-tight">Famipollo</span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Distribuidora de carnes
              </span>
            </span>
          </Link>

          <nav className="ml-6 hidden items-center gap-6 text-sm font-semibold text-muted-foreground md:flex">
            {navLinks.map((link) =>
              link.to ? (
                <Link key={link.label} to={link.to} className="transition hover:text-foreground">
                  {link.label}
                </Link>
              ) : (
                <Link key={link.label} to="/" hash={link.hash} className="transition hover:text-foreground">
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <a
              href={whatsappLink(GENERAL_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-whatsapp-foreground transition hover:bg-whatsapp/90 sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <Button onClick={openCart} variant="outline" className="relative rounded-full">
              <ShoppingBasket className="h-4 w-4" />
              <span className="hidden sm:inline">Carrito</span>
              {count > 0 && (
                <span className="ml-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                  {count}
                </span>
              )}
            </Button>
          </div>
        </div>

        <nav className="flex gap-5 overflow-x-auto border-t border-border/60 px-4 py-2 text-xs font-semibold text-muted-foreground md:hidden">
          {navLinks.map((link) =>
            link.to ? (
              <Link key={link.label} to={link.to} className="shrink-0 transition hover:text-foreground">
                {link.label}
              </Link>
            ) : (
              <Link key={link.label} to="/" hash={link.hash} className="shrink-0 transition hover:text-foreground">
                {link.label}
              </Link>
            ),
          )}
        </nav>
      </div>

      <CartSheet />
    </header>
  );
}