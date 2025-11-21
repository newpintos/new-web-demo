import { Button } from "../../components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, Heart, ShoppingBag } from "lucide-react";

export function CraftsHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#collections", label: "Collections" },
    { href: "#about", label: "About" },
    { href: "#testimonials", label: "Reviews" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3"
          : "py-4"
      }`}
    >
      <div className={`max-w-7xl mx-auto px-6 ${
        isScrolled 
          ? "bg-gradient-to-r from-white/95 to-amber-50/95 backdrop-blur-md rounded-[2rem] shadow-[6px_6px_20px_rgba(0,0,0,0.12),-3px_-3px_12px_rgba(255,255,255,0.8)] border border-amber-100/50"
          : "bg-gradient-to-r from-white/90 to-amber-50/90 backdrop-blur-sm rounded-[2rem] shadow-[4px_4px_16px_rgba(0,0,0,0.08),-2px_-2px_8px_rgba(255,255,255,0.6)] border border-amber-100/30"
      } transition-all duration-300`}>
        <div className="flex items-center justify-between py-3 px-6">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-orange-400 rounded-[1rem] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[4px_4px_12px_rgba(251,146,60,0.3),-2px_-2px_8px_rgba(255,255,255,0.5),inset_-2px_-2px_6px_rgba(0,0,0,0.1)]">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <div className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-rose-700 group-hover:from-rose-700 group-hover:to-orange-600 transition-all">
                Artisan Clay
              </div>
              <div className="text-xs text-stone-600">Handcrafted Studio</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-stone-700 hover:text-rose-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-rose-400 after:to-orange-400 after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <Button
              className="bg-gradient-to-br from-rose-400 to-orange-400 hover:from-rose-500 hover:to-orange-500 text-white rounded-full px-6 shadow-[4px_4px_12px_rgba(251,146,60,0.3),-2px_-2px_8px_rgba(255,255,255,0.3)] hover:shadow-[6px_6px_16px_rgba(251,146,60,0.4),-2px_-2px_8px_rgba(255,255,255,0.3)] transition-all duration-300 border border-orange-300/50"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Shop Now
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-stone-600 hover:text-rose-600 transition-colors rounded-xl hover:bg-rose-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-6 px-6 border-t border-amber-200/50 mt-3 pt-6">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-stone-700 hover:text-rose-600 transition-colors py-2 px-4 rounded-xl hover:bg-rose-50"
                >
                  {link.label}
                </a>
              ))}
              <Button
                className="bg-gradient-to-br from-rose-400 to-orange-400 hover:from-rose-500 hover:to-orange-500 text-white rounded-full w-full shadow-[4px_4px_12px_rgba(251,146,60,0.3),-2px_-2px_8px_rgba(255,255,255,0.3)] border border-orange-300/50"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shop Now
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
