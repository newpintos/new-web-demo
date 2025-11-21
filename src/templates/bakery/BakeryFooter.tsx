import { motion } from "motion/react";
import { Croissant, Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";

export function BakeryFooter() {
  return (
    <footer id="contact" className="bg-gradient-to-br from-amber-900 via-orange-900 to-amber-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center">
                <Croissant className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl text-white">Sweet Haven</h3>
                <p className="text-xs text-amber-300">Artisan Bakery</p>
              </div>
            </div>
            <p className="text-amber-200 leading-relaxed mb-6">
              Bringing you the finest artisan baked goods, made fresh daily with love.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-colors border border-white/20"
                >
                  <Icon className="w-5 h-5 text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Opening Hours
            </h4>
            <div className="space-y-2 text-sm text-amber-200">
              <div className="flex justify-between p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                <span>Mon - Fri</span>
                <span className="text-amber-300">6 AM - 8 PM</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                <span>Saturday</span>
                <span className="text-amber-300">7 AM - 9 PM</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                <span>Sunday</span>
                <span className="text-amber-300">7 AM - 6 PM</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm text-amber-200">
              {[
                { icon: Phone, text: "+1 (555) 123-4567" },
                { icon: Mail, text: "hello@sweethaven.com" },
                { icon: MapPin, text: "123 Bakery Lane" }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                    <Icon className="w-4 h-4 text-amber-400" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-amber-200">
              {['Menu', 'Catering', 'Special Orders', 'About Us', 'Careers'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-amber-300 transition-colors inline-block p-2 rounded-lg bg-white/0 hover:bg-white/5 w-full">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-amber-200 text-sm">© 2024 Sweet Haven Bakery. Baked with ❤️ daily.</p>
            <div className="flex gap-4 text-xs text-amber-300">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
