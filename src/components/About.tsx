
export const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-blue-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              Self-motivated and tech-savvy engineering graduate skilled in 
              <span className="text-blue-400 font-semibold"> cloud computing</span>, 
              <span className="text-blue-400 font-semibold"> automation</span>, and 
              <span className="text-blue-400 font-semibold"> embedded systems</span>.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm passionate about solving real-world problems with innovative technologies 
              and delivering scalable solutions across industries. My expertise spans from 
              DevOps automation to IoT innovations, always focusing on creating efficient 
              and impactful solutions.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="text-3xl font-bold text-blue-400">9.36</div>
                <div className="text-sm text-gray-400">CGPA</div>
              </div>
              <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="text-3xl font-bold text-blue-400">3+</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-slate-700">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">📧 onkarchougule501@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">📱 +91-9373261147</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">📍 Solapur, Maharashtra, India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <a href="https://linkedin.com/in/onkar-chaugule" className="text-blue-400 hover:text-blue-300 transition-colors">
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <a href="https://github.com/starboyonkar" className="text-blue-400 hover:text-blue-300 transition-colors">
                    GitHub Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
