
import { useState } from 'react';
import HeroSection from '@/components/church/HeroSection';
import AboutSection from '@/components/church/AboutSection';
import ScheduleSection from '@/components/church/ScheduleSection';
import SocialMediaSection from '@/components/church/SocialMediaSection';
import ProjectsSection from '@/components/church/ProjectsSection';
import AnnouncementsSection from '@/components/church/AnnouncementsSection';
import NewsletterSection from '@/components/church/NewsletterSection';
import ContactSection from '@/components/church/ContactSection';
import LanguageSwitcher from '@/components/church/LanguageSwitcher';
import Navigation from '@/components/church/Navigation';

export type Language = 'es' | 'en';

const Index = () => {
  const [language, setLanguage] = useState<Language>('es');

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <LanguageSwitcher language={language} setLanguage={setLanguage} />
      <Navigation language={language} />
      <HeroSection language={language} />
      <AboutSection language={language} />
      <ScheduleSection language={language} />
      <SocialMediaSection language={language} />
      <ProjectsSection language={language} />
      <AnnouncementsSection language={language} />
      <NewsletterSection language={language} />
      <ContactSection language={language} />
    </div>
  );
};

export default Index;
