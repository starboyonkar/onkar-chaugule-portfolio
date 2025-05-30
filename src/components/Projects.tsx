
import { Github } from 'lucide-react';

export const Projects = () => {
  const projects = [
    {
      title: "Tune Guard – Cognitive Audio Player",
      description: "Real-time EQ adjustment, Spotify integration, voice command, and FFT waveform visualization.",
      tech: ["Python", "Spotify API", "FFT", "Voice Recognition"],
      github: "https://github.com/starboyonkar",
      demo: "https://youtube.com",
      image: "🎵",
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "AI-Based Smart Irrigation System",
      description: "Automated water scheduling using Raspberry Pi based on real-time environmental conditions.",
      tech: ["Raspberry Pi", "Python", "IoT", "AI/ML"],
      github: "https://github.com/starboyonkar",
      demo: null,
      image: "🌱",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Weather Monitoring System",
      description: "Real-time weather dashboard using Grafana & InfluxDB with embedded systems integration.",
      tech: ["Embedded C", "Grafana", "InfluxDB", "SQL"],
      github: "https://github.com/starboyonkar",
      demo: null,
      image: "🌤️",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="text-blue-400">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="text-6xl opacity-80">{project.image}</div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-slate-800 text-blue-400 text-xs rounded-full border border-slate-700"
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
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-gray-300 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-200 text-sm"
                  >
                    <Github size={16} />
                    Code
                  </a>
                  
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm"
                    >
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
