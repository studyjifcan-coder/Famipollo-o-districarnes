import { WHATSAPP_NUMBER, STORE } from "@/lib/catalog";
import { formatCOP } from "@/lib/format";

export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const GENERAL_MESSAGE = `Hola ${STORE.name}, quiero hacer un pedido de carnes a domicilio en Cali.`;

export function questionLink(productName) {
  return whatsappLink(`Hola ${STORE.name}, quiero preguntar por ${productName}.`);
}

export function buildOrderMessage({ items, customer, totals }) {
  const lines = [
    `*Nuevo pedido ${STORE.name}*`,
    "",
    "*Datos de entrega*",
    `Nombre: ${customer.name}`,
    `Teléfono: ${customer.phone}`,
    `Dirección: ${customer.address}`,
    `Barrio: ${customer.neighborhood}`,
  ];

  if (customer.notes?.trim()) lines.push(`Indicaciones: ${customer.notes.trim()}`);
  lines.push(
    `Pago: ${customer.payment === "datafono" ? "Contraentrega con datáfono" : "Contraentrega en efectivo"}`,
    "",
    "*Productos*",
  );

  items.forEach((item) => {
    lines.push(`• ${item.qty} x ${item.name} (${item.unit}) — ${formatCOP(item.lineTotal)}`);
  });

  lines.push("", `Subtotal: ${formatCOP(totals.subtotal)}`);
  if (totals.discount > 0) lines.push(`Descuento 10%: -${formatCOP(totals.discount)}`);
  lines.push(
    `Domicilio: ${totals.delivery === 0 ? "Gratis" : formatCOP(totals.delivery)}`,
    `*Total: ${formatCOP(totals.total)}*`,
    "",
    "Pedido generado desde la tienda en línea.",
  );

  return lines.join("\n");
}