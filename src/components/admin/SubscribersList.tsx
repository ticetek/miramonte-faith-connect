
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Globe, Calendar, Users } from 'lucide-react';

const SubscribersList = () => {
  const { data: subscribers, isLoading } = useQuery({
    queryKey: ['newsletter-subscribers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('subscribed_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading subscribers...</div>;
  }

  const activeSubscribers = subscribers?.filter(sub => sub.is_active) || [];
  const spanishSubscribers = activeSubscribers.filter(sub => sub.preferred_language === 'es');
  const englishSubscribers = activeSubscribers.filter(sub => sub.preferred_language === 'en');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Newsletter Subscribers</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{activeSubscribers.length}</p>
                  <p className="text-sm text-gray-600">Total Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{spanishSubscribers.length}</p>
                  <p className="text-sm text-gray-600">Spanish</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{englishSubscribers.length}</p>
                  <p className="text-sm text-gray-600">English</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {subscribers && subscribers.length > 0 ? (
        <div className="space-y-4">
          {subscribers.map((subscriber) => (
            <Card key={subscriber.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{subscriber.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {new Date(subscriber.subscribed_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={subscriber.preferred_language === 'es' ? 'default' : 'secondary'}>
                      {subscriber.preferred_language === 'es' ? 'Español' : 'English'}
                    </Badge>
                    <Badge variant={subscriber.is_active ? 'default' : 'destructive'}>
                      {subscriber.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No subscribers yet.</p>
        </div>
      )}
    </div>
  );
};

export default SubscribersList;
