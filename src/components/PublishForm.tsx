import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { X, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface PublishFormProps {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
  businessType: string;
}

interface FormData {
  email: string;
  phone: string;
  businessName: string;
  businessDescription: string;
  specialRequirements: string;
}

export function PublishForm({ isOpen, onClose, businessName, businessType }: PublishFormProps) {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    businessName: businessName,
    businessDescription: businessType,
    specialRequirements: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Business name validation
    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    // Business description validation
    if (!formData.businessDescription.trim()) {
      newErrors.businessDescription = "Business description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call - replace with actual backend endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Log the form data (in production, send to backend)
      console.log("📧 Publish Form Submission:", {
        timestamp: new Date().toISOString(),
        ...formData
      });

      // Here you would typically send to your backend
      // Example:
      // const response = await fetch('/api/publish-request', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      setSubmitStatus("success");
      toast.success("✅ Your request has been submitted! We'll contact you soon.");

      // Reset form and close after 2 seconds
      setTimeout(() => {
        setFormData({
          email: "",
          phone: "",
          businessName: businessName,
          businessDescription: businessType,
          specialRequirements: ""
        });
        onClose();
      }, 2000);

    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      toast.error("❌ Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 border-b border-orange-600/20 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Let's Publish Your Website</h2>
                <p className="text-sm text-orange-100 mt-1">Fill in your details and we'll get you live</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form or Success Message */}
            {submitStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 flex flex-col items-center justify-center text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Success!</h3>
                <p className="text-gray-600">
                  Your website publish request has been submitted. We'll contact you at <strong>{formData.email}</strong> within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                      errors.email
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-orange-400 focus:border-orange-500"
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                      errors.phone
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-orange-400 focus:border-orange-500"
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Business Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Business Name *
                  </label>
                  <Input
                    type="text"
                    name="businessName"
                    placeholder="Your Business Name"
                    value={formData.businessName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                      errors.businessName
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-orange-400 focus:border-orange-500"
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.businessName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.businessName}
                    </p>
                  )}
                </div>

                {/* Business Description Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Business Description *
                  </label>
                  <Textarea
                    name="businessDescription"
                    placeholder="Tell us about your business, what you do, who you serve..."
                    value={formData.businessDescription}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors resize-none ${
                      errors.businessDescription
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-orange-400 focus:border-orange-500"
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.businessDescription && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.businessDescription}
                    </p>
                  )}
                </div>

                {/* Special Requirements Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Special Requirements (Optional)
                  </label>
                  <Textarea
                    name="specialRequirements"
                    placeholder="Any specific features, domains, hosting preferences, or custom requirements..."
                    value={formData.specialRequirements}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 hover:border-orange-400 focus:border-orange-500 transition-colors resize-none"
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tell us about any custom domains, specific features, or hosting preferences
                  </p>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    onClick={onClose}
                    variant="outline"
                    className="flex-1 h-12 border-2 border-gray-300 hover:border-gray-400"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block animate-spin mr-2">⏳</span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Let's Publish
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
