import axios from "axios";
import querystring from "querystring";

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN

const ENDPOINTS = {
    NOW_PLAYING_ENDPOINT : 'https://api.spotify.com/v1/me/player/currently-playing',
    TOKEN_ENDPOINT : 'https://accounts.spotify.com/api/token',
    RECENTLY_PLAYED_ENDPOINT: 'https://api.spotify.com/v1/me/player/recently-played'
}

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

export interface CurrentMusic 
{
    is_playing: boolean;
    item: {
      name: string;
      album: {
        name: string;
        artists: Array<{ name: string }>;
        images: [{ url: string }];
      };
      external_urls: {
        spotify: string;
      };
    };
    currently_playing_type: string;
}


export interface LastPlayedSong 
{
    id: string;
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string }>;
    };
    external_urls: {
      spotify: string;
    };
}


export interface SpotifyMusicStatus {
  currentPlaying: CurrentMusic | null
  recentPlayed: LastPlayedSong | null
}
 
export const getAccessToken = async () => 
  {
    const response = await axios.post(ENDPOINTS.TOKEN_ENDPOINT, querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }), {
      headers: {
        'Authorization': `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  
    return response.data;
};

  
export const getNowPlaying = async ( access_token: string ) : Promise < CurrentMusic | null > => 
{
    try {
      const response = await axios.get<CurrentMusic>(ENDPOINTS.NOW_PLAYING_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
  
      if (response.status > 400) {
        throw new Error('Unable to Fetch Song');
      } else if (response.status === 204) {
        throw new Error('Currently Not Playing');
      }
        const song = response.data;
      return song
    } catch (error) {
      return null
    }
};



 export const getRecentlyPlayed = async (accessToken: string) : Promise < LastPlayedSong | null > => 
 {
    try {
      const response = await axios.get(ENDPOINTS.RECENTLY_PLAYED_ENDPOINT, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const lastPlayedSong: LastPlayedSong = response.data.items[0].track;
      return lastPlayedSong;
    } catch (error) {
      console.error('Error getting last played song:', error);
      return null;
    }
  };

export const getSpotifyMusicStatus = async () : Promise<SpotifyMusicStatus> => {
  const {access_token} = await getAccessToken()
  const currentPlaying = await getNowPlaying(access_token)
  const recentPlayed   = await getRecentlyPlayed(access_token)

 
  return {currentPlaying, recentPlayed}
}  
  