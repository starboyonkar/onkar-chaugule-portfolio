
import { Github, ExternalLink, Play, Youtube, Globe } from 'lucide-react';
import { useState } from 'react';

export const Projects = () => {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const projects = [
    {
      title: "Tune Guard – A Cognitive Enhancement of Audio Synthesis using Advanced Equalization",
      description: "An intelligent audio player that dynamically adjusts EQ using real-time FFT analysis and user profile data. Features smart voice control, safety-based hearing protection, and seamless Spotify integration.",
      tech: ["React.js", "TypeScript", "Tailwind CSS", "Node.js", "Voice Recognition", "FFT", "Python"],
      github: "https://github.com/starboyonkar",
      demo: "https://tune-guard.site",
      youtube: "https://youtu.be/G1-CyUG_jGg?si=fIL8cJUATHpV7Y7M",
      image: "/lovable-uploads/b5db91b1-c819-46bc-99a2-0ffc29af6d0f.png",
      color: "from-blue-500 to-purple-500",
      featured: true,
      isImageUrl: true,
      hasLiveDemo: true
    },
    {
      title: "E-Commerce Website: CRM and Billing Web Application",
      description: "A fully functional, containerized CRM and billing solution for product and service management. Designed with seamless CI/CD integration and deployed on AWS for production-ready scalability.",
      tech: ["React.js", "TypeScript", "Tailwind CSS", "Node.js", "Jenkins CI/CD Pipeline", "Docker", "GitHub", "AWS EC2 Deployment"],
      github: "https://github.com/starboyonkar",
      demo: "https://borewell-crm-billing.netlify.app/",
      image: "/lovable-uploads/bdbedaed-e268-41b5-8dab-333442fff0a9.png",
      color: "from-orange-500 to-red-500",
      featured: true,
      isImageUrl: true,
      hasLiveDemo: true
    },
    {
      title: "DESIGN AND DEVELOPMENT OF VIRTUAL TWIN OF AN AUTONOMOUS UNDERWATER VEHICLE (AUV)",
      description: "A sea-wheel-shaped autonomous marine robot with 8 thrusters and smart navigation. Built with real-time image processing and robotics logic for underwater operations.",
      tech: ["Raspberry Pi", "Embedded Python", "Computer Vision", "Real-Time Video", "Sensor Integration", "Robotics"],
      github: "https://github.com/starboyonkar",
      demo: null,
      image: "/lovable-uploads/5f824a66-d1db-4eb9-ba74-a8cef4d21983.png",
      color: "from-cyan-500 to-blue-500",
      featured: true,
      isImageUrl: true
    },
    {
      title: "Design and Development of AI-Based Smart Irrigation System",
      description: "A real-time agricultural solution using sensors, weather data, and AI logic to automate water control and optimize resource usage.",
      tech: ["Raspberry Pi", "IoT", "Embedded Python", "Sensor Integration", "AI Automation"],
      github: "https://github.com/starboyonkar",
      demo: null,
      image: "/lovable-uploads/f4f4df66-462a-48bb-a587-1731b2261cbc.png",
      color: "from-green-500 to-emerald-500",
      featured: true,
      isImageUrl: true
    },
    {
      title: "Virtual Desktop Assistant using Python AI",
      description: "An intelligent voice-controlled assistant built with Python and React, capable of real-time communication, automation, and interface interaction using AI.",
      tech: ["Python", "AI Chatbot", "React.js", "TypeScript", "Tailwind CSS", "Node.js", "Voice Recognition", "Real-Time Video Processing"],
      github: "https://github.com/starboyonkar",
      demo: null,
      image: "/lovable-uploads/12305f2c-5525-4031-82ee-380387953a79.png",
      color: "from-purple-500 to-pink-500",
      featured: true,
      isImageUrl: true
    }
  ];

  const handleImageClick = (imageSrc: string) => {
    setExpandedImage(imageSrc);
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.05),transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-futuristic">
            Featured <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Real-world solutions spanning DevOps automation, IoT systems, and intelligent applications
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {projects.filter(p => p.featured).map((project, index) => (
            <div
              key={index}
              className="group relative bg-slate-900/50 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-all duration-500 hover:transform hover:scale-105"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Project header with full-size image */}
              <div className="h-80 bg-slate-800 relative overflow-hidden cursor-pointer"
                   onClick={() => project.isImageUrl && handleImageClick(project.image)}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute inset-0 p-4 flex items-center justify-center">
                  {project.isImageUrl ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg"
                    />
                  ) : (
                    <div className="text-8xl opacity-80 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center h-full">
                      {project.image}
                    </div>
                  )}
                </div>
                
                {/* Floating particles for non-image projects */}
                {!project.isImageUrl && [...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${20 + i * 10}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${3 + i}s`
                    }}
                  ></div>
                ))}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 font-futuristic">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-slate-800/80 text-blue-400 text-xs rounded-full border border-slate-700 hover:border-blue-400/50 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3 flex-wrap">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-gray-300 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-300 text-sm group/btn"
                  >
                    <Github size={16} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                    Code
                  </a>
                  
                  {project.youtube && (
                    <a
                      href={project.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 text-sm group/btn"
                    >
                      <Youtube size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                      Demo
                    </a>
                  )}

                  {project.hasLiveDemo && project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 text-sm group/btn"
                    >
                      <ExternalLink size={16} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                      Live Site
                    </a>
                  )}

                  {project.demo && !project.youtube && !project.hasLiveDemo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm group/btn"
                    >
                      <Globe size={16} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                      Live Site
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Image Modal */}
      {expandedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
             onClick={closeExpandedImage}>
          <div className="relative max-w-7xl w-full max-h-[95vh] overflow-hidden">
            <button
              onClick={closeExpandedImage}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors flex items-center justify-center text-white text-xl font-bold"
            >
              ✕
            </button>
            <img
              src={expandedImage}
              alt="Expanded project image"
              className="w-full h-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
};
