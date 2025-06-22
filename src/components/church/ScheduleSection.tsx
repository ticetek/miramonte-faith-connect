
import { Language } from '@/pages/Index';
import { Calendar, Clock } from 'lucide-react';

interface ScheduleSectionProps {
  language: Language;
}

const ScheduleSection = ({ language }: ScheduleSectionProps) => {
  const content = {
    es: {
      title: 'Horarios de Servicios',
      subtitle: 'Te esperamos en nuestros servicios',
      monday: 'Lunes',
      wednesday: 'Miércoles', 
      saturday: 'Sábado',
      morning: 'Mañana',
      evening: 'Tarde'
    },
    en: {
      title: 'Service Schedule',
      subtitle: 'We look forward to seeing you at our services',
      monday: 'Monday',
      wednesday: 'Wednesday',
      saturday: 'Saturday', 
      morning: 'Morning',
      evening: 'Evening'
    }
  };

  const t = content[language];

  const schedule = [
    { day: t.monday, time: '7:00 PM', type: 'evening' },
    { day: t.wednesday, time: '7:00 PM', type: 'evening' },
    { day: t.saturday, time: '8:00 AM - 11:30 AM', type: 'morning' },
    { day: t.saturday, time: '4:30 PM - 6:00 PM', type: 'evening' }
  ];

  return (
    <section id="schedule" className="py-20 bg-gradient-to-br from-amber-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-amber-700 mb-12">
            {t.subtitle}
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {schedule.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                    service.type === 'morning' ? 'bg-yellow-100' : 'bg-amber-100'
                  }`}>
                    {service.type === 'morning' ? (
                      <Calendar className={`w-8 h-8 ${service.type === 'morning' ? 'text-yellow-600' : 'text-amber-600'}`} />
                    ) : (
                      <Clock className={`w-8 h-8 ${service.type === 'morning' ? 'text-yellow-600' : 'text-amber-600'}`} />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {service.day}
                  </h3>
                  
                  <p className="text-lg font-semibold text-amber-600">
                    {service.time}
                  </p>
                  
                  <div className={`mt-3 px-3 py-1 rounded-full text-sm font-medium ${
                    service.type === 'morning' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {service.type === 'morning' ? t.morning : t.evening}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
