import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Search,
  CheckCircle2,
  ChefHat,
  Bike,
  Clock,
  MessageCircle,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/config";

export type OrderState = "placed" | "preparing" | "out_for_delivery";

interface OrderTrackerProps {
  defaultAddress?: string;
}

const ORDER_STEPS = [
  {
    id: "placed" as OrderState,
    stepNum: 1,
    title: "Pedido Realizado",
    subtitle: "Placed",
    description: "Tu pedido ha sido recibido y enviado a nuestro equipo por WhatsApp.",
    icon: CheckCircle2,
    etaText: "Hace unos minutos",
    statusBadge: "Confirmado",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: "preparing" as OrderState,
    stepNum: 2,
    title: "En Preparación",
    subtitle: "Preparing",
    description: "Nuestros maestros heladeros y reposteros están preparando tus productos frescos.",
    icon: ChefHat,
    etaText: "Tiempo estimado: 15-25 min",
    statusBadge: "En cocina",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
  },
  {
    id: "out_for_delivery" as OrderState,
    stepNum: 3,
    title: "En Camino a Domicilio",
    subtitle: "Out for Delivery",
    description: "El repartidor está en ruta hacia tu dirección exacta en Puerto Padre.",
    icon: Bike,
    etaText: "Llegada estimada: 10-15 min",
    statusBadge: "En reparto",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
];

export function OrderTracker({ defaultAddress = "" }: OrderTrackerProps) {
  const [address, setAddress] = useState(defaultAddress);
  const [currentStep, setCurrentStep] = useState<OrderState>("placed");
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasTracked, setHasTracked] = useState(false);

  // Sync if defaultAddress changes
  useEffect(() => {
    if (defaultAddress && !address) {
      setAddress(defaultAddress);
    }
  }, [defaultAddress]);

  // Live simulation timer
  useEffect(() => {
    if (!isSimulating) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev === "placed") return "preparing";
        if (prev === "preparing") return "out_for_delivery";
        setIsSimulating(false);
        return "out_for_delivery";
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [isSimulating]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    setHasTracked(true);
  };

  const getStepIndex = (stepId: OrderState) => {
    return ORDER_STEPS.findIndex((s) => s.id === stepId);
  };

  const currentStepIdx = getStepIndex(currentStep);

  const activeStepObj = ORDER_STEPS[currentStepIdx];

  return (
    <div className="rounded-[2.5rem] bg-surface border border-border p-6 sm:p-8 shadow-soft">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Seguimiento de Pedido en Tiempo Real</span>
          </div>
          <h2 className="mt-1 font-display text-2xl font-extrabold text-primary-dark">
            Rastrea tu Envío
          </h2>
          <p className="text-xs text-text-muted mt-0.5">
            Consulta el estado de tu pedido en Puerto Padre: 'Placed', 'Preparing' y 'Out for Delivery'.
          </p>
        </div>

        {/* Live Simulation Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSimulating(!isSimulating)}
            className={`btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5 ${
              isSimulating ? "bg-amber-600 hover:bg-amber-700" : ""
            }`}
          >
            {isSimulating ? (
              <>
                <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                <span>Simulando...</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Simular Progreso</span>
              </>
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsSimulating(false);
              setCurrentStep("placed");
            }}
            className="p-2 rounded-full border border-border bg-background hover:bg-surface text-text-muted hover:text-text text-xs cursor-pointer"
            title="Reiniciar a 'Placed'"
            aria-label="Reiniciar estado"
          >
            <RotateCcw className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      {/* Address Input Form */}
      <form onSubmit={handleTrackSubmit} className="mt-5">
        <label htmlFor="tracker-address-input" className="block text-xs font-bold text-text mb-1.5">
          Ingresa tu dirección de entrega para consultar el estado:
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-primary">
              <MapPin className="h-4 w-4" />
            </div>
            <input
              id="tracker-address-input"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ej: Calle Máximo Gómez #123, Puerto Padre..."
              className="w-full rounded-2xl border border-border bg-background py-2.5 pl-10 pr-4 text-xs font-medium text-text placeholder:text-text-muted focus:border-primary focus:outline-none shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="btn-accent text-xs py-2.5 px-5 shrink-0 flex items-center justify-center gap-1.5"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Consultar Estado</span>
          </button>
        </div>
      </form>

      {/* Current Address Pill Badge */}
      {address.trim() && (
        <div className="mt-3 flex items-center gap-2 text-xs bg-secondary/50 border border-secondary px-3.5 py-2 rounded-2xl">
          <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="text-text-muted">
            Rastreando dirección: <strong className="text-primary-dark">{address}</strong>
          </span>
        </div>
      )}

      {/* 3-State Progress Bar Visualization */}
      <div className="mt-8">
        <div className="relative flex items-center justify-between mb-8 px-2 sm:px-6">
          {/* Progress Line Background */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1.5 bg-border rounded-full z-0" />

          {/* Animated Active Line */}
          <motion.div
            className="absolute left-6 top-1/2 -translate-y-1/2 h-1.5 bg-primary rounded-full z-0"
            initial={{ width: "0%" }}
            animate={{
              width: `${(currentStepIdx / (ORDER_STEPS.length - 1)) * 88}%`,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Step Circles */}
          {ORDER_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIdx;
            const isCurrent = idx === currentStepIdx;
            const Icon = step.icon;

            return (
              <button
                key={step.id}
                onClick={() => {
                  setIsSimulating(false);
                  setCurrentStep(step.id);
                }}
                className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`h-12 w-12 sm:h-14 sm:w-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 shadow-soft ${
                    isCurrent
                      ? "bg-primary text-white border-accent ring-4 ring-primary/20 scale-110"
                      : isCompleted
                      ? "bg-primary-dark text-white border-primary-dark"
                      : "bg-surface text-text-muted border-border"
                  }`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>

                {/* Step Label below circle */}
                <div className="mt-2 text-center max-w-[90px] sm:max-w-[120px]">
                  <span
                    className={`block text-[11px] sm:text-xs font-bold leading-tight ${
                      isCurrent
                        ? "text-primary-dark"
                        : isCompleted
                        ? "text-text font-semibold"
                        : "text-text-muted"
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block mt-0.5">
                    ({step.subtitle})
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active State Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-background border border-border p-5 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <activeStepObj.icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                    Paso {activeStepObj.stepNum} de 3
                  </span>
                  <h3 className="font-display text-lg font-bold text-primary-dark leading-tight">
                    {activeStepObj.title} ({activeStepObj.subtitle})
                  </h3>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border self-start sm:self-auto ${activeStepObj.badgeColor}`}
              >
                {activeStepObj.statusBadge}
              </span>
            </div>

            <p className="mt-3 text-xs text-text leading-relaxed">
              {activeStepObj.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/60 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-primary-dark">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <span>{activeStepObj.etaText}</span>
              </div>

              {/* Direct WhatsApp Contact Button */}
              {(() => {
                const queryMsg = `¡Hola Caram! Quisiera consultar el estado de mi pedido a domicilio para la dirección: ${address || "Puerto Padre"}. Estado actual: ${activeStepObj.title}.`;
                const url = whatsappUrl(queryMsg);
                if (!url) return null;

                return (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark underline"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Preguntar por WhatsApp ({WHATSAPP_DISPLAY})</span>
                  </a>
                );
              })()}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
