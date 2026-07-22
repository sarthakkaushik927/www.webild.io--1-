import { supabase } from '../lib/supabase';

export const uploadService = {
  async uploadImage(file: File): Promise<{ url: string; name: string }> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}${fileExt ? `.${fileExt}` : ''}`;

    const { error } = await supabase.storage
      .from('media')
      .upload(fileName, file, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error('Upload error:', error);
      throw new Error(error.message || 'Upload failed');
    }

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(fileName);

    return {
      url: publicUrl,
      name: file.name,
    };
  },
};
