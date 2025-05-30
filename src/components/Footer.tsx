
export const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-slate-900/80 border-t border-slate-700">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-4">
          <div className="text-2xl font-bold text-white relative group inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
              Onkar
            </span>
            <span className="text-white">Nova</span>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm">
          © 2025 Onkar Chaugule | OnkarNova Technologies, Solapur
        </p>
        
        <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-500">
          <span>DevOps Engineer</span>
          <span>•</span>
          <span>Cloud Enthusiast</span>
          <span>•</span>
          <span>IoT Developer</span>
        </div>
      </div>
    </footer>
  );
};
