'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getSpotifyMusicStatus, SpotifyMusicStatus, CurrentMusic, LastPlayedSong } from '@/spotify/SpotifyAPI';

export default function SpotifyPlayer() {
  const [musicStatus, setMusicStatus] = useState<SpotifyMusicStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <a
      href={currentTrack.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-3 bg-white/90 hover:bg-white rounded-lg px-4 py-3 transition-all duration-300 hover:scale-105 shadow-sm"
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
        <span className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
          {currentTrack.name}
        </span>
        <span className="text-xs text-gray-500 truncate max-w-[180px]">
          {artistNames}
        </span>
      </div>
      <div className="ml-2">
        <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </div>
    </a>
  );
} 