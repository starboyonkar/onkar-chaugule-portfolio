
import { useState } from 'react';
import { Github, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:onkarchougule501@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(mailtoLink);
    
    toast({
      title: "Message prepared!",
      description: "Your email client should open with the message ready to send.",
    });
    
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In <span className="text-blue-400">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Let's Connect</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm always open to discussing new opportunities, innovative projects, 
                or just having a chat about technology and DevOps!
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  📧
                </div>
                <div>
                  <p className="text-white font-semibold">Email</p>
                  <a href="mailto:onkarchougule501@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                    onkarchougule501@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  📱
                </div>
                <div>
                  <p className="text-white font-semibold">Phone</p>
                  <a href="tel:+919373261147" className="text-blue-400 hover:text-blue-300 transition-colors">
                    +91-9373261147
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  📍
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
                className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Linkedin className="text-white" size={20} />
              </a>
              <a
                href="https://github.com/starboyonkar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Github className="text-white" size={20} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
