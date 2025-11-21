import { FitnessHeader } from "./fitness/FitnessHeader";
import { FitnessHero } from "./fitness/FitnessHero";
import { FitnessServices } from "./fitness/FitnessServices";
import { FitnessFooter } from "./fitness/FitnessFooter";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Flame } from "lucide-react";
import { FloatingBackButton } from "../components/FloatingBackButton";
import { TemplateBottomBar } from "../components/TemplateBottomBar";

interface Template3Props {
  onBackToHome?: () => void;
}

export function Template3({ onBackToHome }: Template3Props) {
  return (
    <div className="min-h-screen bg-black">
      {onBackToHome && <FloatingBackButton onClick={onBackToHome} />}
      <FitnessHeader />
      <FitnessHero />
      <FitnessServices />
      
      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-lime-500 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Flame className="w-12 h-12 sm:w-16 sm:h-16 text-black mx-auto mb-6" />
            <h2 className="text-3xl sm:text-5xl mb-4 sm:mb-5 text-black uppercase tracking-tight">
              Start Your Journey
            </h2>
            <p className="text-lg sm:text-2xl text-gray-900 mb-6 sm:mb-8">
              First week is FREE. No commitment. No pressure.
            </p>
            <Button size="lg" className="bg-black hover:bg-gray-900 text-lime-400 uppercase tracking-wide px-8 sm:px-12 h-14 sm:h-16 text-base sm:text-lg">
              Claim Free Trial
            </Button>
          </motion.div>
        </div>
      </section>

      <FitnessFooter />
      <div className="pb-20" /> {/* Spacer for bottom bar */}
      {onBackToHome && <TemplateBottomBar onBackToHome={onBackToHome} variant="fitness" />}
    </div>
  );
}
