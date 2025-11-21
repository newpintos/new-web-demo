import { Button } from "../../components/ui/button";
import { motion } from "motion/react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Heart, ShoppingCart, Sparkles } from "lucide-react";

export function CraftsHero() {
  return (
    <section className="pt-24 pb-20 px-6 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
      {/* Clay blobs background */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-rose-300/30 to-orange-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-amber-300/30 to-yellow-300/30 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full shadow-[4px_4px_12px_rgba(0,0,0,0.1),-4px_-4px_12px_rgba(255,255,255,0.9)] border border-amber-200/50">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-amber-800">Handcrafted with Love</span>
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
            
            <h1 className="text-5xl lg:text-7xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-800 via-rose-700 to-orange-700">
              Artisan Clay Studio
            </h1>
            <p className="text-xl text-stone-700 mb-10 max-w-2xl mx-auto leading-relaxed">
              Each piece is lovingly handcrafted from natural clay, bringing warmth and unique character to your space.
            </p>
            
            <div className="flex flex-wrap gap-5 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-br from-rose-400 to-orange-400 hover:from-rose-500 hover:to-orange-500 text-white rounded-full px-10 h-14 shadow-[6px_6px_16px_rgba(251,146,60,0.3),-2px_-2px_8px_rgba(255,255,255,0.5),inset_-2px_-2px_8px_rgba(0,0,0,0.1)] hover:shadow-[8px_8px_20px_rgba(251,146,60,0.4),-2px_-2px_8px_rgba(255,255,255,0.5)] transition-all duration-300 border border-orange-300/50"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Shop Collection
              </Button>
              <Button 
                size="lg" 
                className="bg-gradient-to-br from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 text-amber-900 rounded-full px-10 h-14 shadow-[6px_6px_16px_rgba(0,0,0,0.1),-2px_-2px_8px_rgba(255,255,255,0.9)] hover:shadow-[8px_8px_20px_rgba(0,0,0,0.15),-2px_-2px_8px_rgba(255,255,255,0.9)] transition-all duration-300 border border-amber-200/50"
              >
                <Heart className="mr-2 h-5 w-5" />
                Custom Orders
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Featured Products with Clay Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {[
            { id: 1, title: "Ceramic Vases" },
            { id: 2, title: "Clay Bowls" },
            { id: 3, title: "Pottery Art" }
          ].map((item, i) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-white to-amber-50 shadow-[8px_8px_24px_rgba(0,0,0,0.12),-4px_-4px_16px_rgba(255,255,255,0.9),inset_0_2px_4px_rgba(255,255,255,0.5)] border border-amber-100/50 group"
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1762628437902-315a5efb810c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt={item.title}
                  className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg text-amber-900">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats with Clay Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-6 justify-center mt-16"
        >
          {[
            { value: "500+", label: "Handmade Items" },
            { value: "200+", label: "Happy Customers" },
            { value: "100%", label: "Unique Pieces" }
          ].map((stat, i) => (
            <div 
              key={i}
              className="px-8 py-4 bg-gradient-to-br from-white to-orange-50 rounded-full shadow-[6px_6px_16px_rgba(0,0,0,0.1),-3px_-3px_12px_rgba(255,255,255,0.9)] border border-orange-100/50"
            >
              <div className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-600">
                {stat.value}
              </div>
              <div className="text-sm text-stone-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
