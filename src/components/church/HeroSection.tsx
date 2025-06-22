

import { Language } from '@/pages/Index';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  language: Language;
}

const HeroSection = ({ language }: HeroSectionProps) => {
  const content = {
    es: {
      title: 'Iglesia Adventista del Séptimo Día - Miramonte',
      subtitle: 'Un lugar donde la fe, la esperanza y el amor se encuentran',
      welcome: 'Te invitamos a ser parte de nuestra familia de fe',
      cta: 'Conoce Más',
      visit: 'Visítanos'
    },
    en: {
      title: 'Seventh-day Adventist Church - Miramonte',
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
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {t.title}
          </h1>
          
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-8"></div>
          
          <p className="text-xl md:text-2xl text-white mb-6 font-medium drop-shadow-md bg-primary rounded-lg px-6 py-3 backdrop-blur-sm">
            {t.subtitle}
          </p>
          
          <p className="text-lg text-white mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md bg-primary rounded-lg px-6 py-3 backdrop-blur-sm">
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
              className="border-2 border-amber-400 bg-amber-400/10 text-white hover:bg-amber-400 hover:text-amber-900 px-8 py-3 text-lg rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm"
            >
              {t.visit}
            </Button>
          </div>
        </div>
      </div>

      {/* Arrow down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ArrowDown className="w-8 h-8 text-white animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;

