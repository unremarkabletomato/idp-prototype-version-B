export const mockProfile = {
  name: "Wong Beng Hwa",
  email: "wong.benghwa@university.edu.sg",
  degree: "Bachelor of Software Engineering",
  university: "Singapore Management University",
  year: "Final Year",
  gpa: "3.8/4.0",
  skills: [],
  interests: [],
  githubUrl: "",
  resume: null,
  personalityTraits: {
    teamwork: 4,
    independence: 5,
    innovation: 5,
    structure: 3,
    communication: 4
  },
  completionStatus: {
    resume: false,
    basicInfo: false,
    skills: false,
    quiz: false
  }
};

export const quizQuestions = [
  {
    id: 1,
    question: "I prefer working in teams rather than independently",
    trait: "teamwork",
    min: "Strongly Disagree",
    max: "Strongly Agree"
  },
  {
    id: 2,
    question: "I enjoy taking initiative and leading projects",
    trait: "independence",
    min: "Strongly Disagree",
    max: "Strongly Agree"
  },
  {
    id: 3,
    question: "I like experimenting with new technologies and creative solutions",
    trait: "innovation",
    min: "Strongly Disagree",
    max: "Strongly Agree"
  },
  {
    id: 4,
    question: "I prefer structured tasks with clear guidelines over ambiguous projects",
    trait: "structure",
    min: "Strongly Disagree",
    max: "Strongly Agree"
  },
  {
    id: 5,
    question: "I feel confident presenting ideas and communicating with stakeholders",
    trait: "communication",
    min: "Strongly Disagree",
    max: "Strongly Agree"
  }
];

export const skillOptions = [
  "JavaScript", "Python", "Java", "C++", "C#",
  "React", "Angular", "Vue.js", "Node.js", "Express",
  "Spring Boot", "Django", "Flask", "Ruby on Rails",
  "SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis",
  "Git", "Docker", "Kubernetes", "AWS", "Azure",
  "HTML/CSS", "TypeScript", "REST APIs", "GraphQL",
  "TensorFlow", "PyTorch", "Machine Learning", "Data Analysis",
  "UI/UX Design", "Agile", "Scrum", "Testing", "CI/CD"
];

export const interestOptions = [
  "Web Development", "Mobile Development", "Backend Systems",
  "Frontend Design", "Full-Stack Development", "DevOps",
  "Machine Learning", "Artificial Intelligence", "Data Science",
  "Cloud Computing", "Cybersecurity", "Game Development",
  "Blockchain", "IoT", "AR/VR", "Embedded Systems"
];
