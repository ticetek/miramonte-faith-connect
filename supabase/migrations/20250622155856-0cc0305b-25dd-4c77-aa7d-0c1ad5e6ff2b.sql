
-- Create announcements table for church news and updates
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_es TEXT NOT NULL,
  title_en TEXT NOT NULL,
  content_es TEXT NOT NULL,
  content_en TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_published BOOLEAN NOT NULL DEFAULT true
);

-- Create newsletter subscriptions table
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  preferred_language TEXT NOT NULL DEFAULT 'es' CHECK (preferred_language IN ('es', 'en')),
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Create profiles table for admin users
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for announcements
CREATE POLICY "Anyone can view published announcements" 
  ON public.announcements 
  FOR SELECT 
  USING (is_published = true);

CREATE POLICY "Admins can manage announcements" 
  ON public.announcements 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for newsletter subscriptions
CREATE POLICY "Anyone can subscribe to newsletter" 
  ON public.newsletter_subscriptions 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admins can view subscriptions" 
  ON public.newsletter_subscriptions 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'user');
  RETURN new;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert sample announcements (in both languages)
INSERT INTO public.announcements (title_es, title_en, content_es, content_en, is_published) VALUES
(
  'Bienvenidos a Nuestra Nueva Página Web',
  'Welcome to Our New Website',
  'Nos complace anunciar el lanzamiento de nuestro nuevo sitio web. Aquí encontrarás información actualizada sobre nuestros servicios, actividades y eventos especiales.',
  'We are pleased to announce the launch of our new website. Here you will find updated information about our services, activities and special events.',
  true
),
(
  'Servicios de Semana Santa 2024',
  'Easter Week Services 2024',
  'Únete a nosotros durante esta Semana Santa para reflexionar sobre el sacrificio de Cristo. Servicios especiales todos los días a las 7:00 PM.',
  'Join us during this Easter Week to reflect on Christ''s sacrifice. Special services every day at 7:00 PM.',
  true
),
(
  'Proyecto Albergue Adventista',
  'Adventist Shelter Project',
  'Conoce más sobre nuestro proyecto comunitario del Albergue Adventista. Una iniciativa para ayudar a las familias necesitadas en nuestra comunidad.',
  'Learn more about our community project, the Adventist Shelter. An initiative to help families in need in our community.',
  true
);
