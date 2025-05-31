
import { User, Target, Briefcase } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-20 px-4 glassmorphic-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono tracking-wider">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 neon-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image - Left slide-in animation */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative glassmorphic rounded-2xl p-6 border border-cyan-500/20">
                <img 
                  src="/lovable-uploads/d25e290a-ddff-4ce4-b2a3-0f85cb561d65.png" 
                  alt="Onkar Chaugule"
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Content - Right fade-in animation */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-cyan-100 mb-4 font-mono tracking-wide">
                Self-motivated and tech-savvy engineering graduate
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed font-mono">
                Passionate engineering graduate specialized in <span className="text-cyan-400 font-semibold neon-text">cloud automation</span>, 
                <span className="text-purple-400 font-semibold neon-text"> DevOps</span>, and <span className="text-blue-400 font-semibold neon-text">IoT systems</span>. 
                Experienced in real-world deployments, containerization, and scalable app architecture.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed font-mono">
                Skilled in solving real-world problems with innovative technologies and delivering scalable solutions across industries.
              </p>
            </div>

            {/* Key highlights */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="glassmorphic p-4 rounded-lg border border-cyan-500/30 hover:border-cyan-400 transition-colors">
                <User className="text-cyan-400 mb-2 neon-glow" size={24} />
                <h4 className="text-cyan-100 font-semibold mb-1 font-mono">Problem Solver</h4>
                <p className="text-gray-400 text-sm font-mono">Innovative approach to complex challenges</p>
              </div>
              
              <div className="glassmorphic p-4 rounded-lg border border-purple-500/30 hover:border-purple-400 transition-colors">
                <Target className="text-purple-400 mb-2 neon-glow" size={24} />
                <h4 className="text-cyan-100 font-semibold mb-1 font-mono">Detail Oriented</h4>
                <p className="text-gray-400 text-sm font-mono">Precision in every project delivery</p>
              </div>
              
              <div className="glassmorphic p-4 rounded-lg border border-green-500/30 hover:border-green-400 transition-colors">
                <Briefcase className="text-green-400 mb-2 neon-glow" size={24} />
                <h4 className="text-cyan-100 font-semibold mb-1 font-mono">Team Player</h4>
                <p className="text-gray-400 text-sm font-mono">Collaborative and adaptive mindset</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
