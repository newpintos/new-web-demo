import { motion } from "motion/react";
import { Award, Users, Globe, TrendingUp, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const stats = [
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Award, value: "150+", label: "Awards Won" },
  { icon: Globe, value: "50+", label: "Countries Served" },
  { icon: TrendingUp, value: "98%", label: "Success Rate" },
];

const features = [
  "Industry-leading expertise with 10+ years experience",
  "Certified professionals across all disciplines",
  "Proven track record of delivering excellence",
  "Innovative solutions powered by latest technology"
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 px-4 py-2 rounded-full mb-6 text-sm">
              About Us
            </div>
            
            <h2 className="text-5xl mb-6 text-slate-900 leading-tight">
              Empowering Businesses Through
              <span className="block mt-2 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Digital Innovation
              </span>
            </h2>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              We're a team of passionate innovators, designers, and strategists committed to 
              transforming businesses through cutting-edge digital solutions.
            </p>

            <div className="space-y-4 mb-10">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1">
                    <CheckCircle className="w-6 h-6 text-teal-600" />
                  </div>
                  <p className="text-slate-700 text-lg">{feature}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transition-shadow"
            >
              Learn More About Us
            </motion.button>
          </motion.div>

          {/* Right: Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758518731468-98e90ffd7430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHRlYW18ZW58MXx8fHwxNzYzNDAzNzcyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Professional Team"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            </div>

            {/* Stats grid overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-8 left-8 right-8 bg-white rounded-xl shadow-2xl p-6 border border-gray-200"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="text-center"
                    >
                      <Icon className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                      <div className="text-2xl text-slate-900 mb-1">{stat.value}</div>
                      <div className="text-xs text-slate-600">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
