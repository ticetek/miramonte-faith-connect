
import { Language } from '@/pages/Index';
import { Heart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectsSectionProps {
  language: Language;
}

const ProjectsSection = ({ language }: ProjectsSectionProps) => {
  const content = {
    es: {
      title: 'Proyectos Comunitarios',
      subtitle: 'Sirviendo a nuestra comunidad con amor',
      shelterTitle: 'Albergue Adventista',
      shelterDescription: 'Una iniciativa para ayudar a las familias necesitadas en nuestra comunidad. Proporcionamos refugio temporal, alimentación y apoyo espiritual a quienes más lo necesitan.',
      learnMore: 'Conoce Más',
      impact: 'Nuestro Impacto',
      families: 'Familias ayudadas',
      meals: 'Comidas servidas',
      volunteers: 'Voluntarios activos'
    },
    en: {
      title: 'Community Projects',
      subtitle: 'Serving our community with love',
      shelterTitle: 'Adventist Shelter',
      shelterDescription: 'An initiative to help families in need in our community. We provide temporary shelter, food, and spiritual support to those who need it most.',
      learnMore: 'Learn More',
      impact: 'Our Impact',
      families: 'Families helped',
      meals: 'Meals served',
      volunteers: 'Active volunteers'
    }
  };

  const t = content[language];

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
              {t.title}
            </h2>
            <p className="text-lg text-amber-700">
              {t.subtitle}
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {t.shelterTitle}
                  </h3>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-8">
                  {t.shelterDescription}
                </p>
                
                <Button 
                  asChild
                  className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-6 py-3 inline-flex items-center gap-2"
                >
                  <a href="https://albergueadventista.org/" target="_blank" rel="noopener noreferrer">
                    {t.learnMore}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
              
              <div className="bg-gradient-to-br from-amber-100 to-yellow-100 p-8 lg:p-12">
                <h4 className="text-xl font-bold text-amber-900 mb-6">
                  {t.impact}
                </h4>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">{t.families}</span>
                    <span className="text-2xl font-bold text-amber-600">250+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">{t.meals}</span>
                    <span className="text-2xl font-bold text-amber-600">5,000+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">{t.volunteers}</span>
                    <span className="text-2xl font-bold text-amber-600">25</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
