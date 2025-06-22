
import { Language } from '@/pages/Index';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Mail, CheckCircle } from 'lucide-react';

interface NewsletterSectionProps {
  language: Language;
}

const NewsletterSection = ({ language }: NewsletterSectionProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const content = {
    es: {
      title: 'Mantente Conectado',
      subtitle: 'Suscríbete a nuestro boletín para recibir las últimas noticias y eventos',
      placeholder: 'Tu dirección de email',
      subscribe: 'Suscribirse',
      subscribing: 'Suscribiendo...',
      privacy: 'Respetamos tu privacidad. Puedes cancelar tu suscripción en cualquier momento.',
      success: 'Te has suscrito exitosamente',
      successDesc: 'Gracias por unirte a nuestra comunidad',
      error: 'Error al suscribirse',
      errorDesc: 'Por favor intenta nuevamente',
      invalid: 'Email inválido',
      invalidDesc: 'Por favor ingresa un email válido'
    },
    en: {
      title: 'Stay Connected',
      subtitle: 'Subscribe to our newsletter to receive the latest news and events',
      placeholder: 'Your email address',
      subscribe: 'Subscribe',
      subscribing: 'Subscribing...',
      privacy: 'We respect your privacy. You can unsubscribe at any time.',
      success: 'Successfully subscribed',
      successDesc: 'Thank you for joining our community',
      error: 'Error subscribing',
      errorDesc: 'Please try again',
      invalid: 'Invalid email',
      invalidDesc: 'Please enter a valid email'
    }
  };

  const t = content[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: t.invalid,
        description: t.invalidDesc,
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{
          email: email.toLowerCase(),
          preferred_language: language
        }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: t.success,
            description: t.successDesc,
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: t.success,
          description: t.successDesc,
        });
      }
      
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: t.error,
        description: t.errorDesc,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-amber-600 to-yellow-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-amber-600" />
            </div>
            
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {t.title}
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              {t.subtitle}
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder={t.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 rounded-full border-gray-300 focus:border-amber-500"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 h-12 rounded-full whitespace-nowrap"
                >
                  {isLoading ? t.subscribing : t.subscribe}
                </Button>
              </div>
            </form>
            
            <p className="text-sm text-gray-500 leading-relaxed">
              {t.privacy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
