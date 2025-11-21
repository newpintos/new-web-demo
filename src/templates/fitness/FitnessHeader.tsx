import { Dumbbell, Menu, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function FitnessHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-lg border-b border-lime-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-lime-500 rounded-lg flex items-center justify-center shadow-lg">
              <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl text-white uppercase tracking-tight">Iron Elite</h1>
              <p className="text-xs text-lime-400 hidden sm:block uppercase tracking-wide">Fitness Club</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#classes" className="text-gray-300 hover:text-lime-400 transition-colors uppercase tracking-wide text-sm">Classes</a>
            <a href="#pricing" className="text-gray-300 hover:text-lime-400 transition-colors uppercase tracking-wide text-sm">Pricing</a>
            <Button className="bg-lime-500 hover:bg-lime-600 text-black uppercase tracking-wide">
              Join Now
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pt-4 pb-2 overflow-hidden"
            >
              <div className="flex flex-col gap-3">
                <a 
                  href="#classes" 
                  className="text-gray-300 hover:text-lime-400 transition-colors px-3 py-2 rounded-lg hover:bg-lime-500/10 uppercase tracking-wide text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Classes
                </a>
                <a 
                  href="#pricing" 
                  className="text-gray-300 hover:text-lime-400 transition-colors px-3 py-2 rounded-lg hover:bg-lime-500/10 uppercase tracking-wide text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <Button className="bg-lime-500 hover:bg-lime-600 text-black uppercase tracking-wide w-full">
                  Join Now
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
