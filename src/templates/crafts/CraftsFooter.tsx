import { Heart, Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";

export function CraftsFooter() {
  return (
    <footer id="contact" className="bg-gradient-to-br from-amber-900 via-orange-900 to-rose-900 text-amber-50 py-16 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-[4px_4px_12px_rgba(0,0,0,0.3),-2px_-2px_8px_rgba(255,255,255,0.1)]">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <h3 className="text-3xl text-white">Artisan Clay Studio</h3>
            </div>
            <p className="text-amber-200 leading-relaxed mb-6 max-w-md">
              Handcrafted with love, designed to inspire. Each piece tells a unique story and brings warmth to your home.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Mail].map((Icon, i) => (
                <div 
                  key={i}
                  className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 cursor-pointer transition-all duration-300 shadow-[4px_4px_12px_rgba(0,0,0,0.2),-2px_-2px_8px_rgba(255,255,255,0.05)] hover:shadow-[6px_6px_16px_rgba(0,0,0,0.25),-2px_-2px_8px_rgba(255,255,255,0.05)]"
                >
                  <Icon className="w-5 h-5 text-amber-100" />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-amber-300 mb-5 text-lg">Shop</h4>
            <ul className="space-y-3 text-amber-200">
              <li className="hover:text-white cursor-pointer transition-colors">All Products</li>
              <li className="hover:text-white cursor-pointer transition-colors">New Arrivals</li>
              <li className="hover:text-white cursor-pointer transition-colors">Best Sellers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Custom Orders</li>
              <li className="hover:text-white cursor-pointer transition-colors">Gift Cards</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-amber-300 mb-5 text-lg">Contact</h4>
            <ul className="space-y-4 text-amber-200">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
                <span>123 Artisan Lane<br />Portland, OR 97209</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-300 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-300 flex-shrink-0" />
                <span>hello@artisanclay.co</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-amber-800/50 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-amber-300">
            <p>&copy; 2024 Artisan Clay Studio. Handmade with ♥</p>
            <div className="flex gap-6 text-sm">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
              <span className="hover:text-white cursor-pointer transition-colors">Shipping Info</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
