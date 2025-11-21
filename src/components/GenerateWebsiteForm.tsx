import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Sparkles, Loader2, Wand2, X, Copy, CheckCircle2, Eye, Image as ImageIcon, ChevronDown } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateBusinessImages } from "./ImageGenerationService";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface DesignSpec {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  heroTitle: string;
  heroSubtitle: string;
  sections: string[];
  features: string[];
  imagePrompts?: {
    hero: string;
    feature1: string;
    feature2: string;
    feature3: string;
  };
  generatedImages?: {
    hero: string;
    feature1: string;
    feature2: string;
    feature3: string;
  };
}

interface GenerateWebsiteFormProps {
  onGenerate?: (designSpec: DesignSpec, businessName: string, businessType: string) => void;
}

export function GenerateWebsiteForm({ onGenerate }: GenerateWebsiteFormProps) {
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingImages, setGeneratingImages] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);
  const [designSpec, setDesignSpec] = useState<DesignSpec | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [aiImagesOpen, setAiImagesOpen] = useState(false);

  const handleGenerate = async () => {
    // Validate required fields
    if (!businessName.trim() || !prompt.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);

    try {
      // Initialize Google Gemini AI
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      // Using Gemini 2.0 Flash (experimental) - Latest and fastest model
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

      const userPrompt = `You are an expert web designer. Generate a website design specification for this business:

Business Name: ${businessName}
Business Type: ${businessType || 'General Business'}
Requirements: ${prompt}

You MUST respond with ONLY a valid JSON object (no markdown, no explanation, no extra text) with this exact structure:
{
  "primaryColor": "#hexcode",
  "secondaryColor": "#hexcode",
  "accentColor": "#hexcode",
  "heroTitle": "Catchy main headline for ${businessName}",
  "heroSubtitle": "Compelling subtitle that describes what they do",
  "sections": ["Home", "About", "Services", "Contact", "etc"],
  "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6"],
  "designStyle": "Modern/Minimalist/Bold/etc",
  "fullDescription": "A detailed multi-paragraph description of the complete design vision",
  "imagePrompts": {
    "hero": "A detailed image prompt for the hero section image that represents ${businessName}",
    "feature1": "Image prompt for the first feature/service section",
    "feature2": "Image prompt for the second feature/service section",
    "feature3": "Image prompt for the third feature/service section"
  }
}

IMPORTANT COLOR REQUIREMENTS:
- Choose VIBRANT, BOLD colors that are eye-catching and modern
- Colors must be saturated and energetic (avoid muted or dull tones)
- Ensure all colors meet WCAG AA accessibility standards (4.5:1 contrast ratio for text)
- Primary color should be bold and represent the brand personality
- Make it specific to ${businessType} business
- Create detailed, professional image prompts that will generate high-quality, relevant images for each section
- Be creative and professional`;

      const result = await model.generateContent(userPrompt);
      const response = await result.response;
      const text = response.text();

      // Parse the JSON response
      let parsedSpec: DesignSpec & { designStyle: string; fullDescription: string };
      try {
        // Remove markdown code blocks if present
        const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        parsedSpec = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error("Failed to parse JSON:", text);
        throw new Error("Failed to parse AI response. Please try again.");
      }

      // Generate custom images using Gemini AI
      setGeneratingImages(true);
      toast.info("🎨 Creating custom images with AI...", { duration: 3000 });

      try {
        // Use Gemini 2.5 Flash to generate business-specific images
        const generatedImages = await generateBusinessImages(
          businessName,
          businessType || 'General Business',
          prompt,
          import.meta.env.VITE_GEMINI_API_KEY
        );

        parsedSpec.generatedImages = generatedImages;
        setGeneratingImages(false);
        toast.success("✅ Custom images generated successfully!");

      } catch (imageError) {
        console.error("Image generation error:", imageError);
        setGeneratingImages(false);
        toast.error("⚠️ Using fallback images");

        // Use fallback images based on business type
        parsedSpec.generatedImages = {
          hero: `https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&q=80`,
          feature1: `https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop&q=80`,
          feature2: `https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&q=80`,
          feature3: `https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop&q=80`
        };
      }

      setDesignSpec(parsedSpec);
      setGeneratedResult(parsedSpec.fullDescription || text);
      setShowResultModal(true);
      toast.success("🎉 Website design and images generated successfully!");

      if (onGenerate) {
        onGenerate(parsedSpec, businessName, businessType);
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate design. Please check your API key or try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedResult) {
      navigator.clipboard.writeText(generatedResult);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <Card className="bg-[#1a1a1a] border-[#ff6b35]/30 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="p-5 sm:p-8 md:p-10">
            {/* Header */}
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] rounded-2xl flex items-center justify-center shadow-lg">
                <Wand2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-3xl text-white mb-1">
                  Generate Your Website
                </h3>
                <p className="text-gray-400 text-xs sm:text-base">
                  Describe your vision, and we'll create a custom design
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Business Name */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">
                    Business Name <span className="text-[#ff6b35]">*</span>
                  </label>
                  <Input
                    placeholder="e.g., Artisan Coffee Co."
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="bg-black/40 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#ff6b35] focus:ring-[#ff6b35]/20 h-12"
                  />
                </div>

                {/* Business Type */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">
                    Business Type
                  </label>
                  <Input
                    placeholder="e.g., Bakery, Fitness, Consulting"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="bg-black/40 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#ff6b35] focus:ring-[#ff6b35]/20 h-12"
                  />
                </div>
              </div>

              {/* Prompt */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300">
                  Describe Your Website <span className="text-[#ff6b35]">*</span>
                </label>
                <Textarea
                  placeholder="Describe your ideal website design, features, style, and any specific requirements..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-black/40 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#ff6b35] focus:ring-[#ff6b35]/20 min-h-[120px] resize-none"
                />
                <p className="text-xs text-gray-500">
                  Example: "A modern, minimalist website for my organic bakery with warm colors, featuring an online menu, customer testimonials, and a contact form"
                </p>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full h-14 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:from-[#ff5722] hover:to-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#ff6b35]/30 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {generatingImages ? "Creating Custom Images..." : "Generating Your Design..."}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Website Design
                  </>
                )}
              </Button>

              {/* Progress Indicator */}
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 p-4 bg-black/40 border border-[#ff6b35]/30 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <Loader2 className="w-5 h-5 text-[#ff6b35] animate-spin mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-white mb-2">Generation Progress:</p>
                      <div className="space-y-1 text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          <span>Analyzing business requirements</span>
                        </div>
                        {!generatingImages && (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-3 h-3 animate-spin text-[#ff6b35]" />
                            <span>Creating design specification</span>
                          </div>
                        )}
                        {generatingImages && (
                          <>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-3 h-3 text-green-500" />
                              <span>Design specification created</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Loader2 className="w-3 h-3 animate-spin text-[#ff6b35]" />
                              <span className="text-[#ff6b35]">Generating custom images with AI</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Collapsible Tips Section */}
            <div className="mt-6 space-y-3">
              {/* Tips Collapsible */}
              <Collapsible open={tipsOpen} onOpenChange={setTipsOpen}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 bg-[#ff6b35]/10 border border-[#ff6b35]/30 rounded-xl hover:bg-[#ff6b35]/15 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-[#ff6b35] text-lg">💡</span>
                      <span className="text-sm text-white">Tips for Better Results</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#ff6b35] transition-transform ${tipsOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2 p-4 bg-black/40 border border-[#ff6b35]/20 rounded-xl">
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Be specific about your preferences! Mention colors, style (modern, vintage, minimalist),
                      sections you need (gallery, booking, shop), and your target audience.
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* AI Images Collapsible */}
              <Collapsible open={aiImagesOpen} onOpenChange={setAiImagesOpen}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 bg-[#ff6b35]/10 border border-[#ff6b35]/30 rounded-xl hover:bg-[#ff6b35]/15 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-[#ff6b35] text-lg">🎨</span>
                      <span className="text-sm text-white">AI-Powered Images</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#ff6b35] transition-transform ${aiImagesOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2 p-4 bg-black/40 border border-[#ff6b35]/20 rounded-xl">
                    <p className="text-sm text-gray-400 leading-relaxed">
                      We'll generate custom images for your website using Gemini AI based on your business description!
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Result Modal */}
      <AnimatePresence>
        {showResultModal && generatedResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowResultModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a1a1a] border border-[#ff6b35]/30 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#ff6b35]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl text-white">Generated Design Specification</h3>
                    <p className="text-sm text-gray-400">For {businessName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    size="sm"
                    className="bg-black/40 border-gray-700 text-gray-300 hover:bg-[#ff6b35]/10 hover:border-[#ff6b35]/50 hover:text-white"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => setShowResultModal(false)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-white/5"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
                {designSpec && (
                  <div className="space-y-6">
                    {/* Color Palette */}
                    <div>
                      <h4 className="text-lg text-white mb-3">Color Palette</h4>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <div
                            className="w-full h-20 rounded-lg mb-2"
                            style={{ backgroundColor: designSpec.primaryColor }}
                          />
                          <p className="text-sm text-gray-400">Primary: {designSpec.primaryColor}</p>
                        </div>
                        <div className="flex-1">
                          <div
                            className="w-full h-20 rounded-lg mb-2"
                            style={{ backgroundColor: designSpec.secondaryColor }}
                          />
                          <p className="text-sm text-gray-400">Secondary: {designSpec.secondaryColor}</p>
                        </div>
                        <div className="flex-1">
                          <div
                            className="w-full h-20 rounded-lg mb-2"
                            style={{ backgroundColor: designSpec.accentColor }}
                          />
                          <p className="text-sm text-gray-400">Accent: {designSpec.accentColor}</p>
                        </div>
                      </div>
                    </div>

                    {/* Generated Images Preview */}
                    {designSpec.generatedImages && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <ImageIcon className="w-5 h-5 text-[#ff6b35]" />
                          <h4 className="text-lg text-white">AI-Generated Images</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="relative group">
                            <img
                              src={designSpec.generatedImages.hero}
                              alt="Hero"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm">Hero Image</span>
                            </div>
                          </div>
                          <div className="relative group">
                            <img
                              src={designSpec.generatedImages.feature1}
                              alt="Feature 1"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm">Feature 1</span>
                            </div>
                          </div>
                          <div className="relative group">
                            <img
                              src={designSpec.generatedImages.feature2}
                              alt="Feature 2"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm">Feature 2</span>
                            </div>
                          </div>
                          <div className="relative group">
                            <img
                              src={designSpec.generatedImages.feature3}
                              alt="Feature 3"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm">Feature 3</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          ✨ Images generated using AI based on your business description
                        </p>
                      </div>
                    )}

                    {/* Hero Content */}
                    <div>
                      <h4 className="text-lg text-white mb-3">Hero Section</h4>
                      <div className="bg-black/40 p-4 rounded-lg border border-gray-700">
                        <p className="text-2xl text-white mb-2">{designSpec.heroTitle}</p>
                        <p className="text-gray-400">{designSpec.heroSubtitle}</p>
                      </div>
                    </div>

                    {/* Sections */}
                    <div>
                      <h4 className="text-lg text-white mb-3">Website Sections</h4>
                      <div className="flex flex-wrap gap-2">
                        {designSpec.sections.map((section, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-[#ff6b35]/20 border border-[#ff6b35]/40 rounded-full text-sm text-gray-300"
                          >
                            {section}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-lg text-white mb-3">Key Features</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {designSpec.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-black/40 rounded-lg border border-gray-700 text-sm text-gray-300"
                          >
                            ✓ {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Full Description */}
                    {generatedResult && (
                      <div>
                        <h4 className="text-lg text-white mb-3">Design Vision</h4>
                        <div className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">
                          {generatedResult}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-[#ff6b35]/20 bg-black/20">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <p className="text-sm text-gray-500">
                    Ready to see your generated website?
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    <Button
                      onClick={() => {
                        setShowResultModal(false);
                        // Regenerate with same inputs
                        handleGenerate();
                      }}
                      variant="outline"
                      className="bg-[#ff6b35]/10 border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35]/20"
                      disabled={isGenerating}
                    >
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Another
                    </Button>
                    <Button
                      onClick={() => setShowResultModal(false)}
                      variant="outline"
                      className="bg-black/40 border-gray-700 text-gray-300 hover:bg-white/5"
                    >
                      Close
                    </Button>
                    <Button
                      onClick={() => {
                        setShowResultModal(false);
                        // Trigger the preview
                        if (onGenerate && designSpec) {
                          onGenerate(designSpec, businessName, businessType);
                        }
                      }}
                      className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:from-[#ff5722] hover:to-[#ff6b35] text-white"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Live Website
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
