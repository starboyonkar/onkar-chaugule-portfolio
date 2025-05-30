
export const Skills = () => {
  const skillCategories = [
    {
      title: "Languages",
      skills: ["Python", "Bash", "C", "Embedded C"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "DevOps & Cloud",
      skills: ["AWS (EC2, S3, IAM, VPC, RDS)", "Jenkins", "Docker", "Terraform"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Tools",
      skills: ["GitHub", "GitLab", "Git Bash", "Postman", "VS Code"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Hardware",
      skills: ["Raspberry Pi 4", "ESP8266", "MSPM0G3507"],
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Operating Systems",
      skills: ["Linux-Ubuntu", "Amazon Linux"],
      color: "from-indigo-500 to-blue-500"
    },
    {
      title: "Soft Skills",
      skills: ["Adaptability", "Problem Solving", "Time Management"],
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-slate-800/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Skills & <span className="text-blue-400">Tools</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="group bg-slate-900/50 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} mb-4 flex items-center justify-center`}>
                <div className="w-6 h-6 bg-white rounded opacity-80"></div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors">
                {category.title}
              </h3>
              
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="text-gray-300 text-sm bg-slate-800/50 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
