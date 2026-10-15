// Preview content is kept separate from saved portfolio data.
export const previewPortfolio = {
  website_name: "Portfolio",
  hero_title: "AI/ML & Software Developer",
  hero_subtitle: "Building efficient, scalable systems.",
  about_title: "About Me",
  about_content:
    "Passionate about bridging the gap between complex backend logic and beautiful frontend interfaces.",
  journey_title: "My Journey",
  journey_content:
    "Starting as a curious builder, I've evolved into a systems thinker. I focus on creating software that matters, paying equal attention to code quality and user experience.",
  journey_technologies: "React, TypeScript, Node.js, AWS, Docker, PostgreSQL",
};
export const previewContact = {
  email: "savanthhemanth@gmail.com",
  phone: "+91 7349599759",
  location: "Bengaluru, Whitefield",
};
export const previewSkills = [
  { id: "preview-ai", name: "Python", category: "aiml" as const },
  { id: "preview-ui", name: "TypeScript", category: "frontend" as const },
  { id: "preview-server", name: "Node.js", category: "backend" as const },
  { id: "preview-framework", name: "React", category: "framework" as const },
  { id: "preview-db", name: "PostgreSQL", category: "database" as const },
  { id: "preview-tools", name: "Docker", category: "tools" as const },
];
export const previewProjects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "Modern e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, cart management, and payment processing.",
    image_url: "/placeholder.svg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "Collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image_url: "/placeholder.svg",
    technologies: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
  },
  {
    id: "3",
    title: "AI-Powered Analytics",
    description:
      "Data analytics dashboard with machine learning insights, interactive charts, and predictive analysis capabilities.",
    image_url: "/placeholder.svg",
    technologies: ["Python", "Django", "TensorFlow", "D3.js"],
  },
  {
    id: "4",
    title: "Mobile Banking App",
    description:
      "Secure mobile banking application with biometric authentication, transaction history, and financial planning tools.",
    image_url: "/placeholder.svg",
    technologies: ["React Native", "Firebase", "Redux", "Expo"],
  },
];
