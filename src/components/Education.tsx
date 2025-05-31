
export const Education = () => {
  const educationEntries = [
    {
      icon: "🎓",
      degree: "Bachelor of Technology (BTech) – Electronics & Telecommunication",
      institution: "Walchand Institute of Technology, Solapur University",
      year: "2025",
      grade: "CGPA: 9.36 | SGPA: 10.00",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: "🏫",
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Shelgaon Jr. College, Maharashtra Board, Pune",
      year: "2021",
      grade: "84%",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "🏫",
      degree: "Secondary School Certificate (SSC)",
      institution: "G.B. Ghodake Vidhyalay Nannaj, Maharashtra Board, Pune",
      year: "2019",
      grade: "74.40%",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="education" className="py-20 px-4 bg-slate-800/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-futuristic">
            Educational <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Qualifications</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Academic journey and educational achievements
          </p>
        </div>

        {/* Education Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-blue-400 transform md:-translate-x-0.5"></div>
          
          <div className="space-y-12">
            {educationEntries.map((entry, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:space-x-8`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Timeline dot */}
                <div className={`absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-r ${entry.color} rounded-full transform md:-translate-x-2 z-10 border-2 border-slate-900`}></div>
                
                {/* Content card */}
                <div className={`group w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 pl-12 md:pl-0' : 'md:pl-8 pl-12 md:pr-0'} animate-fade-in`}>
                  <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105">
                    {/* Icon and year */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${entry.color} flex items-center justify-center text-2xl`}>
                        {entry.icon}
                      </div>
                      <span className="text-blue-400 font-semibold bg-slate-800/50 px-3 py-1 rounded-full text-sm">
                        {entry.year}
                      </span>
                    </div>
                    
                    {/* Degree */}
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors font-futuristic">
                      {entry.degree}
                    </h3>
                    
                    {/* Institution */}
                    <p className="text-gray-300 mb-3">
                      {entry.institution}
                    </p>
                    
                    {/* Grade */}
                    <div className={`inline-block px-3 py-1 bg-gradient-to-r ${entry.color} text-white text-sm font-semibold rounded-full`}>
                      {entry.grade}
                    </div>
                    
                    {/* Hover effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${entry.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}></div>
                  </div>
                </div>
                
                {/* Spacer for opposite side */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
