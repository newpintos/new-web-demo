import { motion } from "motion/react";
import { Button } from "../../components/ui/button";
import { Croissant, Coffee, Cookie, Award, Clock, Heart, Star } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export function BakeryHero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-white/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Content */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full mb-6"
              >
                <Award className="w-4 h-4" />
                <span className="text-sm">Award-Winning Bakery</span>
              </motion.div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl mb-6 text-white leading-tight">
                Freshly Baked
                <span className="block mt-2">
                  Every Morning
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 leading-relaxed">
                Experience the warmth of artisan breads and pastries crafted with 
                love using traditional recipes and finest ingredients.
              </p>

              {/* Glassmorphic Feature Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 sm:mb-10">
                {[
                  { icon: Clock, text: "Opens 6 AM" },
                  { icon: Heart, text: "Made Fresh" },
                  { icon: Cookie, text: "50+ Varieties" }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="text-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20"
                    >
                      <Icon className="w-5 h-5 sm:w-8 sm:h-8 text-white mx-auto mb-1 sm:mb-2" />
                      <p className="text-xs sm:text-sm text-white/90">{item.text}</p>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3 sm:gap-4"
              >
                <Button 
                  size="lg"
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg rounded-full shadow-xl"
                >
                  <Croissant className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  View Menu
                </Button>
                <Button 
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-white/90 h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-full shadow-xl"
                >
                  <Coffee className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Visit Us
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Content - Glassmorphic Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl">
                {/* Image */}
                <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1555932450-31a8aec2adf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBmcmVzaCUyMGJyZWFkfGVufDF8fHx8MTc2MzQwMzk5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Fresh Baked Bread"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center text-white">
                  <div className="text-3xl mb-2">🥐 Fresh Daily</div>
                  <p className="text-white/80">Handcrafted with passion</p>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 p-6 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                  <div>
                    <div className="text-2xl text-white">4.9</div>
                    <div className="text-xs text-white/80">2000+ Reviews</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-2xl"
              >
                <div className="text-center">
                  <div className="text-3xl">✨</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
