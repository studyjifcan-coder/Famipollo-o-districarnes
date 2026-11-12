import React from "react";
import { ChefHat, PackageCheck, ShoppingBasket, Truck } from "lucide-react";

const steps = [
  { icon: ShoppingBasket, title: "Elige", text: "Selecciona pollo, res, cerdo, pescados, embutidos o lácteos por libra." },
  { icon: Truck, title: "Recibe", text: "Llevamos tu pedido a tu domicilio en Cali el mismo día." },
  { icon: ChefHat, title: "Prepara", text: "Todo llega limpio, empacado y listo para cocinar." },
  { icon: PackageCheck, title: "Disfruta", text: "Paga contraentrega en efectivo o con datáfono." },
];

export default function HowItWorks() {
  return (
    <section className="border-y border-border bg-secondary/50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Así de fácil</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Tu pedido en cuatro pasos</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <div key={title} className="rounded-3xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-heading text-2xl font-extrabold text-border">0{index + 1}</span>
              </div>
              <p className="mt-3 font-heading text-lg font-bold">{title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}