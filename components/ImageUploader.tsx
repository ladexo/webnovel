'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
  folder?: string;
}

export default function ImageUploader({ onImageUploaded, folder = 'covers' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage
      .from('novel-images')
      .upload(fileName, file);
    if (error) {
      alert('Upload error: ' + error.message);
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage
      .from('novel-images')
      .getPublicUrl(fileName);
    onImageUploaded(urlData.publicUrl);
    setUploading(false);
  };

  return (
        >div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-[#FFD700] transition-colors">
          >input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
          id="image-upload"
        />
                  >label
          htmlFor="image-upload"
          className="cursor-pointer block"
        >
          {uploading ? (
                      >p className="text-[#FFD700]">Uploading...>/p>
                    ) : (
                      >>
                        >p className="text-gray-400 mb-2">Click to upload image>/p>
              >p className="text-gray-600 text-sm">PNG, JPG, WEBP up to 10MB>/p>
            >/>
          )}
      >/label>
    >/div>
  );
}
