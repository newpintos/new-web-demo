import { motion } from "motion/react";
import { Croissant, Coffee, Cookie, Cake, Sandwich, IceCream, Star, Heart } from "lucide-react";

const menuItems = [
  {
    icon: Croissant,
    title: "Fresh Pastries",
    description: "Buttery croissants and Danish pastries baked fresh every morning",
    price: "$3.50",
    popular: true
  },
  {
    icon: Coffee,
    title: "Artisan Coffee",
    description: "Premium single-origin beans, expertly roasted and brewed",
    price: "$4.00",
    popular: true
  },
  {
    icon: Cookie,
    title: "Handmade Cookies",
    description: "Classic and seasonal specialty cookies made daily",
    price: "$2.50",
    popular: false
  },
  {
    icon: Cake,
    title: "Custom Cakes",
    description: "Beautiful celebration cakes for all special occasions",
    price: "$45.00",
    popular: false
  },
  {
    icon: Sandwich,
    title: "Fresh Sandwiches",
    description: "Gourmet sandwiches on freshly baked artisan bread",
    price: "$8.50",
    popular: true
  },
  {
    icon: IceCream,
    title: "Sweet Treats",
    description: "Decadent cakes, tarts, and seasonal specialties",
    price: "$5.00",
    popular: false
  }
];

export function BakeryServices() {
  return (
    <div className="bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100">
      {/* Menu Section */}
      <section id="menu" className="py-24 px-6 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-white/40 backdrop-blur-md border border-white/60 text-orange-800 px-6 py-2 rounded-full mb-4">
              Our Menu
            </div>
            <h2 className="text-5xl mb-5 text-amber-900">
              Delicious Offerings
            </h2>
            <p className="text-xl text-amber-800 max-w-3xl mx-auto">
              Every item made fresh daily with finest ingredients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="p-8 h-full rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 hover:bg-white/60 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
                    {item.popular && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 backdrop-blur-sm">
                        <Star className="w-3 h-3 fill-white" />
                        Popular
                      </div>
                    )}

                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl mb-3 text-amber-900">{item.title}</h3>
                    <p className="text-amber-700 mb-4 leading-relaxed">{item.description}</p>
                    
                    <div className="mt-auto pt-4 border-t border-amber-200/50 flex items-center justify-between">
                      <span className="text-2xl text-orange-600">{item.price}</span>
                      <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-full hover:scale-105 transition-transform text-sm shadow-md">
                        Order
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-white/20 backdrop-blur-2xl border border-white/30"
            >
              <div className="inline-block bg-white/30 backdrop-blur-md border border-white/40 text-white px-6 py-2 rounded-full mb-6">
                Our Story
              </div>
              <h2 className="text-5xl mb-6 text-white">
                Baking Traditions Since 1995
              </h2>
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                What started as a small family bakery has grown into a beloved 
                community gathering place.
              </p>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                We use only the finest organic ingredients and traditional baking 
                methods passed down through generations.
              </p>

              <div className="space-y-4">
                {['100% Organic', 'Traditional Methods', 'Family Recipes', 'Fresh Daily'].map((item, idx) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
                  >
                    <Heart className="w-5 h-5 text-white fill-white" />
                    <span className="text-lg text-white">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-white/20 backdrop-blur-2xl border border-white/30 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-9xl mb-4">🥖</div>
                  <h3 className="text-3xl text-white mb-2">Fresh Every Day</h3>
                  <p className="text-white/80 text-lg">Made with love & passion</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl mb-5 text-amber-900">
              What Our Customers Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Emma Wilson",
                text: "The best croissants I've ever had! Light, flaky, and absolutely delicious.",
                rating: 5
              },
              {
                name: "David Chen",
                text: "Their custom cakes are incredible. Made our wedding day extra special!",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="p-8 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/60">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-lg text-amber-900 mb-4 italic">"{testimonial.text}"</p>
                  <p className="text-amber-700">— {testimonial.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
