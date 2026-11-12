import React from "react";
import { Check, MessageCircle, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { FREE_DELIVERY_FROM, HERO_IMAGE, PROMO } from "@/lib/catalog";
import { formatCOP } from "@/lib/format";
import { GENERAL_MESSAGE, whatsappLink } from "@/lib/whatsapp";

const bullets = ["Cortes frescos por libra", "Pedido por WhatsApp en 2 minutos", "Entrega el mismo día en Cali"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/70 via-background to-background">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <Star className="h-3.5 w-3.5 fill-primary" />
            Desde 2011 en Cali · Galería Santa Elena
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
            Pollo, res y cerdo <span className="text-primary">fresco</span> a tu puerta
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Carnicería en línea con cortes del día por libra. Pide por WhatsApp y paga contraentrega cuando recibas.
            Domicilio gratis desde {formatCOP(FREE_DELIVERY_FROM)}.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
              <a href={whatsappLink(GENERAL_MESSAGE)} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Pedir por WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-foreground/20">
              <Link to="/catalogo">Ver catálogo</Link>
            </Button>
          </div>

          <ul className="mt-8 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3 w-3" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl">
            <Image
              src={HERO_IMAGE}
              alt="Cortes frescos de pollo, res y cerdo sobre mesa de carnicería"
              className="aspect-[4/5] w-full object-cover sm:aspect-square lg:aspect-[4/5]"
            />
          </div>
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur sm:right-auto sm:w-64">
            <p className="text-[11px] font-bold uppercase tracking-wider text-primary">Promo de la semana</p>
            <p className="mt-1 font-heading text-lg font-bold leading-tight">
              10% de descuento desde {formatCOP(PROMO.min)}
            </p>
            <p className="text-xs text-muted-foreground">Domicilio gratis desde {formatCOP(FREE_DELIVERY_FROM)} en Cali</p>
          </div>
        </div>
      </div>
    </section>
  );
}