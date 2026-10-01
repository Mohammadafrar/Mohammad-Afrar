import React, { useEffect, useState } from 'react';
import { X, Github, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { ProjectSchematic } from './ProjectSchematic';

interface ProjectDetailsModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  isDark: boolean;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  onClose,
  isDark,
}) => {
  const [viewMode, setViewMode] = useState<'render' | 'schematic'>('render');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setViewMode('render');
    setImgError(false);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border p-6 sm:p-8 transition-colors ${
          isDark
            ? 'bg-[#0A101E] border-slate-800 text-slate-100 shadow-2xl'
            : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
        }`}
      >
        {/* Top Metadata & Close Button */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800/40 dark:border-slate-800">
          <div>
            {/* Zero-Pill Unboxed Metadata with Typographic Separators */}
            <div
              className={`flex flex-wrap items-center gap-2 text-xs font-mono ${
                isDark ? 'text-cyan-400' : 'text-blue-600'
              }`}
            >
              <span>{project.index}</span>
              <span aria-hidden="true">·</span>
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className={project.isConcept ? 'text-amber-400' : ''}>
                Status: {project.status}
              </span>
            </div>

            <h2
              id="modal-project-title"
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-2"
            >
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details modal"
            className={`p-2 rounded-lg border transition-colors cursor-pointer shrink-0 ${
              isDark
                ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
                : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Showcase + View Mode Segmented Control */}
        <div className="mt-6">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Project Visualization
            </span>

            <div
              role="tablist"
              aria-label="Switch between visual illustration and system schematic"
              className={`inline-flex items-center p-1 rounded-lg border ${
                isDark ? 'bg-[#060913] border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}
            >
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'render'}
                onClick={() => setViewMode('render')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  viewMode === 'render'
                    ? isDark
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-900 shadow-xs'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                3D Illustration
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'schematic'}
                onClick={() => setViewMode('schematic')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  viewMode === 'schematic'
                    ? isDark
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-900 shadow-xs'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                System Block Diagram
              </button>
            </div>
          </div>

          <div
            className={`relative rounded-xl overflow-hidden border aspect-16/9 max-h-88 w-full flex items-center justify-center ${
              isDark ? 'bg-[#060913] border-slate-800/80' : 'bg-slate-50 border-slate-200'
            }`}
          >
            {viewMode === 'render' && !imgError ? (
              <img
                src={project.imageUrl}
                alt={project.imageAlt}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <ProjectSchematic type={project.schematicType} isDark={isDark} />
            )}
          </div>
        </div>

        {/* Important Notice Banner (Concept or Safety Clarification) */}
        {project.importantNotice && (
          <div
            className={`mt-6 p-4 rounded-xl border flex items-start gap-3 text-sm leading-relaxed ${
              isDark
                ? 'bg-blue-950/30 border-blue-800/50 text-blue-200'
                : 'bg-blue-50 border-blue-200 text-blue-900'
            }`}
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-blue-500" />
            <p>{project.importantNotice}</p>
          </div>
        )}

        {/* Overview & Objectives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
          <div className="md:col-span-7 space-y-6">
            <div>
              <h3 className="text-base font-semibold tracking-tight">Project Overview</h3>
              <p
                className={`mt-2 text-sm sm:text-base leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {project.fullDescription}
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold tracking-tight">
                {project.isConcept ? 'Conceptual Objectives' : 'Project Objectives'}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {project.objectives.map((obj, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start gap-2.5 text-sm leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    <span className="font-mono text-xs text-blue-500 mt-1 shrink-0">
                      0{idx + 1}.
                    </span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Features & Technologies */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <h3 className="text-base font-semibold tracking-tight">{project.featuresLabel}</h3>
              <ul className="mt-3 space-y-2">
                {project.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start gap-2.5 text-sm ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`pt-5 border-t ${
                isDark ? 'border-slate-800/80' : 'border-slate-200'
              }`}
            >
              <h3 className="text-base font-semibold tracking-tight">
                {project.isConcept ? 'Technologies Under Consideration' : 'Technologies Used'}
              </h3>
              <p
                className={`mt-2 text-sm font-mono leading-relaxed ${
                  isDark ? 'text-cyan-300' : 'text-blue-700'
                }`}
              >
                {project.technologies.join(' · ')}
              </p>
            </div>
          </div>
        </div>

        {/* System Architecture Breakdown */}
        <div
          className={`mt-8 pt-6 border-t ${
            isDark ? 'border-slate-800/80' : 'border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-blue-500" />
            <h3 className="text-base font-semibold tracking-tight">
              {project.isConcept ? 'Proposed System Workflow' : 'System Workflow'}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.systemArchitecture.map((step) => (
              <div
                key={step.stage}
                className={`p-4 rounded-xl border ${
                  isDark
                    ? 'bg-[#060913]/80 border-slate-800/80'
                    : 'bg-slate-50 border-slate-200/80'
                }`}
              >
                <p className="text-xs font-mono font-semibold text-blue-500">{step.stage}</p>
                <p
                  className={`mt-1.5 text-xs leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`mt-8 pt-5 border-t flex flex-wrap items-center justify-between gap-4 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Editable in <code className="font-mono">src/data/portfolioData.ts</code>
          </p>

          <div className="flex items-center gap-3">
            {project.githubUrl && project.githubUrl.trim() !== '' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap ${
                  isDark
                    ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                    : 'border-slate-300 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>View Repository</span>
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors whitespace-nowrap cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
