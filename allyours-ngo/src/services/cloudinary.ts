/**
 * Client-side upload to Cloudinary (unsigned preset). Upload completes before you persist the URL in Firestore.
 */
export async function uploadImageToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary is not configured (NEXT_PUBLIC_CLOUDINARY_* env vars).')
  }

  const body = new FormData()
  body.append('file', file)
  body.append('upload_preset', uploadPreset)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Cloudinary upload failed')
  }

  const data = (await res.json()) as { secure_url?: string }
  if (!data.secure_url) throw new Error('Cloudinary response missing secure_url')
  return data.secure_url
}
