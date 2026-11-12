import React from "react";
import { MessageCircle } from "lucide-react";
import { GENERAL_MESSAGE, whatsappLink } from "@/lib/whatsapp";

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappLink(GENERAL_MESSAGE)}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir a Famipollo por WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-xl shadow-black/20 transition hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}