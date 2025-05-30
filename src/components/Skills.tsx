
export const Skills = () => {
  const skillCategories = [
    {
      title: "DevOps & Cloud",
      skills: ["AWS (EC2, S3, IAM, VPC, RDS)", "Docker", "GitHub Actions", "Jenkins", "Terraform", "CI/CD"],
      color: "from-blue-500 to-cyan-500",
      icon: "☁️"
    },
    {
      title: "Languages",
      skills: ["Python", "C", "Bash", "Java", "Embedded C"],
      color: "from-purple-500 to-pink-500",
      icon: "⚡"
    },
    {
      title: "Microcontrollers",
      skills: ["Raspberry Pi 4", "NodeMCU ESP8266", "MSP430", "MSPM0G3507"],
      color: "from-green-500 to-emerald-500",
      icon: "🔧"
    },
    {
      title: "Development Tools",
      skills: ["Git", "GitHub", "Postman", "VS Code", "Linux", "MySQL"],
      color: "from-orange-500 to-red-500",
      icon: "🛠️"
    },
    {
      title: "Operating Systems",
      skills: ["Linux-Ubuntu", "Amazon Linux", "Windows"],
      color: "from-indigo-500 to-blue-500",
      icon: "💻"
    },
    {
      title: "Soft Skills",
      skills: ["Adaptability", "Problem Solving", "Time Management", "Team Leadership"],
      color: "from-yellow-500 to-orange-500",
      icon: "🧠"
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-slate-800/30 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${6 + i}s`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tech Stack & <span className="text-blue-400">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Expertise across the full DevOps and IoT development lifecycle
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="group relative bg-slate-900/50 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-500 hover:transform hover:scale-105 hover:rotate-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* 3D effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl transform translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
              
              {/* Glowing border effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.color} rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              <div className="relative">
                {/* Icon and title */}
                <div className="flex items-center mb-4">
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl mr-4 transform group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>
                
                {/* Skills grid */}
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="group/skill relative text-gray-300 text-sm bg-slate-800/50 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-all duration-300 cursor-default transform hover:translate-x-1"
                      style={{ animationDelay: `${skillIndex * 50}ms` }}
                    >
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} mr-3 opacity-70 group-hover/skill:opacity-100 transition-opacity duration-300`}></div>
                        <span className="group-hover/skill:text-white transition-colors duration-300">
                          {skill}
                        </span>
                      </div>
                      
                      {/* Hover effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover/skill:opacity-5 rounded-lg transition-opacity duration-300`}></div>
                    </div>
                  ))}
                </div>

                {/* Skill count indicator */}
                <div className="mt-4 text-center">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r ${category.color} text-white opacity-80`}>
                    {category.skills.length} Skills
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
