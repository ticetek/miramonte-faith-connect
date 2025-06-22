
-- Update RLS policies for announcements to allow admins to create announcements
-- First, let's check the current policies and update them

-- Drop the existing policy for admins if it exists
DROP POLICY IF EXISTS "Admins can manage announcements" ON public.announcements;

-- Create separate policies for different operations to be more specific
CREATE POLICY "Admins can select announcements" 
  ON public.announcements 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert announcements" 
  ON public.announcements 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update announcements" 
  ON public.announcements 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete announcements" 
  ON public.announcements 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );
