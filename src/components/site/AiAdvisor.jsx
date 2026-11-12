import React, { useState } from "react";
import { ChefHat, Loader2, Sparkles } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdvisorResult from "@/components/site/AdvisorResult";
import { adviseCuts } from "@/lib/server-fns";
import { PROMO } from "@/lib/catalog";

const PEOPLE = ["1-2", "3-4", "5+"];
const IDEAS = ["Parrilla del fin de semana", "Almuerzo familiar", "Sancocho", "Comida de la semana"];

const EMPTY = { dish: "", people: "3-4", budget: "", notes: "" };

export default function AiAdvisor() {
  const advise = useServerFn(adviseCuts);
  const [form, setForm] = useState(EMPTY);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.dish.trim().length < 2) {
      setError("Cuéntanos qué quieres cocinar para poder asesorarte.");
      return;
    }
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const response = await advise({
        data: {
          dish: form.dish.trim(),
          people: form.people,
          budget: form.budget.trim() || undefined,
          notes: form.notes.trim() || undefined,
        },
      });
      setResult(response);
    } catch {
      setError("No pudimos conectar con el asesor. Intenta de nuevo en un momento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="asesor" className="mx-auto max-w-6xl px-4 pb-14 sm:pb-16">
      <div className="relative overflow-hidden rounded-[2rem] bg-foreground p-6 text-background sm:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Nuevo · Asesor IA
          </span>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Dinos qué vas a cocinar y te decimos qué cortes llevar
          </h2>
          <p className="mt-3 max-w-xl text-sm text-background/70 sm:text-base">
            Un carnicero virtual arma tu lista, calcula las libras por persona y te enseña cómo filetear cada corte. Además:{" "}
            {PROMO.text.toLowerCase()}.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="dish" className="text-background/80">
                  ¿Qué quieres cocinar?
                </Label>
                <Input
                  id="dish"
                  value={form.dish}
                  onChange={update("dish")}
                  placeholder="Ej: parrilla para 6 personas"
                  className="mt-1.5 h-11 border-background/20 bg-background/10 text-background placeholder:text-background/40"
                />
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {IDEAS.map((idea) => (
                    <button
                      key={idea}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, dish: idea }))}
                      className="rounded-full border border-background/20 px-2.5 py-1 text-[11px] font-medium text-background/70 transition hover:border-accent hover:text-accent"
                    >
                      {idea}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="budget" className="text-background/80">
                  Presupuesto (opcional)
                </Label>
                <Input
                  id="budget"
                  value={form.budget}
                  onChange={update("budget")}
                  placeholder="Ej: $80.000"
                  className="mt-1.5 h-11 border-background/20 bg-background/10 text-background placeholder:text-background/40"
                />
              </div>
              <div>
                <Label htmlFor="notes" className="text-background/80">
                  Detalles (opcional)
                </Label>
                <Input
                  id="notes"
                  value={form.notes}
                  onChange={update("notes")}
                  placeholder="Sin cerdo, para niños, plancha..."
                  className="mt-1.5 h-11 border-background/20 bg-background/10 text-background placeholder:text-background/40"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-background/15 bg-background/5 p-4">
              <div>
                <p className="text-sm font-semibold text-background/80">¿Para cuántas personas?</p>
                <div className="mt-2 flex gap-2">
                  {PEOPLE.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, people: option }))}
                      className={`flex-1 rounded-full border px-3 py-2 text-sm font-semibold transition ${
                        form.people === option
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-background/20 text-background/70 hover:border-accent/60"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Buscando los cortes...
                  </>
                ) : (
                  <>
                    <ChefHat className="mr-2 h-4 w-4" />
                    Asesorarme gratis
                  </>
                )}
              </Button>
              {error && <p className="text-xs font-medium text-accent">{error}</p>}
            </div>
          </form>

          {loading && (
            <p className="mt-6 text-sm text-background/60">
              Nuestro asesor está calculando cantidades y cortes para tu plato...
            </p>
          )}

          {result && <AdvisorResult result={result} />}
        </div>
      </div>
    </section>
  );
}