import React, { useState } from 'react';
import { Code2, Cpu, Compass } from 'lucide-react';

interface HeroVisual3DProps {
  isDark: boolean;
}

interface PillarData {
  id: string;
  index: string;
  label: string;
  focus: string;
  languages: string;
  snippetTitle: string;
  code: string;
  rotationDeg: number;
}

const PILLARS: PillarData[] = [
  {
    id: 'software',
    index: '01',
    label: 'Software Development',
    focus: 'Algorithmic problem solving & structured object-oriented design',
    languages: 'C · C++ · Python · Java',
    snippetTitle: 'PortfolioProfile.java',
    code: `public class DeveloperFocus {
  String name = "Mohammad Afrar";
  String program = "B.E. Computer Science Engineering";
  String[] coreStack = {"C", "C++", "Python", "Java", "HTML", "CSS"};
}`,
    rotationDeg: 0,
  },
  {
    id: 'embedded',
    index: '02',
    label: 'Embedded Hardware',
    focus: 'Sensor integration, microcontroller logic & actuator control',
    languages: 'Arduino UNO · C/C++ · Sensors · Actuators',
    snippetTitle: 'fire_response_controller.ino',
    code: `void loop() {
  int flameSignal = analogRead(FLAME_SENSOR);
  if (flameSignal < THRESHOLD) {
    haltMotors();
    aimServoNozzle(90);
    setWaterPump(HIGH);
  }
}`,
    rotationDeg: 120,
  },
  {
    id: 'ai-robotics',
    index: '03',
    label: 'AI & Robotics Exploration',
    focus: 'Conceptual hazard sensing, route planning & autonomous decision support',
    languages: 'Python · Computer Vision · Sensor Fusion',
    snippetTitle: 'sentinel_route_concept.py',
    code: `def select_safer_corridor(zones: list[dict]) -> dict:
    # SENTINEL concept: prioritize low-hazard explored paths
    safe_candidates = [z for z in zones if z["hazard"] < 0.35]
    return min(safe_candidates, key=lambda z: z["distance"])`,
    rotationDeg: 240,
  },
];

