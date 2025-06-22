
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';

interface AdminDebugInfoProps {
  user: User;
}

const AdminDebugInfo = ({ user }: AdminDebugInfoProps) => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      console.log('Profile data:', data);
      console.log('Profile error:', error);
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const makeUserAdmin = async () => {
    try {
      // First try to update existing profile
      const { data: updateData, error: updateError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', user.id)
        .select();

      if (updateError && updateError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        const { data: insertData, error: insertError } = await supabase
          .from('profiles')
          .insert([{
            id: user.id,
            email: user.email,
            role: 'admin'
          }])
          .select();

        if (insertError) {
          console.error('Error creating profile:', insertError);
          throw insertError;
        }
        console.log('Profile created:', insertData);
      } else if (updateError) {
        console.error('Error updating profile:', updateError);
        throw updateError;
      } else {
        console.log('Profile updated:', updateData);
      }

      await fetchProfile();
    } catch (error) {
      console.error('Error making user admin:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user.id]);

  if (isLoading) {
    return <div>Loading profile info...</div>;
  }

  return (
    <Card className="mb-6 border-amber-200">
      <CardHeader>
        <CardTitle className="text-amber-800">Admin Debug Information</CardTitle>
        <CardDescription>
          Current user and profile status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <strong>User ID:</strong> {user.id}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Profile exists:</strong> {profile ? 'Yes' : 'No'}
        </div>
        {profile && (
          <div>
            <strong>Current role:</strong> {profile.role || 'No role set'}
          </div>
        )}
        
        {(!profile || profile.role !== 'admin') && (
          <div className="mt-4">
            <Button 
              onClick={makeUserAdmin}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Make This User Admin
            </Button>
            <p className="text-sm text-gray-600 mt-2">
              Click this button to set your account as an admin so you can manage announcements.
            </p>
          </div>
        )}
        
        <Button 
          onClick={fetchProfile}
          variant="outline"
          size="sm"
        >
          Refresh Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminDebugInfo;
