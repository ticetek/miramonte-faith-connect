
import { Language } from '@/pages/Index';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  language: Language;
}

const HeroSection = ({ language }: HeroSectionProps) => {
  const content = {
    es: {
      title: 'Iglesia Adventista Miramonte',
      subtitle: 'Un lugar donde la fe, la esperanza y el amor se encuentran',
      welcome: 'Te invitamos a ser parte de nuestra familia de fe',
      cta: 'Conoce Más',
      visit: 'Visítanos'
    },
    en: {
      title: 'Iglesia Adventista Miramonte',
      subtitle: 'A place where faith, hope, and love come together',
      welcome: 'We invite you to be part of our faith family',
      cta: 'Learn More',
      visit: 'Visit Us'
    }
  };

  const t = content[language];

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-cream-100 to-amber-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-50/30 to-white/60"></div>
      
      {/* Decorative arches */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-amber-200/20 to-transparent"></div>
      <div className="absolute top-16 left-1/4 w-64 h-64 bg-amber-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-16 right-1/4 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 text-center relative z-10 pt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-amber-900 mb-6 leading-tight">
            {t.title}
          </h1>
          
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
          
          <p className="text-xl md:text-2xl text-amber-800 mb-6 font-medium">
            {t.subtitle}
          </p>
          
          <p className="text-lg text-amber-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.welcome}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToAbout}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
            >
              {t.cta}
            </Button>
            <Button 
              onClick={scrollToContact}
              variant="outline"
              className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 text-lg rounded-full transition-all duration-300"
            >
              {t.visit}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
