import { Card } from "./ui/card";
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CEO, TechStart Inc",
    company: "TechStart",
    rating: 5,
    text: "Working with this team has been transformative for our business. They delivered beyond our expectations and the results speak for themselves. Our digital presence has never been stronger.",
    initials: "SM",
    color: "bg-blue-500"
  },
  {
    name: "Michael Chen",
    role: "Marketing Director, GrowthLabs",
    company: "GrowthLabs",
    rating: 5,
    text: "Exceptional service and incredible attention to detail. The team's expertise in digital strategy helped us achieve a 300% increase in online engagement. Highly recommended!",
    initials: "MC",
    color: "bg-purple-500"
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, Creative Studios",
    company: "Creative Studios",
    rating: 5,
    text: "Their innovative approach and creative solutions took our brand to the next level. The entire process was smooth, professional, and the end result exceeded all our goals.",
    initials: "ER",
    color: "bg-teal-500"
  },
  {
    name: "David Thompson",
    role: "VP of Operations, Enterprise Co",
    company: "Enterprise Co",
    rating: 5,
    text: "Outstanding work! The team demonstrated deep industry knowledge and delivered a solution that perfectly aligned with our business objectives. True professionals in every sense.",
    initials: "DT",
    color: "bg-orange-500"
  },
  {
    name: "Lisa Wang",
    role: "Product Manager, InnovateCorp",
    company: "InnovateCorp",
    rating: 5,
    text: "A game-changer for our product launch. Their strategic insights and flawless execution helped us penetrate new markets and achieve record-breaking results in the first quarter.",
    initials: "LW",
    color: "bg-pink-500"
  },
  {
    name: "James Anderson",
    role: "CTO, FutureTech",
    company: "FutureTech",
    rating: 5,
    text: "The technical expertise and innovative solutions provided were exactly what we needed. They turned our vision into reality with precision and professionalism. Simply outstanding!",
    initials: "JA",
    color: "bg-green-500"
  }
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-teal-500/10 border border-teal-500/20 text-teal-300 px-4 py-2 rounded-full mb-6 text-sm">
            Client Success Stories
          </div>
          <h2 className="text-5xl mb-6 text-white">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our clients have to say about their experience working with us.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="p-8 h-full bg-white/5 backdrop-blur-sm border-slate-700 hover:bg-white/10 hover:border-teal-500/50 transition-all duration-300 relative group">
                {/* Quote icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-16 h-16 text-teal-400" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-slate-200 mb-8 leading-relaxed text-lg italic relative z-10">
                  "{testimonial.text}"
                </p>

                {/* Author info */}
                <div className="flex items-center gap-4 border-t border-slate-700 pt-6">
                  <Avatar className={`${testimonial.color} w-12 h-12`}>
                    <AvatarFallback className="text-white">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-white mb-1">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "500+", label: "Satisfied Clients" },
            { value: "4.9/5", label: "Average Rating" },
            { value: "98%", label: "Client Retention" },
            { value: "24/7", label: "Support Available" }
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + idx * 0.1 }}
            >
              <div className="text-4xl text-teal-400 mb-2">{stat.value}</div>
              <div className="text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
