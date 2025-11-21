import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Sparkles, X } from 'lucide-react';
import { useAuth } from './AuthProvider';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export function LoginModal({ isOpen, onClose, message }: LoginModalProps) {
  const { signInWithGoogle } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative bg-[#1a1a1a] backdrop-blur-2xl border border-[#ff6b35]/30 rounded-3xl p-8 sm:p-12 w-full max-w-md shadow-2xl">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-1 hover:bg-[#2a2a2a] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] rounded-2xl flex items-center justify-center shadow-lg shadow-[#ff6b35]/20">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Start Creating
                </h3>

                <p className="text-gray-400 mb-2">
                  {message || 'Sign in with Google to generate your website'}
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  You get 5 free website generations
                </p>

                <div className="bg-[#0f0f0f]/50 rounded-xl p-4 mb-8 space-y-3">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-[#ff6b35]" />
                    <span>Generate beautiful websites instantly</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-[#ff6b35]" />
                    <span>AI-powered design & content</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-[#ff6b35]" />
                    <span>No credit card required</span>
                  </div>
                </div>

                <Button
                  onClick={signInWithGoogle}
                  className="w-full bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:from-[#ff5722] hover:to-[#ff6b35] text-white border-0 h-12 text-base shadow-lg shadow-[#ff6b35]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#ff6b35]/30"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </Button>

                <p className="text-xs text-gray-600 mt-6">
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
