# Component Documentation

## 🧩 Core Components

### MatchCard
**Location**: `/src/components/MatchCard.jsx`

**Purpose**: Displays job information in a swipeable card format

**Props**:
- `job` (object): Job data including company, role, salary, matchScore, etc.
- `onSwipeLeft` (function): Callback when user swipes/clicks left
- `onSwipeRight` (function): Callback when user swipes/clicks right
- `showControls` (boolean): Whether to show swipe buttons (default: true)

**Features**:
- Drag/swipe gesture detection
- Animated exit on swipe
- Color-coded match scores
- Responsive design

---

### SkillVisualizer
**Location**: `/src/components/SkillVisualizer.jsx`

**Purpose**: Visualizes skill gaps and provides improvement suggestions

**Props**:
- `job` (object): Current job with requiredSkills array
- `userSkills` (array): User's current skill list

**Features**:
- Bar chart showing skill-by-skill breakdown
- Radar chart for skill categories
- Matched skills vs gaps calculation
- Improvement suggestions with score boosts
- Responsive Recharts integration

---

### ResumeModal
**Location**: `/src/components/ResumeModal.jsx`

**Purpose**: Displays auto-generated resume in modal overlay

**Props**:
- `isOpen` (boolean): Controls modal visibility
- `onClose` (function): Callback to close modal
- `profile` (object): User profile data
- `job` (object): Job the resume is tailored for

**Features**:
- Professional resume layout
- Animated entrance/exit
- Backdrop blur effect
- Mock download functionality
- Job-specific tailoring note

---

### SwipeButtons
**Location**: `/src/components/SwipeButtons.jsx`

**Purpose**: Action buttons for job card swiping

**Props**:
- `onLeft` (function): Callback for left/skip action
- `onRight` (function): Callback for right/apply action
- `disabled` (boolean): Disable buttons when no job available

**Features**:
- Animated hover/tap effects
- Visual disabled state
- Gradient backgrounds

---

### Navbar
**Location**: `/src/components/Navbar.jsx`

**Purpose**: Top navigation bar with branding and theme toggle

**Features**:
- Joblense AI branding
- User profile display (when logged in)
- Dark/light mode toggle
- Sticky positioning
- Glassmorphism backdrop

---

### ProgressBar
**Location**: `/src/components/ProgressBar.jsx`

**Purpose**: Reusable progress indicator

**Props**:
- `value` (number): Current progress value
- `max` (number): Maximum value (default: 100)
- `color` (string): Color theme (blue, green, red, yellow, purple)
- `label` (string): Optional label text
- `showPercentage` (boolean): Show percentage text (default: true)

**Features**:
- Smooth animation
- Multiple color options
- Percentage calculation

---

## 📄 Pages

### Landing.jsx
**Route**: `/`

**Purpose**: Application landing page with intro and CTAs

**Features**:
- Hero section with animated logo
- Feature grid
- Statistics display
- Mock sign-in modal
- CTA buttons leading to profile setup

---

### ProfileSetup.jsx
**Route**: `/profile-setup`

**Purpose**: Multi-step profile creation wizard

**Steps**:
1. Resume Upload
2. Basic Information
3. Skills & Interests
4. Personality Quiz

**Features**:
- Progress stepper
- Form validation
- State persistence
- Step-by-step animations
- Completion tracking

---

### MatchDashboard.jsx
**Route**: `/match-dashboard`

**Purpose**: Main job matching interface with swipe cards

**Features**:
- Current job card display
- Swipe gesture handling
- Statistics cards (available, applied, skipped)
- Skill gap visualizer toggle
- Progress bar for reviewed jobs
- Quick action buttons
- Empty state for no more jobs

---

### Applications.jsx
**Route**: `/applications`

**Purpose**: Dashboard for all applied jobs

**Features**:
- Status filter tabs
- Job cards in grid layout
- Status badges with icons
- Application statistics
- Resume modal integration
- Empty state handling

---

### FeedbackRecalibration.jsx
**Route**: `/feedback-recalibration`

**Purpose**: Profile editing and job recalibration

**Features**:
- Skill reordering (priority system)
- Add/remove skills and interests
- Edit mode toggle
- Profile completeness indicator
- Impact prediction display
- Recalculation trigger

---

## 🗂️ Data Files

### mockJobs.js
**Location**: `/src/data/mockJobs.js`

