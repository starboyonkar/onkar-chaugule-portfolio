
import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Code, ChevronRight } from 'lucide-react';

interface ConsoleEntry {
  id: string;
  command: string;
  output: string | JSX.Element;
  timestamp: Date;
}

export const DevConsole = () => {
  const [entries, setEntries] = useState<ConsoleEntry[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  // Available commands
  const commands = {
    about: () => ({
      output: (
        <div className="text-green-400 space-y-2">
          <div className="text-cyan-400 font-bold">▓ DEVELOPER PROFILE ▓</div>
          <div>Name: Onkar Chaugule</div>
          <div>Title: Embedded + Software Developer</div>
          <div>Location: India</div>
          <div>Description: A curious engineer building smart, voice-controlled,</div>
          <div>IoT-powered interfaces and future tech.</div>
          <div className="text-yellow-400 mt-2">CGPA: 9.36 | Status: Available for opportunities</div>
        </div>
      )
    }),
    
    projects: () => ({
      output: (
        <div className="text-green-400 space-y-3">
          <div className="text-cyan-400 font-bold">▓ TOP PROJECTS ▓</div>
          <div className="space-y-2">
            <div className="border-l-2 border-blue-400 pl-3">
              <div className="text-yellow-400 font-semibold">Voice Controlled Home Automation</div>
              <div className="text-gray-300 text-sm">IoT + Voice Recognition + Smart Controls</div>
            </div>
            <div className="border-l-2 border-purple-400 pl-3">
              <div className="text-yellow-400 font-semibold">Cloud-Native DevOps Platform</div>
              <div className="text-gray-300 text-sm">Docker + Kubernetes + CI/CD Pipeline</div>
            </div>
            <div className="border-l-2 border-green-400 pl-3">
              <div className="text-yellow-400 font-semibold">Real-time Chat Application</div>
              <div className="text-gray-300 text-sm">React + Socket.io + Node.js</div>
            </div>
          </div>
          <div className="text-blue-400 mt-2">Use goto('projects') to view full details</div>
        </div>
      )
    }),

    skills: () => ({
      output: (
        <div className="text-green-400 space-y-2">
          <div className="text-cyan-400 font-bold">▓ TECHNICAL STACK ▓</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Languages: JavaScript, Python, C++</div>
            <div>Frontend: React, TypeScript, Tailwind</div>
            <div>Backend: Node.js, Express, FastAPI</div>
            <div>Cloud: AWS, Docker, Kubernetes</div>
            <div>IoT: Arduino, Raspberry Pi, ESP32</div>
            <div>Database: MongoDB, PostgreSQL</div>
          </div>
        </div>
      )
    }),

    contact: () => ({
      output: (
        <div className="text-green-400 space-y-2">
          <div className="text-cyan-400 font-bold">▓ CONTACT INFORMATION ▓</div>
          <div>📧 Email: onkarchaugule2025@gmail.com</div>
          <div>🔗 LinkedIn: /in/onkar-chaugule</div>
          <div>💻 GitHub: /onkar-chaugule</div>
          <div className="text-blue-400 mt-2">Use goto('contact') to access contact form</div>
        </div>
      )
    }),

    help: () => ({
      output: (
        <div className="text-green-400 space-y-2">
          <div className="text-cyan-400 font-bold">▓ AVAILABLE COMMANDS ▓</div>
          <div className="grid gap-1 text-sm">
            <div><span className="text-yellow-400">about()</span> - Display developer profile</div>
            <div><span className="text-yellow-400">projects()</span> - List top projects</div>
            <div><span className="text-yellow-400">skills()</span> - Show technical skills</div>
            <div><span className="text-yellow-400">contact()</span> - Display contact info</div>
            <div><span className="text-yellow-400">goto('section')</span> - Navigate to section</div>
            <div><span className="text-yellow-400">theme('dark'|'light')</span> - Toggle theme</div>
            <div><span className="text-yellow-400">clear()</span> - Clear console</div>
            <div><span className="text-yellow-400">help()</span> - Show this help</div>
            <div><span className="text-yellow-400">sudo hireme()</span> - Easter egg 🥚</div>
          </div>
        </div>
      )
    }),

    clear: () => ({ clear: true }),

    'sudo hireme': () => ({
      output: (
        <div className="text-green-400 space-y-2">
          <div className="text-red-400 font-bold animate-pulse">▓ ACCESS GRANTED ▓</div>
          <div className="text-yellow-400">Initiating hire sequence...</div>
          <div className="text-cyan-400">Loading exceptional developer...</div>
          <div className="text-green-400">✓ Skills verified</div>
          <div className="text-green-400">✓ Portfolio impressive</div>
          <div className="text-green-400">✓ Ready for challenges</div>
          <div className="text-purple-400 font-bold mt-2">🚀 HIRE ONKAR CHAUGULE? (Y/N): Y</div>
        </div>
      )
    })
  };

  // Handle command execution
  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const newEntry: ConsoleEntry = {
      id: Date.now().toString(),
      command: trimmedCmd,
      output: '',
      timestamp: new Date()
    };

    // Parse commands
    if (trimmedCmd.includes('goto(')) {
      const section = trimmedCmd.match(/goto\(['"](.+?)['"]\)/)?.[1];
      if (section) {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          newEntry.output = <div className="text-green-400">Navigating to {section} section...</div>;
        } else {
          newEntry.output = <div className="text-red-400">Section '{section}' not found</div>;
        }
      }
    } else if (trimmedCmd.includes('theme(')) {
      const theme = trimmedCmd.match(/theme\(['"](.+?)['"]\)/)?.[1];
      newEntry.output = <div className="text-yellow-400">Theme switching to {theme}...</div>;
    } else if (commands[trimmedCmd as keyof typeof commands]) {
      const result = commands[trimmedCmd as keyof typeof commands]();
      if ('clear' in result) {
        setEntries([]);
        return;
      }
      newEntry.output = result.output;
    } else if (trimmedCmd === '') {
      return;
    } else {
      newEntry.output = (
        <div className="text-red-400">
          Command not found: {trimmedCmd}
          <div className="text-gray-400 text-sm mt-1">Type help() for available commands</div>
        </div>
      );
    }

    setEntries(prev => [...prev, newEntry]);
  };

  // Handle input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCommand.trim()) {
      setCommandHistory(prev => [...prev, currentCommand]);
      executeCommand(currentCommand);
      setCurrentCommand('');
      setHistoryIndex(-1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [entries]);

  // Auto-focus input
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Add welcome message
  useEffect(() => {
    const welcomeEntry: ConsoleEntry = {
      id: 'welcome',
      command: '',
      output: (
        <div className="text-green-400 space-y-2">
          <div className="text-cyan-400 font-bold">▓ ONKAR CHAUGULE DEVELOPER CONSOLE ▓</div>
          <div className="text-yellow-400">Welcome to interactive portfolio terminal</div>
          <div className="text-gray-300">Type help() to see available commands</div>
          <div className="text-blue-400">Try: about(), projects(), contact()</div>
        </div>
      ),
      timestamp: new Date()
    };
    setEntries([welcomeEntry]);
  }, []);

  return (
    <section id="console" className="py-20 px-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text font-futuristic bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent glassmorphic-bg p-4 rounded-xl backdrop-blur-md">
            <Terminal className="inline-block mr-3 mb-2" size={40} />
            Developer Console
          </h2>
          <p className="text-xl text-gray-300 mb-2">
            Interactive terminal for developer exploration
          </p>
          <p className="text-gray-400">
            Try typing: <span className="text-cyan-400 font-mono">about()</span>, 
            <span className="text-cyan-400 font-mono"> projects()</span>, 
            <span className="text-cyan-400 font-mono"> help()</span>
          </p>
        </div>

        {/* Console Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/90 backdrop-blur-md rounded-lg border border-green-500/30 shadow-2xl overflow-hidden">
            {/* Console Header */}
            <div className="bg-slate-800/80 px-4 py-2 border-b border-green-500/20 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Code size={16} className="text-green-400" />
                <span className="text-green-400 font-mono text-sm">dev@onkar:portfolio$</span>
              </div>
            </div>

            {/* Console Content */}
            <div 
              ref={consoleRef}
              className="h-96 overflow-y-auto p-4 font-mono text-sm scrollbar-thin scrollbar-thumb-green-500/50 scrollbar-track-transparent"
            >
              {/* Console Entries */}
              {entries.map((entry) => (
                <div key={entry.id} className="mb-4">
                  {entry.command && (
                    <div className="flex items-center gap-2 text-green-400 mb-1">
                      <ChevronRight size={14} className="text-blue-400" />
                      <span className="text-blue-400">dev@onkar:~$</span>
                      <span className="text-white">{entry.command}</span>
                    </div>
                  )}
                  <div className="ml-6">{entry.output}</div>
                </div>
              ))}

              {/* Input Line */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2 text-green-400">
                <ChevronRight size={14} className="text-blue-400" />
                <span className="text-blue-400">dev@onkar:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-white caret-green-400"
                  autoComplete="off"
                  spellCheck="false"
                />
                <span className="animate-pulse text-green-400">▋</span>
              </form>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto text-sm">
            <div className="bg-slate-900/30 backdrop-blur-md p-3 rounded-lg border border-blue-500/20">
              <div className="text-blue-400 font-semibold mb-1">Navigation</div>
              <div className="text-gray-400">goto('section') to navigate</div>
            </div>
            <div className="bg-slate-900/30 backdrop-blur-md p-3 rounded-lg border border-purple-500/20">
              <div className="text-purple-400 font-semibold mb-1">History</div>
              <div className="text-gray-400">↑/↓ arrows for command history</div>
            </div>
            <div className="bg-slate-900/30 backdrop-blur-md p-3 rounded-lg border border-green-500/20">
              <div className="text-green-400 font-semibold mb-1">Easter Egg</div>
              <div className="text-gray-400">Try sudo hireme() 😉</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
