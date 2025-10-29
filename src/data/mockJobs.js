export const mockJobs = [
  {
    id: 1,
    company: "FinTech Corporation",
    role: "Software Developer Intern",
    duration: "6 Months",
    salary: "$1,600–$1,900",
    matchScore: 91,
    description: "Work on backend systems, API development, and database optimization. Join our innovative team building next-gen financial solutions.",
    reason: "Strong alignment with backend dev experience and hackathon projects.",
    requiredSkills: ["Java", "Spring Boot", "SQL", "REST APIs", "Git"],
    location: "Singapore",
    type: "Internship",
    logo: "🏦"
  },
  {
    id: 2,
    company: "Apples Inc.",
    role: "Full-Stack Developer Intern",
    duration: "4 Months",
    salary: "$1,700–$1,900",
    matchScore: 73,
    description: "Develop web applications using React and Node.js. Collaborate with designers to create beautiful user experiences.",
    reason: "Front-end emphasis complements user's design interests.",
    requiredSkills: ["React", "Node.js", "JavaScript", "CSS", "MongoDB"],
    location: "Remote",
    type: "Internship",
    logo: "🍎"
  },
  {
    id: 3,
    company: "CloudTech Solutions",
    role: "DevOps Engineer Intern",
    duration: "5 Months",
    salary: "$1,500–$1,800",
    matchScore: 68,
    description: "Learn cloud infrastructure management, CI/CD pipelines, and container orchestration with Kubernetes.",
    reason: "Your interest in system architecture aligns with our DevOps culture.",
    requiredSkills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
    location: "Singapore",
    type: "Internship",
    logo: "☁️"
  },
  {
    id: 4,
    company: "AI Innovations Lab",
    role: "Machine Learning Intern",
    duration: "6 Months",
    salary: "$1,800–$2,200",
    matchScore: 85,
    description: "Work on cutting-edge ML models for natural language processing and computer vision applications.",
    reason: "Strong Python background and AI coursework match our requirements perfectly.",
    requiredSkills: ["Python", "TensorFlow", "PyTorch", "Data Analysis", "Math"],
    location: "Hybrid",
    type: "Internship",
    logo: "🤖"
  },
  {
    id: 5,
    company: "GameDev Studios",
    role: "Game Developer Intern",
    duration: "3 Months",
    salary: "$1,400–$1,600",
    matchScore: 62,
    description: "Create engaging game mechanics and optimize performance for mobile gaming platforms.",
    reason: "Your hackathon experience shows creativity that fits game development.",
    requiredSkills: ["Unity", "C#", "Game Design", "3D Graphics", "Problem Solving"],
    location: "Singapore",
    type: "Internship",
    logo: "🎮"
  },
  {
    id: 6,
    company: "CyberSec Corp",
    role: "Security Analyst Intern",
    duration: "4 Months",
    salary: "$1,600–$1,900",
    matchScore: 70,
    description: "Learn about penetration testing, vulnerability assessment, and security best practices.",
    reason: "Your networking knowledge and attention to detail suit security work.",
    requiredSkills: ["Network Security", "Python", "Linux", "Cryptography", "Ethical Hacking"],
    location: "Singapore",
    type: "Internship",
    logo: "🔒"
  },
  {
    id: 7,
    company: "DataInsight Analytics",
    role: "Data Engineer Intern",
    duration: "5 Months",
    salary: "$1,700–$2,000",
    matchScore: 78,
    description: "Build data pipelines, work with big data technologies, and create insightful visualizations.",
    reason: "SQL expertise and analytical thinking make you a great fit for data engineering.",
    requiredSkills: ["Python", "SQL", "Apache Spark", "Data Warehousing", "ETL"],
    location: "Remote",
    type: "Internship",
    logo: "📊"
  },
  {
    id: 8,
    company: "MobileTech Startups",
    role: "Mobile Developer Intern",
    duration: "4 Months",
    salary: "$1,500–$1,700",
    matchScore: 65,
    description: "Develop native mobile applications for iOS and Android platforms using modern frameworks.",
    reason: "Your interest in UI/UX translates well to mobile app development.",
    requiredSkills: ["React Native", "Flutter", "Mobile UI", "API Integration", "Git"],
    location: "Hybrid",
    type: "Internship",
    logo: "📱"
  }
  ,
  {
    id: 9,
    company: "Apples Inc.",
    role: "Full-Stack Developer Intern",
    duration: "4 Months",
    salary: "SGD$1,700 - $1,900 /month",
    matchScore: 73,
    description: "A regional e-commerce platform aiming to expand its online retail services. Work with cross-functional teams to deliver end-to-end web application features.",
    reason: "While this role emphasises front-end development and collaboration across teams, it remains relevant to your full-stack capabilities and interest in technology and design trends. The position offers hands-on experience with user-facing web applications and e-commerce solutions, helping to broaden your skill set, even if it does not fully leverage your backend expertise or hackathon experience. The lower match score reflects these partial overlaps in tech interests and project experiences, but the role still supports career growth and portfolio development.",
    requiredSkills: ["React", "Node.js", "JavaScript", "CSS", "E-commerce"],
    location: "Singapore",
    type: "Internship",
    logo: "🍎"
  }
];

// Poor match jobs for incomplete profile scenario
export const poorMatchJobs = [
  {
    id: 101,
    company: "Admin Solutions Ltd",
    role: "Data Entry Clerk",
    duration: "3 Months",
    salary: "$1,200–$1,400",
    matchScore: 35,
    description: "Input data into spreadsheets and maintain database records. Basic computer skills required.",
    reason: "Limited profile information leads to basic role matching.",
    requiredSkills: ["Excel", "Data Entry", "Attention to Detail", "Typing", "Organization"],
    location: "Singapore",
    type: "Internship",
    logo: "📋"
  },
  {
    id: 102,
    company: "Marketing Plus Agency",
    role: "Marketing Assistant",
    duration: "4 Months",
    salary: "$1,300–$1,500",
    matchScore: 28,
    description: "Assist with social media management and content creation. No technical background needed.",
    reason: "Insufficient technical profile data resulted in non-technical matching.",
    requiredSkills: ["Social Media", "Communication", "Content Writing", "Marketing", "Creativity"],
    location: "Singapore",
    type: "Internship",
    logo: "📢"
  },
  {
    id: 103,
    company: "Retail Corp",
    role: "Customer Service Intern",
    duration: "3 Months",
    salary: "$1,100–$1,300",
    matchScore: 22,
    description: "Handle customer inquiries and provide support via phone and email.",
    reason: "Profile lacks specific technical skills for better matching.",
    requiredSkills: ["Communication", "Customer Service", "Problem Solving", "Patience", "Teamwork"],
    location: "Singapore",
    type: "Internship",
    logo: "🛍️"
  }
];

export const getJobsByProfile = (isComplete) => {
  return isComplete ? mockJobs : poorMatchJobs;
};