**Exports**:
- `mockJobs`: Array of high-quality job matches (complete profile)
- `poorMatchJobs`: Array of poor matches (incomplete profile)
- `getJobsByProfile(isComplete)`: Returns appropriate job list

**Job Object Structure**:
```javascript
{
  id: number,
  company: string,
  role: string,
  duration: string,
  salary: string,
  matchScore: number,
  description: string,
  reason: string,
  requiredSkills: string[],
  location: string,
  type: string,
  logo: string (emoji)
}
```

---

### mockProfile.js
**Location**: `/src/data/mockProfile.js`

**Exports**:
- `mockProfile`: Default user profile object
- `quizQuestions`: Array of personality quiz questions
- `skillOptions`: Available technical skills
- `interestOptions`: Career interest options

**Profile Structure**:
```javascript
{
  name: string,
  email: string,
  degree: string,
  university: string,
  year: string,
  gpa: string,
  skills: string[],
  interests: string[],
  githubUrl: string,
  resume: File | null,
  personalityTraits: {
    teamwork: number (1-5),
    independence: number (1-5),
    innovation: number (1-5),
    structure: number (1-5),
    communication: number (1-5)
  },
  completionStatus: {
    resume: boolean,
    basicInfo: boolean,
    skills: boolean,
    quiz: boolean
  }
}
```

---

## 🏪 State Management (Zustand)

### useStore
**Location**: `/src/store/useStore.js`

**State**:
- `darkMode`: boolean
- `profile`: object
- `availableJobs`: array
- `currentJobIndex`: number
- `appliedJobs`: array
- `skippedJobs`: array

**Actions**:
- `toggleDarkMode()`: Toggle theme
- `updateProfile(updates)`: Merge profile updates
- `updateCompletionStatus(section, isComplete)`: Update profile completion
- `isProfileComplete()`: Check if profile is fully complete
- `recalculateJobs()`: Refresh job list based on profile
- `getCurrentJob()`: Get current unprocessed job
- `applyToJob(job)`: Add job to applied list
- `skipJob(job)`: Add job to skipped list
- `updateApplicationStatus(jobId, status)`: Change application status
- `resetMatches()`: Clear applied/skipped for recalibration
- `getSkillGaps(job)`: Calculate skill gaps for a job
- `getImprovementSuggestions(gaps)`: Generate suggestions

---

## 🎨 Styling

### TailwindCSS Classes
All components use Tailwind utility classes with custom extensions:

**Custom Colors**:
- `primary-*`: Blue shades (50-900)

**Custom Animations**:
- `animate-fade-in`: Fade in effect
- `animate-slide-up`: Slide up from bottom
- `animate-swipe-right`: Card swipe right exit
- `animate-swipe-left`: Card swipe left exit

**Dark Mode**:
- All components support dark mode via `dark:` prefix
- Theme state managed in Zustand store
- Applied to root HTML element

---

## 🔌 External Libraries

### Recharts
Used in SkillVisualizer for:
- BarChart with skill breakdown
- RadarChart for skill categories
- Responsive containers
- Custom tooltips and styling

### Framer Motion
Used throughout for:
- Page transitions
- Card animations
- Swipe gestures
- Modal animations
- Hover/tap effects

### React Icons (Feather Icons)
Icon set used:
- FiUpload, FiUser, FiCode, FiHeart
- FiCheck, FiX, FiArrowRight, FiArrowLeft
- FiTrendingUp, FiBarChart2, FiList
- FiClock, FiDollarSign, FiMapPin
- And more...

---

## 🚀 Usage Examples

### Using MatchCard
```jsx
import MatchCard from '@/components/MatchCard';

<MatchCard
  job={currentJob}
  onSwipeLeft={(job) => skipJob(job)}
  onSwipeRight={(job) => applyToJob(job)}
  showControls={true}
/>
```

### Using SkillVisualizer
```jsx
import SkillVisualizer from '@/components/SkillVisualizer';

<SkillVisualizer
  job={currentJob}
  userSkills={profile.skills}
/>
```

### Accessing Store
```jsx
import { useStore } from '@/store/useStore';

const { profile, updateProfile, getCurrentJob } = useStore();
```

---

## 📱 Responsive Design

All components are responsive with breakpoints:
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px

Mobile-first approach with desktop enhancements.
