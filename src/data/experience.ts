export type Job = {
  company: string;
  role: string;
  duration: string;
  current: boolean;
  highlights: string[];
  tech: string[];
};

export const experience: Job[] = [
  {
    company: "Validat Limited",
    role: "Software Engineer",
    duration: "April 2026 - Present",
    current: true,
    highlights: [
      "Designed and developed secure, scalable banking and crypto transaction modules using .NET, supporting onboarding, fiat currency processing, and seamless on-ramp/off-ramp operations.",
      "Built dynamic and responsive user interfaces using React.js, improving user experience for account onboarding, transaction flows, and real-time financial interactions.",
      "Developed and integrated RESTful APIs with .NET for crypto transactions, ensuring secure communication between frontend and backend while optimizing performance and reliability of financial operations.",
    ],
    tech: [".NET", "React", "REST APIs", "Crypto On/Off-Ramp", "Fiat Payments"],
  },
  {
    company: "Advance Web Software",
    role: "Software Engineer",
    duration: "July 2024 - March 2026",
    current: false,
    highlights: [
      "Designed and developed scalable .NET services for a real-time code execution platform, supporting 1.6 million+ concurrent users.",
      "Developed and maintained the front-end architecture using Angular, delivering dynamic, responsive UI components while adhering to best practices for performance and code maintainability.",
      "Collaborated with cross-functional teams to integrate front-end features with SQL-based back-end systems, ensuring seamless communication between client and server-side components.",
      "Developed RESTful APIs using .NET to manage code submission and result retrieval, integrated with AngularJS on the frontend.",
      "Optimized data retrieval performance by 20% by restructuring complex queries with Entity Framework and LINQ, reducing API response times from 1.2s to 700ms on average in high-traffic endpoints.",
      "Built a real-time chat interaction system between users using AngularJS and Firebase.",
      "Added a bulk upload feature which reduced the manual work of adding products into the database.",
      "Enhanced a sports data monitoring application using WPF, providing live visualization and reporting of real-time game statistics.",
    ],
    tech: [".NET", "C#", "Angular", "AngularJS", "SQL Server", "Entity Framework", "LINQ", "Firebase", "WPF"],
  },
  {
    company: "Adrixus Tech Studio",
    role: "Full Stack Developer",
    duration: "Dec 2023 - July 2024",
    current: false,
    highlights: [
      "Utilized React Js principles to support improved component lifecycle practices and increase turnaround speed while adhering to deadlines; communicated with teams and management to respond to changing requirements.",
      "Expanded the applicability of isomorphic React Js and Node Js to the website and presented novel concepts in a technical report to the Full Development Team.",
      "Developed and managed the frontend of an e-commerce platform using React Js & Ant Design.",
      "Improved response time by 20% by refactoring the codebase and redesigning the database schema and queries.",
      "Worked on three web applications targeting customers, selling vendors, and admin users; built 30+ GraphQL APIs covering login/sign up, product viewing, cart, and checkout flows.",
    ],
    tech: ["React", "Node.js", "GraphQL", "Ant Design", "E-commerce"],
  },
];
