
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

  // Tech stack with realistic PNG icons and documentation links
  const techStackItems = [
    { name: "AWS", icon: "/lovable-uploads/036260f5-9bb3-41a7-97e0-b93b6e9bffc8.png", url: "https://docs.aws.amazon.com/" },
    { name: "Docker", icon: "/lovable-uploads/68259dad-8f38-484a-b7d2-b01660f8fedd.png", url: "https://docs.docker.com/" },
    { name: "Kubernetes", icon: "/lovable-uploads/343a56d0-e000-4abc-9096-0110349dc94c.png", url: "https://kubernetes.io/docs/" },
    { name: "Jenkins", icon: "/lovable-uploads/360be116-f2c6-41ff-bb9b-7a4c7410fe1b.png", url: "https://www.jenkins.io/doc/" },
    { name: "Python", icon: "/lovable-uploads/9b39be88-4611-4abc-bfca-12ea1d11a8b0.png", url: "https://docs.python.org/" },
    { name: "GitLab", icon: "/lovable-uploads/7ddce7b7-5a28-43a1-bc8c-8cecb287f87a.png", url: "https://docs.gitlab.com/" },
    { name: "Git", icon: "/lovable-uploads/0d1df141-7d7b-46e7-b90d-e898fdbd87d3.png", url: "https://git-scm.com/doc" },
    { name: "Linux", icon: "/lovable-uploads/4d8aba1d-f539-4dfb-b468-1b302326a464.png", url: "https://www.kernel.org/doc/" },
    { name: "GitHub", icon: "/lovable-uploads/4ccdeafc-ce99-49d4-acbd-4efeb0d93437.png", url: "https://docs.github.com/" },
    { name: "Terraform", icon: "/lovable-uploads/96bd68fd-6b4c-4df1-bd62-5e5a8d5e3d79.png", url: "https://developer.hashicorp.com/terraform/docs" }
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-futuristic">
            Tech Stack & <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Expertise across the full DevOps and cloud development lifecycle
          </p>
        </div>

        {/* Fast Animated Scrolling Tech Stack with Real Icons and Documentation Links */}
        <div className="mb-16 overflow-hidden">
          <div className="flex animate-scroll-super-fast space-x-8">
            {[...techStackItems, ...techStackItems, ...techStackItems].map((tech, index) => (
              <a
                key={index}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 group bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md px-8 py-6 rounded-xl border border-blue-500/30 hover:scale-110 hover:bg-blue-600/30 transition-all duration-300 cursor-pointer min-w-[160px] hover:border-blue-400/60"
                title={`View ${tech.name} documentation`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <img 
                    src={tech.icon} 
                    alt={`${tech.name} documentation`} 
                    className="w-12 h-12 object-contain group-hover:scale-125 transition-transform duration-300"
                  />
                  <span className="text-cyan-300 font-medium text-base whitespace-nowrap font-futuristic group-hover:text-cyan-200 transition-colors duration-300">
                    {tech.name}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="group relative bg-slate-900/50 backdrop-blur-md p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-500 hover:transform hover:scale-105 hover:rotate-1"
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
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 font-futuristic">
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
