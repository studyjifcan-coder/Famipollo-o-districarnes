import { createFileRoute } from "@tanstack/react-router";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import ProductCatalog from "@/components/site/ProductCatalog";
import WhatsAppFab from "@/components/site/WhatsAppFab";
import { PRODUCTS, STORE } from "@/lib/catalog";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo | Famipollo Distribuidora de carnes" },
      {
        name: "description",
        content:
          "Pollo, res, cerdo, pescados, embutidos y lácteos por libra con precios actualizados. Pide a domicilio en Cali y paga contraentrega.",
      },
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary/50">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Catálogo</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Todo lo que tenemos hoy</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Precios por libra, sujetos a disponibilidad del día. Despachamos desde la {STORE.address} en Cali: domicilio
              gratis desde $100.000 y 10% de descuento en compras desde $200.000.
            </p>
          </div>
        </div>
        <ProductCatalog products={PRODUCTS} title="Elige tus cortes" showFilters />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}