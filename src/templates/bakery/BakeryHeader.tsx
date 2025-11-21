import { Croissant, Menu, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function BakeryHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center shadow-lg">
              <Croissant className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl text-white">Sweet Haven</h1>
              <p className="text-xs text-white/80 hidden sm:block">Artisan Bakery</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#menu" className="text-white/90 hover:text-white transition-colors">Menu</a>
            <a href="#about" className="text-white/90 hover:text-white transition-colors">About</a>
            <Button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30">
              Order Now
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
                  href="#menu" 
                  className="text-white/90 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Menu
                </a>
                <a 
                  href="#about" 
                  className="text-white/90 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                <Button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 w-full">
                  Order Now
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
