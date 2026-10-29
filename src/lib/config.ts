// Teléfono de WhatsApp de Helados Caram (formato internacional sin "+" ni espacios).
export const WHATSAPP_PHONE = "5355260778";
export const WHATSAPP_DISPLAY = "+53 55260778";

export const BRAND = {
  name: "Caram",
  slogan: "La felicidad tiene un sabor",
  location: "Puerto Padre, Las Tunas, Cuba",
};

export const SCHEDULE = {
  tueToSat: "10:00 am – 9:00 pm",
  sunday: "3:00 pm – 9:00 pm",
  monday: "Cerrado (Descanso)",
  fullText: "Martes a sábado de 10:00 am a 9:00 pm y domingos de 3:00 pm a 9:00 pm",
};

export interface DeliveryZone {
  id: string;
  name: string;
  description: string;
  feeCup: number;
}

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: "centro",
    name: "Centro / Casco Urbano",
    description: "Zona central y parques principales de Puerto Padre",
    feeCup: 200,
  },
  {
    id: "reparto-militar",
    name: "Reparto Militar / La Villa",
    description: "Zonas del reparto y cercanías al hospital",
    feeCup: 300,
  },
  {
    id: "boqueron",
    name: "Boquerón / Parada / Salida a Tunas",
    description: "Zonas suburbanas y salidas principales",
    feeCup: 400,
  },
  {
    id: "otras-zonas",
    name: "Otras zonas en Puerto Padre",
    description: "Confirmación exacta con la mensajería",
    feeCup: 350,
  },
];

export const DEFAULT_DELIVERY_ZONE = DELIVERY_ZONES[0];

export const DELIVERY = {
  available: true,
  notice: "Servicio a domicilio en Puerto Padre disponible con coste adicional según la zona",
  shortNotice: "Domicilio con coste adicional",
  zones: DELIVERY_ZONES,
};

export function getDeliveryZone(id?: string): DeliveryZone {
  return DELIVERY_ZONES.find((z) => z.id === id) || DEFAULT_DELIVERY_ZONE;
}

export function whatsappUrl(message: string): string | null {
  const phone = WHATSAPP_PHONE.replace(/\D/g, "");
  if (!phone) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
