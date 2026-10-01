import fireVehicleImg from '../assets/images/project_fire_vehicle_1790876537137.jpg';
import alcoholSensorImg from '../assets/images/project_alcohol_sensor_1790876549967.jpg';
import sentinelRobotImg from '../assets/images/project_sentinel_robot_1790876560984.jpg';

export interface SkillItem {
  id: string;
  name: string;
  category: 'Programming Languages' | 'Web Technologies';
  shortSummary: string;
  whatItIsUsedFor: string;
  portfolioApplication: string;
  codePreview: string;
  relatedConcepts: string[];
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: string;
  filterGroup: 'hardware' | 'concept';
  status: 'Hardware Prototype' | 'Concept / Planned Project';
  isConcept?: boolean;
  shortDescription: string;
  fullDescription: string;
  objectives: string[];
  technologies: string[];
  featuresLabel: string;
  features: string[];
  systemArchitecture: {
    stage: string;
    detail: string;
  }[];
  importantNotice?: string;
  imageUrl: string;
  imageAlt: string;
  schematicType: 'fire-rover' | 'alcohol-sensor' | 'sentinel-robot';
  githubUrl?: string; // Leave undefined or empty until a real repository URL is added
}

export interface LearningCategory {
  id: string;
  title: string;
  summary: string;
  currentFocus: string;
  items: string[]; // Keep empty initially to avoid fabricating certificates or awards
}

