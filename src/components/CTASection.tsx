import { Button } from "./ui/button";
import { motion } from "motion/react";
import { ArrowRight, Mail, Phone, MapPin, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function CTASection() {
  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: CTA Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 px-4 py-2 rounded-full mb-6 text-sm">
              Get In Touch
            </div>

            <h2 className="text-5xl mb-6 text-slate-900 leading-tight">
              Let's Build Something
              <span className="block mt-2 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h2>

            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Ready to transform your business? Get in touch with us today and let's discuss 
              how we can help you achieve your digital goals.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-10">
              {[
                { icon: Mail, label: "Email Us", value: "hello@yourbusiness.com" },
                { icon: Phone, label: "Call Us", value: "+1 (555) 123-4567" },
                { icon: MapPin, label: "Visit Us", value: "123 Business Street, Suite 100" }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">{item.label}</div>
                      <div className="text-lg text-slate-900">{item.value}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Social proof */}
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-100">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 border-2 border-white flex items-center justify-center text-white text-xs">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-2xl text-teal-700">500+</div>
                </div>
              </div>
              <p className="text-slate-700">
                Businesses have trusted us with their digital transformation
              </p>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-100">
              <h3 className="text-3xl mb-6 text-slate-900">Send Us a Message</h3>
              
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-slate-700">First Name</label>
                    <Input 
                      placeholder="John" 
                      className="h-12 border-2 border-gray-200 focus:border-teal-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-slate-700">Last Name</label>
                    <Input 
                      placeholder="Doe" 
                      className="h-12 border-2 border-gray-200 focus:border-teal-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-slate-700">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="h-12 border-2 border-gray-200 focus:border-teal-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-slate-700">Phone Number</label>
                  <Input 
                    type="tel" 
                    placeholder="+1 (555) 123-4567" 
                    className="h-12 border-2 border-gray-200 focus:border-teal-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-slate-700">Your Message</label>
                  <Textarea 
                    placeholder="Tell us about your project..." 
                    rows={5}
                    className="border-2 border-gray-200 focus:border-teal-500 transition-colors resize-none"
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white h-14 text-lg shadow-xl hover:shadow-2xl transition-all"
                  >
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>

                <p className="text-sm text-slate-500 text-center">
                  We'll get back to you within 24 hours
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 bg-gradient-to-r from-teal-600 via-blue-600 to-teal-600 rounded-2xl p-12 text-center relative overflow-hidden"
        >
          {/* Animated background */}
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
          />

          <div className="relative z-10">
            <h3 className="text-4xl text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Join 500+ businesses who have transformed their digital presence with us
            </p>
            <Button
              size="lg"
              className="bg-white text-teal-600 hover:bg-slate-100 h-14 px-10 text-lg shadow-xl hover:scale-105 transition-transform"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
