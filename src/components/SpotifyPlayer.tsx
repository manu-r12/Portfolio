'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { getSpotifyMusicStatus, SpotifyMusicStatus, CurrentMusic, LastPlayedSong } from '@/spotify/SpotifyAPI';
import { AnimatePresence, motion } from 'framer-motion';

export default function SpotifyPlayer() {
  const [musicStatus, setMusicStatus] = useState<SpotifyMusicStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const fetchMusicStatus = async () => {
      try {
        const status = await getSpotifyMusicStatus();
        setMusicStatus(status);
      } catch (error) {
        console.error('Error fetching Spotify status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMusicStatus();
    const interval = setInterval(fetchMusicStatus, 10000); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setIsCardOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-3 bg-white/90 rounded-lg px-4 py-3 animate-pulse">
        <div className="w-10 h-10 bg-gray-200 rounded"></div>
        <div className="space-y-2">
          <div className="h-2 w-32 bg-gray-200 rounded"></div>
          <div className="h-2 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const currentTrack = musicStatus?.currentPlaying?.item || musicStatus?.recentPlayed;
  if (!currentTrack) return null;

  const artistNames = 'artists' in currentTrack 
    ? currentTrack.artists.map((artist: { name: string }) => artist.name).join(', ')
    : currentTrack.album.artists.map((artist: { name: string }) => artist.name).join(', ');

  const isPlaying = musicStatus?.currentPlaying?.is_playing;

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  return (
    <>
      {/* Full Spotify Player (visible on sm and larger screens) */}
      <div className="group relative bg-white/90 hover:bg-white rounded-lg px-4 py-3 sm:px-4 sm:py-3 transition-all duration-300 hover:scale-105 sm:hover:scale-105 shadow-sm overflow-visible hidden sm:block">
        <a
          href={currentTrack.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3"
        >
          <div className="relative w-10 h-10 rounded overflow-hidden">
            <Image
              src={currentTrack.album.images[0].url}
              alt={currentTrack.name}
              fill
              className="object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-1 h-3 bg-white rounded-full animate-[music_1s_ease-in-out_infinite]"></div>
                  <div className="w-1 h-3 bg-white rounded-full animate-[music_1s_ease-in-out_0.2s_infinite]"></div>
                  <div className="w-1 h-3 bg-white rounded-full animate-[music_1s_ease-in-out_0.4s_infinite]"></div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900 truncate max-w-[180px] sm:max-w-[180px]">
              {currentTrack.name}
            </span>
            <span className="text-xs text-gray-500 truncate max-w-[180px] sm:max-w-[180px]">
              {artistNames}
            </span>
          </div>
          <div className="ml-2">
            <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </div>
        </a>

        {/* Hover content - positioned above */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 flex flex-row items-center justify-center space-x-4 p-2 bg-white border border-gray-200 text-gray-800 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md whitespace-nowrap">
          <span className="font-medium">
            {isPlaying ? 'Currently Playing' : 'Recently Played'}
          </span>
          <a
            href="https://open.spotify.com/user/31i4bnc4eho2s2eurc7uvr5olgfq?si=b9f6729d1c7a45fb" // TODO: Replace with actual Spotify profile URL
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2 py-0.5 border border-gray-300 rounded-sm text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Follow
          </a>
        </div>
      </div>

      {/* Spotify Icon (visible on extra small screens) */}
      <a
        ref={iconRef}
        onClick={() => setIsCardOpen(!isCardOpen)}
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 block sm:hidden bg-green-500 text-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer"
        aria-label="Spotify music status and follow link"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </a>

      {/* Small Screen Info Card */}
      <AnimatePresence>
        {isCardOpen && !isLoading && (
          <motion.div
            ref={cardRef}
            key="spotify-card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-20 right-4 z-50 bg-white border border-gray-200 text-gray-800 text-xs rounded-lg shadow-lg p-3 flex flex-col space-y-2 max-w-[200px]"
          >
            <span className="font-semibold text-gray-900">
              {isPlaying ? 'Currently Playing:' : 'Recently Played:'}
            </span>
            <a
              href={currentTrack.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-8 h-8 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={currentTrack.album.images[0].url}
                  alt={currentTrack.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                 <span className="text-sm font-medium text-gray-900 truncate">
                  {currentTrack.name}
                </span>
                <span className="text-xs text-gray-500 truncate">
                  {artistNames}
                </span>
              </div>
            </a>
            <a
              href="https://open.spotify.com/user/31i4bnc4eho2s2eurc7uvr5olgfq?si=b9f6729d1c7a45fb" // TODO: Replace with actual Spotify profile URL
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-2 py-1 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors mt-2"
              onClick={(e) => e.stopPropagation()}
            >
              Follow on Spotify
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 