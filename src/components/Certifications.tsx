
import { useState } from 'react';
import { Award, ExternalLink, Calendar, Building, Eye } from 'lucide-react';
import { CertificateModal } from './CertificateModal';

export const Certifications = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const certifications = [
    {
      title: "DevOps Intern Certificate",
      organization: "MyWebRide Technology",
      type: "Internship",
      date: "Feb 2025 - May 2025",
      category: "DevOps",
      description: "Hands-on experience with CI/CD pipelines, containerization, and cloud deployment strategies.",
      skills: ["Docker", "Jenkins", "AWS", "Git"],
      image: "/lovable-uploads/1b2fe00d-7d29-434c-9551-c3f9fb70df99.png",
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "TuneGuard – Futuristic Music Player",
      organization: "Personal Project",
      type: "Project",
      date: "2024",
      category: "Development",
      description: "Innovative music player with advanced features and futuristic design patterns.",
      skills: ["UI/UX", "JavaScript", "Audio Processing", "Design"],
      image: "/lovable-uploads/c590d2bd-ee73-493a-8a9e-7f791f850a14.png",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "DevOps for IoT",
      organization: "Sarvana TryitFirst Pvt. Ltd",
      type: "Course Certificate",
      date: "Feb 2024 - Apr 2024",
      category: "IoT",
      description: "Specialized training in DevOps practices for IoT systems and edge computing.",
      skills: ["IoT", "Edge Computing", "DevOps", "Automation"],
      image: "/lovable-uploads/3e939397-3474-4249-9c25-1217aa40accf.png",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Industry 4.0 and Industrial IoT",
      organization: "IIT Kharagpur (NPTEL)",
      type: "Course Certificate",
      date: "Jan 2024 - Apr 2024",
      category: "IoT",
      description: "Comprehensive understanding of Industry 4.0 technologies and smart manufacturing.",
      skills: ["Industry 4.0", "Smart Manufacturing", "IoT", "Automation"],
      image: "/lovable-uploads/f469a26d-8a26-4088-adbe-c71db2ff6b6a.png",
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Git and GitHub Training",
      organization: "ExcelR",
      type: "Training Certificate",
      date: "Jan 2024 - Feb 2024",
      category: "DevOps",
      description: "20 hours live training program on Git and GitHub version control systems.",
      skills: ["Git", "GitHub", "Version Control", "Collaboration"],
      image: "/lovable-uploads/8c419b71-f2bf-4b5a-a47b-b7be0702afa3.png",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Industrial Internship Training",
      organization: "Wachstum Venture Pvt. Ltd",
      type: "Training Certificate",
      date: "Oct 2023",
      category: "Programming",
      description: "Working with Structural & Object Oriented Programming using C&CPP Language.",
      skills: ["C", "C++", "Object Oriented Programming", "Structural Programming"],
      image: "/lovable-uploads/5cda5e4d-32ce-4312-bcb8-bd69d0db2ffe.png",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const categories = ['All', 'DevOps', 'IoT', 'Programming', 'Development'];

  const filteredCertifications = activeFilter === 'All' 
    ? certifications 
    : certifications.filter(cert => cert.category === activeFilter);

  const openModal = (certificate: any) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  return (
    <section id="certifications" className="py-20 px-4 glassmorphic-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono tracking-wider">
            Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 neon-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto font-mono">
            Professional certifications and innovative projects in DevOps, Cloud, and IoT technologies
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="glassmorphic rounded-lg p-1 border border-cyan-500/30">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-300 font-mono ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-cyan-100 hover:bg-cyan-900/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCertifications.map((cert, index) => (
            <div
              key={index}
              className="group glassmorphic rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:transform hover:scale-105 overflow-hidden animate-zoom-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Certificate Image */}
              <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => openModal(cert)}>
                <img 
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-contain bg-slate-900/50 p-2 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(cert);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 glassmorphic backdrop-blur-sm rounded-full flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Eye size={16} />
                </button>
              </div>
              
              {/* Header with gradient */}
              <div className={`h-1 bg-gradient-to-r ${cert.color}`}></div>
              
              <div className="p-6">
                {/* Icon and type */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${cert.color} flex items-center justify-center`}>
                    <Award className="text-white" size={24} />
                  </div>
                  <span className="text-xs glassmorphic text-cyan-400 px-2 py-1 rounded-full font-mono">
                    {cert.type}
                  </span>
                </div>

                {/* Title and organization */}
                <h3 className="text-xl font-semibold text-cyan-100 mb-2 group-hover:text-cyan-400 transition-colors font-mono">
                  {cert.title}
                </h3>
                
                <div className="flex items-center text-gray-400 text-sm mb-2 font-mono">
                  <Building size={14} className="mr-2" />
                  {cert.organization}
                </div>
                
                <div className="flex items-center text-gray-400 text-sm mb-4 font-mono">
                  <Calendar size={14} className="mr-2" />
                  {cert.date}
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 leading-relaxed font-mono">
                  {cert.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {cert.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 glassmorphic text-cyan-400 text-xs rounded border border-cyan-500/30 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* View Certificate button */}
                <button
                  onClick={() => openModal(cert)}
                  className="w-full flex items-center justify-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium py-2 px-4 border border-cyan-400/30 rounded-lg hover:bg-cyan-400/10 font-mono"
                >
                  <ExternalLink size={14} />
                  View {cert.type === 'Project' ? 'Project' : 'Certificate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        certificate={selectedCertificate}
      />
    </section>
  );
};