export const PORTFOLIO_CONFIG = {
  personal: {
    name: 'Mohammad Afrar',
    initials: 'MA',
    title: 'Computer Science Engineering Student',
    tagline: 'Exploring technology. Building solutions. Turning ideas into reality.',
    heroIntro:
      "I'm a Computer Science Engineering student passionate about programming, software development, artificial intelligence, and innovative technology. I enjoy learning new concepts and turning ideas into practical projects.",
    aboutIntro:
      "I'm Mohammad Afrar, a Computer Science Engineering student interested in software development and emerging technologies. I enjoy exploring programming, solving problems, and developing projects that connect technology with real-world needs. My goal is to continuously improve my technical skills and gain practical experience through meaningful projects and internships.",
    personalStatement: 'Curious by nature. Passionate about technology. Always learning.',
    careerObjective: 'Showcase my skills and projects and get internship opportunities.',
  },

  aboutCards: [
    {
      id: 'education',
      label: 'Education',
      value: 'Computer Science Engineering Student',
      detail: 'Bachelor of Engineering (BE) — Currently pursuing',
    },
    {
      id: 'interests',
      label: 'Interests',
      value: 'Software Development · Artificial Intelligence · Web Development',
      detail: 'Exploring practical software systems, embedded hardware, and intelligent automation',
    },
    {
      id: 'career-goal',
      label: 'Career Goal',
      value: 'Software Developer and technology enthusiast',
      detail: 'Seeking software engineering and technology internship opportunities',
    },
  ],

  skills: [
    {
      id: 'c-lang',
      name: 'C',
      category: 'Programming Languages',
      shortSummary: 'Low-level systems programming, memory management, and microcontroller control logic.',
      whatItIsUsedFor:
        'Used for foundational computer science algorithms, understanding memory pointers and data structures, and programming hardware microcontrollers where deterministic execution is essential.',
      portfolioApplication:
        'Applied in writing sensor polling loops and hardware control logic for Arduino-based embedded prototypes.',
      codePreview: `// Sensor threshold check loop
int flameReading = analogRead(FLAME_SENSOR_PIN);
if (flameReading < FLAME_THRESHOLD) {
  stopChassisMotors();
  activateExtinguisherPump();
}`,
      relatedConcepts: ['Pointers & Memory', 'Structured Programming', 'Embedded I/O', 'Control Loops'],
    },
    {
      id: 'cpp-lang',
      name: 'C++',
      category: 'Programming Languages',
      shortSummary: 'Object-oriented programming, hardware abstraction, and Arduino embedded development.',
      whatItIsUsedFor:
        'Used for building modular software systems, object-oriented design, data structures, and controlling actuators, servo motors, and sensor arrays in Arduino C/C++ environments.',
      portfolioApplication:
        'Core language used in the Fire Detection and Extinguishing Vehicle and the Alcohol Detection System.',
      codePreview: `class FlameResponseUnit {
public:
  void sweepNozzle(Servo &nozzleServo) {
    for (int angle = 45; angle <= 135; angle += 15) {
      nozzleServo.write(angle);
    }
  }
};`,
      relatedConcepts: ['Object-Oriented Programming', 'Arduino API', 'Hardware Interfacing', 'Data Structures'],
    },
    {
      id: 'python-lang',
      name: 'Python',
      category: 'Programming Languages',
      shortSummary: 'Rapid prototyping, automation, artificial intelligence exploration, and problem solving.',
      whatItIsUsedFor:
        'Used for writing clean, expressive scripts, exploring artificial intelligence and computer vision workflows, and designing decision-making algorithms.',
      portfolioApplication:
        'Primary language under consideration for the SENTINEL intelligent emergency decision robot concept (route planning and hazard perception).',
      codePreview: `def evaluate_route_safety(hazard_readings: list[float], threshold: float) -> str:
    max_risk = max(hazard_readings, default=0.0)
    return "REROUTE_REQUIRED" if max_risk >= threshold else "PATH_CLEAR"`,
      relatedConcepts: ['Algorithmic Logic', 'AI & Computer Vision Exploration', 'Rapid Prototyping', 'Scripting'],
    },
    {
      id: 'java-lang',
      name: 'Java',
      category: 'Programming Languages',
      shortSummary: 'Object-oriented application architecture, platform-independent software, and core CS concepts.',
      whatItIsUsedFor:
        'Used for learning strict object-oriented architecture, class hierarchies, exception handling, and building structured, maintainable software applications.',
      portfolioApplication:
        'Used in coursework and software development exercises to strengthen object-oriented engineering fundamentals.',
      codePreview: `public class SensorTelemetry {
    private final String sensorId;
    public SensorTelemetry(String sensorId) {
        this.sensorId = sensorId;
    }
    public String getStatus(boolean triggered) {
        return sensorId + ": " + (triggered ? "ALERT" : "NOMINAL");
    }
}`,
      relatedConcepts: ['OOP Principles', 'Class Hierarchies', 'Type Safety', 'Modular Design'],
    },
    {
      id: 'html-web',
      name: 'HTML',
      category: 'Web Technologies',
      shortSummary: 'Semantic document architecture, accessible page structure, and web standards.',
      whatItIsUsedFor:
        'Used for structuring web interfaces with semantic landmarks, accessible forms, clear heading hierarchies, and screen-reader-friendly markup.',
      portfolioApplication:
        'Forms the structural foundation of web interfaces and documentation layouts.',
      codePreview: `<section aria-labelledby="projects-heading">
  <h2 id="projects-heading">Engineering Projects</h2>
  <article>
    <h3>Fire Detection Vehicle</h3>
  </article>
</section>`,
      relatedConcepts: ['Semantic Markup', 'Keyboard Accessibility', 'Document Structure', 'Web Standards'],
    },
    {
      id: 'css-web',
      name: 'CSS',
      category: 'Web Technologies',
      shortSummary: 'Responsive layouts, Flexbox and Grid systems, visual styling, and fluid UI transitions.',
      whatItIsUsedFor:
        'Used for crafting responsive multi-device layouts, dark and light color systems, typography scales, and subtle, accessible interface animations.',
      portfolioApplication:
        'Used to design clean, responsive user interfaces that adapt smoothly across mobile, tablet, and desktop viewports.',
      codePreview: `.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  gap: 1.5rem;
}`,
      relatedConcepts: ['CSS Grid & Flexbox', 'Responsive Breakpoints', 'Theme Variables', 'Visual Hierarchy'],
    },
  ] as SkillItem[],

  projects: [
    {
      id: 'fire-detection-vehicle',
      index: '01',
      title: 'Fire Detection and Extinguishing Vehicle',
      category: 'Hardware / Embedded Systems',
      filterGroup: 'hardware',
      status: 'Hardware Prototype',
      isConcept: false,
      shortDescription:
        'A fire detection and extinguishing vehicle designed to detect flames and activate a water pump to help extinguish a fire. The project combines sensors, motor control, and an Arduino-based system.',
      fullDescription:
        'A fire detection and extinguishing vehicle designed to detect flames and activate a water pump to help extinguish a fire. The project combines sensors, motor control, and an Arduino-based system to demonstrate how embedded hardware can respond autonomously to nearby flame signatures.',
      objectives: [
        'Detect nearby flame sources using infrared flame sensors mounted on the vehicle chassis.',
        'Coordinate DC motor driver outputs to navigate toward a detected flame and halt at a safe operating distance.',
        'Control a servo-mounted nozzle and mini water pump to direct water toward the detected flame source.',
      ],
      technologies: [
        'Arduino UNO',
        'C/C++ (Arduino programming)',
        'Flame sensors',
        'Motor driver',
        'Servo motor',
        'Water pump',
      ],
      featuresLabel: 'Key Features',
      features: [
        'Flame detection using sensors.',
        'Motor-controlled movement.',
        'Automatic stopping when a flame is detected.',
        'Servo-controlled water nozzle.',
        'Water pump activation for extinguishing.',
      ],
      systemArchitecture: [
        {
          stage: '01. Sensing Layer',
          detail: 'Flame sensors continuously monitor directional infrared light intensity ahead of the chassis.',
        },
        {
          stage: '02. Processing Unit',
          detail: 'Arduino UNO evaluates sensor inputs in C/C++ and determines movement and pump states.',
        },
        {
          stage: '03. Actuation & Suppression',
          detail: 'Motor driver halts the wheels upon detection while the servo aims the nozzle and triggers the water pump.',
        },
      ],
      imageUrl: fireVehicleImg,
      imageAlt: 'Illustration of a small Arduino-based fire detection and extinguishing vehicle with flame sensors and a water nozzle',
      schematicType: 'fire-rover',
      githubUrl: '', // Add real repository URL here when available
    },
    {
      id: 'alcohol-detection-system',
      index: '02',
      title: 'Alcohol Detection System',
      category: 'Embedded Systems / Safety Technology',
      filterGroup: 'hardware',
      status: 'Hardware Prototype',
      isConcept: false,
      shortDescription:
        'An alcohol detection system designed to detect alcohol in the surrounding air using a sensor and provide an indication when alcohol is detected.',
      fullDescription:
        'An alcohol detection system designed to detect alcohol in the surrounding air using a sensor and provide an indication when alcohol is detected. Built around an Arduino microcontroller and an alcohol gas sensor module, this educational prototype demonstrates real-time analog sensor reading and threshold-based alert triggering.',
      objectives: [
        'Sample surrounding air continuously using an alcohol gas sensor interfaced with an Arduino board.',
        'Process analog/digital sensor readings in C/C++ and compare values against a configurable threshold.',
        'Trigger a clear visual or audible alert indication whenever the configured threshold is reached.',
      ],
      technologies: [
        'Arduino',
        'C/C++',
        'Alcohol sensor',
        'Electronic components',
      ],
      featuresLabel: 'Key Features',
      features: [
        'Alcohol detection using a sensor.',
        'Processing sensor readings.',
        'Visual or audible alert when the configured threshold is reached.',
      ],
      systemArchitecture: [
        {
          stage: '01. Vapor Sampling',
          detail: 'Alcohol sensor detects the presence of alcohol vapor in the immediate surrounding air.',
        },
        {
          stage: '02. Signal Evaluation',
          detail: 'Arduino microcontroller reads the sensor output and compares it against a configured threshold.',
        },
        {
          stage: '03. Alert Indication',
          detail: 'Activates an indicator LED or buzzer alert when the threshold is exceeded.',
        },
      ],
      importantNotice:
        'Educational Prototype Note: This system is an academic embedded demonstration designed to detect alcohol vapor in surrounding air. It does not measure blood alcohol concentration (BAC) and is not certified for real-world safety or regulatory use.',
      imageUrl: alcoholSensorImg,
      imageAlt: 'Technical illustration of an Arduino sensor-based alcohol detection system',
      schematicType: 'alcohol-sensor',
      githubUrl: '', // Add real repository URL here when available
    },
    {
      id: 'sentinel-emergency-robot',
      index: '03',
      title: 'SENTINEL — An Intelligent Emergency Decision Robot',
      category: 'Future Project / Research Concept',
      filterGroup: 'concept',
      status: 'Concept / Planned Project',
      isConcept: true,
      shortDescription:
        'SENTINEL is a proposed intelligent emergency decision system designed to support disaster response. The concept explores hazard sensing, possible human detection, mapping explored areas, and selecting safer routes.',
      fullDescription:
        'SENTINEL is a proposed intelligent emergency decision system designed to support disaster response. The concept explores hazard sensing, possible human detection, mapping explored areas, and selecting safer routes. This project represents a planned research direction combining robotics, environmental sensors, and AI-assisted decision making.',
      objectives: [
        'Explore how multi-sensor fusion can identify environmental hazards in disaster scenarios.',
        'Investigate computer vision and sensor techniques for possible human detection in low-visibility areas.',
        'Design risk-aware route planning logic that maps explored locations and recommends safer paths.',
      ],
      technologies: [
        'Python',
        'Artificial Intelligence',
        'Computer Vision',
        'Sensors',
        'Robotics',
      ],
      featuresLabel: 'Potential Features (Concept)',
      features: [
        'Environmental hazard sensing.',
        'Possible human detection.',
        'Mapping explored locations.',
        'Risk-aware route planning.',
        'Potential AI and computer vision integration.',
      ],
      systemArchitecture: [
        {
          stage: '01. Multi-Modal Perception (Proposed)',
          detail: 'Environmental hazard sensors and vision inputs gather situational data from the surroundings.',
        },
        {
          stage: '02. Spatial Mapping & Analysis (Proposed)',
          detail: 'Software logic records explored zones and evaluates localized hazard levels.',
        },
        {
          stage: '03. Decision Support & Routing (Proposed)',
          detail: 'Selects safer traversal routes and highlights potential human presence for emergency teams.',
        },
      ],
      importantNotice:
        'Project Status — Research Concept: SENTINEL is a proposed concept and planned future project, not a completed hardware or software build.',
      imageUrl: sentinelRobotImg,
      imageAlt: 'Futuristic illustration of SENTINEL, a proposed disaster-response and emergency decision robot concept',
      schematicType: 'sentinel-robot',
      githubUrl: '', // Add real repository URL here when available
    },
  ] as ProjectItem[],

  education: {
    degree: 'Bachelor of Engineering (BE)',
    field: 'Computer Science Engineering',
    institution: 'Add institution name later',
    status: 'Currently pursuing',
    description:
      'Focusing on core computer science fundamentals, programming languages (C, C++, Python, Java), web technologies, and hands-on embedded hardware projects.',
  },

  learningAndDevelopment: {
    bannerMessage: 'Currently learning, experimenting, and building my technical foundation.',
    subtitle:
      'This section tracks my ongoing coursework, technical workshops, and personal engineering milestones as I progress through my Computer Science Engineering studies.',
    categories: [
      {
        id: 'courses',
        title: 'Technical Courses',
        summary: 'Core Computer Science Engineering coursework and self-paced programming study.',
        currentFocus: 'Strengthening foundations in data structures, object-oriented programming, and web development.',
        items: [],
      },
      {
        id: 'certifications',
        title: 'Certifications',
        summary: 'Verified technical certifications and completed training programs.',
        currentFocus: 'Placeholder ready — completed certifications will be listed here as they are earned.',
        items: [],
      },
      {
        id: 'hackathons',
        title: 'Hackathons',
        summary: 'Collaborative coding events, hardware buildathons, and problem-solving competitions.',
        currentFocus: 'Placeholder ready — future hackathon participations and team builds will be documented here.',
        items: [],
      },
      {
        id: 'workshops',
        title: 'Workshops',
        summary: 'Hands-on technical seminars in embedded systems, robotics, AI, and software tools.',
        currentFocus: 'Exploring practical hardware interfacing and modern software development workflows.',
        items: [],
      },
      {
        id: 'academic',
        title: 'Academic Achievements',
        summary: 'University milestones, project exhibitions, and academic recognitions.',
        currentFocus: 'Placeholder ready — academic milestones can be added in src/data/portfolioData.ts.',
        items: [],
      },
      {
        id: 'milestones',
        title: 'Personal Learning Milestones',
        summary: 'Self-driven hardware prototypes, programming practice, and research concepts.',
        currentFocus: 'Built Arduino-based Fire Detection and Alcohol Detection prototypes; formulating the SENTINEL concept.',
        items: [],
      },
    ] as LearningCategory[],
  },

  contactAndSocial: {
    // Replace these placeholders in src/data/portfolioData.ts with your live links
    emailPlaceholder: 'your.email@example.com',
    isEmailConfigured: false,
    githubPlaceholder: 'https://github.com/your-username',
    githubUrl: '', // Set your real GitHub URL here, e.g. 'https://github.com/mohammadafrar'
    linkedinPlaceholder: 'https://linkedin.com/in/your-profile',
    linkedinUrl: '', // Set your real LinkedIn URL here, e.g. 'https://linkedin.com/in/mohammadafrar'
    locationPlaceholder: 'Add location (City, Country)',
    location: '', // Set your location here if desired
    formBackendConfigured: false,
  },

  resume: {
    filePath: '/resume.pdf',
    isFileAvailable: false, // Change to true once /public/resume.pdf is added to the project
    unavailableMessage:
      'The downloadable PDF resume will be added soon. You can update the resume file at /public/resume.pdf and enable it in src/data/portfolioData.ts.',
  },
};
