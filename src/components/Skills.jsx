import { useEffect, useRef } from 'react';
import { Code, Layers, Wrench, Database, Sparkles } from 'lucide-react';

const Skills = ({ skills }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (!skills || skills.length === 0) return null;

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  const categoryConfig = {
    languages: { label: 'Languages', icon: Code, color: 'indigo' },
    frameworks: { label: 'Frameworks', icon: Layers, color: 'purple' },
    tools: { label: 'Tools', icon: Wrench, color: 'pink' },
    databases: { label: 'Databases', icon: Database, color: 'cyan' },
    other: { label: 'Other', icon: Sparkles, color: 'emerald' },
  };

  const colorClasses = {
    indigo: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      text: 'text-indigo-400',
      hover: 'group-hover:border-indigo-500/50',
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      text: 'text-purple-400',
      hover: 'group-hover:border-purple-500/50',
    },
    pink: {
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/20',
      text: 'text-pink-400',
      hover: 'group-hover:border-pink-500/50',
    },
    cyan: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      text: 'text-cyan-400',
      hover: 'group-hover:border-cyan-500/50',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      text: 'text-emerald-400',
      hover: 'group-hover:border-emerald-500/50',
    },
  };

  return (
    <section id="skills" ref={sectionRef} className="py-24 bg-gray-950">
      <div className="max-w-5xl mx-auto px-6">
        <div className="reveal mb-16 text-center">
          <span className="text-indigo-400 font-medium text-sm tracking-wider uppercase">Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Tech I <span className="gradient-text">work with</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => {
            const config = categoryConfig[category] || categoryConfig.other;
            const colors = colorClasses[config.color];
            const Icon = config.icon;

            return (
              <div
                key={category}
                className="reveal group"
                style={{ transitionDelay: `${categoryIndex * 100}ms` }}
              >
                <div className={`p-6 rounded-2xl bg-gray-900/50 border ${colors.border} ${colors.hover} transition-all duration-300`}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`p-2.5 rounded-xl ${colors.bg}`}>
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{config.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.id}
                        className={`px-3 py-1.5 text-sm text-gray-300 ${colors.bg} rounded-lg hover:text-white transition-colors duration-200`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
