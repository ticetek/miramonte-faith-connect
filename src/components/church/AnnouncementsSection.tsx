
import { Language } from '@/pages/Index';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CalendarDays, Clock } from 'lucide-react';

interface AnnouncementsProps {
  language: Language;
}

const AnnouncementsSection = ({ language }: AnnouncementsProps) => {
  const content = {
    es: {
      title: 'Anuncios Recientes',
      subtitle: 'Mantente informado sobre nuestras actividades',
      loading: 'Cargando anuncios...',
      noAnnouncements: 'No hay anuncios disponibles'
    },
    en: {
      title: 'Recent Announcements',
      subtitle: 'Stay informed about our activities',
      loading: 'Loading announcements...',
      noAnnouncements: 'No announcements available'
    }
  };

  const t = content[language];

  const { data: announcements, isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <section id="announcements" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-gray-600">{t.loading}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="announcements" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
              {t.title}
            </h2>
            <p className="text-lg text-gray-600">
              {t.subtitle}
            </p>
          </div>
          
          {announcements && announcements.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {announcement.image_url && (
                    <div className="h-48 bg-amber-100 overflow-hidden">
                      <img 
                        src={announcement.image_url} 
                        alt={language === 'es' ? announcement.title_es : announcement.title_en}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {language === 'es' ? announcement.title_es : announcement.title_en}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {language === 'es' ? announcement.content_es : announcement.content_en}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      {new Date(announcement.created_at).toLocaleDateString(
                        language === 'es' ? 'es-ES' : 'en-US',
                        { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        }
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CalendarDays className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600">{t.noAnnouncements}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsSection;
