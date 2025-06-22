
import { Language } from '@/pages/Index';

interface NavigationProps {
  language: Language;
}

const Navigation = ({ language }: NavigationProps) => {
  const content = {
    es: {
      home: 'Inicio',
      about: 'Nosotros',
      schedule: 'Horarios',
      announcements: 'Anuncios',
      contact: 'Contacto'
    },
    en: {
      home: 'Home',
      about: 'About',
      schedule: 'Schedule',
      announcements: 'Announcements',
      contact: 'Contact'
    }
  };

  const t = content[language];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-16 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-8 py-3">
          {[
            { label: t.home, id: 'hero' },
            { label: t.about, id: 'about' },
            { label: t.schedule, id: 'schedule' },
            { label: t.announcements, id: 'announcements' },
            { label: t.contact, id: 'contact' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-amber-800 hover:text-amber-600 font-medium transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
