import { CraftsHeader } from "./crafts/CraftsHeader";
import { CraftsHero } from "./crafts/CraftsHero";
import { CraftsServices } from "./crafts/CraftsServices";
import { CraftsFooter } from "./crafts/CraftsFooter";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Star, Quote, Award, Users, Sparkles } from "lucide-react";
import { Card } from "../components/ui/card";
import { FloatingBackButton } from "../components/FloatingBackButton";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { TemplateBottomBar } from "../components/TemplateBottomBar";

interface Template5Props {
  onBackToHome?: () => void;
}

export function Template5({ onBackToHome }: Template5Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {onBackToHome && <FloatingBackButton onClick={onBackToHome} />}
      <CraftsHeader />
      <CraftsHero />
      <CraftsServices />
      
      {/* Why Choose Us Section */}
      <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-amber-50 to-orange-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-rose-700">
              Why Choose Our Crafts
            </h2>
            <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto">
              More than just products, each piece carries a story and soul
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Sparkles,
                title: "100% Handmade",
                description: "Every piece is individually crafted by skilled artisans, ensuring uniqueness and quality",
                color: "from-rose-400 to-pink-400"
              },
              {
                icon: Award,
                title: "Premium Quality",
                description: "We use only the finest natural materials and traditional techniques passed down through generations",
                color: "from-amber-400 to-orange-400"
              },
              {
                icon: Users,
                title: "Custom Designs",
                description: "Work directly with our artisans to create personalized pieces that match your vision",
                color: "from-purple-400 to-violet-400"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="p-6 sm:p-8 text-center h-full bg-gradient-to-br from-white to-amber-50 rounded-[2rem] shadow-[8px_8px_24px_rgba(0,0,0,0.1),-4px_-4px_16px_rgba(255,255,255,0.9),inset_0_2px_4px_rgba(255,255,255,0.5)] border border-amber-100/50 hover:shadow-[12px_12px_32px_rgba(0,0,0,0.15),-4px_-4px_16px_rgba(255,255,255,0.9)] transition-all duration-300">
                    <div className={`inline-flex mb-4 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${feature.color} rounded-[1.5rem] items-center justify-center shadow-[6px_6px_16px_rgba(0,0,0,0.15),-3px_-3px_12px_rgba(255,255,255,0.5),inset_-2px_-2px_6px_rgba(0,0,0,0.1)]`}>
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4 text-amber-900">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-stone-600 leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-gradient-to-b from-orange-50 to-rose-50 relative overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-rose-700 to-orange-600">
              Customer Love Stories
            </h2>
            <p className="text-xl text-stone-600">Hear what our happy customers have to say</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: "Emma Sullivan", 
                role: "Interior Designer",
                review: "Absolutely beautiful! The quality is amazing and you can tell each piece is made with genuine care. The pottery bowl I ordered has become the centerpiece of my living room.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
              },
              { 
                name: "David Lee", 
                role: "Gift Enthusiast",
                review: "Perfect gift for my wife! She absolutely loved the unique design and attention to detail. The custom jewelry set exceeded all our expectations. Highly recommended!",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
              },
              { 
                name: "Sarah Martinez", 
                role: "Home Decorator",
                review: "I've purchased multiple pieces and each one is a work of art. The clay vases add such warmth to my home. Love supporting local artisans!",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="p-8 h-full bg-gradient-to-br from-white to-rose-50 rounded-[2rem] shadow-[8px_8px_24px_rgba(0,0,0,0.1),-4px_-4px_16px_rgba(255,255,255,0.9),inset_0_2px_4px_rgba(255,255,255,0.5)] border border-rose-100/50 hover:shadow-[12px_12px_32px_rgba(0,0,0,0.15),-4px_-4px_16px_rgba(255,255,255,0.9)] transition-all duration-300">
                  <Quote className="w-10 h-10 text-rose-300 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-stone-700 mb-6 leading-relaxed italic">"{testimonial.review}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-14 h-14 rounded-full overflow-hidden shadow-[4px_4px_12px_rgba(0,0,0,0.15),-2px_-2px_8px_rgba(255,255,255,0.5)] border-2 border-amber-200/50">
                      <ImageWithFallback
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-amber-900">{testimonial.name}</p>
                      <p className="text-sm text-stone-600">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-rose-400 via-orange-400 to-amber-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTEydjEyaDEyek0yNCAzMGgxMnYtMTJoLTEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-white">Limited Edition Pieces Available</span>
            </div>
            
            <h2 className="text-5xl lg:text-6xl mb-6 text-white">
              Start Your Collection Today
            </h2>
            <p className="text-xl text-white/95 mb-10 max-w-2xl mx-auto leading-relaxed">
              Each piece is unique and tells its own story. Find something special that speaks to your soul and brings warmth to your space.
            </p>
            
            <div className="flex flex-wrap gap-5 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-amber-50 rounded-full px-12 h-16 text-lg shadow-[8px_8px_24px_rgba(0,0,0,0.2),-2px_-2px_12px_rgba(255,255,255,0.3)] hover:shadow-[12px_12px_32px_rgba(0,0,0,0.25),-2px_-2px_12px_rgba(255,255,255,0.3)] transition-all duration-300"
              >
                Browse All Items
              </Button>
              <Button 
                size="lg" 
                className="bg-orange-900/30 backdrop-blur-sm text-white hover:bg-orange-900/40 rounded-full px-12 h-16 text-lg border-2 border-white/30 shadow-[8px_8px_24px_rgba(0,0,0,0.15)] hover:shadow-[12px_12px_32px_rgba(0,0,0,0.2)] transition-all duration-300"
              >
                Request Custom Piece
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <CraftsFooter />
      <div className="pb-20" /> {/* Spacer for bottom bar */}
      {onBackToHome && <TemplateBottomBar onBackToHome={onBackToHome} variant="crafts" />}
    </div>
  );
}
