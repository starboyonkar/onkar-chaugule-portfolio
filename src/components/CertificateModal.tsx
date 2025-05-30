
import { X, Download } from 'lucide-react';
import { useEffect } from 'react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: {
    title: string;
    image: string;
    organization: string;
    date: string;
  } | null;
}

export const CertificateModal = ({ isOpen, onClose, certificate }: CertificateModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-slate-900 rounded-2xl border border-slate-700 max-w-5xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <div>
            <h3 className="text-xl font-semibold text-white">{certificate.title}</h3>
            <p className="text-gray-400">{certificate.organization} • {certificate.date}</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={certificate.image}
              download={`${certificate.title.replace(/\s+/g, '_')}_Certificate.png`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors duration-300"
            >
              <Download size={16} />
              Download
            </a>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-center text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        {/* Image */}
        <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
          <img 
            src={certificate.image}
            alt={certificate.title}
            className="w-full h-auto rounded-lg shadow-2xl bg-white"
          />
        </div>
      </div>
    </div>
  );
};
