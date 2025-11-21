import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { ServicesSection } from "../components/ServicesSection";
import { WhyChooseUsSection } from "../components/WhyChooseUsSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { CTASection } from "../components/CTASection";
import { Footer } from "../components/Footer";
import { FloatingBackButton } from "../components/FloatingBackButton";
import { TemplateBottomBar } from "../components/TemplateBottomBar";

interface Template1Props {
  onBackToHome?: () => void;
}

export function Template1({ onBackToHome }: Template1Props) {
  return (
    <div className="min-h-screen">
      {onBackToHome && <FloatingBackButton onClick={onBackToHome} />}
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <div className="pb-20" /> {/* Spacer for bottom bar */}
      {onBackToHome && <TemplateBottomBar onBackToHome={onBackToHome} variant="default" />}
    </div>
  );
}
