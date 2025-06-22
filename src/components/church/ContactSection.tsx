
import { Language } from '@/pages/Index';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactSectionProps {
  language: Language;
}

const ContactSection = ({ language }: ContactSectionProps) => {
  const content = {
    es: {
      title: 'Contáctanos',
      subtitle: 'Estamos aquí para ti. No dudes en comunicarte con nosotros',
      email: 'Email',
      phone: 'Teléfono',
      address: 'Dirección',
      directions: 'Ver en Google Maps',
      visitUs: 'Visítanos',
      visitDesc: 'Te esperamos con los brazos abiertos'
    },
    en: {
      title: 'Contact Us',
      subtitle: 'We are here for you. Don\'t hesitate to reach out to us',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      directions: 'View on Google Maps',
      visitUs: 'Visit Us',
      visitDesc: 'We welcome you with open arms'
    }
  };

  const t = content[language];

  const contactInfo = [
    {
      icon: Mail,
      label: t.email,
      value: 'iglesiaadventistamiramonte@gmail.com',
      href: 'mailto:iglesiaadventistamiramonte@gmail.com',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Phone,
      label: t.phone,
      value: '+503 7946 6338',
      href: 'tel:+50379466338',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: MapPin,
      label: t.address,
      value: 'Calle Orizaba No. 225 Colonia Miramonte, San Salvador, El Salvador',
      href: 'https://maps.app.goo.gl/Zvxtkq8jeBDLGVfP8',
      color: 'bg-red-100 text-red-600'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target={info.icon === MapPin ? '_blank' : undefined}
                  rel={info.icon === MapPin ? 'noopener noreferrer' : undefined}
                  className="block group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${info.color} group-hover:scale-110 transition-transform`}>
                        <info.icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {info.label}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {info.value}
                        </p>
                      </div>
                      
                      {info.icon === MapPin && (
                        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-amber-600 to-yellow-600 rounded-3xl p-8 lg:p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">
                {t.visitUs}
              </h3>
              
              <p className="text-lg mb-8 text-amber-100">
                {t.visitDesc}
              </p>
              
              <Button 
                asChild
                className="bg-white text-amber-600 hover:bg-amber-50 rounded-full px-8 py-3 font-semibold inline-flex items-center gap-2"
              >
                <a href="https://maps.app.goo.gl/Zvxtkq8jeBDLGVfP8" target="_blank" rel="noopener noreferrer">
                  {t.directions}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              
              <div className="mt-8 pt-8 border-t border-amber-400">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">15+</div>
                    <div className="text-sm text-amber-200">
                      {language === 'es' ? 'Años sirviendo' : 'Years serving'}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">200+</div>
                    <div className="text-sm text-amber-200">
                      {language === 'es' ? 'Miembros activos' : 'Active members'}
                    </div>
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

export default ContactSection;
