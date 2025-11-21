import { Card } from "../../components/ui/card";
import { motion } from "motion/react";
import { Dumbbell, Users, Trophy, Heart } from "lucide-react";

const programs = [
  {
    icon: Dumbbell,
    name: "Strength Training",
    description: "Build muscle and power with our expert-designed programs"
  },
  {
    icon: Heart,
    name: "Cardio Classes",
    description: "High-energy classes that torch calories and boost endurance"
  },
  {
    icon: Users,
    name: "Group Fitness",
    description: "Motivating group sessions with certified instructors"
  },
  {
    icon: Trophy,
    name: "Personal Training",
    description: "One-on-one coaching tailored to your specific goals"
  }
];

export function FitnessServices() {
  return (
    <section className="py-16 px-6 bg-gray-900 relative overflow-hidden">
      {/* Diagonal background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-lime-500/10 to-transparent transform skew-x-12" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl mb-3 text-white uppercase tracking-tight">Programs</h2>
          <p className="text-xl text-gray-400">
            Choose your path to peak performance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-black border-2 border-gray-800 hover:border-lime-500 transition-all duration-300 p-6 h-full group">
                  <div className="mb-4 w-14 h-14 bg-lime-500/20 border-2 border-lime-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-lime-400" />
                  </div>
                  <h3 className="text-xl mb-2 text-white uppercase tracking-wide">{program.name}</h3>
                  <p className="text-gray-400">{program.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
