import { useEffect, useRef } from 'react';

const About = ({ profile }) => {
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

  if (!profile) return null;

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-gray-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="reveal">
          <span className="text-indigo-400 font-medium text-sm tracking-wider uppercase">About</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-8">
            A bit about <span className="gradient-text">me</span>
          </h2>
        </div>

        <div className="reveal">
          <p className="text-xl text-gray-400 leading-relaxed">
            {profile.bio}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
