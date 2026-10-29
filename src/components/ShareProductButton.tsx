import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Share2, Copy, Check, MessageCircle, Send, Facebook, X } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/catalog";

interface ShareProductButtonProps {
  product: Product;
  categoryName?: string;
  className?: string;
}

export function ShareProductButton({
  product,
  categoryName = "Helados & Dulces",
  className = "",
}: ShareProductButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  };

  const getShareText = () => {
    return `¡Mira este delicioso ${product.variant ? `Helado sabor ${product.variant}` : product.name} de Helados Caram en Puerto Padre! 🍦✨`;
  };

  const handleNativeShare = async () => {
    const url = getShareUrl();
    const text = getShareText();

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} — Helados Caram`,
          text: text,
          url: url,
        });
        toast.success("¡Gracias por compartir!");
        return;
      } catch (err) {
        // Fallback to opening share modal if user cancelled or API failed
        if ((err as Error).name !== "AbortError") {
          setIsOpen(true);
        }
      }
    } else {
      setIsOpen(true);
    }
  };

  const handleCopyLink = () => {
    const url = getShareUrl();
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("¡Enlace copiado al portapapeles!");
    setTimeout(() => setCopied(false), 2500);
  };

  const shareText = getShareText();
  const shareUrl = getShareUrl();

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareText}\n${shareUrl}`
  )}`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(shareText)}`;

  return (
    <div className={`relative ${className}`}>
      {/* Primary Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        type="button"
        onClick={handleNativeShare}
        className="w-full rounded-full border-2 border-primary/20 bg-surface hover:bg-secondary/40 py-2.5 px-4 text-xs font-bold text-primary-dark transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
      >
        <Share2 className="h-4 w-4 text-primary shrink-0" />
        <span>Compartir producto</span>
      </motion.button>

      {/* Share Modal / Popover Fallback */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-sm rounded-3xl bg-surface border border-border p-5 shadow-xl relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-text-muted hover:text-text hover:bg-background transition cursor-pointer"
                aria-label="Cerrar modal de compartir"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Share2 className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                    {categoryName}
                  </span>
                  <h3 className="font-display text-base font-bold text-primary-dark">
                    Compartir {product.name}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-text-muted mb-4">
                Elige tu red social o copia el enlace para recomendar este producto a tus amigos.
              </p>

              {/* Social Channels List */}
              <div className="space-y-2">
                {/* WhatsApp */}
                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 text-emerald-800 hover:bg-[#25D366]/20 transition cursor-pointer text-xs font-bold"
                >
                  <MessageCircle className="h-5 w-5 text-[#25D366] shrink-0" />
                  <span>Compartir por WhatsApp</span>
                </a>

                {/* Facebook */}
                <a
                  href={facebookShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/30 text-blue-900 hover:bg-[#1877F2]/20 transition cursor-pointer text-xs font-bold"
                >
                  <Facebook className="h-5 w-5 text-[#1877F2] shrink-0" />
                  <span>Compartir en Facebook</span>
                </a>

                {/* Telegram */}
                <a
                  href={telegramShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#229ED9]/10 border border-[#229ED9]/30 text-sky-900 hover:bg-[#229ED9]/20 transition cursor-pointer text-xs font-bold"
                >
                  <Send className="h-5 w-5 text-[#229ED9] shrink-0" />
                  <span>Enviar por Telegram</span>
                </a>

                {/* Copy Link Button */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-background border border-border text-text hover:bg-surface transition cursor-pointer text-xs font-bold"
                >
                  <span className="flex items-center gap-2">
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-primary" />
                    )}
                    <span>{copied ? "¡Copiado!" : "Copiar enlace del producto"}</span>
                  </span>
                  <span className="text-[10px] text-primary font-bold">
                    {copied ? "Listo" : "Copiar"}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