export const HeroVisual3D: React.FC<HeroVisual3DProps> = ({ isDark }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activePillar = PILLARS[activeIndex];

  return (
    <div
      className={`relative rounded-2xl border p-6 transition-colors duration-200 ${
        isDark
          ? 'bg-[#0B1120]/90 border-slate-800/80 shadow-[0_0_60px_-15px_rgba(37,99,235,0.22)]'
          : 'bg-white/95 border-slate-200 shadow-xl shadow-slate-900/5'
      }`}
    >
      {/* Top Interactive Pillar Switcher (Segmented Control) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/60 dark:border-slate-800/60">
        <div>
          <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Interactive Architecture Model
          </p>
          <h2 className={`text-base font-semibold mt-0.5 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            {activePillar.index}. {activePillar.label}
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Select engineering pillar to inspect"
          className={`inline-flex items-center p-1 rounded-lg border ${
            isDark ? 'bg-[#060913] border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          {PILLARS.map((pillar, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={pillar.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveIndex(idx)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? isDark
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-900 shadow-xs'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {pillar.index}
              </button>
            );
          })}
        </div>
      </div>

      {/* Center 3D-Inspired Isometric Polyhedral & Orbital Core */}
      <div className="relative my-5 h-56 flex items-center justify-center overflow-hidden rounded-xl border border-slate-800/40 bg-gradient-to-b from-blue-500/[0.04] to-cyan-500/[0.02]">
        {/* Radial Subtle Ambient Glow */}
        <div
          className="pointer-events-none absolute w-52 h-52 rounded-full blur-2xl transition-opacity duration-200"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(37,99,235,0.22) 0%, rgba(6,182,212,0.08) 55%, transparent 75%)'
              : 'radial-gradient(circle, rgba(37,99,235,0.14) 0%, rgba(6,182,212,0.05) 55%, transparent 75%)',
          }}
        />

        {/* Interactive 3D Geometric SVG Structure */}
        <svg
          viewBox="0 0 360 220"
          className="w-full h-full max-w-[340px]"
          role="img"
          aria-label={`Three-dimensional geometric model illustrating ${activePillar.label}`}
        >
          <defs>
            <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Outer Isometric Ring */}
          <ellipse
            cx="180"
            cy="110"
            rx="132"
            ry="52"
            fill="none"
            stroke={isDark ? 'rgba(56, 189, 248, 0.22)' : 'rgba(37, 99, 235, 0.25)'}
            strokeWidth="1.25"
            strokeDasharray="6 4"
          />

          {/* Tilted Secondary Orbital Ring */}
          <g
            style={{
              transform: `rotate(${activePillar.rotationDeg * 0.15 - 14}deg)`,
              transformOrigin: '180px 110px',
              transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <ellipse
              cx="180"
              cy="110"
              rx="104"
              ry="42"
              fill="none"
              stroke={isDark ? 'rgba(129, 140, 248, 0.32)' : 'rgba(79, 70, 229, 0.28)'}
              strokeWidth="1.25"
            />
            <circle cx="76" cy="110" r="4.5" fill="#06B6D4" />
            <circle cx="284" cy="110" r="4.5" fill="#2563EB" />
          </g>

          {/* Central 3D Isometric Hexahedron / Octahedron Wireframe */}
          <g
            style={{
              transform: `scale(${activeIndex === 1 ? 1.04 : 1})`,
              transformOrigin: '180px 110px',
              transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Top Pyramid */}
            <polygon
              points="180,36 238,88 180,114 122,88"
              fill="url(#coreGrad)"
              fillOpacity={isDark ? '0.18' : '0.12'}
              stroke={isDark ? '#38BDF8' : '#2563EB'}
              strokeWidth="1.75"
            />
            {/* Bottom Pyramid */}
            <polygon
              points="122,88 180,114 238,88 180,184"
              fill="url(#coreGrad)"
              fillOpacity={isDark ? '0.12' : '0.08'}
              stroke={isDark ? '#60A5FA' : '#1D4ED8'}
              strokeWidth="1.75"
            />
            {/* Vertical Spine */}
            <line
              x1="180"
              y1="36"
              x2="180"
              y2="184"
              stroke={isDark ? '#E0F2FE' : '#1E40AF'}
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            {/* Vertices */}
            <circle cx="180" cy="36" r="4" fill="#38BDF8" />
            <circle cx="238" cy="88" r="4" fill="#2563EB" />
            <circle cx="122" cy="88" r="4" fill="#2563EB" />
            <circle cx="180" cy="114" r="5" fill="#06B6D4" />
            <circle cx="180" cy="184" r="4" fill="#818CF8" />
          </g>

          {/* Interactive Pillar Callout Labels */}
          <g>
            <line
              x1="238"
              y1="88"
              x2="282"
              y2="56"
              stroke={isDark ? '#38BDF8' : '#2563EB'}
              strokeWidth="1.2"
            />
            <text
              x="286"
              y="52"
              fill={isDark ? '#E2E8F0' : '#0F172A'}
              fontSize="10"
              fontWeight="600"
            >
              C / C++ / Python
            </text>
            <text
              x="286"
              y="66"
              fill={isDark ? '#94A3B8' : '#475569'}
              fontSize="9"
              fontFamily="monospace"
            >
              Core Logic
            </text>
          </g>

          <g>
            <line
              x1="122"
              y1="88"
              x2="74"
              y2="56"
              stroke={isDark ? '#818CF8' : '#4F46E5'}
              strokeWidth="1.2"
            />
            <text
              x="70"
              y="52"
              textAnchor="end"
              fill={isDark ? '#E2E8F0' : '#0F172A'}
              fontSize="10"
              fontWeight="600"
            >
              Sensors &amp; I/O
            </text>
            <text
              x="70"
              y="66"
              textAnchor="end"
              fill={isDark ? '#94A3B8' : '#475569'}
              fontSize="9"
              fontFamily="monospace"
            >
              Arduino UNO
            </text>
          </g>
        </svg>

        {/* Bottom Pillar Quick-Select Bar inside Viewport */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-950/75 text-slate-200 backdrop-blur-xs border border-slate-800/80 text-xs">
          <span className="truncate">{activePillar.focus}</span>
          <span className="font-mono text-cyan-400 shrink-0 ml-3">{activePillar.languages}</span>
        </div>
      </div>

      {/* Live Code Preview Panel */}
      <div
        className={`rounded-xl border p-4 font-mono text-xs ${
          isDark
            ? 'bg-[#060913] border-slate-800/90 text-slate-300'
            : 'bg-slate-900 border-slate-800 text-slate-200'
        }`}
      >
        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800 text-[11px] text-slate-400">
          <span className="flex items-center gap-2">
            {activeIndex === 0 && <Code2 className="w-3.5 h-3.5 text-blue-400" />}
            {activeIndex === 1 && <Cpu className="w-3.5 h-3.5 text-cyan-400" />}
            {activeIndex === 2 && <Compass className="w-3.5 h-3.5 text-indigo-400" />}
            <span>{activePillar.snippetTitle}</span>
          </span>
          <span className="text-slate-500">Click 01 · 02 · 03 to switch</span>
        </div>
        <pre className="overflow-x-auto leading-relaxed text-cyan-100/90">
          <code>{activePillar.code}</code>
        </pre>
      </div>
    </div>
  );
};
