import { ShoppingBag, ClipboardCheck, MessageCircle, Clock, Truck, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { WHATSAPP_DISPLAY, SCHEDULE, DELIVERY } from "@/lib/config";

export function HowToOrder() {
  const steps = [
    {
      num: "01",
      title: "Elige tus Productos",
      subtitle: "Helados & Dulcería",
      desc: "Explora nuestros 8 sabores de helados o las 10 especialidades de dulcería y agrégalos a tu carrito.",
      icon: ShoppingBag,
      color: "bg-primary text-white",
      badge: "Paso 1",
    },
    {
      num: "02",
      title: "Revisa tu Carrito",
      subtitle: "Cantidades & Domicilio",
      desc: "Verifica tus productos, ajusta las porciones y elige si deseas entrega a domicilio con coste adicional.",
      icon: ClipboardCheck,
      color: "bg-accent text-primary-dark",
      badge: "Paso 2",
    },
    {
      num: "03",
      title: "Envía por WhatsApp",
      subtitle: "Confirmación Rápida",
      desc: `Haz clic en pedir y tu mensaje estructurado se abrirá en WhatsApp (${WHATSAPP_DISPLAY}) para confirmar precio y entrega.`,
      icon: MessageCircle,
      color: "bg-primary text-white",
      badge: "Paso 3",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="my-14"
      aria-labelledby="how-to-order-title"
    >
      <div className="rounded-[2.5rem] bg-surface border border-border p-6 sm:p-8 md:p-10 shadow-soft">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block rounded-full bg-secondary px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-primary-dark"
          >
            Proceso Simple y Rápido
          </motion.span>
          <h2
            id="how-to-order-title"
            className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-dark"
          >
            ¿Cómo realizar tu pedido?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-text-muted">
            Solo te tomará un minuto pedir tus helados y dulces favoritos directamente a través de WhatsApp.
          </p>
        </div>

        {/* 3-Step Visual Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative flex flex-col justify-between rounded-3xl bg-background/50 border border-border p-6 transition-colors hover:bg-surface hover:shadow-hover hover:border-primary/40 group"
              >
                <div>
                  {/* Top Step Pill & Number */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-full bg-surface border border-border px-3 py-0.5 text-[11px] font-bold text-primary-dark shadow-2xs">
                      {s.badge}
                    </span>
                    <span className="font-display text-2xl font-black text-text-muted/40 group-hover:text-primary/60 transition-colors">
                      {s.num}
                    </span>
                  </div>

                  {/* Icon Circle with pulse on hover */}
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm ${s.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>

                  <h3 className="font-display text-lg font-bold text-text group-hover:text-primary-dark transition-colors">
                    {s.title}
                  </h3>
                  <span className="text-[11px] font-bold text-primary block mt-0.5 mb-2">
                    {s.subtitle}
                  </span>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                {idx < 2 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-primary/40">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Business Service Hours & Delivery Notice Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-border"
        >
          {/* Horarios de Servicio */}
          <div className="flex items-start gap-3.5 rounded-2xl bg-secondary/50 p-4 border border-secondary/80">
            <div className="rounded-xl bg-white p-2 text-primary shadow-xs shrink-0 mt-0.5">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-primary-dark uppercase tracking-wider block">
                Horarios de Atención
              </span>
              <p className="mt-1 text-xs font-semibold text-text">
                • Martes a Sábado: <span className="font-bold text-primary-dark">10:00 am – 9:00 pm</span>
              </p>
              <p className="text-xs font-semibold text-text mt-0.5">
                • Domingos: <span className="font-bold text-primary-dark">3:00 pm – 9:00 pm</span>
              </p>
              <p className="text-[11px] text-text-muted mt-0.5">
                • Lunes: Cerrado por descanso
              </p>
            </div>
          </div>

          {/* Servicio a Domicilio con Coste Adicional */}
          <div className="flex items-start gap-3.5 rounded-2xl bg-accent/20 p-4 border border-accent/40">
            <div className="rounded-xl bg-accent p-2 text-primary-dark shadow-xs shrink-0 mt-0.5">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary-dark uppercase tracking-wider">
                  Servicio a Domicilio
                </span>
                <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-extrabold text-primary-dark">
                  Coste adicional
                </span>
              </div>
              <p className="mt-1 text-xs text-text leading-relaxed">
                Contamos con entregas a domicilio en Puerto Padre. El coste adicional se calcula según la distancia y zona de entrega.
              </p>
              <span className="mt-1 block text-[11px] font-semibold text-primary-dark">
                Teléfono WhatsApp: {WHATSAPP_DISPLAY}
              </span>
            </div>
          </div>
        </motion.div>

        {/* CTA to start ordering */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/catalogo" className="btn-primary text-xs py-2.5 px-6 flex items-center gap-1.5">
              <span>Ver Productos y Comenzar Pedido</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/dulces" className="btn-accent text-xs py-2.5 px-6">
              <span>Explorar Dulcería</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
