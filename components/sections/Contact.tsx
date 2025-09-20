'use client';

import { useState, useEffect } from 'react';
import { getContact } from '@/lib/portfolio-config';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import emailjs from '@emailjs/browser';

export function Contact() {
  const contact = getContact();
  const { elementRef, isVisible } = useScrollAnimation({ 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: false // Allow re-animation every time
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  // Initialize EmailJS when component mounts
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
      console.log('EmailJS initialized with public key');
    } else {
      console.warn('EmailJS public key not found. Contact form will be disabled.');
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    // Validate name
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Validate message
    if (!formData.description.trim()) {
      errors.description = 'Message is required';
    } else if (formData.description.trim().length < 10) {
      errors.description = 'Message must be at least 10 characters long';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      console.log('Form validation failed:', validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      // Debug: Check if environment variables are loaded
      console.log('EmailJS Config Check:', {
        serviceId: serviceId ? `Found: ${serviceId}` : 'Missing',
        templateId: templateId ? `Found: ${templateId}` : 'Missing',
        publicKey: publicKey ? `Found: ${publicKey.substring(0, 8)}...` : 'Missing'
      });

      // Validate that all required configs are present
      if (!serviceId || !templateId || !publicKey) {
        console.error('Missing EmailJS configuration');
        throw new Error('EmailJS configuration missing. Please check your environment variables.');
      }

      // Prepare template parameters (using common EmailJS template field names)
      const templateParams = {
        user_name: formData.name.trim(),
        user_email: formData.email.trim(),
        message: formData.description.trim(),
        to_name: 'Sushant', // Your name
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        reply_to: formData.email.trim(),
      };

      console.log('Sending email with params:', templateParams);
      console.log('Using EmailJS service:', serviceId, 'template:', templateId);

      // Send email using EmailJS
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('EmailJS Response:', response);

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', description: '' });
        setValidationErrors({});
        console.log('Email sent successfully!');
        
        // Auto-dismiss success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        throw new Error(`EmailJS returned status: ${response.status}`);
      }
      
    } catch (error) {
      console.error('EmailJS Error Details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        error: error,
        stack: error instanceof Error ? error.stack : 'No stack trace',
        type: typeof error,
        stringified: JSON.stringify(error)
      });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      ref={elementRef}
      className="section-padding bg-white dark:bg-gray-900"
    >
      <div className="container-minimal">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'scroll-visible' : 'scroll-hidden'
        }`}>
          <h2 className="section-title robotic-title">CONTACT</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info Section */}
          <div className={`text-center mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? 'scroll-visible' : 'scroll-hidden'
          }`}>
            <p className="text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              {contact.description}
            </p>

            <div className="flex justify-center items-center mb-16">
              {Object.entries(contact.social).map(([platform, url], index, array) => (
                url && (
                  <div key={platform} className="flex items-center">
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-black dark:text-white hover:opacity-50 transition-minimal text-sm uppercase tracking-wider"
                    >
                      {platform}
                    </a>
                    {index < array.length - 1 && url && array[index + 1][1] && (
                      <div className="w-0.5 h-4 bg-black dark:bg-white mx-6"></div>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Contact Form Section */}
          <div className={`max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
            isVisible ? 'scroll-visible-scale' : 'scroll-hidden-scale'
          }`}>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold robotic-subtitle mb-4">Send a Message</h3>
              <p className="text-sm opacity-70 uppercase tracking-wider">Let's start a conversation</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-bold uppercase tracking-wider mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`contact-form-input ${validationErrors.name ? 'border-red-500 dark:border-red-400' : ''}`}
                  placeholder="Your full name"
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-bold uppercase tracking-wider mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`contact-form-input ${validationErrors.email ? 'border-red-500 dark:border-red-400' : ''}`}
                  placeholder="your@email.com"
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                )}
              </div>

              <div>
                <label 
                  htmlFor="description" 
                  className="block text-sm font-bold uppercase tracking-wider mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  className={`contact-form-input resize-none ${validationErrors.description ? 'border-red-500 dark:border-red-400' : ''}`}
                  placeholder="Tell me about your project or idea..."
                />
                {validationErrors.description && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>
                )}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-minimal w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>

              {submitStatus === 'success' && (
                <div className="text-center p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-200 rounded-lg transition-all duration-300">
                  <p className="font-semibold">Message sent successfully!</p>
                  <p className="text-sm mt-1">I'll get back to you soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="text-center p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-200 rounded-lg">
                  <p className="font-semibold">✗ Something went wrong</p>
                  <p className="text-sm mt-1">Please try again or email me directly.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}