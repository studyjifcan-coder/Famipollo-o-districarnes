import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { PRODUCTS, PROMO, STORE } from "@/lib/catalog";
import { formatCOP } from "@/lib/format";

export const getServerInfo = createServerFn({ method: "GET" }).handler(async () => ({
  renderedAt: new Date().toISOString(),
}));

const AdvisorInput = z.object({
  dish: z.string().min(2).max(160),
  people: z.enum(["1-2", "3-4", "5+"]),
  budget: z.string().max(30).optional(),
  notes: z.string().max(280).optional(),
});

const ADVISOR_SCHEMA = {
  type: "object",
  properties: {
    headline: { type: "string" },
    advice: { type: "string" },
    picks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          product_id: { type: "string" },
          quantity: { type: "integer" },
          reason: { type: "string" },
        },
        required: ["product_id", "quantity", "reason"],
      },
    },
    tips: {
      type: "array",
      items: {
        type: "object",
        properties: { title: { type: "string" }, text: { type: "string" } },
        required: ["title", "text"],
      },
    },
  },
  required: ["headline", "advice", "picks", "tips"],
};

export const adviseCuts = createServerFn({ method: "POST" })
  .validator(AdvisorInput)
  .handler(async ({ data, context }) => {
    const catalog = PRODUCTS.map(
      (product) =>
        `${product.id} | ${product.name} | ${product.category} | ${formatCOP(product.price)} por ${product.unit} | ${
          product.note ?? "sin descripción"
        }`,
    ).join("\n");

    const prompt = `Eres el asesor carnicero de ${STORE.name}, carnicería ubicada en la ${STORE.address} de Cali, Colombia.

CATÁLOGO REAL (id | nombre | categoría | precio | nota):
${catalog}

PEDIDO DEL CLIENTE:
- Qué quiere cocinar: ${data.dish}
- Personas: ${data.people}
- Presupuesto: ${data.budget || "sin dato"}
- Notas: ${data.notes || "sin notas"}
Datos de la tienda: domicilio gratis desde ${formatCOP(100000)} y ${PROMO.text}.

TAREA:
1. Recomienda entre 2 y 4 productos del catálogo (usa el id EXACTO, nunca inventes productos) para esa preparación y ese número de personas, con la cantidad en libras o unidades que necesita.
2. Explica en cada recomendación por qué sirve para ese plato y cómo calcular la cantidad.
3. Añade 2 o 3 tips concretos de fileteado, corte o preparación para esas carnes (por ejemplo: cómo deshuesar una pechuga o cómo cortar la punta de anca en tiras).

BORRADOR DE RESPUESTA:
- headline: frase corta y llamativa (máximo 9 palabras).
- advice: 2 o 3 frases con el consejo general del carnicero.
- tips: preparación y fileteado, pasos claros y breves.
Escribe en español de Colombia, cercano y directo, sin exageraciones.`;

    return context
      .getBase44()
      .asServiceRole.integrations.Core.InvokeLLM({ prompt, response_json_schema: ADVISOR_SCHEMA });
  });