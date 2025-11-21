import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Code, Sparkles, ArrowRight, CheckCircle2, Zap, Rocket, Mail } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { GenerateWebsiteForm } from "./GenerateWebsiteForm";
import { GeneratedTemplate } from "./GeneratedTemplate";
import { ContactForm } from "./ContactForm";

interface DesignSpec {
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
}

interface TemplateCardProps {
  templateNumber: number;
  title: string;
  businessType: string;
  description: string;
  features: string[];
  icon: string;
  designStyle: string;
  imageUrl: string;
  onSelect: () => void;
}

function TemplateCard({ 
  templateNumber, 
  title, 
  businessType, 
  description, 
  features,
  icon,
  designStyle,
  imageUrl,
  onSelect 
}: TemplateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: templateNumber * 0.1 }}
      whileHover={{ y: -12 }}
    >
      <div className="relative group">
        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#ff6b35]/50 transition-all duration-500 hover:shadow-[0_8px_32px_0_rgba(255,107,53,0.2)]">
          {/* Preview area */}
          <div className="h-64 relative overflow-hidden">
            <ImageWithFallback
              src={imageUrl}
              alt={`${title} Template Preview`}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>

          <div className="p-7">
            <div className="mb-4">
              <h3 className="text-2xl text-white mb-2">{title}</h3>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6b35]/10 backdrop-blur-sm border border-[#ff6b35]/30 text-sm text-gray-300">
                <Sparkles className="w-3.5 h-3.5 text-[#ff6b35]" />
                {businessType}
              </div>
            </div>
            
            <p className="text-gray-400 mb-5 leading-relaxed">{description}</p>
            
            {/* Features list */}
            <div className="mb-6 space-y-2">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6b35]" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={onSelect}
              className="w-full bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:from-[#ff5722] hover:to-[#ff6b35] text-white border-0 h-12 text-base shadow-lg shadow-[#ff6b35]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#ff6b35]/30"
            >
              <span>Launch Template</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CustomDesignCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 5 * 0.1 }}
        whileHover={{ y: -12 }}
      >
        <div
          className="relative group h-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#ff6b35]/30 hover:border-[#ff6b35]/70 transition-all duration-500 hover:shadow-[0_8px_32px_0_rgba(255,107,53,0.3)] h-full flex flex-col">
            {/* Preview area with gradient */}
            <div className="h-64 relative overflow-hidden bg-gradient-to-br from-[#ff6b35]/20 via-[#ff8c42]/10 to-transparent flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={isHovered ? { y: -10 } : { y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Rocket className="w-20 h-20 text-[#ff6b35] mx-auto mb-2" />
                </motion.div>
                <p className="text-gray-400 text-sm">Custom Design</p>
              </div>
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="p-7 flex flex-col flex-grow">
              <div className="mb-4">
                <h3 className="text-2xl text-white mb-2">More Templates</h3>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6b35]/10 backdrop-blur-sm border border-[#ff6b35]/30 text-sm text-gray-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#ff6b35]" />
                  Coming Soon
                </div>
              </div>

              <p className="text-gray-400 mb-5 leading-relaxed flex-grow">
                We're working on exciting new templates! If you want a custom web design, contact us and we'll make it live ASAP.
              </p>

              {/* Features list */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6b35]" />
                  <span>Custom Design Available</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6b35]" />
                  <span>Fast Turnaround</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6b35]" />
                  <span>Live ASAP</span>
                </div>
              </div>

              <Button
                onClick={() => setShowContactForm(true)}
                className="w-full bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:from-[#ff5722] hover:to-[#ff6b35] text-white border-0 h-12 text-base shadow-lg shadow-[#ff6b35]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#ff6b35]/30"
              >
                <Mail className="w-5 h-5 mr-2" />
                <span>Get in Touch</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Form Modal */}
      <ContactForm
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
        title="Let's Build Your Website"
        description="Tell us about your project and we'll help bring your vision to life"
      />
    </>
  );
}

interface TemplateSelectionProps {
  onTemplateSelect: (templateNumber: number) => void;
}

