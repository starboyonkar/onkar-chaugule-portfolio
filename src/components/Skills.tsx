
export const Skills = () => {
  const skillCategories = [
    {
      title: "DevOps & Cloud",
      skills: ["AWS (EC2, S3, IAM, VPC, RDS)", "Docker", "GitHub Actions", "Jenkins", "Terraform", "CI/CD"],
      color: "from-cyan-500 to-blue-500",
      icon: "☁️"
    },
    {
      title: "Languages",
      skills: ["Python", "C", "Bash", "Java"],
      color: "from-purple-500 to-pink-500",
      icon: "⚡"
    },
    {
      title: "Development Tools",
      skills: ["Git", "GitHub", "Postman", "VS Code", "Linux", "MySQL"],
      color: "from-green-500 to-emerald-500",
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

  // Tech stack with realistic PNG icons
  const techStackItems = [
    { name: "AWS", icon: "/lovable-uploads/036260f5-9bb3-41a7-97e0-b93b6e9bffc8.png" },
    { name: "Docker", icon: "/lovable-uploads/68259dad-8f38-484a-b7d2-b01660f8fedd.png" },
    { name: "Kubernetes", icon: "/lovable-uploads/343a56d0-e000-4abc-9096-0110349dc94c.png" },
    { name: "Jenkins", icon: "/lovable-uploads/360be116-f2c6-41ff-bb9b-7a4c7410fe1b.png" },
    { name: "Python", icon: "/lovable-uploads/9b39be88-4611-4abc-bfca-12ea1d11a8b0.png" },
    { name: "GitLab", icon: "/lovable-uploads/7ddce7b7-5a28-43a1-bc8c-8cecb287f87a.png" },
    { name: "Git", icon: "/lovable-uploads/0d1df141-7d7b-46e7-b90d-e898fdbd87d3.png" },
    { name: "Linux", icon: "/lovable-uploads/4d8aba1d-f539-4dfb-b468-1b302326a464.png" },
    { name: "GitHub", icon: "/lovable-uploads/4ccdeafc-ce99-49d4-acbd-4efeb0d93437.png" },
    { name: "Terraform", icon: "/lovable-uploads/96bd68fd-6b4c-4df1-bd62-5e5a8d5e3d79.png" }
  ];

  return (
    <section id="skills" className="py-20 px-4 glassmorphic-section relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full animate-float"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono tracking-wider">
            Tech Stack & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 neon-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto font-mono">
            Expertise across the full DevOps and cloud development lifecycle
          </p>
        </div>

        {/* Fast Animated Scrolling Tech Stack with Larger Icons */}
        <div className="mb-16 overflow-hidden">
          <div className="flex animate-scroll-fast space-x-8">
            {[...techStackItems, ...techStackItems, ...techStackItems].map((tech, index) => (
              <div
                key={index}
                className="flex-shrink-0 group glassmorphic px-8 py-6 rounded-xl border border-cyan-500/30 hover:scale-105 hover:border-cyan-400 transition-all duration-300 cursor-default min-w-[180px]"
              >
                <div className="flex flex-col items-center space-y-3">
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300 neon-glow"
                  />
                  <span className="text-cyan-300 font-medium text-base whitespace-nowrap font-mono neon-text">
                    {tech.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="group relative glassmorphic p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-500 hover:transform hover:scale-105"
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
                  <h3 className="text-xl font-semibold text-cyan-100 group-hover:text-cyan-400 transition-colors duration-300 font-mono">
                    {category.title}
                  </h3>
                </div>
                
                {/* Skills grid */}
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="group/skill relative text-gray-300 text-sm glassmorphic px-3 py-2 rounded-lg hover:bg-cyan-900/20 transition-all duration-300 cursor-default transform hover:translate-x-1 font-mono"
                      style={{ animationDelay: `${skillIndex * 50}ms` }}
                    >
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} mr-3 opacity-70 group-hover/skill:opacity-100 transition-opacity duration-300`}></div>
                        <span className="group-hover/skill:text-cyan-100 transition-colors duration-300">
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
                  <span className={`text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r ${category.color} text-white opacity-80 font-mono`}>
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
