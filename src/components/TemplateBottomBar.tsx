import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface TemplateBottomBarProps {
  onBackToHome?: () => void;
  variant?: "default" | "bakery" | "fitness" | "consulting" | "crafts";
}

export function TemplateBottomBar({ onBackToHome, variant = "default" }: TemplateBottomBarProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "bakery":
        return {
          bg: "bg-amber-100/95 backdrop-blur-lg border-t border-amber-200",
          backButton: "bg-amber-600 hover:bg-amber-700 text-white",
          generateButton: "bg-amber-500 hover:bg-amber-600 text-white border border-amber-300"
        };
      case "fitness":
        return {
          bg: "bg-black/95 backdrop-blur-lg border-t border-lime-500/30",
          backButton: "bg-gray-800 hover:bg-gray-900 text-lime-400 border border-lime-500/30",
          generateButton: "bg-lime-600 hover:bg-lime-700 text-black border border-lime-400"
        };
      case "consulting":
        return {
          bg: "bg-white/95 backdrop-blur-lg border-t border-gray-200",
          backButton: "bg-gray-600 hover:bg-gray-700 text-white",
          generateButton: "bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-400"
        };
      case "crafts":
        return {
          bg: "bg-gradient-to-r from-amber-50/95 to-rose-50/95 backdrop-blur-lg border-t border-amber-200",
          backButton: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-[4px_4px_12px_rgba(0,0,0,0.15)]",
          generateButton: "bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white shadow-[4px_4px_12px_rgba(0,0,0,0.15)] border border-purple-300"
        };
      default:
        return {
          bg: "bg-white/95 backdrop-blur-lg border-t border-gray-200",
          backButton: "bg-gray-600 hover:bg-gray-700 text-white",
          generateButton: "bg-purple-600 hover:bg-purple-700 text-white border border-purple-400"
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 ${styles.bg}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Button
          onClick={onBackToHome}
          className={`${styles.backButton} gap-2`}
          size="lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Button>
        
        <Button
          className={`${styles.generateButton} gap-2`}
          size="lg"
        >
          <Sparkles className="w-5 h-5" />
          Generate
        </Button>
      </div>
    </div>
  );
}
