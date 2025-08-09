import './App.css';
import { useEffect, useState, useRef } from 'react';

const sections = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'about', label: 'About Us', icon: '💡' },
  { id: 'contact', label: 'Contact', icon: '✉️' },
];

function getCurrentSection() {
  const scrollY = window.scrollY;
  const offsets = sections.map(({ id }) => {
    const el = document.getElementById(id);
    return el ? el.offsetTop : 0;
  });
  let active = 0;
  for (let i = 0; i < offsets.length; i++) {
    if (scrollY + 100 >= offsets[i]) active = i;
  }
  return sections[active].id;
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => setActiveSection(getCurrentSection());
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fade-in animation on scroll
  useEffect(() => {
    const handleFadeIn = () => {
      sectionRefs.current.forEach((ref, idx) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          ref.style.opacity = 1;
        }
      });
    };
    window.addEventListener('scroll', handleFadeIn);
    handleFadeIn();
    return () => window.removeEventListener('scroll', handleFadeIn);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
        <div
          className="company-logo"
          style={{
            width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #646cff 60%, #61dafb 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '2rem', color: '#fff', marginRight: '1rem',
          }}
        >
          C
        </div>
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>My Company</h1>
      </header>
      <nav className="navbar" aria-label="Main navigation">
        {sections.map((section) => (
          <button
            key={section.id}
            className={activeSection === section.id ? 'active' : ''}
            onClick={() => scrollToSection(section.id)}
            aria-current={activeSection === section.id ? 'page' : undefined}
          >
            {section.label}
          </button>
        ))}
      </nav>
      {sections.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          className="section-card"
          tabIndex={-1}
          ref={el => (sectionRefs.current[idx] = el)}
          style={{ '--fade-delay': `${0.1 * idx}s` }}
        >
          <div className="section-icon" aria-hidden>{section.icon}</div>
          <h2>{section.label === 'Home' ? 'Welcome to My Company' : section.label}</h2>
          <p>
            {section.id === 'home' && 'We provide innovative solutions to help your business grow. Our team is dedicated to delivering high-quality services tailored to your needs.'}
            {section.id === 'about' && "My Company was founded with a mission to empower businesses through technology. With years of experience and a passion for excellence, we strive to exceed our clients' expectations."}
            {section.id === 'contact' && (<span> Email: info@mycompany.com<br />Phone: (123) 456-7890</span>)}
          </p>
        </section>
      ))}
    </div>
  );
}
