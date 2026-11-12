import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Banknote, CheckCircle2, CreditCard, MessageCircle, ShoppingBasket } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/components/cart/CartContext";
import { FREE_DELIVERY_FROM, STORE } from "@/lib/catalog";
import { formatCOP } from "@/lib/format";
import { buildOrderMessage, whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/pedido")({
  head: () => ({
    meta: [
      { title: "Finalizar pedido | Famipollo" },
      { name: "description", content: "Confirma tus datos de entrega y envía tu pedido a Famipollo por WhatsApp." },
    ],
  }),
  component: CheckoutPage,
});

const EMPTY_FORM = { name: "", phone: "", address: "", neighborhood: "", notes: "", payment: "efectivo" };

function CheckoutPage() {
  const { items, subtotal, delivery, discount, total, clear } = useCart();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const digits = form.phone.replace(/\D/g, "");
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Escribe tu nombre";
    if (digits.length !== 10) nextErrors.phone = "Escribe un celular de 10 dígitos";
    if (!form.address.trim()) nextErrors.address = "Escribe la dirección de entrega";
    if (!form.neighborhood.trim()) nextErrors.neighborhood = "Escribe tu barrio";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const totals = { subtotal, delivery, discount, total };
    const customer = { ...form };
    const link = whatsappLink(buildOrderMessage({ items, customer, totals }));

    window.open(link, "_blank", "noopener,noreferrer");
    setSent({ items, totals, customer, link });
    clear();
  };

  let content;

  if (sent) {
    content = (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-whatsapp/15 text-whatsapp">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">Pedido listo para enviar</h1>
        <p className="mt-3 text-muted-foreground">
          Abrimos WhatsApp con el resumen de tu pedido para {sent.customer.name}. Envíalo y te confirmamos la entrega y el
          pago contraentrega.
        </p>
        <div className="mt-6 rounded-3xl border border-border bg-card p-5 text-left">
          {sent.items.map((item) => (
            <div key={item.id} className="flex justify-between gap-4 py-1.5 text-sm">
              <span>
                {item.qty} x {item.name}
              </span>
              <span className="font-semibold">{formatCOP(item.lineTotal)}</span>
            </div>
          ))}
          {sent.totals.discount > 0 && (
            <div className="flex justify-between pt-1.5 text-sm text-whatsapp">
              <span>Descuento 10%</span>
              <span className="font-semibold">-{formatCOP(sent.totals.discount)}</span>
            </div>
          )}
          <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-bold">
            <span>Total</span>
            <span className="text-primary">{formatCOP(sent.totals.total)}</span>
          </div>
        </div>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
            <a href={sent.link} target="_blank" rel="noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Abrir WhatsApp de nuevo
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full border-foreground/20">
            <Link to="/catalogo">Seguir comprando</Link>
          </Button>
        </div>
      </div>
    );
  } else if (items.length === 0) {
    content = (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary text-primary">
          <ShoppingBasket className="h-7 w-7" />
        </span>
        <h1 className="mt-6 text-2xl font-extrabold">Todavía no tienes productos</h1>
        <p className="mt-2 text-muted-foreground">Agrega cortes de pollo, res o cerdo por libra para armar tu pedido.</p>
        <Button asChild className="mt-6 rounded-full">
          <Link to="/catalogo">Ir al catálogo</Link>
        </Button>
      </div>
    );
  } else {
    content = (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <Link to="/catalogo" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Seguir comprando
        </Link>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Finalizar pedido</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Domicilios en {STORE.city} desde {STORE.address}, con pago contraentrega. Te confirmamos por WhatsApp del {STORE.name}.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-5 sm:p-6">
            <h2 className="font-heading text-lg font-bold">Datos de entrega</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" value={form.name} onChange={update("name")} placeholder="María Gómez" className="mt-1.5 h-11" />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Celular</Label>
                <Input id="phone" value={form.phone} onChange={update("phone")} placeholder="321 391 8180" inputMode="tel" className="mt-1.5 h-11" />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
              <div>
                <Label htmlFor="neighborhood">Barrio</Label>
                <Input id="neighborhood" value={form.neighborhood} onChange={update("neighborhood")} placeholder="Granada" className="mt-1.5 h-11" />
                {errors.neighborhood && <p className="mt-1 text-xs text-destructive">{errors.neighborhood}</p>}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" value={form.address} onChange={update("address")} placeholder="Calle 15 #15-20, apto 201" className="mt-1.5 h-11" />
                {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="notes">Indicaciones (opcional)</Label>
                <Textarea
                  id="notes"
                  value={form.notes}
                  onChange={update("notes")}
                  placeholder="Portería, torre, hora preferida de entrega..."
                  className="mt-1.5 resize-none"
                  rows={3}
                />
              </div>
            </div>

            <h2 className="mt-7 font-heading text-lg font-bold">Forma de pago</h2>
            <RadioGroup value={form.payment} onValueChange={(value) => setForm((prev) => ({ ...prev, payment: value }))} className="mt-3 grid gap-3 sm:grid-cols-2">
              <Label htmlFor="pago-efectivo" className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border p-4 text-sm font-medium">
                <RadioGroupItem value="efectivo" id="pago-efectivo" />
                <Banknote className="h-4 w-4 text-primary" />
                Efectivo al recibir
              </Label>
              <Label htmlFor="pago-datafono" className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border p-4 text-sm font-medium">
                <RadioGroupItem value="datafono" id="pago-datafono" />
                <CreditCard className="h-4 w-4 text-primary" />
                Tarjeta con datáfono
              </Label>
            </RadioGroup>

            <Button type="submit" size="lg" className="mt-6 w-full rounded-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
              <MessageCircle className="mr-2 h-5 w-5" />
              Enviar pedido por WhatsApp
            </Button>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Al enviar, se abre WhatsApp con el resumen de tu pedido.
            </p>
          </form>

          <aside className="h-fit rounded-3xl border border-border bg-card p-5 sm:p-6 lg:sticky lg:top-32">
            <h2 className="font-heading text-lg font-bold">Tu pedido</h2>
            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">
                    {item.qty} x {item.name}
                  </span>
                  <span className="font-semibold">{formatCOP(item.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium">{formatCOP(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-whatsapp">
                  <dt>Descuento 10%</dt>
                  <dd className="font-medium">-{formatCOP(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Domicilio</dt>
                <dd className="font-medium">{delivery === 0 ? "Gratis" : formatCOP(delivery)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt className="font-heading font-bold">Total</dt>
                <dd className="font-heading font-bold text-primary">{formatCOP(total)}</dd>
              </div>
            </dl>
            <p className="mt-4 rounded-2xl bg-secondary/70 p-3 text-xs text-muted-foreground">
              {delivery === 0
                ? `¡Domicilio gratis! Tu pedido supera ${formatCOP(FREE_DELIVERY_FROM)}.`
                : `El domicilio es gratis en pedidos desde ${formatCOP(FREE_DELIVERY_FROM)}.`}
            </p>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{content}</main>
      <SiteFooter />
    </div>
  );
}