import React from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STORE, WHATSAPP_DISPLAY } from "@/lib/catalog";
import { GENERAL_MESSAGE, whatsappLink } from "@/lib/whatsapp";

const details = [
  { icon: MapPin, title: "Dirección", text: `${STORE.address}, ${STORE.city}` },
  { icon: Phone, title: "Teléfono y WhatsApp", text: WHATSAPP_DISPLAY },
  { icon: Mail, title: "Correo", text: STORE.email },
  { icon: Clock, title: "Horario", text: STORE.hours },
];

export default function ContactSection() {
  return (
    <section id="contacto" className="bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:py-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Contacto</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Haz tu pedido por WhatsApp y paga al recibir
          </h2>
          <p className="mt-4 max-w-lg text-sm text-background/70 sm:text-base">
            Escríbenos con lo que necesitas y te confirmamos disponibilidad, precio y hora de entrega en Cali. También puedes visitarnos en la {STORE.address}.
          </p>
          <Button asChild size="lg" className="mt-6 rounded-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
            <a href={whatsappLink(GENERAL_MESSAGE)} target="_blank" rel="noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              {WHATSAPP_DISPLAY}
            </a>
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {details.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-background/15 bg-background/5 p-4">
              <Icon className="h-5 w-5 text-accent" />
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-background/60">{title}</p>
              <p className="mt-1 text-sm leading-snug">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}