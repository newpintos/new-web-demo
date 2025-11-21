import { motion } from "motion/react";
import { TrendingUp, Target, Users, BarChart } from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    name: "Business Strategy",
    description: "Comprehensive strategic planning aligned with your vision and market dynamics"
  },
  {
    icon: Target,
    name: "Market Analysis",
    description: "In-depth research and competitive intelligence to inform decision-making"
  },
  {
    icon: Users,
    name: "Leadership Development",
    description: "Executive coaching and team development programs for lasting impact"
  },
  {
    icon: BarChart,
    name: "Performance Optimization",
    description: "Operational excellence and efficiency improvements that drive results"
  }
];

export function ConsultingServices() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl mb-3 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tailored solutions designed to address your unique challenges
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 border-l-4 border-blue-600 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2 text-gray-900">{service.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
