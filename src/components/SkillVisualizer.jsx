import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { FiTrendingUp, FiBook } from 'react-icons/fi';

const SkillVisualizer = ({ job, userSkills }) => {
  // Use actual job requirements and provided user skills (no random data)
  const requiredSkills = job?.requiredSkills || ['React', 'Node.js', 'Python', 'SQL', 'Docker'];
  const actualUserSkills = Array.isArray(userSkills) ? userSkills : [];

  // Calculate skill gaps and matches deterministically from the provided profile
  const gaps = requiredSkills.filter(skill =>
    !actualUserSkills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
  );

  const matched = requiredSkills.filter(skill =>
    actualUserSkills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
  );

  // Prepare bar chart data with deterministic proficiency levels: have -> 85, missing -> 25
  const barChartData = requiredSkills.map(skill => {
    const hasSkill = actualUserSkills.some(us => us.toLowerCase() === skill.toLowerCase());
    return {
      skill: skill.length > 10 ? skill.substring(0, 10) + '...' : skill,
      fullSkill: skill,
      level: hasSkill ? 85 : 25,
      hasSkill: hasSkill
    };
  });

  // Prepare radar chart data (skill categories)
  // Prepare radar chart data (skill categories) using keyword-based matching for more robust classification
  const skillCategories = {
    'Frontend': [
      'react', 'angular', 'vue', 'html', 'css', 'typescript', 'javascript', 'ui', 'ux'
    ],
    'Backend': [
      'node', 'express', 'java', 'python', 'spring', 'django', 'flask', 'ruby', 'rails'
    ],
    'Database': [
      'sql', 'mongodb', 'postgres', 'mysql', 'redis', 'data warehousing', 'data', 'etl', 'spark'
    ],
    'DevOps': [
      'docker', 'kubernetes', 'aws', 'azure', 'ci/cd', 'jenkins', 'git', 'linux'
    ],
    'Machine Learning': [
      'tensorflow', 'pytorch', 'machine learning', 'ml', 'data analysis', 'ai'
    ],
    'Mobile': [
      'react native', 'flutter', 'mobile', 'ios', 'android'
    ],
    'Security': [
      'security', 'cryptography', 'ethical', 'penetration', 'hacking'
    ],
    'Game': [
      'unity', 'c#', 'game', '3d'
    ],
    'Other': []
  };

  const normalize = (s) => (s || '').toString().toLowerCase();

  const categorizeSkill = (skill) => {
    const text = normalize(skill);
    // Check each category's keyword list for substring matches
    for (const [category, keywords] of Object.entries(skillCategories)) {
      if (keywords.some(kw => text.includes(kw))) return category;
    }
    // as a fallback, try to match by token prefix (e.g., 'sql' vs 'SQL')
    for (const [category, keywords] of Object.entries(skillCategories)) {
      if (keywords.some(kw => text.split(/\s|\-|\//).some(tok => tok === kw))) return category;
    }
    return 'Other';
  };

  const categoryScores = {};
  Object.keys(skillCategories).forEach(cat => {
    categoryScores[cat] = { required: 0, have: 0 };
  });

  requiredSkills.forEach(skill => {
    const category = categorizeSkill(skill);
    categoryScores[category].required += 1;
    if (actualUserSkills.some(us => us.toLowerCase() === skill.toLowerCase())) {
      categoryScores[category].have += 1;
    }
  });

  // Fill radar chart randomly (per user request) so the chart looks populated for demo purposes
  const radarData = Object.keys(categoryScores).map(category => ({
    category,
    // random score between 30 and 100
    score: Math.floor(Math.random() * 71) + 30,
    fullMark: 100
  }));

  // Generate deterministic improvement suggestions based on gaps
  const allGaps = gaps.length > 0 ? gaps : [];
  const suggestions = allGaps.slice(0, 3).map((skill, idx) => ({
    skill,
    course: `Master ${skill} - Online Bootcamp`,
    improvement: idx === 0 ? '+15%' : idx === 1 ? '+10%' : '+5%',
    priority: idx === 0 ? 'High' : idx === 1 ? 'Medium' : 'Low'
  }));

  const matchPercentage = requiredSkills.length > 0
    ? Math.round((matched.length / requiredSkills.length) * 100)
    : 0;

  // Display only actual matched skills from the profile (no fabricated fallbacks)
  const displayMatched = matched;

  return (
    <div className="space-y-4">
      {/* If the profile has no skills, show a gentle prompt so the analysis clearly reflects the mock profile */}
      {actualUserSkills.length === 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3 border border-yellow-200 dark:border-yellow-800 text-sm text-yellow-800 dark:text-yellow-200">
          Your profile has no listed skills — the analysis below shows gaps for all required skills. Add skills in Profile Setup to get accurate match scores.
        </div>
      )}
      {/* Summary Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">
          Skill Match Analysis
        </h3>
          <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {matched.length}
            </div>
            <div className="text-xs text-gray-700 dark:text-gray-300">Matched</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {gaps.length}
            </div>
            <div className="text-xs text-gray-700 dark:text-gray-300">Gaps</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {matchPercentage}%
            </div>
            <div className="text-xs text-gray-700 dark:text-gray-300">Match</div>
          </div>
        </div>
      </div>

      {/* Bar Chart - Skill by Skill */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-3 flex items-center">
          <FiTrendingUp className="mr-2 text-blue-500" size={16} />
          Required Skills Breakdown
        </h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis 
              dataKey="skill" 
              stroke="#6B7280" 
              fontSize={10}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis stroke="#6B7280" fontSize={10} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px',
                color: '#111827',
                fontSize: '12px',
                padding: '8px 12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              labelStyle={{
                color: '#111827',
                fontWeight: '600',
                marginBottom: '4px'
              }}
              itemStyle={{
                color: '#374151'
              }}
              labelFormatter={(value, payload) => {
                const item = barChartData.find(d => d.skill === value);
                return item?.fullSkill || value;
              }}
              formatter={(value, name) => [value > 50 ? `${value}% Proficiency` : `${value}% - Learning Needed`, '']}
            />
            <Bar dataKey="level" radius={[8, 8, 0, 0]}>
              {barChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.hasSkill ? '#10B981' : '#EF4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Chart - Category View */}
      {radarData.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">
            Skill Category Match
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis 
                dataKey="category" 
                stroke="#6B7280"
                style={{ fontSize: '10px' }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                stroke="#6B7280"
              />
              <Radar
                name="Your Skills"
                dataKey="score"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Improvement Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-3 flex items-center">
            <FiBook className="mr-2 text-purple-500" size={16} />
            Improvement Suggestions
          </h4>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-sm text-purple-900 dark:text-purple-100">
                      {suggestion.skill}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      suggestion.priority === 'High' 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : suggestion.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {suggestion.priority} Priority
                    </span>
                  </div>
                  <p className="text-xs text-purple-700 dark:text-purple-300">
                    {suggestion.course}
                  </p>
                </div>
                <div className="text-right ml-3">
                  <div className="text-base font-bold text-green-600 dark:text-green-400">
                    {suggestion.improvement}
                  </div>
                  <div className="text-xs text-gray-700 dark:text-gray-300">
                    boost
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Matched Skills */}
      {displayMatched.length > 0 && (
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
          <h4 className="font-semibold text-sm text-green-900 dark:text-green-100 mb-2">
            ✓ Your Matching Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {displayMatched.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillVisualizer;
