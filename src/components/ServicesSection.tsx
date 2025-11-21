import { Card } from "./ui/card";
import { motion } from "motion/react";
import { Sparkles, Target, Users, Zap, TrendingUp, Shield, Rocket, Heart } from "lucide-react";

const services = [
  {
    icon: Rocket,
    title: "Digital Strategy",
    description: "Comprehensive digital transformation roadmaps tailored to your business objectives and market dynamics.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    icon: Target,
    title: "Brand Development",
    description: "Create powerful brand identities that resonate with your audience and stand out in the market.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  {
    icon: TrendingUp,
    title: "Growth Marketing",
    description: "Data-driven marketing strategies that accelerate growth and maximize your ROI across all channels.",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600"
  },
  {
    icon: Sparkles,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that delight users and drive engagement with your products.",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600"
  },
  {
    icon: Zap,
    title: "Web Development",
    description: "Lightning-fast, scalable web applications built with modern technologies and best practices.",
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600"
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Enterprise-grade security solutions ensuring your digital assets and data remain protected.",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    iconColor: "text-red-600"
  },
  {
    icon: Users,
    title: "Consulting Services",
    description: "Expert guidance and strategic advice to navigate complex digital challenges and opportunities.",
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600"
  },
  {
    icon: Heart,
    title: "Ongoing Support",
    description: "24/7 dedicated support and maintenance to keep your digital operations running smoothly.",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600"
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 px-4 py-2 rounded-full mb-4 text-sm">
            What We Offer
          </div>
          <h2 className="text-5xl mb-5 text-slate-900">Comprehensive Solutions</h2>
          <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
            From strategy to execution, we provide end-to-end services that transform your business and drive measurable results
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <Card className="p-7 h-full hover:shadow-2xl transition-all duration-300 bg-white border-2 border-gray-100 hover:border-teal-200 group relative overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className={`mb-5 w-14 h-14 ${service.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      <Icon className={`w-7 h-7 ${service.iconColor}`} />
                    </div>
                    <h3 className="text-xl mb-3 text-slate-900">{service.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{service.description}</p>
                    
                    {/* Hover arrow */}
                    <div className="mt-4 flex items-center gap-2 text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm">Learn more</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-slate-600 mb-6 text-lg">
            Need something specific? We create custom solutions.
          </p>
          <button className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-3 rounded-lg hover:scale-105 transition-transform shadow-lg">
            Discuss Your Project
          </button>
        </motion.div>
      </div>
    </section>
  );
}
