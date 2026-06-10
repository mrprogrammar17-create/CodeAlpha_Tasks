import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data';
import { Mail, Linkedin, Github, Send, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormFields>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field dynamically on user input change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    // Validate fields strictly
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'An email address is required.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please provide a valid email format.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject selection cannot be blank.';
    } else if (formData.subject.trim().length < 4) {
      newErrors.subject = 'Subject must be at least 4 characters.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please input a detailed message.';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Detailed message must exceed 15 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success simulation
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Clear notification after small delay
      setTimeout(() => setSubmitted(false), 6000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-24 bg-slate-50 dark:bg-[#050508] border-t border-slate-100 dark:border-white/5 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase">
            Contact
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white">
            Let's Formulate Something Great
          </p>
          <div className="mt-4 w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Quick Info & Social Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200/50 dark:border-white/10 shadow-sm relative overflow-hidden">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Connect Direct</h3>
              <p className="text-sm sm:text-base text-slate-650 dark:text-slate-400 leading-relaxed mb-8">
                Feel free to trigger a contract inquiry or professional question. I generally check and reply within 24 working hours of email receipt.
              </p>

              {/* Stack coordinates cards */}
              <div className="space-y-4">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#050508]/40 hover:bg-slate-100/50 dark:hover:bg-white/10 border border-slate-200/40 dark:border-white/5 transition-colors cursor-pointer group"
                >
                  <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-605 dark:text-purple-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase">Email Coordinates</div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-25 break-all">{PERSONAL_INFO.email}</div>
                  </div>
                </a>

                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#050508]/40 hover:bg-slate-100/50 dark:hover:bg-white/10 border border-slate-200/40 dark:border-white/5 transition-colors cursor-pointer group"
                >
                  <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-605 dark:text-purple-400 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase">LinkedIn Workspace</div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200">kamran-khan-designer</div>
                  </div>
                </a>

                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#050508]/40 hover:bg-slate-100/50 dark:hover:bg-white/10 border border-slate-200/40 dark:border-white/5 transition-colors cursor-pointer group"
                >
                  <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-605 dark:text-purple-400 group-hover:scale-105 transition-transform">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase">GitHub Profile Labs</div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200">kamrankhan-frontend</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Form container */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200/50 dark:border-white/10 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Drop Kamran a Message</h3>
              
              <form onSubmit={handleFormSubmit} className="space-y-5" id="contact-form">
                
                {/* Inputs Name & Email side-by-side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="form-name" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      id="form-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Kamran Cooper"
                      className={`w-full px-4 py-3 bg-slate-50 dark:bg-[#050508]/40 border ${
                        errors.name ? 'border-red-500 ring-1 ring-red-500/20' : 'border-slate-200 dark:border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/10'
                      } text-sm rounded-xl outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-450 transition-all`}
                    />
                    {errors.name && (
                      <div className="flex items-center space-x-1 text-xs text-red-500">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="form-email" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="dev-client@example.com"
                      className={`w-full px-4 py-3 bg-slate-50 dark:bg-[#050508]/40 border ${
                        errors.email ? 'border-red-500 ring-1 ring-red-500/20' : 'border-slate-200 dark:border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/10'
                      } text-sm rounded-xl outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-450 transition-all`}
                    />
                    {errors.email && (
                      <div className="flex items-center space-x-1 text-xs text-red-500">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subject selection */}
                <div className="space-y-2">
                  <label htmlFor="form-subject" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    id="form-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Contract Discussion / Full-time Role Offer"
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-[#050508]/40 border ${
                      errors.subject ? 'border-red-500 ring-1 ring-red-500/20' : 'border-slate-200 dark:border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/10'
                    } text-sm rounded-xl outline-none text-slate-805 dark:text-slate-100 placeholder:text-slate-455 transition-all`}
                  />
                  {errors.subject && (
                    <div className="flex items-center space-x-1 text-xs text-red-500">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.subject}</span>
                    </div>
                  )}
                </div>

                {/* Message block */}
                <div className="space-y-2">
                  <label htmlFor="form-message" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">
                    Detailed Message
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell Kamran how he can help with your front-end architecture, designs integration, or landing page creation goals..."
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-[#050508]/40 border ${
                      errors.message ? 'border-red-500 ring-1 ring-red-500/20' : 'border-slate-200 dark:border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/10'
                    } text-sm rounded-xl outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-455 transition-all resize-none`}
                  />
                  {errors.message && (
                    <div className="flex items-center space-x-1 text-xs text-red-500">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>

                {/* Success alert message block */}
                {submitted && (
                  <div className="p-4 rounded-xl bg-green-100 dark:bg-green-950/35 border border-green-200 dark:border-green-900/40 flex items-center space-x-3 text-green-800 dark:text-green-300">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-semibold">Message dispatched successfully! Kamran will touch base with you within 24 working hours.</span>
                  </div>
                )}

                {/* Button Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 ${
                    isSubmitting ? 'opacity-80 cursor-not-allowed' : 'hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Dispatch Message</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
