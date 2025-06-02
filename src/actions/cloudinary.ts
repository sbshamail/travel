import { Toastify } from '@/components/toast/Toastify';

export const uploadToCloudinary = async (uri: string, folder?: string): Promise<string> => {
  const data = new FormData();
  // Get the correct MIME type based on file extension (optional)
  const mimeType = uri.endsWith('.png')
    ? 'image/png'
    : uri.endsWith('.webp')
      ? 'image/webp'
      : uri.endsWith('.heic')
        ? 'image/heic'
        : 'image/jpeg'; // default

  data.append('file', {
    uri,
    type: mimeType,
    name: `upload_${Date.now()}.jpg`,
  } as any);
  //  upload preset name from dashboard
  data.append('upload_preset', 'ml_default');
  if (folder) {
    data.append('folder', folder);
  }

  const res = await fetch('https://api.cloudinary.com/v1_1/ddsoxxfqd/image/upload', {
    method: 'POST',
    body: data,
  });

  if (!res.ok) {
    Toastify('error', 'Cloudinary upload failed');
    throw new Error('Cloudinary upload failed');
  }

  const json = await res.json();
  return json.secure_url;
};
