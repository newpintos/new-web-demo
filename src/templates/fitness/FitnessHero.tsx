import { Button } from "../../components/ui/button";
import { motion } from "motion/react";
import { Dumbbell, Zap } from "lucide-react";

export function FitnessHero() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZ3ltJTIwd29ya291dHxlbnwxfHx8fDE3NjMzMjQ2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')"
        }}
      />
      
      {/* Diagonal Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-transparent opacity-90" />
      
      {/* Neon accent line */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-lime-400 via-green-500 to-emerald-600" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32 flex items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 bg-lime-500/20 border border-lime-500 px-3 sm:px-4 py-2 rounded-lg mb-6">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-lime-400" />
            <span className="text-lime-400 uppercase tracking-wide text-xs sm:text-sm">No Excuses</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-8xl mb-6 text-white uppercase tracking-tight">
            Transform<br />
            <span className="text-lime-400">Your Body</span>
          </h1>
          
          <p className="text-lg sm:text-2xl text-gray-300 mb-8 sm:mb-10 leading-relaxed">
            State-of-the-art equipment. Expert trainers. Results guaranteed.
          </p>
          
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Button size="lg" className="bg-lime-500 hover:bg-lime-600 text-black uppercase tracking-wide px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base">
              <Dumbbell className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black uppercase tracking-wide px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base">
              View Classes
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
