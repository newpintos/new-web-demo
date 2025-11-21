import { Button } from "./ui/button";
import { Rocket } from "lucide-react";
import { motion } from "motion/react";

interface FloatingBackButtonProps {
  onClick: () => void;
}

export function FloatingBackButton({ onClick }: FloatingBackButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className="fixed top-20 left-6 z-[100]"
    >
      <Button
        onClick={onClick}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl border-2 border-blue-400 hover:border-blue-500 transition-all hover:scale-105"
        size="lg"
      >
        <Rocket className="mr-2 h-5 w-5" />
        Let's Make It Live
      </Button>
    </motion.div>
  );
}
