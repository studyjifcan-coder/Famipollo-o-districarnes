import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import Hero from "@/components/site/Hero";
import TrustStrip from "@/components/site/TrustStrip";
import RotatingMenu from "@/components/site/RotatingMenu";
import AiAdvisor from "@/components/site/AiAdvisor";
import ProductCatalog from "@/components/site/ProductCatalog";
import HowItWorks from "@/components/site/HowItWorks";
import AboutSection from "@/components/site/AboutSection";
import ContactSection from "@/components/site/ContactSection";
import WhatsAppFab from "@/components/site/WhatsAppFab";
import { PRODUCTS } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Famipollo | Carnes frescas a domicilio en Cali" },
      {
        name: "description",
        content:
          "Distribuidora de carnes Famipollo en la Galería Santa Elena: pollo, res, cerdo, pescados y embutidos por libra con domicilio en Cali, pedidos por WhatsApp y pago contraentrega. 10% de descuento en compras desde $200.000.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = PRODUCTS.filter((product) => product.featured);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <RotatingMenu />
        <AiAdvisor />
        <ProductCatalog
          products={featured}
          eyebrow="Variedad de la semana"
          title="Más cortes para tu pedido"
          description="Pollo, res, cerdo, pescados y embutidos. Todo se vende por libra y llega listo para cocinar."
          showFilters={false}
        />
        <div className="-mt-6 pb-10 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full border-foreground/20">
            <Link to="/catalogo">
              Ver catálogo completo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <HowItWorks />
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}