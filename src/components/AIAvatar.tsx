
import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Center, Environment } from '@react-three/drei';
import { AvatarModel } from './AvatarModel';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, User, Loader } from 'lucide-react';

interface AIAvatarProps {
  elevenLabsApiKey?: string;
}

export const AIAvatar = ({ elevenLabsApiKey }: AIAvatarProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [currentText, setCurrentText] = useState('');
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [showConsole, setShowConsole] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const recognitionRef = useRef<any>(null);

  // Pre-defined responses for different topics
  const responses = {
    greeting: "Hi there! I'm Onkar Chaugule, an AI-powered version of the real developer. I'm passionate about DevOps, IoT, and cloud technologies. How can I help you today?",
    about: "I'm Onkar Chaugule, a DevOps Engineer and Cloud Enthusiast with over 1 year of experience. I specialize in automation, containerization, and scalable application architecture. I love building innovative IoT solutions.",
    projects: "I've worked on several exciting projects including cloud automation tools, IoT monitoring systems, and containerized applications. Would you like me to show you my featured projects?",
    skills: "My core skills include Docker, Kubernetes, AWS, Python, Node.js, React, and IoT development. I'm also experienced with CI/CD pipelines, infrastructure as code, and monitoring solutions.",
    contact: "You can reach me at onkarchougule501@gmail.com or connect with me on LinkedIn. I'm always open to discussing new opportunities and collaborations!",
    resume: "I'd be happy to share my resume with you. You can download it using the button in the hero section, or I can walk you through my experience right here.",
    default: "That's an interesting question! While I can discuss Onkar's background, projects, and skills, you might want to reach out directly for more specific inquiries. What would you like to know about his work?"
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        handleUserInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Handle user input and generate appropriate response
  const handleUserInput = async (input: string) => {
    setConversationHistory(prev => [...prev, `User: ${input}`]);
    
    let responseText = responses.default;
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      responseText = responses.greeting;
    } else if (input.includes('about') || input.includes('who are you')) {
      responseText = responses.about;
    } else if (input.includes('project') || input.includes('work')) {
      responseText = responses.projects;
    } else if (input.includes('skill') || input.includes('technology') || input.includes('tech')) {
      responseText = responses.skills;
    } else if (input.includes('contact') || input.includes('email') || input.includes('reach')) {
      responseText = responses.contact;
    } else if (input.includes('resume') || input.includes('cv')) {
      responseText = responses.resume;
    }

    setConversationHistory(prev => [...prev, `OnkarAI: ${responseText}`]);
    await speakText(responseText);
  };

  // Generate speech using ElevenLabs API
  const speakText = async (text: string) => {
    if (!audioEnabled) return;
    
    setIsLoading(true);
    setCurrentText(text);
    setIsSpeaking(true);

    try {
      if (elevenLabsApiKey) {
        // Use ElevenLabs API for realistic voice
        const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': elevenLabsApiKey,
          },
          body: JSON.stringify({
            text: text,
            model_id: 'eleven_monolingual_v1',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5,
            },
          }),
        });

        if (response.ok) {
          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          
          if (audioRef.current) {
            audioRef.current.src = audioUrl;
            audioRef.current.play();
          }
        } else {
          throw new Error('ElevenLabs API error');
        }
      } else {
        // Fallback to browser's speech synthesis
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        
        utterance.onend = () => {
          setIsSpeaking(false);
          setCurrentText('');
        };
        
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Speech generation error:', error);
      // Fallback to browser speech synthesis
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentText('');
      };
      speechSynthesis.speak(utterance);
    }

    setIsLoading(false);
  };

  // Start/stop listening
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  // Auto-greet when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      speakText(responses.greeting);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float-delay"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text font-futuristic">
            Meet OnkarAI
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            Your AI-powered guide to my portfolio
          </p>
          <p className="text-gray-400">
            Try saying: "Tell me about your projects" or "What are your skills?"
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* 3D Avatar Canvas */}
          <div className="relative">
            <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20 overflow-hidden">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ width: '100%', height: '400px' }}
                gl={{ antialias: true, alpha: true }}
              >
                <Environment preset="studio" />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <AvatarModel isSpeaking={isSpeaking} currentText={currentText} />
                <OrbitControls
                  enablePan={false}
                  enableZoom={true}
                  enableRotate={true}
                  maxDistance={8}
                  minDistance={3}
                  maxPolarAngle={Math.PI / 2}
                />
              </Canvas>
              
              {/* Avatar status indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                {isLoading && (
                  <div className="flex items-center gap-2 bg-blue-600/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                )}
                {isSpeaking && (
                  <div className="flex items-center gap-2 bg-green-600/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Volume2 className="w-4 h-4" />
                    <span className="text-sm">Speaking</span>
                  </div>
                )}
                {isListening && (
                  <div className="flex items-center gap-2 bg-red-600/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Mic className="w-4 h-4" />
                    <span className="text-sm">Listening</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Controls and Conversation */}
          <div className="space-y-6">
            {/* Control Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={toggleListening}
                disabled={isSpeaking}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  isListening
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                {isListening ? 'Stop Listening' : 'Start Voice Chat'}
              </button>

              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  audioEnabled
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                }`}
              >
                {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                Audio {audioEnabled ? 'On' : 'Off'}
              </button>

              <button
                onClick={() => setShowConsole(!showConsole)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300"
              >
                <MessageCircle size={20} />
                {showConsole ? 'Hide' : 'Show'} Console
              </button>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'About Me', key: 'about' },
                { label: 'Projects', key: 'projects' },
                { label: 'Skills', key: 'skills' },
                { label: 'Contact', key: 'contact' }
              ].map(({ label, key }) => (
                <button
                  key={key}
                  onClick={() => handleUserInput(key)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all duration-300 border border-slate-600 hover:border-blue-400"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Conversation Console */}
            {showConsole && (
              <div className="bg-slate-900/80 backdrop-blur-md rounded-xl p-4 border border-green-500/20 max-h-64 overflow-y-auto">
                <div className="text-green-400 text-sm font-mono mb-2">
                  OnkarAI Console v1.0
                </div>
                <div className="space-y-2 text-sm font-mono">
                  {conversationHistory.map((message, index) => (
                    <div
                      key={index}
                      className={`${
                        message.startsWith('User:')
                          ? 'text-blue-400'
                          : 'text-green-400'
                      }`}
                    >
                      {message}
                    </div>
                  ))}
                  {currentText && (
                    <div className="text-green-400 animate-pulse">
                      OnkarAI: {currentText}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-4 border border-blue-500/20">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <User size={20} />
                How to Interact
              </h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Click "Start Voice Chat" and ask questions</li>
                <li>• Use quick action buttons for common topics</li>
                <li>• Rotate the 3D avatar by dragging</li>
                <li>• Toggle audio on/off as needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden audio element for ElevenLabs */}
      <audio
        ref={audioRef}
        onEnded={() => {
          setIsSpeaking(false);
          setCurrentText('');
        }}
        onError={() => {
          setIsSpeaking(false);
          setCurrentText('');
        }}
      />
    </section>
  );
};
