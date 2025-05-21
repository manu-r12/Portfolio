export interface Photo {
    id: string;
    src: string;
    alt: string;
    width: number;
    height: number;
    category: string;
  }
  
export const photos: Photo[] = [
    {
      id: '1',
      src: '/photography/photo1.jpg',
      alt: 'Mountain landscape',
      width: 1200,
      height: 800,
      category: 'nature'
    },
    {
      id: '2',
      src: '/photography/photo2.jpg',
      alt: 'Urban scene',
      width: 800,
      height: 1200,
      category: 'urban'
    },
    {
      id: '3',
      src: '/photography/photo3.jpg',
      alt: 'Portrait photography',
      width: 1200,
      height: 800,
      category: 'portrait'
    },
    {
      id: '4',
      src: '/photography/photo4.jpg',
      alt: 'Nature scene',
      width: 1200,
      height: 900,
      category: 'nature'
    },
    {
      id: '5',
      src: '/photography/photo5.jpg',
      alt: 'Urban architecture',
      width: 800,
      height: 1200,
      category: 'urban'
    },
    {
      id: '6',
      src: '/photography/photo6.jpg',
      alt: 'Portrait close-up',
      width: 1200,
      height: 800,
      category: 'portrait'
    },
    {
      id: '7',
      src: '/photography/photo7.jpg',
      alt: 'Nature waterfall',
      width: 900,
      height: 1200,
      category: 'nature'
    },
    {
      id: '8',
      src: '/photography/photo8.jpg',
      alt: 'Urban street',
      width: 1200,
      height: 800,
      category: 'urban'
    },
    {
      id: '9',
      src: '/photography/photo9.jpg',
      alt: 'Portrait in nature',
      width: 800,
      height: 1200,
      category: 'portrait'
    },
  ];