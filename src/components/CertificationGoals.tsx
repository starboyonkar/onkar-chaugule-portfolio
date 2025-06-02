
export const CertificationGoals = () => {
  const certifications = [
    {
      name: "AWS Certified Cloud Practitioner",
      image: "/lovable-uploads/cbdffc74-c3bd-4e8d-bc7d-b5088db335a2.png",
      link: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
      color: "from-orange-500 to-yellow-500"
    },
    {
      name: "Microsoft Certified: Azure Fundamentals (AZ-900)",
      image: "/lovable-uploads/78683fd7-adad-4268-83c8-77a04bc39f24.png",
      link: "https://docs.microsoft.com/en-us/certifications/azure-fundamentals/",
      color: "from-blue-500 to-indigo-500"
    },
    {
      name: "AWS Certified DevOps Engineer – Professional",
      image: "/lovable-uploads/6dbe7908-856d-40c0-b576-dc42f6a2c8f7.png",
      link: "https://aws.amazon.com/certification/certified-devops-engineer-professional/",
      color: "from-cyan-500 to-teal-500"
    },
    {
      name: "Certified Kubernetes Administrator (CKA)",
      image: "/lovable-uploads/513dfa21-76ad-498b-9053-a137307823f5.png",
      link: "https://www.cncf.io/certification/cka/",
      color: "from-blue-400 to-blue-600"
    },
    {
      name: "HashiCorp Certified: Terraform Associate",
      image: "/lovable-uploads/be80a4b8-2317-4cbb-8ca4-30b533ef7194.png",
      link: "https://www.hashicorp.com/certification/terraform-associate",
      color: "from-purple-500 to-indigo-500"
    },
    {
      name: "Google Professional DevOps Engineer",
      image: "/lovable-uploads/b5440e2d-e2d8-4a97-932b-a842d99a0986.png",
      link: "https://cloud.google.com/certification/cloud-devops-engineer",
      color: "from-red-500 to-yellow-500"
    },
    {
      name: "Microsoft Certified: DevOps Engineer Expert (AZ-400)",
      image: "/lovable-uploads/660e323a-6149-47aa-ad59-72d7b0e8d397.png",
      link: "https://docs.microsoft.com/en-us/certifications/devops-engineer/",
      color: "from-blue-600 to-indigo-600"
    },
    {
      name: "AWS Certified Solutions Architect - Professional",
      image: "/lovable-uploads/cca4149a-4c51-49a8-ae8e-c9ae051ff553.png",
      link: "https://aws.amazon.com/certification/certified-solutions-architect-professional/",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <section id="certification-goals" className="py-20 px-4 bg-slate-900/30 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${8 + i}s`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-futuristic">
            🎯 My DevOps Certification <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Goals</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Mastery Roadmap - Targeted certifications to advance DevOps and cloud expertise
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group relative bg-slate-900/50 backdrop-blur-md p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-500 hover:transform hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* 3D effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl transform translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
              
              {/* Glowing border effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${cert.color} rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              <div className="relative">
                {/* Certification Badge - Fully Clickable */}
                <div className="flex flex-col items-center">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mb-4 group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                    title={`Study guide for ${cert.name}`}
                  >
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-32 h-32 object-contain rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                    />
                  </a>
                  
                  {/* Certification Name */}
                  <h3 className="text-center text-white font-semibold text-sm leading-tight group-hover:text-blue-400 transition-colors duration-300 font-futuristic mb-3">
                    {cert.name}
                  </h3>
                  
                  {/* Study Guide Link */}
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center text-xs px-3 py-1 bg-gradient-to-r ${cert.color} text-white rounded-full hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                  >
                    📚 Study Guide
                  </a>
                </div>
                
                {/* Hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${cert.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-md px-6 py-3 rounded-full border border-slate-700">
            <span className="text-blue-400 font-semibold">🎯 Target Goal:</span>
            <span className="text-white font-futuristic">{certifications.length} Professional Certifications</span>
          </div>
        </div>
      </div>
    </section>
  );
};
