/*
  ImageUpload — client component for uploading product images.
  Uploads directly to Supabase Storage from the browser and
  returns the public URL(s) to the parent form.
*/
"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  bucket?: string;
  folder?: string;
}

export default function ImageUpload({
  value,
  onChange,
  bucket = "product-images",
  folder = "products",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    setError("");
    const supabase = createClient();
    const newUrls: string[] = [];

    for (const file of files) {
      // Generate a unique filename to prevent collisions
      const ext = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (uploadError) {
        setError(`Failed to upload ${file.name}: ${uploadError.message}`);
        continue;
      }

      if (data) {
        const {
          data: { publicUrl },
        } = supabase.storage.from(bucket).getPublicUrl(data.path);
        newUrls.push(publicUrl);
      }
    }

    onChange([...value, ...newUrls]);
    setUploading(false);
    // Reset the file input so the same file can be re-selected if needed
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeUrl = (urlToRemove: string) => {
    onChange(value.filter((u) => u !== urlToRemove));
  };

  return (
    <div>
      {/* Preview grid */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-3">
          {value.map((url, i) => (
            <div key={url} className="relative group w-24 h-24">
              <img
                src={url}
                alt={`Product image ${i + 1}`}
                className="w-full h-full object-cover rounded-lg border border-[#E8E8E8]"
              />
              {i === 0 && (
                <span className="absolute bottom-0 left-0 right-0 bg-brand-blue/80 text-white text-[10px] font-heading text-center py-0.5 rounded-b-lg">
                  Primary
                </span>
              )}
              <button
                type="button"
                onClick={() => removeUrl(url)}
                aria-label={`Remove image ${i + 1}`}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-red-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload area */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-[#E8E8E8] rounded-lg text-sm font-body text-gray-500 hover:border-brand-blue/40 hover:text-brand-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Uploading…
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            {value.length === 0 ? "Upload Images" : "Add More Images"}
          </>
        )}
      </button>

      {error && <p className="mt-2 text-xs text-red-600 font-body">{error}</p>}
      <p className="mt-1 text-xs text-gray-400 font-body">
        JPEG, PNG, or WebP. Max 10MB per image. First image is the primary.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
