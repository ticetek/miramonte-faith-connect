
import { Language } from '@/pages/Index';

interface AboutSectionProps {
  language: Language;
}

const AboutSection = ({ language }: AboutSectionProps) => {
  const content = {
    es: {
      title: 'Nuestra Historia',
      history: `Nuestra historia comenzó en 2005 con la visión del Pastor Winston Simpson de establecer una nueva congregación Adventista en la Colonia Miramonte. Iniciamos con aproximadamente 25 miembros de la Iglesia Adventista Central, celebrando cultos en el Hotel Grecia Real.

El 24 de junio de 2006 fuimos constituidos oficialmente como iglesia. Después de varios intentos de encontrar el lugar perfecto, Dios nos guió a una propiedad en la calle Orizaba que resultó ser exactamente lo que necesitábamos.

La construcción de nuestro templo comenzó el 8 de febrero de 2009 con la colocación de la primera piedra. A pesar de los desafíos económicos y algunas críticas de vecinos, la unidad y generosidad de nuestra congregación nos permitió completar esta hermosa casa de adoración.

Hoy, después de más de 15 años, hemos crecido de 25 miembros a una congregación próspera que continúa sirviendo a la comunidad de Miramonte y áreas circundantes. Nuestro templo no solo es un lugar de adoración, sino también un centro de esperanza y servicio comunitario.`,
      mission: 'Nuestra Misión',
      missionText: 'Compartir el amor de Cristo y llevar esperanza a nuestra comunidad a través de la adoración, el servicio y la educación bíblica.'
    },
    en: {
      title: 'Our History',
      history: `Our history began in 2005 with Pastor Winston Simpson's vision to establish a new Adventist congregation in Colonia Miramonte. We started with approximately 25 members from the Central Adventist Church, holding services at the Hotel Grecia Real.

On June 24, 2006, we were officially constituted as a church. After several attempts to find the perfect location, God guided us to a property on Orizaba Street that turned out to be exactly what we needed.

Construction of our temple began on February 8, 2009, with the laying of the first stone. Despite economic challenges and some criticism from neighbors, the unity and generosity of our congregation allowed us to complete this beautiful house of worship.

Today, after more than 15 years, we have grown from 25 members to a thriving congregation that continues to serve the Miramonte community and surrounding areas. Our temple is not only a place of worship but also a center of hope and community service.`,
      mission: 'Our Mission',
      missionText: 'To share Christ\'s love and bring hope to our community through worship, service, and biblical education.'
    }
  };

  const t = content[language];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-amber-900 text-center mb-12">
            {t.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="prose prose-lg text-gray-700">
                {t.history.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-amber-900 mb-4">
                {t.mission}
              </h3>
              <p className="text-lg text-amber-800 leading-relaxed">
                {t.missionText}
              </p>
              
              <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">15+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'es' ? 'Años sirviendo' : 'Years serving'}
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

export default AboutSection;
