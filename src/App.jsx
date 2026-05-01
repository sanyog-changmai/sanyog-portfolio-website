import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loading from './components/Loading';
import {
  getProfile,
  getExperiences,
  getSkills,
} from './services/api';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    profile: null,
    experiences: [],
    skills: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profile, experiences, skills] = await Promise.all([
          getProfile(),
          getExperiences(),
          getSkills(),
        ]);

        setData({
          profile,
          experiences,
          skills,
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load portfolio data. Please check your Google Sheet ID and make sure the sheet is published.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center p-8">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Hero profile={data.profile} />
      <Experience experiences={data.experiences} />
      <Skills skills={data.skills} />
      <Contact profile={data.profile} />
      <Footer />
    </div>
  );
}

export default App;
