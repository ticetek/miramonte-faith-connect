
import { Language } from '@/pages/Index';

interface NavigationProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Navigation = ({ language, setLanguage }: NavigationProps) => {
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Church logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="https://cdn.adventist.org/adventist-logo/2/symbol/adventist-symbol-circle--black.svg" 
              alt="Adventist Logo" 
              className="w-8 h-8"
            />
          </div>
          
          {/* Navigation links */}
          <div className="hidden md:flex space-x-8">
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
                className="text-amber-800 hover:text-amber-600 font-medium transition-colors py-2"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Language switcher */}
          <div className="flex gap-1 bg-amber-50 rounded-full p-1">
            <button
              onClick={() => setLanguage('es')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                language === 'es'
                  ? 'bg-amber-600 text-white'
                  : 'text-amber-700 hover:bg-amber-100'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                language === 'en'
                  ? 'bg-amber-600 text-white'
                  : 'text-amber-700 hover:bg-amber-100'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
