'use client';
import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';

interface ImageUploaderProps {
  bucket: string;
  folder: string;
  onUpload: (url: string) => void;
}

export default function ImageUploader({ bucket, folder, onUpload }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (error) {
      alert('Upload error: ' + error.message);
      setUploading(false);
      setPreview(null);
      return;
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
    onUpload(urlData.publicUrl);
    setUploading(false);
  };

  return (
    <div>
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
        ) : (
          <div>
            <p className="text-gray-400 text-lg mb-2">Click to upload image</p>
            <p className="text-gray-600 text-sm">PNG, JPG, WebP up to 10MB</p>
          </div>
        )}
        {uploading && <p className="text-primary mt-2 animate-pulse">Uploading...</p>}
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
    </div>
  );
}
