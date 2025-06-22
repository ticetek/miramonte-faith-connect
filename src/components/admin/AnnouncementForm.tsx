
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { Save, Globe } from 'lucide-react';

interface AnnouncementFormProps {
  announcement?: any;
  onSuccess?: () => void;
}

const AnnouncementForm = ({ announcement, onSuccess }: AnnouncementFormProps) => {
  const [titleEs, setTitleEs] = useState(announcement?.title_es || '');
  const [titleEn, setTitleEn] = useState(announcement?.title_en || '');
  const [contentEs, setContentEs] = useState(announcement?.content_es || '');
  const [contentEn, setContentEn] = useState(announcement?.content_en || '');
  const [imageUrl, setImageUrl] = useState(announcement?.image_url || '');
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!titleEs.trim() || !titleEn.trim() || !contentEs.trim() || !contentEn.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const announcementData = {
        title_es: titleEs.trim(),
        title_en: titleEn.trim(),
        content_es: contentEs.trim(),
        content_en: contentEn.trim(),
        image_url: imageUrl.trim() || null,
        updated_at: new Date().toISOString(),
      };

      console.log('Submitting announcement data:', announcementData);

      let result;
      
      if (announcement) {
        // Update existing announcement
        result = await supabase
          .from('announcements')
          .update(announcementData)
          .eq('id', announcement.id)
          .select();

        if (result.error) {
          console.error('Update error:', result.error);
          throw result.error;
        }

        console.log('Update success:', result.data);

        toast({
          title: 'Success',
          description: 'Announcement updated successfully',
        });
      } else {
        // Create new announcement
        result = await supabase
          .from('announcements')
          .insert([{
            ...announcementData,
            is_published: true,
            created_at: new Date().toISOString()
          }])
          .select();

        if (result.error) {
          console.error('Insert error:', result.error);
          throw result.error;
        }

        console.log('Insert success:', result.data);

        toast({
          title: 'Success',
          description: 'Announcement created successfully',
        });

        // Reset form for new announcements
        setTitleEs('');
        setTitleEn('');
        setContentEs('');
        setContentEn('');
        setImageUrl('');
      }

      // Invalidate and refetch queries
      await queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      await queryClient.invalidateQueries({ queryKey: ['announcements'] });
      
      if (onSuccess) {
        onSuccess();
      }

    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        title: 'Error',
        description: error.message || 'An error occurred while saving the announcement',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {announcement ? 'Edit Announcement' : 'Create New Announcement'}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Spanish Version
            </CardTitle>
            <CardDescription>
              Content in Spanish (primary language)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <Input
                value={titleEs}
                onChange={(e) => setTitleEs(e.target.value)}
                placeholder="Título del anuncio"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <Textarea
                value={contentEs}
                onChange={(e) => setContentEs(e.target.value)}
                placeholder="Contenido del anuncio"
                rows={6}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              English Version
            </CardTitle>
            <CardDescription>
              Content in English (secondary language)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <Input
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="Announcement title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <Textarea
                value={contentEn}
                onChange={(e) => setContentEn(e.target.value)}
                placeholder="Announcement content"
                rows={6}
                required
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL (optional)
            </label>
            <Input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Add an image URL to display with the announcement
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-amber-600 hover:bg-amber-700"
        >
          {isLoading ? (
            'Saving...'
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              {announcement ? 'Update' : 'Create'} Announcement
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default AnnouncementForm;
