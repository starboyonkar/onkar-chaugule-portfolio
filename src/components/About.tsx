
import { User, Target, Briefcase } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-slate-800/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 neon-text font-futuristic bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            About <span className="text-blue-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image - Left slide-in animation */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
                <img 
                  src="/lovable-uploads/0115fba9-2f81-4cb9-a5ea-ffd535615a1e.png" 
                  alt="Onkar Chaugule Professional Photo"
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Content - Right fade-in animation */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="space-y-4">
              <h3 className="text-4xl font-bold mb-2 neon-text font-futuristic bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Self-motivated and tech-savvy engineering graduate
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Passionate engineering graduate specialized in <span className="text-blue-400 font-semibold">cloud automation</span>, 
                <span className="text-purple-400 font-semibold"> DevOps</span>, and <span className="text-blue-400 font-semibold">IoT systems</span>. 
                Experienced in real-world deployments, containerization, and scalable app architecture.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Skilled in solving real-world problems with innovative technologies and delivering scalable solutions across industries.
              </p>
            </div>

            {/* Key highlights */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-slate-900/50 backdrop-blur-md p-4 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors glassmorphic-bg">
                <User className="text-blue-400 mb-2" size={24} />
                <h4 className="text-white font-semibold mb-1 font-futuristic">Problem Solver</h4>
                <p className="text-gray-400 text-sm">Innovative approach to complex challenges</p>
              </div>
              
              <div className="bg-slate-900/50 backdrop-blur-md p-4 rounded-lg border border-slate-700 hover:border-purple-500 transition-colors glassmorphic-bg">
                <Target className="text-purple-400 mb-2" size={24} />
                <h4 className="text-white font-semibold mb-1 font-futuristic">Detail Oriented</h4>
                <p className="text-gray-400 text-sm">Precision in every project delivery</p>
              </div>
              
              <div className="bg-slate-900/50 backdrop-blur-md p-4 rounded-lg border border-slate-700 hover:border-green-500 transition-colors glassmorphic-bg">
                <Briefcase className="text-green-400 mb-2" size={24} />
                <h4 className="text-white font-semibold mb-1 font-futuristic">Team Player</h4>
                <p className="text-gray-400 text-sm">Collaborative and adaptive mindset</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
