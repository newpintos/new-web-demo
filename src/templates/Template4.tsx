import { ConsultingHeader } from "./consulting/ConsultingHeader";
import { ConsultingHero } from "./consulting/ConsultingHero";
import { ConsultingServices } from "./consulting/ConsultingServices";
import { ConsultingFooter } from "./consulting/ConsultingFooter";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { CheckCircle } from "lucide-react";
import { FloatingBackButton } from "../components/FloatingBackButton";
import { TemplateBottomBar } from "../components/TemplateBottomBar";

interface Template4Props {
  onBackToHome?: () => void;
}

export function Template4({ onBackToHome }: Template4Props) {
  return (
    <div className="min-h-screen bg-white">
      {onBackToHome && <FloatingBackButton onClick={onBackToHome} />}
      <ConsultingHeader />
      <ConsultingHero />
      <ConsultingServices />
      
      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl mb-3 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              Why Choose Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {['Data-driven insights', 'Proven track record', 'Industry expertise', 'Client-centric approach'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 sm:p-4"
              >
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                <span className="text-base sm:text-lg text-gray-700">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl mb-4 sm:mb-5 text-white" style={{ fontFamily: 'Georgia, serif' }}>
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
              Schedule a complimentary consultation to discuss your strategic objectives.
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 h-11 sm:h-12 text-base sm:text-lg">
              Book Consultation
            </Button>
          </motion.div>
        </div>
      </section>

      <ConsultingFooter />
      <div className="pb-20" /> {/* Spacer for bottom bar */}
      {onBackToHome && <TemplateBottomBar onBackToHome={onBackToHome} variant="consulting" />}
    </div>
  );
}
