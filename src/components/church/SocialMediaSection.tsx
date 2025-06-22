
import { Language } from '@/pages/Index';
import { Facebook, Instagram, Youtube, BookOpen } from 'lucide-react';

interface SocialMediaSectionProps {
  language: Language;
}

const SocialMediaSection = ({ language }: SocialMediaSectionProps) => {
  const content = {
    es: {
      title: 'Conéctate con Nosotros',
      subtitle: 'Síguenos en redes sociales y recursos espirituales',
      facebook: 'Facebook',
      instagram: 'Instagram', 
      youtube: 'YouTube',
      devotional: 'Devocional Matutino'
    },
    en: {
      title: 'Connect with Us',
      subtitle: 'Follow us on social media and spiritual resources',
      facebook: 'Facebook',
      instagram: 'Instagram',
      youtube: 'YouTube', 
      devotional: 'Morning Devotional'
    }
  };

  const t = content[language];

  const socialLinks = [
    {
      name: t.facebook,
      url: 'https://www.facebook.com/iglesiaadventista.miramonte',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: language === 'es' ? 'Últimas noticias y eventos' : 'Latest news and events'
    },
    {
      name: t.instagram,
      url: 'https://www.instagram.com/iglesia.adventista.miramonte',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
      description: language === 'es' ? 'Fotos de nuestra comunidad' : 'Photos of our community'
    },
    {
      name: t.youtube,
      url: 'https://www.youtube.com/@IglesiaAdventistaMiramonte',
      icon: Youtube,
      color: 'bg-red-600 hover:bg-red-700',
      description: language === 'es' ? 'Sermones y estudios bíblicos' : 'Sermons and Bible studies'
    },
    {
      name: t.devotional,
      url: 'https://matutina.iglesiaadventistamiramonte.org/',
      icon: BookOpen,
      color: 'bg-amber-600 hover:bg-amber-700',
      description: language === 'es' ? 'Reflexiones diarias' : 'Daily reflections'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            {t.subtitle}
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-16 h-16 ${link.color} rounded-2xl flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110`}>
                    <link.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {link.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {link.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;
