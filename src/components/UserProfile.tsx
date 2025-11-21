import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, User, Zap } from 'lucide-react';
import { useAuth } from './AuthProvider';

export function UserProfile() {
  const { user, signOut, generationCount } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const userInitials = user.user_metadata?.full_name
    ? user.user_metadata.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : user.email?.charAt(0).toUpperCase() || 'U';

  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    <div className="relative">
      {/* Profile Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1a1a1a] transition-colors border border-[#ff6b35]/20 hover:border-[#ff6b35]/50"
      >
        {/* Avatar */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={user.user_metadata?.full_name || 'User'}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] flex items-center justify-center text-white text-sm font-semibold">
            {userInitials}
          </div>
        )}

        {/* Generations Remaining Badge */}
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/30">
          <Zap className="w-3 h-3 text-[#ff6b35]" />
          <span className="text-xs font-semibold text-[#ff6b35]">
            {5 - generationCount}
          </span>
        </div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-64 bg-[#1a1a1a] border border-[#ff6b35]/30 rounded-lg shadow-2xl z-40 overflow-hidden"
            >
              {/* User Info */}
              <div className="p-4 border-b border-[#ff6b35]/20 bg-[#0f0f0f]/50">
                <div className="flex items-center gap-3 mb-2">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={user.user_metadata?.full_name || 'User'}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] flex items-center justify-center text-white font-semibold">
                      {userInitials}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {user.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Generations Info */}
              <div className="p-4 border-b border-[#ff6b35]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Free Generations</p>
                    <p className="text-lg font-bold text-white">
                      <span className="text-[#ff6b35]">{5 - generationCount}</span>
                      <span className="text-gray-500 text-sm"> of 5</span>
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-[#ff6b35]/10 border border-[#ff6b35]/30 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-[#ff6b35]" />
                  </div>
                </div>
                {5 - generationCount === 0 && (
                  <p className="text-xs text-[#ff6b35] mt-2 font-semibold">
                    Limit reached. Contact us for more!
                  </p>
                )}
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-[#ff6b35]/10 hover:text-white rounded-lg transition-colors group"
                >
                  <LogOut className="w-4 h-4 group-hover:text-[#ff6b35]" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
