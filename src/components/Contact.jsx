import { useEffect, useRef } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

const Contact = ({ profile }) => {
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
    <section id="contact" ref={sectionRef} className="py-24 bg-gray-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="reveal text-center">
          <span className="text-indigo-400 font-medium text-sm tracking-wider uppercase">Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </div>

        <div className="reveal flex flex-col sm:flex-row justify-center gap-4 mb-12">
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="btn-primary px-8 py-4 rounded-xl text-white font-medium flex items-center justify-center gap-3 text-lg"
            >
              <Send size={22} />
              Send me an email
            </a>
          )}
          {profile.linkedin_url && (
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium flex items-center justify-center gap-3 text-lg hover:bg-white/10 transition-all duration-300"
            >
              <Linkedin size={22} />
              Connect on LinkedIn
            </a>
          )}
        </div>

        <div className="reveal flex justify-center gap-6">
          {profile.github_url && (
            <a
              href={profile.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Github size={20} />
              <span className="border-b border-transparent group-hover:border-white">GitHub</span>
            </a>
          )}
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Mail size={20} />
              <span className="border-b border-transparent group-hover:border-white">{profile.email}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
