
import { useState, useEffect } from 'react';
import { Settings, Key, Save, Eye, EyeOff } from 'lucide-react';

interface AIAvatarConfigProps {
  onApiKeySet: (apiKey: string) => void;
}

export const AIAvatarConfig = ({ onApiKeySet }: AIAvatarConfigProps) => {
  const [showConfig, setShowConfig] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [savedApiKey, setSavedApiKey] = useState('');

  useEffect(() => {
    // Load saved API key from localStorage
    const saved = localStorage.getItem('elevenlabs_api_key');
    if (saved) {
      setSavedApiKey(saved);
      onApiKeySet(saved);
    }
  }, [onApiKeySet]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('elevenlabs_api_key', apiKey.trim());
      setSavedApiKey(apiKey.trim());
      onApiKeySet(apiKey.trim());
      setApiKey('');
      setShowConfig(false);
    }
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('elevenlabs_api_key');
    setSavedApiKey('');
    onApiKeySet('');
    setApiKey('');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowConfig(!showConfig)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all duration-300 border border-slate-600 hover:border-blue-400"
      >
        <Settings size={16} />
        Voice Config
      </button>

      {showConfig && (
        <div className="absolute top-full mt-2 right-0 w-80 bg-slate-900/95 backdrop-blur-md rounded-xl p-4 border border-blue-500/20 shadow-2xl z-50">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Key size={18} />
            ElevenLabs Configuration
          </h3>
          
          <div className="space-y-4">
            {savedApiKey ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-green-400 text-sm">✓ API Key Configured</span>
                  <button
                    onClick={handleClearApiKey}
                    className="text-red-400 hover:text-red-300 text-sm underline"
                  >
                    Clear
                  </button>
                </div>
                <p className="text-gray-400 text-xs">
                  Avatar will use realistic ElevenLabs voice synthesis
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your ElevenLabs API key"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none pr-10"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                
                <button
                  onClick={handleSaveApiKey}
                  disabled={!apiKey.trim()}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300"
                >
                  <Save size={16} />
                  Save API Key
                </button>
                
                <div className="text-xs text-gray-400 space-y-1">
                  <p>• Get your API key from ElevenLabs dashboard</p>
                  <p>• Required for realistic voice synthesis</p>
                  <p>• Falls back to browser TTS if not provided</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 pt-3 border-t border-slate-700">
            <a
              href="https://elevenlabs.io/docs/api-reference/getting-started"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm underline"
            >
              Get ElevenLabs API Key →
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
