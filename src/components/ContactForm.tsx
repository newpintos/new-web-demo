import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { X, Mail, Phone, Building2, MessageSquare, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from './AuthProvider';
import { supabase } from '../utils/supabase/client';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export function ContactForm({
  isOpen,
  onClose,
  title = 'Get in Touch',
  description = 'Tell us about your project',
}: ContactFormProps) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phone: '',
    businessName: '',
    businessDetails: '',
  });

  // Update form when modal opens or user changes
  useEffect(() => {
    if (isOpen) {
      if (user?.email) {
        setFormData((prev) => ({
          ...prev,
          email: user.email || '',
          fullName: user.user_metadata?.full_name || '',
        }));
      } else {
        setFormData({
          email: '',
          fullName: '',
          phone: '',
          businessName: '',
          businessDetails: '',
        });
      }
      setIsSuccess(false);
    }
  }, [isOpen, user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }
    if (!formData.fullName.trim()) {
      toast.error('Full name is required');
      return;
    }
    if (!formData.phone.trim()) {
      toast.error('Phone number is required');
      return;
    }
    if (!formData.businessName.trim()) {
      toast.error('Business name is required');
      return;
    }
    if (!formData.businessDetails.trim()) {
      toast.error('Please tell us about your business needs');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Submitting contact form:', formData);

      // Store inquiry in database
      const { error } = await supabase.from('inquiries').insert({
        email: formData.email,
        full_name: formData.fullName,
        phone: formData.phone,
        business_name: formData.businessName,
        business_details: formData.businessDetails,
        user_id: user?.id || null,
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error('Error storing inquiry:', error);
        toast.error('Failed to submit. Please try again.');
        return;
      }

      // Show success state
      setIsSuccess(true);
      toast.success('Thanks! We received your inquiry. We\'ll contact you soon!');

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          email: user?.email || '',
          fullName: user?.user_metadata?.full_name || '',
          phone: '',
          businessName: '',
          businessDetails: '',
        });
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="relative bg-[#1a1a1a] backdrop-blur-2xl border border-[#ff6b35]/30 rounded-3xl p-8 sm:p-12 w-full max-w-2xl shadow-2xl my-8">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-1 hover:bg-[#2a2a2a] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              {isSuccess ? (
                // Success State
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-6"
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Inquiry Received!</h3>
                  <p className="text-gray-400 mb-4">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <p className="text-sm text-gray-500">Redirecting...</p>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                      {title}
                    </h2>
                    <p className="text-gray-400">{description}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    disabled={!!user?.email}
                    className="bg-[#0f0f0f] border-[#ff6b35]/30 text-white placeholder:text-gray-600"
                  />
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="bg-[#0f0f0f] border-[#ff6b35]/30 text-white placeholder:text-gray-600"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="bg-[#0f0f0f] border-[#ff6b35]/30 text-white placeholder:text-gray-600"
                  />
                </div>

                {/* Business Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Building2 className="w-4 h-4 inline mr-2" />
                    Business Name
                  </label>
                  <Input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className="bg-[#0f0f0f] border-[#ff6b35]/30 text-white placeholder:text-gray-600"
                  />
                </div>

                {/* Business Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    What do you need? (Business Details)
                  </label>
                  <Textarea
                    name="businessDetails"
                    value={formData.businessDetails}
                    onChange={handleChange}
                    placeholder="Tell us about your business and what you're looking for... (e.g., 'I own a bakery and need a website to showcase my products and take orders online')"
                    className="bg-[#0f0f0f] border-[#ff6b35]/30 text-white placeholder:text-gray-600 min-h-32"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:from-[#ff5722] hover:to-[#ff6b35] text-white border-0 h-12 text-base shadow-lg shadow-[#ff6b35]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#ff6b35]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </Button>

                <p className="text-xs text-gray-600 text-center">
                  We'll get back to you within 24 hours
                </p>
              </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
