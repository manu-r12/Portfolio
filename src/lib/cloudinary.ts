export const cloudinaryConfig = {
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    folder: 'Gallery_photogrophy'
  },
};

export const getCloudinaryUrl = (publicId: string, options = {}) => {
  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloud.cloudName}/image/upload`;
  const transformations = Object.entries(options)
    .map(([key, value]) => `${key}_${value}`)
    .join(',');
  
  return `${baseUrl}/${transformations ? transformations + '/' : ''}${publicId}`;
};


const downloadImage = async (publicId: string) => {
  const response = await fetch(`/api/cloudinary?folder=${cloudinaryConfig.cloud.folder}`);
  if (!response.ok) throw new Error('Failed to fetch images');
  const data = await response.json();
  return data.resources.map((resource: any) => ({
    id: resource.public_id,
    src: resource.public_id, 
    width: resource.width,
    height: resource.height,
  }));

};

export async function getCloudinaryImages() {
  try {
    const response = await fetch(`/api/cloudinary?folder=${cloudinaryConfig.cloud.folder}`);
    if (!response.ok) throw new Error('Failed to fetch images');
    const data = await response.json();
    return data.resources.map((resource: any) => ({
      id: resource.public_id,
      src: resource.public_id,
      width: resource.width,
      height: resource.height,
    }));
  } catch (error) {
    console.error('Error fetching Cloudinary images:', error);
    return [];
  }
} 