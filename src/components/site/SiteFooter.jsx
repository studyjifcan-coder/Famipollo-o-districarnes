import React from "react";
import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { CATEGORIES, STORE, WHATSAPP_DISPLAY } from "@/lib/catalog";
import { GENERAL_MESSAGE, whatsappLink } from "@/lib/whatsapp";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary font-heading text-lg font-extrabold text-primary-foreground">
              F
            </span>
            <span className="font-heading text-lg font-extrabold">Famipollo</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Distribuidora de pollo, res, cerdo, pescados y embutidos a domicilio en Cali desde {STORE.since}.
          </p>
        </div>

        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">Productos</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {CATEGORIES.filter((category) => category.id !== "todos").map((category) => (
              <li key={category.id}>
                <Link to="/catalogo" className="transition hover:text-foreground">
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">Contacto</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {STORE.address}
                <br />
                {STORE.city}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              {WHATSAPP_DISPLAY}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              {STORE.email}
            </li>
          </ul>
        </div>

        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">Pedidos</p>
          <p className="mt-3 text-sm text-muted-foreground">{STORE.hours}</p>
          <p className="mt-1 text-sm text-muted-foreground">Domicilios: {STORE.zones}</p>
          <a
            href={whatsappLink(GENERAL_MESSAGE)}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-whatsapp-foreground transition hover:bg-whatsapp/90"
          >
            <MessageCircle className="h-4 w-4" />
            Escribir por WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {STORE.since}–2026 Famipollo · Distribuidora de carnes</p>
          <p>Productos con certificación INVIMA · Pago contraentrega en Cali</p>
        </div>
      </div>
    </footer>
  );
}