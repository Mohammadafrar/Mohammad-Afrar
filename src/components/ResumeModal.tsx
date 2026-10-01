import React, { useEffect } from 'react';
import { X, FileText, Info, ArrowRight } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onContactClick: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  isDark,
  onContactClick,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-xl rounded-2xl border p-6 sm:p-8 transition-colors ${
          isDark
            ? 'bg-[#0A101E] border-slate-800 text-slate-100 shadow-2xl'
            : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
        }`}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800/40 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/15 text-blue-500">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 id="resume-modal-title" className="font-display text-xl font-bold tracking-tight">
                Resume Document Status
              </h2>
              <p className={`text-xs font-mono mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Configured path: {PORTFOLIO_CONFIG.resume.filePath}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close resume notice"
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isDark
                ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div
          className={`mt-5 p-4 rounded-xl border flex items-start gap-3 text-sm leading-relaxed ${
            isDark
              ? 'bg-blue-950/30 border-blue-800/50 text-blue-200'
              : 'bg-blue-50 border-blue-200 text-blue-900'
          }`}
        >
          <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Resume file will be added soon</p>
            <p className="mt-1 text-xs opacity-90">
              {PORTFOLIO_CONFIG.resume.unavailableMessage}
            </p>
          </div>
        </div>

        {/* Verified Profile Snapshot */}
        <div className="mt-6 space-y-4 text-sm">
          <div>
            <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Candidate Summary
            </p>
            <p className="font-semibold mt-0.5">
              {PORTFOLIO_CONFIG.personal.name} — {PORTFOLIO_CONFIG.personal.title}
            </p>
          </div>

          <div>
            <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Education
            </p>
            <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              {PORTFOLIO_CONFIG.education.degree} in {PORTFOLIO_CONFIG.education.field} ({PORTFOLIO_CONFIG.education.status})
            </p>
          </div>

          <div>
            <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Technical Skills
            </p>
            <p className={`font-mono text-xs mt-0.5 ${isDark ? 'text-cyan-300' : 'text-blue-700'}`}>
              {PORTFOLIO_CONFIG.skills.map((s) => s.name).join(' · ')}
            </p>
          </div>

          <div>
            <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Featured Projects
            </p>
            <ul className={`mt-1 space-y-1 text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {PORTFOLIO_CONFIG.projects.map((p) => (
                <li key={p.id}>
                  {p.index}. {p.title} ({p.status})
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`mt-6 pt-5 border-t flex flex-wrap items-center justify-end gap-3 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap cursor-pointer ${
              isDark
                ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onContactClick();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Request Resume via Contact</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
