import React from "react";
import { Image } from "@/components/ui/image";
import { HERO_IMAGE, STORE } from "@/lib/catalog";

const stats = [
  { value: "15+", label: "años distribuyendo" },
  { value: "INVIMA", label: "certificación sanitaria" },
  { value: "Cali", label: "entrega el mismo día" },
];

export default function AboutSection() {
  return (
    <section id="nosotros" className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="order-2 overflow-hidden rounded-[2rem] border border-border lg:order-1">
          <Image
            src={HERO_IMAGE}
            alt="Selección de carnes frescas de Famipollo"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Somos Famipollo</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Una carnicería de barrio, ahora también en línea
          </h2>
          <p className="mt-4 text-muted-foreground">
            Nacimos en {STORE.since} con una idea sencilla: ofrecer productos cárnicos de la máxima calidad muy cerca de
            tu casa, con atención personalizada. Hoy llevamos esa misma carnicería a tu celular, con cortes frescos por
            libra y entrega a domicilio en Cali desde nuestra sede en la {STORE.address}.
          </p>
          <p className="mt-3 text-muted-foreground">
            Trabajamos con proveedores certificados y mantenemos la cadena de frío en cada entrega, para que tu pedido
            llegue en perfectas condiciones y listo para cocinar.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-card p-4 text-center">
                <p className="font-heading text-xl font-extrabold text-primary">{stat.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}