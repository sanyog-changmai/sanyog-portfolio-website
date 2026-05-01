import { useEffect, useRef } from 'react';
import { GraduationCap, Calendar } from 'lucide-react';

const Education = ({ education }) => {
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

  if (!education || education.length === 0) return null;

  return (
    <section id="education" ref={sectionRef} className="py-24 bg-gray-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

      {/* Background accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="reveal text-center mb-16">
          <span className="text-cyan-400 font-medium text-sm tracking-wider uppercase">Education</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Academic <span className="gradient-text">Background</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className="reveal card-hover group"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/50 h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium flex items-center gap-1">
                        <Calendar size={12} />
                        {edu.start_year} - {edu.end_year || 'Present'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-cyan-400 font-medium mb-2">{edu.institution}</p>
                    {edu.description && (
                      <p className="text-gray-400 text-sm">{edu.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
