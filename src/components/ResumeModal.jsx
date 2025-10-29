import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload, FiFileText, FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';

const ResumeModal = ({ isOpen, onClose, profile, job }) => {
  if (!isOpen) return null;

  const generateResumeContent = () => {
    return {
      personalInfo: {
        name: profile.name || "Wong Beng Hwa",
        email: profile.email || "wong.benghwa@university.edu.sg",
        phone: "+65 9123 4567",
        location: "Singapore",
        github: profile.githubUrl || "github.com/wongbenghwa",
        linkedin: "linkedin.com/in/wongbenghwa"
      },
      education: {
        degree: profile.degree || "Bachelor of Computer Science",
        university: profile.university || "National University of Singapore",
        year: profile.year || "Final Year",
        gpa: profile.gpa || "3.3/4.0"
      },
      skills: profile.skills || ["JavaScript", "Python", "React", "Node.js"],
      experience: [
        {
          title: "Software Development Intern",
          company: "Tech Startup Singapore",
          period: "Jun 2024 - Aug 2024",
          description: [
            "Developed and maintained web applications using React and Node.js",
            "Collaborated with team to implement new features and fix bugs",
            "Improved application performance by 30% through optimization"
          ]
        },
        {
          title: "Hackathon Winner",
          event: "Singapore Tech Hackathon 2024",
          period: "Mar 2024",
          description: [
            "Led team of 4 to build an AI-powered productivity app",
            "Won 1st place among 50+ participating teams",
            "Implemented machine learning model for task prioritization"
          ]
        }
      ],
      projects: [
        {
          name: "E-Commerce Platform",
          tech: "React, Node.js, MongoDB",
          description: "Full-stack e-commerce application with payment integration and user authentication"
        },
        {
          name: "Task Management App",
          tech: "Next.js, TypeScript, PostgreSQL",
          description: "Collaborative task management tool with real-time updates"
        }
      ]
    };
  };

  const resume = generateResumeContent();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <FiFileText size={32} />
                    <div>
                      <h2 className="text-2xl font-bold">Auto-Generated Resume</h2>
                      <p className="text-sm text-white/90">
                        {job ? `Tailored for ${job.company} - ${job.role}` : 'General Resume'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              {/* Resume Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-8 bg-gray-50 dark:bg-gray-900">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
                  {/* Personal Info */}
                  <div className="text-center mb-8 pb-6 border-b-2 border-gray-200 dark:border-gray-700">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {resume.personalInfo.name}
                    </h1>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700 dark:text-gray-300 mt-4">
                      <div className="flex items-center space-x-1">
                        <FiMail size={16} />
                        <span className="text-gray-700 dark:text-gray-300">{resume.personalInfo.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiPhone size={16} />
                        <span className="text-gray-700 dark:text-gray-300">{resume.personalInfo.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiMapPin size={16} />
                        <span className="text-gray-700 dark:text-gray-300">{resume.personalInfo.location}</span>
                      </div>
                    </div>
                    <div className="flex justify-center gap-4 text-sm text-blue-600 dark:text-blue-400 mt-3">
                      <div className="flex items-center space-x-1">
                        <FiGithub size={16} />
                        <span className="text-gray-700 dark:text-gray-300">{resume.personalInfo.github}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiLinkedin size={16} />
                        <span className="text-gray-700 dark:text-gray-300">{resume.personalInfo.linkedin}</span>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-300 dark:border-gray-600">
                      EDUCATION
                    </h3>
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {resume.education.university}
                        </h4>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {resume.education.year}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{resume.education.degree}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">GPA: {resume.education.gpa}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-300 dark:border-gray-600">
                      SKILLS
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {resume.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-300 dark:border-gray-600">
                      EXPERIENCE
                    </h3>
                    <div className="space-y-4">
                      {resume.experience.map((exp, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {exp.title}
                              </h4>
                              <p className="text-gray-700 dark:text-gray-300">
                                {exp.company || exp.event}
                              </p>
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {exp.period}
                            </span>
                          </div>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-2">
                            {exp.description.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-300 dark:border-gray-600">
                      PROJECTS
                    </h3>
                    <div className="space-y-3">
                      {resume.projects.map((project, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {project.name}
                            </h4>
                            <span className="text-sm text-gray-700 dark:text-gray-300 italic">
                              {project.tech}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {project.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Generated Note */}
                  {job && (
                    <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <p className="text-sm text-blue-900 dark:text-blue-100">
                        <span className="font-semibold">✨ AI-Optimized:</span> This resume has been
                        automatically tailored to highlight relevant skills and experiences for the{' '}
                        {job.role} position at {job.company}.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => alert('Download functionality would be implemented with a PDF generator')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <FiDownload />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
