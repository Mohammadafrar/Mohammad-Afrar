import React from 'react';

interface ProjectSchematicProps {
  type: 'fire-rover' | 'alcohol-sensor' | 'sentinel-robot';
  isDark: boolean;
}

export const ProjectSchematic: React.FC<ProjectSchematicProps> = ({ type, isDark }) => {
  const strokeMain = isDark ? '#38BDF8' : '#2563EB';
  const strokeAccent = isDark ? '#818CF8' : '#4F46E5';
  const textFill = isDark ? '#E2E8F0' : '#0F172A';
  const subTextFill = isDark ? '#94A3B8' : '#475569';
  const boxFill = isDark ? '#0B1325' : '#F1F5F9';
  const boxStroke = isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(37, 99, 235, 0.35)';

  if (type === 'fire-rover') {
    return (
      <div className="w-full h-full flex items-center justify-center p-4 select-none">
        <svg
          viewBox="0 0 600 360"
          className="w-full h-full max-h-72"
          role="img"
          aria-label="System schematic of the Fire Detection and Extinguishing Vehicle showing Flame Sensors, Arduino UNO, Motor Driver, Servo Nozzle, and Water Pump"
        >
          {/* Left: Flame Sensors */}
          <rect x="24" y="65" width="145" height="95" rx="8" fill={boxFill} stroke={boxStroke} strokeWidth="1.5" />
          <text x="96" y="95" textAnchor="middle" fill={textFill} fontSize="13" fontWeight="600">
            Flame Sensors
          </text>
          <text x="96" y="116" textAnchor="middle" fill={subTextFill} fontSize="11">
            Left · Center · Right
          </text>
          <text x="96" y="136" textAnchor="middle" fill={strokeMain} fontSize="10" fontFamily="monospace">
            IR Flame Input
          </text>

          {/* Left Bottom: Power Supply */}
          <rect x="24" y="200" width="145" height="85" rx="8" fill={boxFill} stroke={boxStroke} strokeWidth="1.5" />
          <text x="96" y="232" textAnchor="middle" fill={textFill} fontSize="13" fontWeight="600">
            Chassis Power
          </text>
          <text x="96" y="254" textAnchor="middle" fill={subTextFill} fontSize="11">
            DC Supply Rails
          </text>

          {/* Center: Arduino UNO Controller */}
          <rect x="220" y="110" width="160" height="135" rx="10" fill={boxFill} stroke={strokeMain} strokeWidth="2" />
          <text x="300" y="148" textAnchor="middle" fill={strokeMain} fontSize="11" fontFamily="monospace">
            MICROCONTROLLER
          </text>
          <text x="300" y="172" textAnchor="middle" fill={textFill} fontSize="15" fontWeight="700">
            Arduino UNO
          </text>
          <text x="300" y="196" textAnchor="middle" fill={subTextFill} fontSize="11">
            C/C++ Control Logic
          </text>
          <text x="300" y="218" textAnchor="middle" fill={subTextFill} fontSize="10" fontFamily="monospace">
            Detect · Stop · Extinguish
          </text>

          {/* Right Top: Motor Driver & Wheels */}
          <rect x="430" y="45" width="146" height="105" rx="8" fill={boxFill} stroke={boxStroke} strokeWidth="1.5" />
          <text x="503" y="75" textAnchor="middle" fill={textFill} fontSize="13" fontWeight="600">
            Motor Driver
          </text>
          <text x="503" y="96" textAnchor="middle" fill={subTextFill} fontSize="11">
            4-Wheel Mobility
          </text>
          <text x="503" y="118" textAnchor="middle" fill={strokeAccent} fontSize="10" fontFamily="monospace">
            Auto-Stop on Flame
          </text>

          {/* Right Bottom: Servo + Water Pump */}
          <rect x="430" y="195" width="146" height="115" rx="8" fill={boxFill} stroke={boxStroke} strokeWidth="1.5" />
          <text x="503" y="225" textAnchor="middle" fill={textFill} fontSize="13" fontWeight="600">
            Suppression Unit
          </text>
          <text x="503" y="247" textAnchor="middle" fill={subTextFill} fontSize="11">
            Servo Motor Nozzle
          </text>
          <text x="503" y="267" textAnchor="middle" fill={subTextFill} fontSize="11">
            + Submersible Pump
          </text>
          <text x="503" y="290" textAnchor="middle" fill={strokeMain} fontSize="10" fontFamily="monospace">
            Active Water Spray
          </text>

          {/* Interconnect Lines */}
          <path d="M 169 112 L 220 155" stroke={strokeMain} strokeWidth="1.75" fill="none" strokeDasharray="4 3" />
          <path d="M 169 242 L 220 205" stroke={strokeAccent} strokeWidth="1.5" fill="none" />
          <path d="M 380 155 L 430 98" stroke={strokeMain} strokeWidth="1.75" fill="none" />
          <path d="M 380 200 L 430 250" stroke={strokeMain} strokeWidth="1.75" fill="none" />

          {/* Node points */}
          <circle cx="220" cy="155" r="4" fill={strokeMain} />
          <circle cx="220" cy="205" r="4" fill={strokeAccent} />
          <circle cx="380" cy="155" r="4" fill={strokeMain} />
          <circle cx="380" cy="200" r="4" fill={strokeMain} />
        </svg>
      </div>
    );
  }

  if (type === 'alcohol-sensor') {
    return (
      <div className="w-full h-full flex items-center justify-center p-4 select-none">
        <svg
          viewBox="0 0 600 360"
          className="w-full h-full max-h-72"
          role="img"
          aria-label="System schematic of the Alcohol Detection System showing Alcohol Sensor, Arduino Controller, and Alert Indicator"
        >
          {/* Stage 1: Alcohol Sensor */}
          <rect x="30" y="115" width="150" height="130" rx="8" fill={boxFill} stroke={boxStroke} strokeWidth="1.5" />
          <circle cx="105" cy="152" r="16" fill="none" stroke={strokeMain} strokeWidth="1.75" />
          <circle cx="105" cy="152" r="6" fill={strokeMain} />
          <text x="105" y="192" textAnchor="middle" fill={textFill} fontSize="13" fontWeight="600">
            Alcohol Sensor
          </text>
          <text x="105" y="212" textAnchor="middle" fill={subTextFill} fontSize="11">
            Ambient Air Sampling
          </text>
          <text x="105" y="230" textAnchor="middle" fill={strokeMain} fontSize="10" fontFamily="monospace">
            Analog / Digital Signal
          </text>

          {/* Stage 2: Arduino Processing */}
          <rect x="225" y="105" width="155" height="150" rx="10" fill={boxFill} stroke={strokeMain} strokeWidth="2" />
          <text x="302" y="142" textAnchor="middle" fill={strokeMain} fontSize="10" fontFamily="monospace">
            SIGNAL PROCESSING
          </text>
          <text x="302" y="168" textAnchor="middle" fill={textFill} fontSize="15" fontWeight="700">
            Arduino Board
          </text>
          <text x="302" y="192" textAnchor="middle" fill={subTextFill} fontSize="11">
            C/C++ Threshold Logic
          </text>
          <text x="302" y="216" textAnchor="middle" fill={subTextFill} fontSize="10" fontFamily="monospace">
            val &gt;= THRESHOLD
          </text>

          {/* Stage 3: Alert Output */}
          <rect x="425" y="115" width="145" height="130" rx="8" fill={boxFill} stroke={boxStroke} strokeWidth="1.5" />
          <text x="497" y="158" textAnchor="middle" fill={textFill} fontSize="13" fontWeight="600">
            Alert Indication
          </text>
          <text x="497" y="182" textAnchor="middle" fill={subTextFill} fontSize="11">
            Visual LED / Audible
          </text>
          <text x="497" y="202" textAnchor="middle" fill={subTextFill} fontSize="11">
            Status Output
          </text>
          <text x="497" y="226" textAnchor="middle" fill={strokeAccent} fontSize="10" fontFamily="monospace">
            Threshold Triggered
          </text>

          {/* Connectors */}
          <line x1="180" y1="180" x2="225" y2="180" stroke={strokeMain} strokeWidth="2" />
          <line x1="380" y1="180" x2="425" y2="180" stroke={strokeMain} strokeWidth="2" />
          <circle cx="202" cy="180" r="4" fill={strokeMain} />
          <circle cx="402" cy="180" r="4" fill={strokeAccent} />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4 select-none">
      <svg
        viewBox="0 0 600 360"
        className="w-full h-full max-h-72"
        role="img"
        aria-label="Conceptual architecture of SENTINEL Intelligent Emergency Decision Robot showing Hazard Sensing, Vision & Mapping, and Safer Route Selection"
      >
        {/* Top Banner inside schematic */}
        <text x="300" y="38" textAnchor="middle" fill={strokeMain} fontSize="11" fontFamily="monospace">
          CONCEPTUAL ARCHITECTURE — PLANNED RESEARCH PROJECT
        </text>

        {/* Left Top: Environmental Sensors */}
        <rect x="24" y="65" width="150" height="100" rx="8" fill={boxFill} stroke={boxStroke} strokeWidth="1.5" />
        <text x="99" y="98" textAnchor="middle" fill={textFill} fontSize="13" fontWeight="600">
          Hazard Sensing
        </text>
        <text x="99" y="120" textAnchor="middle" fill={subTextFill} fontSize="11">
          Environmental Inputs
        </text>
        <text x="99" y="142" textAnchor="middle" fill={strokeMain} fontSize="10" fontFamily="monospace">
          Gas · Thermal · Obstacle
        </text>

        {/* Left Bottom: Computer Vision */}
        <rect x="24" y="195" width="150" height="100" rx="8" fill={boxFill} stroke={boxStroke} strokeWidth="1.5" />
        <text x="99" y="228" textAnchor="middle" fill={textFill} fontSize="13" fontWeight="600">
          Vision Concept
        </text>
        <text x="99" y="250" textAnchor="middle" fill={subTextFill} fontSize="11">
          Possible Human Detection
        </text>
        <text x="99" y="272" textAnchor="middle" fill={strokeAccent} fontSize="10" fontFamily="monospace">
          Camera &amp; AI Pipeline
        </text>

        {/* Center: SENTINEL Core */}
        <rect x="220" y="105" width="160" height="150" rx="12" fill={boxFill} stroke={strokeMain} strokeWidth="2" />
        <text x="300" y="142" textAnchor="middle" fill={strokeMain} fontSize="10" fontFamily="monospace">
          PROPOSED CORE
        </text>
        <text x="300" y="168" textAnchor="middle" fill={textFill} fontSize="16" fontWeight="700">
          SENTINEL Engine
        </text>
        <text x="300" y="192" textAnchor="middle" fill={subTextFill} fontSize="11">
          Python · AI · Robotics
        </text>
        <text x="300" y="216" textAnchor="middle" fill={subTextFill} fontSize="11">
          Risk Evaluation Matrix
        </text>

        {/* Right: Mapping & Route Output */}
        <rect x="426" y="110" width="150" height="140" rx="8" fill={boxFill} stroke={boxStroke} strokeWidth="1.5" />
        <text x="501" y="148" textAnchor="middle" fill={textFill} fontSize="13" fontWeight="600">
          Decision Output
        </text>
        <text x="501" y="172" textAnchor="middle" fill={subTextFill} fontSize="11">
          Area Mapping &amp;
        </text>
        <text x="501" y="192" textAnchor="middle" fill={subTextFill} fontSize="11">
          Safer Route Selection
        </text>
        <text x="501" y="220" textAnchor="middle" fill={strokeMain} fontSize="10" fontFamily="monospace">
          Disaster Support
        </text>

        {/* Connectors */}
        <path d="M 174 115 L 220 155" stroke={strokeMain} strokeWidth="1.75" fill="none" strokeDasharray="4 3" />
        <path d="M 174 245 L 220 205" stroke={strokeAccent} strokeWidth="1.75" fill="none" strokeDasharray="4 3" />
        <path d="M 380 180 L 426 180" stroke={strokeMain} strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
};
