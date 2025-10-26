# Joblense AI - Internship Matching Platform

A modern, AI-powered web application prototype for matching university students with internship opportunities based on their skills, personality, and career interests.

## 🎯 Features

### Landing Page
- Clean, minimalist interface with modern typography
- Brief introduction to Joblense AI
- CTA buttons for getting started
- Mock sign-in modal

### Profile Setup
- Multi-step form with progress indicator
- Resume upload (mock)
- Basic information input (name, degree, skills, GitHub)
- 5-question personality quiz with Likert scale sliders
- Skills and interests selection

### Match Dashboard
- Tinder-style swipe interface for job cards
- Each card displays:
  - Company name and logo
  - Role and duration
  - Expected salary range
  - Match score percentage
  - Job description
  - "Reason for Match" explanation
- Swipe right to apply, left to skip
- Dynamic Skill Gap Visualizer with:
  - Bar chart showing skill-by-skill breakdown
  - Radar chart for skill categories
  - Improvement suggestions with potential score boosts

### Applications Dashboard
- Grid view of all applied jobs
- Status badges (Applied, Pending, Matched, Rejected)
- Auto-generated resume preview modal
- Application statistics

### Feedback & Recalibration
- Reorder top skills (priority matters)
- Add/remove skills and interests
- Real-time impact prediction
- Re-calculate and re-render job recommendations

## 🎨 Tech Stack

- **Framework**: Next.js 14 with React 18
- **Styling**: TailwindCSS with custom animations
- **State Management**: Zustand
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: React Icons & Lucide React

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🧩 Project Structure

```
/src
  /components
    MatchCard.jsx          - Job card with swipe functionality
    SkillVisualizer.jsx    - Charts for skill gap analysis
    ResumeModal.jsx        - Auto-generated resume preview
    SwipeButtons.jsx       - Swipe action buttons
    Navbar.jsx            - Navigation bar with theme toggle
    ProgressBar.jsx       - Reusable progress indicator
  /pages
    Landing.jsx           - Landing page
    ProfileSetup.jsx      - Multi-step profile creation
    MatchDashboard.jsx    - Main job matching interface
    Applications.jsx      - Applied jobs dashboard
    FeedbackRecalibration.jsx - Profile editing and recalibration
    index.js              - Entry point
    _app.js               - App wrapper with theme support
    _document.js          - Document configuration
  /data
    mockJobs.js           - Mock job data
    mockProfile.js        - Mock user profile data
  /store
    useStore.js           - Zustand state management
  /styles
    globals.css           - Global styles and Tailwind
```

## 🎭 User Scenarios

### Scenario 1: Complete Profile → Accurate Matches
1. User uploads resume
2. Fills in all profile details
3. Completes skills selection (e.g., Java, Python, React)
4. Takes personality quiz
5. Receives high-quality matches:
   - **FinTech Corporation** (91% match)
   - **Apples Inc.** (73% match)
   - **AI Innovations Lab** (85% match)

### Scenario 2: Incomplete Profile → Poor Matches → Recalibration
1. User skips resume upload
2. Provides minimal information
3. Receives poor matches:
   - Data Entry Clerk (35% match)
   - Marketing Assistant (28% match)
4. User recalibrates profile with complete skills
5. Receives improved matches with higher scores

## 🎨 UI Features

- **Light/Dark Mode**: Toggle between themes
- **Responsive Design**: Works on desktop and mobile
- **Glassmorphism**: Modern UI aesthetic
- **Smooth Animations**: Framer Motion transitions
- **Interactive Charts**: Recharts visualizations
- **Swipe Gestures**: Touch and drag support

## 🔧 Mock Data

The application uses mock data to simulate:
- API calls with `setTimeout`
- Job matching algorithm
- Resume generation
- Skill gap analysis
- Profile completion tracking

## 📊 Key Components

### MatchCard
- Displays job information in card format
- Drag/swipe functionality
- Visual feedback for swipe direction
- Match score with color coding

### SkillVisualizer
- Bar chart for individual skills
- Radar chart for skill categories
- Gap analysis with matched/missing skills
- Improvement suggestions with score boost predictions

### ResumeModal
- Auto-generated resume based on profile
- Tailored to specific job application
- Download functionality (mock)
- Professional formatting

## 🚀 Future Enhancements

- Real backend integration
- User authentication
- Company dashboard
- Interview scheduling
- Notification system
- Mobile app version
- AI-powered resume analysis
- Career path recommendations

## 👨‍💻 Development

Built with modern web technologies and best practices:
- Component-based architecture
- Centralized state management
- Mock data for rapid prototyping
- Reusable UI components
- Responsive design principles
- Accessibility considerations

## 📝 License

This is a prototype project for demonstration purposes.

---

Built with ❤️ for Wong Beng Hwa and fellow students seeking their perfect internship match!
