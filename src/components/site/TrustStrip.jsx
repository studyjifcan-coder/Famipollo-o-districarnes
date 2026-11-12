import React from "react";
import { BadgeCheck, Banknote, MapPin, Truck } from "lucide-react";

const items = [
  { icon: Banknote, title: "Pago contraentrega", text: "Efectivo o datáfono al recibir" },
  { icon: Truck, title: "Domicilio gratis", text: "En Cali desde $100.000" },
  { icon: BadgeCheck, title: "Certificación INVIMA", text: "Cadena de frío y salubridad" },
  { icon: MapPin, title: "Cortes del día", text: "Preparados listos para cocinar" },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold">{title}</p>
              <p className="text-xs text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}