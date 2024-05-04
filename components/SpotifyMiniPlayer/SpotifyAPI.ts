import axios from "axios";
import querystring from "querystring";

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

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
 
export const getAccessToken = async () => 
  {
    const response = await axios.post(TOKEN_ENDPOINT, querystring.stringify({
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
    console.log(access_token)
    try {
      const response = await axios.get<CurrentMusic>(NOW_PLAYING_ENDPOINT, {
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
      console.log("Error:", error);
      return null
    }
};



 export const getRecentlyPlayed = async (accessToken: string) : Promise < LastPlayedSong | null > => 
 {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const lastPlayedSong: LastPlayedSong = response.data.items[0].track;
      console.log("Last played song:", lastPlayedSong);
      return lastPlayedSong;
    } catch (error) {
      console.error('Error getting last played song:', error);
      return null;
    }
  };
  