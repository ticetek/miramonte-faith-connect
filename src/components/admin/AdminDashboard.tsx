
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Plus, Users, FileText } from 'lucide-react';
import AnnouncementForm from './AnnouncementForm';
import AnnouncementsList from './AnnouncementsList';
import SubscribersList from './SubscribersList';
import AdminDebugInfo from './AdminDebugInfo';
import type { User } from '@supabase/supabase-js';

interface AdminDashboardProps {
  user: User;
}

const AdminDashboard = ({ user }: AdminDashboardProps) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-amber-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, {user.email}</p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminDebugInfo user={user} />
        
        <Tabs defaultValue="announcements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="announcements" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Newsletter Subscribers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="announcements" className="space-y-6">
            {showCreateForm ? (
              <div>
                <Button
                  onClick={() => setShowCreateForm(false)}
                  variant="outline"
                  className="mb-4"
                >
                  ← Back to List
                </Button>
                <AnnouncementForm onSuccess={() => setShowCreateForm(false)} />
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Announcements</h2>
                  <Button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Announcement
                  </Button>
                </div>
                <AnnouncementsList />
              </div>
            )}
          </TabsContent>

          <TabsContent value="subscribers">
            <SubscribersList />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
