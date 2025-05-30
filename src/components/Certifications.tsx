
import { Award, ExternalLink, Calendar, Building } from 'lucide-react';

export const Certifications = () => {
  const certifications = [
    {
      title: "DevOps Intern",
      organization: "MyWebRide",
      type: "Internship",
      date: "2024",
      description: "Hands-on experience with CI/CD pipelines, containerization, and cloud deployment strategies.",
      skills: ["Docker", "Jenkins", "AWS", "Git"],
      certificateUrl: "#",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "DevOps for IoT",
      organization: "Sarvana TryitFirst Pvt. Ltd",
      type: "Certification",
      date: "2024",
      description: "Specialized training in DevOps practices for IoT systems and edge computing.",
      skills: ["IoT", "Edge Computing", "DevOps", "Automation"],
      certificateUrl: "#",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Industry 4.0",
      organization: "IIT Kharagpur (NPTEL)",
      type: "Course",
      date: "2023",
      description: "Comprehensive understanding of Industry 4.0 technologies and smart manufacturing.",
      skills: ["Industry 4.0", "Smart Manufacturing", "IoT", "Automation"],
      certificateUrl: "#",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section id="certifications" className="py-20 px-4 bg-slate-800/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Certifications & <span className="text-blue-400">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Professional certifications and hands-on experience in DevOps, Cloud, and IoT technologies
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group bg-slate-900/50 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105 overflow-hidden"
            >
              {/* Header with gradient */}
              <div className={`h-2 bg-gradient-to-r ${cert.color}`}></div>
              
              <div className="p-6">
                {/* Icon and type */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${cert.color} flex items-center justify-center`}>
                    <Award className="text-white" size={24} />
                  </div>
                  <span className="text-xs bg-slate-800 text-blue-400 px-2 py-1 rounded-full">
                    {cert.type}
                  </span>
                </div>

                {/* Title and organization */}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {cert.title}
                </h3>
                
                <div className="flex items-center text-gray-400 text-sm mb-2">
                  <Building size={14} className="mr-2" />
                  {cert.organization}
                </div>
                
                <div className="flex items-center text-gray-400 text-sm mb-4">
                  <Calendar size={14} className="mr-2" />
                  {cert.date}
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {cert.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {cert.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-slate-800/80 text-blue-400 text-xs rounded border border-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Certificate link */}
                <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                >
                  <ExternalLink size={14} />
                  View Certificate
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
