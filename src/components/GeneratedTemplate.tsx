import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowLeft, Download, Code2, RefreshCw, Star, Check, Mail, Phone, MapPin, Clock, Rocket } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card } from "./ui/card";
import { PublishForm } from "./PublishForm";

interface GeneratedTemplateProps {
  businessName: string;
  businessType: string;
  designSpec: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    heroTitle: string;
    heroSubtitle: string;
    sections: string[];
    features: string[];
    generatedImages?: {
      hero: string;
      feature1: string;
      feature2: string;
      feature3: string;
    };
  };
  onBack: () => void;
  onRegenerate?: () => void;
}

// Ensure color contrast meets WCAG AA standards
function getContrastColor(hexColor: string): string {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#1a1a1a' : '#ffffff';
}

// Make colors more vibrant
function vibrantColor(hexColor: string): string {
  try {
    const hex = hexColor.replace('#', '');
    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);
    
    // Increase saturation
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const saturation = max === 0 ? 0 : (max - min) / max;
    
    if (saturation < 0.5) {
      const boost = 1.3;
      r = Math.min(255, Math.round(r * boost));
      g = Math.min(255, Math.round(g * boost));
      b = Math.min(255, Math.round(b * boost));
    }
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  } catch {
    return hexColor;
  }
}

export function GeneratedTemplate({
  businessName,
  businessType,
  designSpec,
  onBack,
  onRegenerate
}: GeneratedTemplateProps) {
  const [showPublishForm, setShowPublishForm] = useState(false);

  // Make colors vibrant
  const primaryColor = vibrantColor(designSpec.primaryColor);
  const secondaryColor = vibrantColor(designSpec.secondaryColor);
  const accentColor = vibrantColor(designSpec.accentColor);
  
  // Get proper contrast colors
  const primaryTextColor = getContrastColor(primaryColor);
  const secondaryTextColor = getContrastColor(secondaryColor);
  const accentTextColor = getContrastColor(accentColor);
  
  // Log received images for debugging
  console.log("🖼️ GeneratedTemplate received images:", designSpec.generatedImages);
  
  // Use AI-generated images with cache busting
  const heroImage = designSpec.generatedImages?.hero 
    || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=80&auto=format";
    
  const featureImages = [
    designSpec.generatedImages?.feature1 
      || "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop&q=80&auto=format",
    designSpec.generatedImages?.feature2 
      || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&q=80&auto=format",
    designSpec.generatedImages?.feature3 
      || "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop&q=80&auto=format"
  ];
  
  console.log("🎨 Using hero image:", heroImage);
  console.log("🎨 Using feature images:", featureImages);
  
  const testimonials = [
    { name: "Sarah Johnson", role: "Customer", rating: 5, text: `Amazing experience with ${businessName}! Highly professional and exceeded expectations.` },
    { name: "Michael Chen", role: "Client", rating: 5, text: `Top-notch service and quality. Would definitely recommend to anyone.` },
    { name: "Emily Rodriguez", role: "Partner", rating: 5, text: `Outstanding results! The team at ${businessName} is simply the best.` }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header 
        className="sticky top-0 z-50 backdrop-blur-xl border-b-2 shadow-sm"
        style={{ 
          backgroundColor: `${primaryColor}15`,
          borderColor: primaryColor
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                style={{ backgroundColor: primaryColor }}
              >
                <span style={{ color: primaryTextColor }} className="text-xl">
                  {businessName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-2xl text-gray-900">{businessName}</h1>
                <p className="text-sm" style={{ color: primaryColor }}>{businessType}</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              {designSpec.sections.slice(0, 5).map((section, idx) => (
                <a
                  key={idx}
                  href={`#${section.toLowerCase()}`}
                  className="text-gray-700 hover:text-gray-900 transition-colors relative group"
                  style={{ 
                    '--hover-color': primaryColor 
                  } as React.CSSProperties}
                >
                  {section}
                  <span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: primaryColor }}
                  />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="home"
        className="relative py-24 md:py-32 px-6 overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${primaryColor}10 0%, ${secondaryColor}10 100%)`
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block mb-4 px-4 py-2 rounded-full text-sm" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                ✨ Welcome to {businessName}
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-gray-900 leading-tight">
                {designSpec.heroTitle}
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                {designSpec.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-14 px-8"
                  style={{ 
                    backgroundColor: primaryColor,
                    color: primaryTextColor
                  }}
                >
                  Get Started Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 hover:shadow-lg transition-all duration-300 h-14 px-8"
                  style={{ 
                    borderColor: primaryColor, 
                    color: primaryColor 
                  }}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div 
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-30"
                style={{ backgroundColor: primaryColor }}
              />
              <div 
                className="relative aspect-square rounded-3xl shadow-2xl overflow-hidden border-4 border-white"
              >
                <ImageWithFallback
                  src={heroImage}
                  alt={`${businessName} Hero`}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-4xl md:text-5xl mb-6 text-gray-900">
                About {businessName}
              </h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We are dedicated to providing exceptional {businessType.toLowerCase()} services that exceed expectations. 
                Our commitment to quality and customer satisfaction sets us apart in the industry.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                With years of experience and a passionate team, we deliver results that matter. 
                Join countless satisfied customers who have trusted us with their needs.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-4xl mb-2" style={{ color: primaryColor }}>500+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div>
                  <div className="text-4xl mb-2" style={{ color: secondaryColor }}>10+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl mb-2" style={{ color: accentColor }}>24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={featureImages[0]}
                  alt="About us"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features/Services Section */}
      <section id="services" className="py-20 px-6" style={{ background: `linear-gradient(to bottom, ${primaryColor}05, white)` }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl md:text-5xl mb-4 text-gray-900">
                Our Services
              </h3>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Discover what makes {businessName} the perfect choice for your needs
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {designSpec.features.slice(0, 6).map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card 
                  className="p-8 rounded-2xl border-2 hover:shadow-2xl transition-all duration-300 group h-full bg-white"
                  style={{ borderColor: `${primaryColor}30` }}
                >
                  {/* Feature Image */}
                  {idx < 3 && (
                    <div className="mb-6 rounded-xl overflow-hidden h-48 shadow-lg">
                      <ImageWithFallback
                        src={featureImages[idx]}
                        alt={feature}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-md"
                    style={{ backgroundColor: `${accentColor}20` }}
                  >
                    <span className="text-3xl" style={{ filter: 'grayscale(0)' }}>
                      {idx === 0 ? "🎯" : idx === 1 ? "⚡" : idx === 2 ? "🌟" : idx === 3 ? "💎" : idx === 4 ? "🚀" : "✨"}
                    </span>
                  </div>
                  <h4 className="text-2xl mb-3 text-gray-900">{feature}</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Experience excellence with our professional {feature.toLowerCase()} service designed to exceed your expectations.
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl mb-4 text-gray-900">
              Why Choose {businessName}?
            </h3>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              We're committed to delivering exceptional quality and service
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🏆", title: "Quality Guaranteed", desc: "Top-tier service every time" },
              { icon: "⚡", title: "Fast Delivery", desc: "Quick turnaround times" },
              { icon: "💰", title: "Best Value", desc: "Competitive pricing" },
              { icon: "🛡️", title: "Trusted & Secure", desc: "Your satisfaction guaranteed" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6"
              >
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  style={{ backgroundColor: primaryColor }}
                >
                  <span className="text-4xl">{item.icon}</span>
                </div>
                <h4 className="text-xl mb-2 text-gray-900">{item.title}</h4>
                <p className="text-gray-700">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6" style={{ background: `linear-gradient(135deg, ${secondaryColor}10, ${primaryColor}10)` }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl mb-4 text-gray-900">
              What Our Clients Say
            </h3>
            <p className="text-xl text-gray-700">
              Real stories from satisfied customers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-8 h-full bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" style={{ color: accentColor }} />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <span style={{ color: primaryTextColor }}>
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl md:text-5xl mb-6 text-gray-900">
                Get In Touch
              </h3>
              <p className="text-xl text-gray-700 mb-8">
                Ready to start your journey with {businessName}? Contact us today!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
                    style={{ backgroundColor: `${primaryColor}20` }}
                  >
                    <Mail className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">Email Us</div>
                    <div className="text-gray-700">contact@{businessName.toLowerCase().replace(/\s+/g, '')}.com</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
                    style={{ backgroundColor: `${primaryColor}20` }}
                  >
                    <Phone className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">Call Us</div>
                    <div className="text-gray-700">+1 (555) 123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
                    style={{ backgroundColor: `${primaryColor}20` }}
                  >
                    <MapPin className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">Visit Us</div>
                    <div className="text-gray-700">123 Business Street, City, State 12345</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
                    style={{ backgroundColor: `${primaryColor}20` }}
                  >
                    <Clock className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">Business Hours</div>
                    <div className="text-gray-700">Mon-Fri: 9AM - 6PM</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 shadow-xl border-2" style={{ borderColor: `${primaryColor}30` }}>
                <h4 className="text-2xl mb-6 text-gray-900">Send us a message</h4>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none transition-colors text-gray-900"
                      style={{ 
                        '--focus-border': primaryColor 
                      } as React.CSSProperties}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none transition-colors text-gray-900"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Message</label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none transition-colors text-gray-900"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <Button 
                    className="w-full h-12 shadow-lg hover:shadow-xl transition-all"
                    style={{ 
                      backgroundColor: primaryColor,
                      color: primaryTextColor
                    }}
                  >
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-24 px-6 relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: secondaryColor }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: accentColor }} />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl md:text-5xl mb-6" style={{ color: primaryTextColor }}>
              Ready to Get Started?
            </h3>
            <p className="text-xl mb-8" style={{ color: primaryTextColor, opacity: 0.9 }}>
              Join hundreds of satisfied customers and experience the {businessName} difference today
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white hover:bg-gray-100 shadow-2xl h-14 px-8 transform hover:scale-105 transition-all"
                style={{ color: primaryColor }}
              >
                Get Started Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 hover:bg-white/10 h-14 px-8"
                style={{ 
                  borderColor: primaryTextColor,
                  color: primaryTextColor
                }}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: primaryColor }}
              >
                <span style={{ color: primaryTextColor }}>
                  {businessName.charAt(0).toUpperCase()}
                </span>
              </div>
              <h4 className="text-xl mb-4">{businessName}</h4>
              <p className="text-gray-400 leading-relaxed">
                {businessType} - Excellence in every detail. Your trusted partner for quality service.
              </p>
            </div>
            {designSpec.sections.slice(0, 3).map((section, idx) => (
              <div key={idx}>
                <h5 className="text-lg mb-4">{section}</h5>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors hover:underline">Learn More</a></li>
                  <li><a href="#" className="hover:text-white transition-colors hover:underline">Our Services</a></li>
                  <li><a href="#" className="hover:text-white transition-colors hover:underline">Get in Touch</a></li>
                  <li><a href="#" className="hover:text-white transition-colors hover:underline">Support</a></li>
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">&copy; 2024 {businessName}. All rights reserved.</p>
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-3">
        <Button
          onClick={() => setShowPublishForm(true)}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-2xl h-12 px-6 transform hover:scale-105 transition-all font-semibold"
        >
          <Rocket className="w-5 h-5 mr-2" />
          Let's Publish
        </Button>

        <Button
          onClick={onBack}
          className="bg-black hover:bg-gray-800 text-white shadow-2xl h-12 px-6 transform hover:scale-105 transition-all"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Generator
        </Button>

        {onRegenerate && (
          <Button
            onClick={onRegenerate}
            className="shadow-2xl h-12 px-6 transform hover:scale-105 transition-all"
            style={{
              backgroundColor: accentColor,
              color: accentTextColor
            }}
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Generate Another Version
          </Button>
        )}
      </div>

      {/* Publish Form Modal */}
      <PublishForm
        isOpen={showPublishForm}
        onClose={() => setShowPublishForm(false)}
        businessName={businessName}
        businessType={businessType}
      />
    </div>
  );
}
