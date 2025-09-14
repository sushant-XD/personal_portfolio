'use client';

import { useState } from 'react';
import { getContact } from '@/lib/portfolio-config';

export function Contact() {
  const contact = getContact();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', description: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-minimal">
        <div className="text-center mb-16">
          <h2 className="section-title robotic-title">CONTACT</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info Section */}
          <div className="text-center mb-16">
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
          <div className="max-w-2xl mx-auto">
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
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="contact-form-input"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-bold uppercase tracking-wider mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="contact-form-input"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label 
                  htmlFor="description" 
                  className="block text-sm font-bold uppercase tracking-wider mb-2"
                >
                  Message
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="contact-form-input resize-none"
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-minimal w-full md:w-auto"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>

              {submitStatus === 'success' && (
                <div className="text-center p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-200">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="text-center p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-200">
                  Something went wrong. Please try again or email me directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}