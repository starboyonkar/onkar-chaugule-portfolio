
import { Github, ExternalLink, Play } from 'lucide-react';

export const Projects = () => {
  const projects = [
    {
      title: "TuneGuard – Futuristic Music Player",
      description: "PyQt5 + Spotify integration with real-time EQ adjustment, voice commands, and FFT waveform visualization.",
      tech: ["Python", "PyQt5", "Spotify API", "FFT", "Voice Recognition"],
      github: "https://github.com/starboyonkar",
      demo: "https://youtube.com",
      image: "/lovable-uploads/0115fba9-2f81-4cb9-a5ea-ffd535615a1e.png",
      color: "from-blue-500 to-purple-500",
      featured: true,
      isImageUrl: true
    },
    {
      title: "AI-Based Smart Irrigation System",
      description: "Raspberry Pi controlled automated water scheduling system based on real-time environmental conditions and ML predictions.",
      tech: ["Raspberry Pi", "Python", "IoT", "Machine Learning", "Sensors"],
      github: "https://github.com/starboyonkar",
      demo: null,
      image: "🌱",
      color: "from-green-500 to-emerald-500",
      featured: true,
      isImageUrl: false
    },
    {
      title: "Autonomous Underwater Vehicle (AUV)",
      description: "Advanced underwater robotics system with autonomous navigation and environmental monitoring capabilities.",
      tech: ["Embedded C", "Sensors", "Navigation", "Robotics"],
      github: "https://github.com/starboyonkar",
      demo: null,
      image: "🤖",
      color: "from-cyan-500 to-blue-500",
      featured: false,
      isImageUrl: false
    },
    {
      title: "Cognitive Audio Enhancement System",
      description: "Real-time audio processing with adaptive noise cancellation and intelligent sound enhancement algorithms.",
      tech: ["Audio Processing", "Machine Learning", "Real-time Systems"],
      github: "https://github.com/starboyonkar",
      demo: null,
      image: "🔊",
      color: "from-purple-500 to-pink-500",
      featured: false,
      isImageUrl: false
    },
    {
      title: "Weather Monitoring Dashboard",
      description: "Real-time weather monitoring system using Grafana & InfluxDB with embedded systems integration.",
      tech: ["Embedded C", "Grafana", "InfluxDB", "SQL", "IoT"],
      github: "https://github.com/starboyonkar",
      demo: null,
      image: "🌤️",
      color: "from-yellow-500 to-orange-500",
      featured: false,
      isImageUrl: false
    }
  ];

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
              {/* Project header with gradient or image */}
              <div className={`h-56 ${!project.isImageUrl ? `bg-gradient-to-br ${project.color}` : 'bg-slate-800'} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  {project.isImageUrl ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-8xl opacity-80 group-hover:scale-110 transition-transform duration-500">
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
                
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-gray-300 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-300 text-sm group/btn"
                  >
                    <Github size={16} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                    Code
                  </a>
                  
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm group/btn"
                    >
                      <Play size={16} className="group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.filter(p => !p.featured).map((project, index) => (
            <div
              key={index}
              className="group bg-slate-900/50 backdrop-blur-md rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className={`h-32 bg-gradient-to-br ${project.color} flex items-center justify-center relative`}>
                <div className="text-4xl opacity-80">{project.image}</div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors font-futuristic">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 text-xs mb-3 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tech.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-slate-800 text-blue-400 text-xs rounded-full border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 bg-slate-700 text-gray-400 text-xs rounded-full">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 bg-slate-800 text-gray-300 rounded text-xs hover:bg-slate-700 hover:text-white transition-all duration-200"
                  >
                    <Github size={12} />
                    Code
                  </a>
                  
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-all duration-200"
                    >
                      <ExternalLink size={12} />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