export function TemplateSelection({ onTemplateSelect }: TemplateSelectionProps) {
  const [generatedDesign, setGeneratedDesign] = useState<{
    designSpec: DesignSpec;
    businessName: string;
    businessType: string;
  } | null>(null);
  const [regenerateTrigger, setRegenerateTrigger] = useState(0);

  const handleGenerate = (designSpec: DesignSpec, businessName: string, businessType: string) => {
    setGeneratedDesign({ designSpec, businessName, businessType });
  };

  const handleBackToSelection = () => {
    setGeneratedDesign(null);
    setRegenerateTrigger(0);
  };

  const handleRegenerate = () => {
    setGeneratedDesign(null);
    setRegenerateTrigger(prev => prev + 1);
  };

  // If there's a generated design, show it
  if (generatedDesign) {
    return (
      <GeneratedTemplate
        businessName={generatedDesign.businessName}
        businessType={generatedDesign.businessType}
        designSpec={generatedDesign.designSpec}
        onBack={handleBackToSelection}
        onRegenerate={handleRegenerate}
      />
    );
  }

  const templates = [
    {
      templateNumber: 1,
      title: "Professional Default",
      businessType: "General Business",
      description: "Soft neumorphic design with subtle shadows and depth. Clean and modern.",
      features: ["Neumorphism Design", "Soft Shadows", "Minimal Colors"],
      icon: "💼",
      designStyle: "Neumorphism",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      templateNumber: 2,
      title: "Sweet Moments",
      businessType: "Bakery/Café",
      description: "Frosted glass effects with transparency and beautiful blur overlays.",
      features: ["Glassmorphism", "Frosted Glass", "Light Effects"],
      icon: "🥐",
      designStyle: "Glassmorphism",
      imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      templateNumber: 3,
      title: "PowerFit",
      businessType: "Fitness/Gym",
      description: "Ultra-minimal clean design with lots of white space and simple typography.",
      features: ["Minimal Design", "Clean Layout", "White Space"],
      icon: "💪",
      designStyle: "Minimal UI",
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      templateNumber: 4,
      title: "Strategic Partners",
      businessType: "Consulting",
      description: "Sophisticated professional design with serif typography and elegance.",
      features: ["Professional", "Serif Typography", "Elegant"],
      icon: "📊",
      designStyle: "Classic",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      templateNumber: 5,
      title: "Artisan Crafts",
      businessType: "Handmade/Boutique",
      description: "Playful clay-like elements with 3D depth and organic rounded shapes.",
      features: ["Claymorphism", "3D Elements", "Soft Shapes"],
      icon: "🎨",
      designStyle: "Claymorphism",
      imageUrl: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,107,53,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,107,53,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMTA3LDUzLDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#ff6b35]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] rounded-xl flex items-center justify-center shadow-lg shadow-[#ff6b35]/20">
                <Code className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl text-white">XYZ Digilab</h1>
                <p className="text-[10px] sm:text-xs text-gray-400">Digital Excellence</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#ff6b35]/10 backdrop-blur-md rounded-full border border-[#ff6b35]/30">
                <Zap className="w-4 h-4 text-[#ff6b35]" />
                <span className="text-sm text-gray-300">5 Templates + More Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Generate Form */}
      <section className="relative py-10 sm:py-16 md:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Content */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-[#ff6b35]/10 backdrop-blur-xl text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 border border-[#ff6b35]/30 shadow-lg text-sm sm:text-base"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff6b35]" />
                <span>AI-Powered Website Generator</span>
              </motion.div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 text-white tracking-tight px-4">
                Create Your Perfect
                <span className="block mt-2 bg-gradient-to-r from-[#ff6b35] via-[#ff8c42] to-[#ff6b35] bg-clip-text text-transparent">
                  Website in Minutes
                </span>
              </h2>
              
              <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
                Describe your vision or choose from our premium templates. 
                Our AI will help you build a stunning, professional website.
              </p>
            </motion.div>
          </div>

          {/* Generate Form */}
          <div className="max-w-4xl mx-auto mb-16">
            <GenerateWebsiteForm onGenerate={handleGenerate} />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-10 sm:my-16 max-w-4xl mx-auto">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent" />
            <span className="text-gray-500 px-2 sm:px-4 text-sm sm:text-base">OR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent" />
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-8">
            {[
              { label: "100% Responsive", icon: "📱" },
              { label: "Modern Design", icon: "✨" },
              { label: "React + Tailwind", icon: "⚡" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="flex items-center gap-1.5 sm:gap-2 bg-[#1a1a1a] backdrop-blur-lg px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#ff6b35]/20"
              >
                <span className="text-base sm:text-xl">{stat.icon}</span>
                <span className="text-gray-300 text-xs sm:text-base">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Grid */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h3 className="text-2xl sm:text-4xl mb-3 sm:mb-4 text-white px-4">Explore Premium Templates</h3>
            <p className="text-gray-400 text-sm sm:text-lg px-4">
              Each template features a unique design philosophy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {templates.map((template) => (
              <TemplateCard
                key={template.templateNumber}
                {...template}
                onSelect={() => onTemplateSelect(template.templateNumber)}
              />
            ))}
            <CustomDesignCard />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1a1a1a] backdrop-blur-2xl border border-[#ff6b35]/30 rounded-3xl p-12 shadow-2xl"
          >
            <Sparkles className="w-16 h-16 text-[#ff6b35] mx-auto mb-6" />
            <h3 className="text-4xl mb-6 text-white">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-xl text-gray-400 mb-8">
              Choose a template above and start creating your digital presence today.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:from-[#ff5722] hover:to-[#ff6b35] text-white border-0 px-8 h-14 text-lg shadow-xl shadow-[#ff6b35]/20 hover:shadow-2xl hover:shadow-[#ff6b35]/30 transition-all"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Browse Templates
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-xl border-t border-[#ff6b35]/20 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] rounded-lg flex items-center justify-center shadow-lg shadow-[#ff6b35]/20">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white">XYZ Digilab</div>
                <div className="text-sm text-gray-500">Crafting Digital Excellence</div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">&copy; 2024 XYZ Digilab. All templates ready to launch.</p>
              <p className="text-xs text-gray-600 mt-1">Built with React, Tailwind CSS & Motion</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Form */}
      <ContactForm isOpen={false} onClose={() => {}} />
    </div>
  );
}
