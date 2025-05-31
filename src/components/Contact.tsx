
import { useState } from 'react';
import { Github, Linkedin, MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Shake animation for errors
      const errorFields = Object.keys(errors);
      errorFields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
          element.classList.add('animate-shake');
          setTimeout(() => element.classList.remove('animate-shake'), 500);
        }
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Initialize EmailJS with your public key
      emailjs.init('vkatfER7ICgFmOHUL');
      
      // Send email using EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Onkar Chaugule'
      };

      await emailjs.send(
        'service_l83wzcn', // Your Service ID
        'template_64a6xxb', // Your Template ID
        templateParams
      );

      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 neon-text font-futuristic bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Get In <span className="text-blue-400">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Let's connect and discuss opportunities, projects, or just have a chat about technology!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-2 neon-text font-futuristic bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Let's Connect</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm always open to discussing new opportunities, innovative projects, 
                or just having a chat about technology and DevOps!
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors group">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-white font-semibold">Email</p>
                  <a href="mailto:onkarchougule501@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                    onkarchougule501@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-green-500 transition-colors group">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-white font-semibold">Phone</p>
                  <a href="tel:+919373261147" className="text-blue-400 hover:text-blue-300 transition-colors">
                    +91-9373261147
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-purple-500 transition-colors group">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-white font-semibold">Location</p>
                  <p className="text-gray-300">Solapur, Maharashtra, India</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              <a
                href="https://linkedin.com/in/onkar-chaugule"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Linkedin className="text-white" size={20} />
              </a>
              <a
                href="https://github.com/starboyonkar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg flex items-center justify-center hover:scale-110 transition-transform hover:shadow-lg hover:shadow-gray-500/25"
              >
                <Github className="text-white" size={20} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-xl border border-slate-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                      errors.name ? 'border-red-500 focus:border-red-400' : 'border-slate-700 focus:border-blue-500'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <div className="flex items-center mt-2 text-red-400 text-sm">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500 focus:border-red-400' : 'border-slate-700 focus:border-blue-500'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <div className="flex items-center mt-2 text-red-400 text-sm">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-white font-semibold mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                    errors.subject ? 'border-red-500 focus:border-red-400' : 'border-slate-700 focus:border-blue-500'
                  }`}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <div className="flex items-center mt-2 text-red-400 text-sm">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.subject}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${
                    errors.message ? 'border-red-500 focus:border-red-400' : 'border-slate-700 focus:border-blue-500'
                  }`}
                  placeholder="Tell me about your project or just say hello!"
                />
                {errors.message && (
                  <div className="flex items-center mt-2 text-red-400 text-sm">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
