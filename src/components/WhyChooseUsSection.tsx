import { motion } from "motion/react";
import { Shield, Zap, Heart, Trophy, Target, Lightbulb } from "lucide-react";

const reasons = [
  {
    icon: Trophy,
    title: "Award-Winning Excellence",
    description: "Recognized globally with 150+ industry awards for innovation, design, and client satisfaction.",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: Lightbulb,
    title: "Innovation-First Approach",
    description: "We leverage cutting-edge technologies and creative thinking to solve complex business challenges.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Target,
    title: "Results-Driven Strategy",
    description: "Every solution is crafted with measurable outcomes and ROI in mind, ensuring tangible business impact.",
    gradient: "from-blue-500 to-teal-500"
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Your data and digital assets are protected with bank-level security and compliance standards.",
    gradient: "from-red-500 to-pink-500"
  },
  {
    icon: Zap,
    title: "Lightning-Fast Delivery",
    description: "Agile methodologies and efficient workflows ensure rapid deployment without compromising quality.",
    gradient: "from-green-500 to-teal-500"
  },
  {
    icon: Heart,
    title: "Dedicated Partnership",
    description: "We don't just work for you, we work with you. Your success is our success, and we're committed long-term.",
    gradient: "from-rose-500 to-red-500"
  }
];

export function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 px-4 py-2 rounded-full mb-6 text-sm">
            Why Choose Us
          </div>
          <h2 className="text-5xl mb-6 text-slate-900">
            What Sets Us Apart
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We combine expertise, innovation, and dedication to deliver exceptional results that drive your business forward
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500 h-full">
                  {/* Gradient border on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} 
                       style={{ padding: '2px' }}>
                    <div className="w-full h-full bg-white rounded-2xl" />
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl mb-4 text-slate-900">
                    {reason.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {reason.description}
                  </p>

                  {/* Decorative element */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${reason.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-slate-900 to-teal-900 rounded-2xl p-12 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
            
            <div className="relative z-10">
              <h3 className="text-4xl text-white mb-4">
                Ready to Experience the Difference?
              </h3>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join hundreds of successful businesses who trust us with their digital transformation
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transition-shadow"
                >
                  Start Your Project
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-colors"
                >
                  Schedule a Call
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
