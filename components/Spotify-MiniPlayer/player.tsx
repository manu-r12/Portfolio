import React, { useEffect, useState } from 'react'
import styles from './player.module.scss'
import Image from 'next/image'
import { BsSpotify } from 'react-icons/bs'
import {  LastPlayedSong, SpotifyData, getAccessToken, getNowPlaying, getRecentlyPlayed } from './spotifyAPI'


const Player = () => {

    const [currentSong, setCurrentSong] = useState<SpotifyData | null>()
    const [lastPlayedSong, setLastPlayedSong] = useState<LastPlayedSong | null>()


    useEffect(() => {
        const fetchData = async () => {
           const {access_token} = await getAccessToken()
           const currentSongData = await getNowPlaying(access_token)
           const lastPlayed = await getRecentlyPlayed(access_token)
           console.log(currentSongData)
           console.log("Last Played = >", lastPlayed)
           setCurrentSong(currentSongData)
           setLastPlayedSong(lastPlayed)
  
        };
    
        fetchData();
      }, []);



  return (
    <div className={styles.container}>
        <div className='flex flex-row items-start gap-20 justify-between pr-3 pl-3 pt-3'>
            <BsSpotify className='ml-1' size={"1.3em"} />
            <p>Currently Playing</p>
        </div>
        <div className='p-4 flex flex-row items-center gap-4'>
            <div className='h-11 w-11 relative object-fill overflow-hidden'>
                {currentSong && <Image src={currentSong?.item.album.images[0].url} fill alt='ts'/>}
            </div>
            <div className={styles.artistInfo}>
                <div>
                    <p>{currentSong?.item.name}</p>
                    <p>By Taylor Swift</p>
                </div>
                <div>
                <div className={styles.bars}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>
                </div>
              
         
            </div>
           
        </div>
    </div>
  )
}

export default Player

