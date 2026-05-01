import { useEffect, useRef } from 'react';
import { Briefcase, ArrowUpRight } from 'lucide-react';

const Experience = ({ experiences }) => {
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

  if (!experiences || experiences.length === 0) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    // Google Sheets already returns formatted dates like "March 2023"
    // Just return as-is to avoid cross-browser parsing issues
    return dateString;
  };

  return (
    <section id="experience" ref={sectionRef} className="py-24 bg-gray-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="reveal mb-16 text-center">
          <span className="text-indigo-400 font-medium text-sm tracking-wider uppercase">Experience</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Where I've <span className="gradient-text">Worked</span>
          </h2>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="reveal group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-indigo-500/30 transition-all duration-500 hover:bg-gray-900/80">
                <div className="flex gap-5">
                  {/* Icon */}
                  <div className="hidden sm:flex items-start pt-1">
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors duration-300">
                      <Briefcase size={22} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2">
                          {exp.role}
                          <ArrowUpRight size={18} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-indigo-400" />
                        </h3>
                        <p className="text-gray-400 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500 font-medium whitespace-nowrap px-3 py-1 rounded-full bg-gray-800/50">
                        {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : formatDate(exp.end_date)}
                      </span>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                      {exp.description}
                    </p>
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

export default Experience;
