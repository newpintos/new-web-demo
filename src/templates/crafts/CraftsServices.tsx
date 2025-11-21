import { Card } from "../../components/ui/card";
import { motion } from "motion/react";
import { Sparkles, Package, Palette, Gift, Flower2, Home, Lamp } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const categories = [
  {
    icon: Palette,
    name: "Pottery & Ceramics",
    description: "Hand-thrown bowls, mugs, and decorative pieces with unique glazes",
    color: "from-rose-400 to-pink-400",
    gradient: "from-rose-50 to-pink-50"
  },
  {
    icon: Sparkles,
    name: "Jewelry",
    description: "One-of-a-kind necklaces, earrings, and bracelets made with care",
    color: "from-purple-400 to-violet-400",
    gradient: "from-purple-50 to-violet-50"
  },
  {
    icon: Lamp,
    name: "Home Decor",
    description: "Handwoven textiles, candles, and artisan home accessories",
    color: "from-amber-400 to-orange-400",
    gradient: "from-amber-50 to-orange-50"
  },
  {
    icon: Gift,
    name: "Gift Sets",
    description: "Curated collections perfect for any special occasion",
    color: "from-teal-400 to-cyan-400",
    gradient: "from-teal-50 to-cyan-50"
  },
  {
    icon: Flower2,
    name: "Plant Pots",
    description: "Beautiful handcrafted planters for your green friends",
    color: "from-green-400 to-emerald-400",
    gradient: "from-green-50 to-emerald-50"
  },
  {
    icon: Home,
    name: "Wall Art",
    description: "Unique clay sculptures and wall hangings for your space",
    color: "from-indigo-400 to-blue-400",
    gradient: "from-indigo-50 to-blue-50"
  }
];

export function CraftsServices() {
  return (
    <section id="collections" className="py-20 px-6 bg-gradient-to-b from-rose-50 to-amber-50 relative">
      {/* Background clay blobs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-rose-700">
            Our Collections
          </h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Discover handcrafted treasures across our curated categories
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className={`p-8 h-full bg-gradient-to-br ${category.gradient} to-white rounded-[2rem] shadow-[8px_8px_24px_rgba(0,0,0,0.1),-4px_-4px_16px_rgba(255,255,255,0.9),inset_0_2px_4px_rgba(255,255,255,0.5)] border border-amber-100/50 hover:shadow-[12px_12px_32px_rgba(0,0,0,0.15),-4px_-4px_16px_rgba(255,255,255,0.9)] transition-all duration-300`}>
                  <div className={`mb-6 w-16 h-16 bg-gradient-to-br ${category.color} rounded-[1.2rem] flex items-center justify-center shadow-[4px_4px_12px_rgba(0,0,0,0.15),-2px_-2px_8px_rgba(255,255,255,0.5),inset_-2px_-2px_6px_rgba(0,0,0,0.1)]`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl mb-3 text-amber-900">{category.name}</h3>
                  <p className="text-stone-600 leading-relaxed">{category.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Featured Craftsmanship Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-white to-amber-50 rounded-[3rem] p-12 shadow-[12px_12px_32px_rgba(0,0,0,0.12),-6px_-6px_24px_rgba(255,255,255,0.9),inset_0_2px_6px_rgba(255,255,255,0.6)] border border-amber-100/50"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-rose-700 to-orange-600">
                The Art of Handcrafting
              </h3>
              <p className="text-lg text-stone-700 mb-6 leading-relaxed">
                Every piece begins with carefully selected natural clay, shaped by skilled hands and fired to perfection. Our artisans pour their creativity and expertise into each creation.
              </p>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Clay Selection", desc: "Premium natural materials" },
                  { step: "2", title: "Hand Shaping", desc: "Crafted with precision" },
                  { step: "3", title: "Firing & Glazing", desc: "Unique finishes" }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-orange-400 rounded-2xl flex items-center justify-center text-white shadow-[4px_4px_12px_rgba(251,146,60,0.3),-2px_-2px_8px_rgba(255,255,255,0.5)] flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-lg text-amber-900 mb-1">{item.title}</h4>
                      <p className="text-stone-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] overflow-hidden shadow-[8px_8px_24px_rgba(0,0,0,0.15),-4px_-4px_16px_rgba(255,255,255,0.8)] border border-amber-100/50">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Artisan crafting pottery"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
