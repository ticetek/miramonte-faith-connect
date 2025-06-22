
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import AnnouncementForm from './AnnouncementForm';

const AnnouncementsList = () => {
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: announcements, isLoading } = useQuery({
    queryKey: ['admin-announcements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const togglePublished = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('announcements')
      .update({ is_published: !currentStatus })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update announcement status',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: `Announcement ${!currentStatus ? 'published' : 'unpublished'}`,
      });
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    }
  };

  const deleteAnnouncement = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;

    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete announcement',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Announcement deleted successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    }
  };

  if (editingAnnouncement) {
    return (
      <div>
        <Button
          onClick={() => setEditingAnnouncement(null)}
          variant="outline"
          className="mb-4"
        >
          ← Back to List
        </Button>
        <AnnouncementForm
          announcement={editingAnnouncement}
          onSuccess={() => setEditingAnnouncement(null)}
        />
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading announcements...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Manage Announcements</h2>
      
      {announcements && announcements.length > 0 ? (
        <div className="grid gap-6">
          {announcements.map((announcement) => (
            <Card key={announcement.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {announcement.title_es}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 mt-1">
                      {announcement.title_en}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={announcement.is_published ? 'default' : 'secondary'}>
                      {announcement.is_published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {announcement.content_es}
                    </p>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Created: {new Date(announcement.created_at).toLocaleDateString()}
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => setEditingAnnouncement(announcement)}
                      size="sm"
                      variant="outline"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    
                    <Button
                      onClick={() => togglePublished(announcement.id, announcement.is_published)}
                      size="sm"
                      variant="outline"
                    >
                      {announcement.is_published ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-1" />
                          Unpublish
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-1" />
                          Publish
                        </>
                      )}
                    </Button>
                    
                    <Button
                      onClick={() => deleteAnnouncement(announcement.id)}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No announcements yet. Create your first announcement!</p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsList;
