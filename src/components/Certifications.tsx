
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
      date: "Feb 2025 - Apr 2025",
      category: "DevOps",
      description: "Hands-on experience with CI/CD pipelines, containerization, and cloud deployment strategies.",
      skills: ["Docker", "Jenkins", "AWS", "Git"],
      image: "/lovable-uploads/fa6f3981-37a8-42a2-a55f-9acdcf5332e0.png",
      color: "from-blue-500 to-cyan-500"
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
      color: "from-purple-500 to-pink-500"
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
      color: "from-green-500 to-emerald-500"
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

  const categories = ['All', 'DevOps', 'IoT', 'Programming'];

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

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-900/50 rounded-lg p-1 border border-slate-700">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
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
              className="group bg-slate-900/50 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Certificate Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <button
                  onClick={() => openModal(cert)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
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

                {/* View Certificate button */}
                <button
                  onClick={() => openModal(cert)}
                  className="w-full flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium py-2 px-4 border border-blue-400/30 rounded-lg hover:bg-blue-400/10"
                >
                  <ExternalLink size={14} />
                  View Certificate
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
