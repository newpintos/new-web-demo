import { Button } from "../../components/ui/button";
import { motion } from "motion/react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { ArrowRight, Calendar } from "lucide-react";

export function ConsultingHero() {
  return (
    <section className="pt-16 sm:pt-24 pb-12 sm:pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 sm:px-5 py-2 bg-blue-50 border border-blue-200 rounded mb-6">
              <span className="text-blue-900 tracking-wide text-sm sm:text-base">Strategic Excellence</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl mb-6 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              Transform Your<br />Business Strategy
            </h1>
            <p className="text-base sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Expert consulting services that drive measurable results and sustainable growth for forward-thinking organizations.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 h-11 sm:h-12 text-sm sm:text-base">
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 sm:px-8 h-11 sm:h-12 text-sm sm:text-base">
                <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                View Services
              </Button>
            </div>
            
            <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-gray-200">
              <div>
                <div className="text-2xl sm:text-3xl text-blue-600 mb-1">500+</div>
                <div className="text-xs sm:text-sm text-gray-600">Clients Served</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl text-blue-600 mb-1">15+</div>
                <div className="text-xs sm:text-sm text-gray-600">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl text-blue-600 mb-1">98%</div>
                <div className="text-xs sm:text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-blue-100 rounded-lg" />
              <div className="relative bg-white p-2 rounded-lg shadow-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1551135049-8a33b5883817?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbnN1bHRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzYzMzg5NDk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Professional consulting"
                  className="w-full rounded"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
