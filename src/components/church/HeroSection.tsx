
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
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/lovable-uploads/c4061fd6-b884-4b60-97f5-633cdf5ca909.png)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {t.title}
          </h1>
          
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-8"></div>
          
          <p className="text-xl md:text-2xl text-amber-100 mb-6 font-medium drop-shadow-md">
            {t.subtitle}
          </p>
          
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            {t.welcome}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToAbout}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t.cta}
            </Button>
            <Button 
              onClick={scrollToContact}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-amber-800 px-8 py-3 text-lg rounded-full transition-all duration-300 shadow-lg"
            >
              {t.visit}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
