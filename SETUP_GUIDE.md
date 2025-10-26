# Joblense AI - Quick Setup Guide

## ✅ Setup Complete!

Your Joblense AI prototype is now ready to use!

## 🚀 Access the Application

The development server is running at:
**http://localhost:3000**

## 📖 User Journey

### Getting Started (2 Ways)

#### Option 1: Complete Profile (Scenario 1)
1. Click "Get Started" on the landing page
2. **Step 1**: Upload a resume (any PDF/DOC file)
3. **Step 2**: Fill in basic information:
   - Name: Wong Beng Hwa
   - Degree: Bachelor of Computer Science
   - University: National University of Singapore
   - Year: Final Year
   - GPA: 3.8/4.0
   - GitHub: (optional)
4. **Step 3**: Select skills (choose at least 5):
   - Recommended: JavaScript, Python, Java, React, Node.js, SQL, Git
5. **Step 4**: Complete personality quiz (adjust sliders)
6. Click "Complete" to see high-quality job matches!

#### Option 2: Incomplete Profile (Scenario 2)
1. Click "Get Started"
2. Upload resume
3. Fill in only name and degree
4. Skip skills or select very few
5. Complete - you'll see poor matches
6. Navigate to "Recalibrate Profile" to improve your profile

## 🎮 Interactive Features

### Match Dashboard
- **Swipe Right (✓)**: Apply to the job
- **Swipe Left (✗)**: Skip the job
- **Show Skill Analysis**: View detailed skill gap charts
- **View Applications**: See all jobs you've applied to
- **Recalibrate Profile**: Update your skills for better matches

### Applications Page
- View all applied jobs with status badges
- Filter by status (All, Applied, Pending, Matched, Rejected)
- Click "View Resume" to see auto-generated resume for each job

### Recalibration Page
- Reorder skills (priority matters!)
- Add/remove skills and interests
- See profile completeness score
- View expected impact of changes
- Click "Recalibrate & Find Matches" to get new job recommendations

## 🎨 UI Features

### Theme Toggle
- Click the sun/moon icon in the navbar to switch between light and dark mode

### Mock Jobs Available

**High Match Scenario (Complete Profile):**
- FinTech Corporation - Software Developer Intern (91% match)
- AI Innovations Lab - Machine Learning Intern (85% match)
- DataInsight Analytics - Data Engineer Intern (78% match)
- Apples Inc. - Full-Stack Developer Intern (73% match)
- And more...

**Low Match Scenario (Incomplete Profile):**
- Admin Solutions - Data Entry Clerk (35% match)
- Marketing Plus - Marketing Assistant (28% match)
- Retail Corp - Customer Service Intern (22% match)

## 📊 Key Features to Demo

1. **Skill Gap Visualizer**
   - Bar chart showing which skills you have vs. need
   - Radar chart for skill category overview
   - Personalized improvement suggestions with score boost predictions

2. **Auto-Generated Resume**
   - Tailored to each job application
   - Professional formatting
   - Includes your skills, experience, and projects

3. **Profile Completeness**
   - Track your profile completion percentage
   - See how it affects match quality
   - Complete profile = 100% = best matches

4. **Smart Matching Algorithm**
   - Considers skills, interests, and personality
   - Prioritizes top skills in your profile
   - Provides detailed match reasoning

## 🔄 Testing Both Scenarios

### Test Scenario 1: Complete Profile
1. Go through full profile setup with resume, all skills
2. Expected result: High-quality matches (70-91% scores)
3. Jobs like FinTech Corp, AI Innovations Lab

### Test Scenario 2: Incomplete → Recalibration
1. Skip resume, add minimal skills
2. Expected result: Poor matches (22-35% scores)
3. Navigate to "Recalibrate Profile"
4. Add comprehensive skills list
5. Click "Recalibrate & Find Matches"
6. Expected result: Improved matches appear!

## 💡 Tips

- **Skills Matter**: More relevant skills = better matches
- **Order Matters**: Your top skills are prioritized
- **Complete Profile**: 100% completion unlocks best matches
- **Swipe Freely**: You can always recalibrate and get new matches
- **Check Analytics**: Use skill gap visualizer to identify areas for improvement

## 🐛 Troubleshooting

If the app doesn't load:
1. Make sure the terminal shows "Ready in X.Xs"
2. Try refreshing the browser
3. Check http://localhost:3000 is accessible
4. Restart the dev server: `Ctrl+C` then `npm run dev`

## 📝 Mock Features

Remember, this is a prototype with mock data:
- No real backend/database
- File uploads are simulated
- All job data is pre-defined
- Applications are stored in browser state only
- Refresh will reset all data

## 🎯 Main Goals Demonstrated

✅ AI-powered job matching based on skills and personality
✅ Tinder-style swipe interface for jobs
✅ Dynamic skill gap analysis with visualizations
✅ Auto-generated, tailored resumes
✅ Profile recalibration with immediate impact
✅ Complete end-to-end internship matching experience

Enjoy exploring Joblense AI! 🚀
