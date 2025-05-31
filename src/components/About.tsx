
import { User, Target, Briefcase } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-slate-800/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-blue-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image - Left slide-in animation */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-slate-900/80 rounded-2xl p-6 border border-blue-500/20">
                <img 
                  src="/lovable-uploads/0b946a78-e569-45ec-864a-288ec0656c4c.png" 
                  alt="Onkar Chaugule"
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Content - Right fade-in animation */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4">
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
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors">
                <User className="text-blue-400 mb-2" size={24} />
                <h4 className="text-white font-semibold mb-1">Problem Solver</h4>
                <p className="text-gray-400 text-sm">Innovative approach to complex challenges</p>
              </div>
              
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 hover:border-purple-500 transition-colors">
                <Target className="text-purple-400 mb-2" size={24} />
                <h4 className="text-white font-semibold mb-1">Detail Oriented</h4>
                <p className="text-gray-400 text-sm">Precision in every project delivery</p>
              </div>
              
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 hover:border-green-500 transition-colors">
                <Briefcase className="text-green-400 mb-2" size={24} />
                <h4 className="text-white font-semibold mb-1">Team Player</h4>
                <p className="text-gray-400 text-sm">Collaborative and adaptive mindset</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
