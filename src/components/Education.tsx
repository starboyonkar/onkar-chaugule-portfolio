export const Education = () => {
  const certifications = [{
    title: "MyWebRide DevOps Intern",
    issuer: "MyWebRide",
    type: "Internship Certificate",
    link: "#"
  }, {
    title: "DevOps for IoT",
    issuer: "Sarvana TryitFirst Pvt. Ltd",
    type: "Course Certificate",
    link: "#"
  }, {
    title: "NPTEL Industry 4.0",
    issuer: "IIT Kharagpur",
    type: "Course Certificate",
    link: "#"
  }];
  return <section id="education" className="py-20 px-4 bg-slate-800/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Education & <span className="text-blue-400">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-8">Education</h3>
            <div className="space-y-6">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-xl font-semibold text-blue-400 mb-2">
                  B.Tech in Electronics & Telecommunication
                </h4>
                <p className="text-gray-300 mb-2">Walchand Institute of Technology, Solapur</p>
                <p className="text-green-400 font-semibold">CGPA: 9.36</p>
              </div>
              
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-lg font-semibold text-white mb-2">Higher Secondary Certificate</h4>
                <p className="text-green-400 font-semibold">84%</p>
              </div>
              
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-lg font-semibold text-white mb-2">Secondary School Certificate</h4>
                <p className="text-green-400 font-semibold">74.40%</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-8">Certifications</h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => <div key={index} className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {cert.title}
                    </h4>
                    <a href={cert.link} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                      View
                    </a>
                  </div>
                  <p className="text-gray-300 text-sm">{cert.issuer}</p>
                  <p className="text-blue-400 text-xs mt-1">{cert.type}</p>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};