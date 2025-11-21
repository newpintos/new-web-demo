import { BakeryHeader } from "./bakery/BakeryHeader";
import { BakeryHero } from "./bakery/BakeryHero";
import { BakeryServices } from "./bakery/BakeryServices";
import { BakeryFooter } from "./bakery/BakeryFooter";
import { Card } from "../components/ui/card";
import { motion } from "motion/react";
import { FloatingBackButton } from "../components/FloatingBackButton";
import { TemplateBottomBar } from "../components/TemplateBottomBar";

interface Template2Props {
  onBackToHome?: () => void;
}

export function Template2({ onBackToHome }: Template2Props) {
  return (
    <div className="min-h-screen bg-amber-50">
      {onBackToHome && <FloatingBackButton onClick={onBackToHome} />}
      <BakeryHeader />
      <BakeryHero />
      <BakeryServices />
      
      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-amber-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl mb-4 sm:mb-5 text-white">
              Order Fresh Baked Goods Today
            </h2>
            <p className="text-lg sm:text-xl text-amber-50 mb-6 sm:mb-8">
              Pre-order for pickup or delivery. Taste the difference of artisan quality.
            </p>
            <button className="bg-white text-amber-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:scale-105 transition-transform text-base sm:text-lg">
              Place Your Order
            </button>
          </motion.div>
        </div>
      </section>

      <BakeryFooter />
      <div className="pb-20" /> {/* Spacer for bottom bar */}
      {onBackToHome && <TemplateBottomBar onBackToHome={onBackToHome} variant="bakery" />}
    </div>
  );
}
