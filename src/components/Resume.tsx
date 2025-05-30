
import { useState } from 'react';
import { Download, Eye, X } from 'lucide-react';

export const Resume = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section id="resume" className="py-20 px-4 bg-slate-800/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My <span className="text-blue-400">Resume</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Download or preview my latest resume with complete professional details
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="group bg-slate-900/50 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
            {/* Resume Preview */}
            <div className="relative">
              <img 
                src="/lovable-uploads/117c0e0f-e3ee-4663-ae57-fed86ea856fa.png"
                alt="Onkar Chaugule Resume"
                className="w-full h-auto cursor-pointer transition-transform duration-300 group-hover:scale-105"
                onClick={openModal}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={openModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-300"
                >
                  <Eye size={20} />
                  Preview Resume
                </button>
              </div>
            </div>

            {/* Resume Actions */}
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openModal}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors duration-300"
                >
                  <Eye size={20} />
                  📄 View Resume
                </button>
                
                <a
                  href="/lovable-uploads/117c0e0f-e3ee-4663-ae57-fed86ea856fa.png"
                  download="Onkar_Chaugule_Resume.png"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  <Download size={20} />
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Modal */}
          <div className="relative bg-slate-900 rounded-2xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <div>
                <h3 className="text-xl font-semibold text-white">Resume Preview</h3>
                <p className="text-gray-400">Onkar Chaugule - DevOps Engineer</p>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-center text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Resume Image */}
            <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
              <img 
                src="/lovable-uploads/117c0e0f-e3ee-4663-ae57-fed86ea856fa.png"
                alt="Onkar Chaugule Resume"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
