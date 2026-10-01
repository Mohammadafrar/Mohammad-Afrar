import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, HelpCircle } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
}

interface ChatAssistantProps {
  isDark: boolean;
}

const EXAMPLE_QUESTIONS = [
  'What projects has Afrar worked on?',
  'What programming languages does he know?',
  'Tell me about SENTINEL.',
  'How can I contact Afrar?',
];

function getPortfolioAnswer(query: string): string {
  const q = query.toLowerCase().trim();

  if (q.includes('sentinel') || q.includes('robot') || q.includes('disaster') || q.includes('emergency')) {
    return 'SENTINEL is a proposed intelligent emergency decision robot and research concept (not a completed build). The concept explores environmental hazard sensing, possible human detection, mapping explored locations, and risk-aware route planning using Python, Artificial Intelligence, Computer Vision, sensors, and robotics.';
  }

  if (q.includes('fire') || q.includes('extinguish') || q.includes('vehicle') || q.includes('pump')) {
    return 'The Fire Detection and Extinguishing Vehicle is a hardware/embedded systems prototype built with an Arduino UNO, C/C++, flame sensors, a motor driver, a servo motor, and a water pump. It detects nearby flames, stops automatically, aims a servo-controlled nozzle, and activates the water pump to help extinguish the fire.';
  }

  if (q.includes('alcohol') || q.includes('safety')) {
    return 'The Alcohol Detection System is an embedded prototype using an Arduino board, C/C++, an alcohol sensor, and electronic components. It detects alcohol vapor in the surrounding air, processes sensor readings, and triggers a visual or audible alert when a configured threshold is reached. (Note: It is an educational prototype and does not measure blood alcohol concentration or claim safety certification.)';
  }

  if (q.includes('project') || q.includes('built') || q.includes('work')) {
    return "Mohammad Afrar's portfolio highlights three projects:\n1. Fire Detection and Extinguishing Vehicle (Hardware / Embedded Systems prototype)\n2. Alcohol Detection System (Embedded Systems prototype)\n3. SENTINEL — An Intelligent Emergency Decision Robot (Future Project / Research Concept).\nYou can click 'View Details' on any project card to inspect its architecture and features.";
  }

  if (
    q.includes('skill') ||
    q.includes('language') ||
    q.includes('program') ||
    q.includes('tech') ||
    q.includes('stack') ||
    q.includes('c++') ||
    q.includes('python') ||
    q.includes('java') ||
    q.includes('html') ||
    q.includes('css')
  ) {
    return 'Mohammad Afrar works with the following technical skills:\n• Programming Languages: C, C++, Python, Java\n• Web Technologies: HTML, CSS\nHe applies C and C++ for Arduino embedded systems and sensor control, Python and Java for software development and AI concepts, and HTML/CSS for web interfaces.';
  }

  if (q.includes('education') || q.includes('degree') || q.includes('study') || q.includes('college') || q.includes('student')) {
    return 'Mohammad Afrar is currently pursuing a Bachelor of Engineering (BE) in Computer Science Engineering. (His specific institution details can be updated directly in src/data/portfolioData.ts.)';
  }

  if (q.includes('interest') || q.includes('goal') || q.includes('about') || q.includes('who is') || q.includes('internship')) {
    return "Mohammad Afrar is a Computer Science Engineering student interested in Software Development, Artificial Intelligence, and Web Development. His career goal is to grow as a software developer and technology enthusiast, and he is actively open to internship opportunities, collaborations, and project discussions.";
  }

  if (q.includes('resume') || q.includes('cv')) {
    return `A configurable resume path (${PORTFOLIO_CONFIG.resume.filePath}) is built into the site. Once the PDF file is added to the project, it can be downloaded directly from the navigation bar or Hero section.`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('github') || q.includes('linkedin')) {
    return "You can connect with Mohammad Afrar using the 'Let's Connect' section at the bottom of the page, which includes a validated contact form with a direct mailto fallback, as well as configurable links for GitHub, LinkedIn, and Email.";
  }

  return "I can answer questions using the verified information on Mohammad Afrar's portfolio! Try asking about his projects (Fire Detection Vehicle, Alcohol Detection System, or SENTINEL), his programming languages (C, C++, Python, Java, HTML, CSS), his Computer Science Engineering education, or how to contact him.";
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hi! I'm Afrar's portfolio assistant. Ask me about his skills, projects, education, or interests.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = (questionText?: string) => {
    const query = (questionText ?? input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
    };

    const replyMsg: ChatMessage = {
      id: `assistant-${Date.now() + 1}`,
      sender: 'assistant',
      text: getPortfolioAnswer(query),
    };

    setMessages((prev) => [...prev, userMsg, replyMsg]);
    if (!questionText) setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {isOpen ? (
        <div
          role="dialog"
          aria-label="Afrar's Portfolio Assistant"
          className={`w-[calc(100vw-2.5rem)] sm:w-96 rounded-2xl border overflow-hidden transition-all shadow-2xl ${
            isDark
              ? 'bg-[#0A101E] border-slate-800 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header */}
          <div
            className={`px-4 py-3.5 border-b flex items-center justify-between ${
              isDark ? 'bg-[#060913] border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-tight">Portfolio Assistant</h3>
                <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Local FAQ Mode · Verified Portfolio Data
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close portfolio assistant"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="p-4 h-72 overflow-y-auto space-y-3 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${
                  msg.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                    msg.sender === 'assistant'
                      ? isDark
                        ? 'bg-slate-800 text-cyan-400'
                        : 'bg-blue-50 text-blue-600'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {msg.sender === 'assistant' ? (
                    <Bot className="w-3.5 h-3.5" />
                  ) : (
                    <User className="w-3.5 h-3.5" />
                  )}
                </div>

                <div
                  className={`max-w-[82%] rounded-xl px-3.5 py-2.5 whitespace-pre-line leading-relaxed ${
                    msg.sender === 'assistant'
                      ? isDark
                        ? 'bg-[#0F172A] border border-slate-800/90 text-slate-200'
                        : 'bg-slate-100 text-slate-800'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          <div
            className={`px-4 py-2.5 border-t ${
              isDark ? 'bg-[#070B16] border-slate-800/80' : 'bg-slate-50/80 border-slate-200/80'
            }`}
          >
            <p className={`text-[11px] mb-1.5 flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <HelpCircle className="w-3 h-3" />
              <span>Suggested questions:</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {EXAMPLE_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSend(q)}
                  className={`text-left text-[11px] px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-[#0B1120] border-slate-800 text-slate-300 hover:border-blue-500/60 hover:text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:text-slate-900'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className={`p-3 border-t flex items-center gap-2 ${
              isDark ? 'bg-[#060913] border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, projects, SENTINEL..."
              aria-label="Ask a question about Mohammad Afrar"
              className={`w-full text-xs sm:text-sm px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? 'bg-[#0B1120] border-slate-800 text-slate-100 placeholder:text-slate-500'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
              }`}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send question"
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-40 transition-colors shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Afrar's portfolio assistant"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-blue-600 text-white font-medium text-xs sm:text-sm shadow-lg shadow-blue-600/30 hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 transition-all cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="whitespace-nowrap">Ask Portfolio Assistant</span>
        </button>
      )}
    </div>
  );
};
