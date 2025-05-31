
export const Education = () => {
  const educationData = [
    {
      degree: "Bachelor of Technology (BTech) – Electronics & Telecommunication",
      institution: "Walchand Institute of Technology, Solapur University",
      year: "2025",
      grade: "CGPA: 9.36 | SGPA: 10.00",
      icon: "🎓"
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Shelgaon Jr. College, Maharashtra Board, Pune",
      year: "2021",
      grade: "84%",
      icon: "🏫"
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "G.B. Ghodake Vidhyalay Nannaj, Maharashtra Board, Pune",
      year: "2019",
      grade: "74.40%",
      icon: "🏫"
    }
  ];

  return (
    <section id="education" className="py-20 px-4 glassmorphic-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono tracking-wider">
            Educational <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 neon-text">Qualifications</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Education Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-purple-400"></div>
            
            <div className="space-y-12">
              {educationData.map((edu, index) => (
                <div
                  key={index}
                  className="relative flex items-start animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full border-4 border-slate-900 z-10"></div>
                  
                  {/* Content card */}
                  <div className="ml-20 w-full">
                    <div className="group glassmorphic p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:transform hover:scale-105">
                      <div className="flex items-start space-x-4">
                        {/* Icon */}
                        <div className="text-3xl">{edu.icon}</div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-cyan-100 group-hover:text-cyan-400 transition-colors font-mono">
                              {edu.degree}
                            </h3>
                            <span className="text-cyan-400 font-semibold text-lg font-mono">
                              {edu.year}
                            </span>
                          </div>
                          
                          <p className="text-gray-300 mb-2 font-mono">
                            {edu.institution}
                          </p>
                          
                          <div className="inline-block glassmorphic px-3 py-1 rounded-full">
                            <span className="text-green-400 font-semibold font-mono">
                              {edu.grade}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
