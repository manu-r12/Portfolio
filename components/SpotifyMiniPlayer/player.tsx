import React, { useEffect, useState } from 'react'
import styles from './player.module.scss'
import Image from 'next/image'
import { BsSpotify } from 'react-icons/bs'
import {  LastPlayedSong, CurrentMusic, getAccessToken, getNowPlaying, getRecentlyPlayed } from '../../spotify/SpotifyAPI'
import { clipText } from '@/utils/TextCliper'
import CurrentlyPlaying from './currentlyPlaying'
import RecentlyPlayedSong from './lastPlayedSong'


const Player = () => {

    const [currentSong, setCurrentSong] = useState<CurrentMusic | null>()
    const [lastPlayedSong, setLastPlayedSong] = useState<LastPlayedSong | null>()


    useEffect(() => {
        const fetchData = async () => {
            
           const {access_token} = await getAccessToken()
        
           const currentSongData = await getNowPlaying(access_token)
           const lastPlayed = await getRecentlyPlayed(access_token)
  
           setCurrentSong(currentSongData)
           setLastPlayedSong(lastPlayed)
  
        };
        // setInterval(() => {
            fetchData();
        //   }, 1000);
       
      }, []);



  return (
    <div className={styles.container}>
        {currentSong ? <><CurrentlyPlaying currentSong={currentSong}  /></> : <RecentlyPlayedSong lastPlayedSong={lastPlayedSong}/> }
    </div>
  )
}

export default Player

