import { motion, AnimatePresence } from "motion/react";
import { Store, Truck, MapPin, Info, Check } from "lucide-react";
import {
  DELIVERY_ZONES,
  getDeliveryZone,
  type DeliveryZone,
} from "@/lib/config";

export interface DeliveryState {
  mode: "pickup" | "delivery";
  zoneId: string;
  address: string;
}

interface DeliverySelectorProps {
  value: DeliveryState;
  onChange: (newState: DeliveryState) => void;
}

export function DeliverySelector({ value, onChange }: DeliverySelectorProps) {
  const selectedZone = getDeliveryZone(value.zoneId);

  const handleModeChange = (mode: "pickup" | "delivery") => {
    onChange({ ...value, mode });
  };

  const handleZoneChange = (zoneId: string) => {
    onChange({ ...value, zoneId });
  };

  const handleAddressChange = (address: string) => {
    onChange({ ...value, address });
  };

  return (
    <div className="rounded-3xl bg-surface border border-border p-5 shadow-soft">
      {/* Title */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-primary-dark">
          Modalidad de Entrega
        </span>
        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-bold text-primary">
          {value.mode === "delivery"
            ? `Envío: +$${selectedZone.feeCup} CUP`
            : "Sin coste adicional"}
        </span>
      </div>

      {/* Segmented Radio Options */}
      <div className="grid grid-cols-2 gap-2.5 p-1 bg-background rounded-2xl border border-border">
        {/* Recogida en tienda Option */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => handleModeChange("pickup")}
          className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all cursor-pointer text-center relative ${
            value.mode === "pickup"
              ? "bg-surface border-2 border-primary text-primary-dark shadow-xs font-bold"
              : "text-text-muted hover:text-text hover:bg-surface/50"
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs">
            <Store className={`h-4 w-4 ${value.mode === "pickup" ? "text-primary" : ""}`} />
            <span>Recogida en tienda</span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-600 mt-1">
            Gratis ($0 CUP)
          </span>
          {value.mode === "pickup" && (
            <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-primary text-white flex items-center justify-center">
              <Check className="h-2.5 w-2.5" />
            </span>
          )}
        </motion.button>

        {/* Domicilio Option */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => handleModeChange("delivery")}
          className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all cursor-pointer text-center relative ${
            value.mode === "delivery"
              ? "bg-surface border-2 border-primary text-primary-dark shadow-xs font-bold"
              : "text-text-muted hover:text-text hover:bg-surface/50"
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs">
            <Truck className={`h-4 w-4 ${value.mode === "delivery" ? "text-primary" : ""}`} />
            <span>Domicilio</span>
          </div>
          <span className="text-[10px] font-semibold text-primary mt-1">
            Desde $200 CUP
          </span>
          {value.mode === "delivery" && (
            <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-primary text-white flex items-center justify-center">
              <Check className="h-2.5 w-2.5" />
            </span>
          )}
        </motion.button>
      </div>

      {/* Expandable Details Area */}
      <AnimatePresence mode="wait">
        {value.mode === "pickup" ? (
          <motion.div
            key="pickup-info"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3.5 pt-3 border-t border-border text-xs text-text-muted"
          >
            <div className="flex items-start gap-2 bg-secondary/40 p-3 rounded-2xl border border-secondary">
              <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-text">
                  Punto de venta oficial Helados Caram
                </p>
                <p className="text-[11px] text-text-muted mt-0.5">
                  Puerto Padre, Las Tunas. Sin coste de envío adicional. Te avisaremos por WhatsApp cuando tu pedido esté listo para recoger.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="delivery-info"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3.5 pt-3 border-t border-border space-y-3"
          >
            {/* Zone Selector Dropdown */}
            <div>
              <label
                htmlFor="delivery-zone-select"
                className="flex items-center justify-between text-xs font-bold text-text mb-1.5"
              >
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span>Zona de entrega en Puerto Padre:</span>
                </span>
                <span className="text-[11px] font-extrabold text-primary">
                  +${selectedZone.feeCup} CUP
                </span>
              </label>

              <select
                id="delivery-zone-select"
                value={value.zoneId}
                onChange={(e) => handleZoneChange(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-text focus:border-primary focus:outline-none cursor-pointer"
              >
                {DELIVERY_ZONES.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name} — (+${zone.feeCup} CUP)
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-text-muted mt-1 italic">
                {selectedZone.description}
              </p>
            </div>

            {/* Exact Address Input */}
            <div>
              <label
                htmlFor="delivery-address-input"
                className="block text-xs font-bold text-text mb-1.5"
              >
                Dirección exacta:
              </label>
              <input
                id="delivery-address-input"
                type="text"
                value={value.address}
                onChange={(e) => handleAddressChange(e.target.value)}
                placeholder="Ej: Calle Máximo Gómez #123, entre A y B..."
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-text placeholder:text-text-muted focus:border-primary focus:outline-none transition-all"
              />
              <p className="text-[10px] text-text-muted mt-1">
                Ingresa tu dirección o referencias para calcular la ruta exacta de envío.
              </p>
            </div>

            {/* Live Calculated Fee Box */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-primary/10 border border-primary/20 text-xs">
              <span className="font-semibold text-primary-dark">
                Coste adicional de envío calculado:
              </span>
              <span className="font-extrabold text-sm text-primary">
                +${selectedZone.feeCup} CUP
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
