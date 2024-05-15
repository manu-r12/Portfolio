import { CurrentMusic } from "@/spotify/SpotifyAPI"
import styles from "./player.module.scss"
import Image from "next/image"
import { clipText } from "@/utils/TextCliper"
import { BsSpotify } from "react-icons/bs"
import { ThreeDotsLoading } from "../UI/Indicators/Loading"



const CurrentlyPlaying: React.FC<{ currentSong: CurrentMusic  | null | undefined }> = ({currentSong}) => {
  return (
    <div>
         <div className='flex flex-row items-start gap-20 justify-between pr-3 pl-3 pt-3'>
            <span className='flex gap-2 items-start text-sm text-green-400'><BsSpotify color='#1bd760' className='ml-1' size={"1.3em"} />Spotify</span>
            <p>Currently Playing</p>
        </div>
        {/* <div className='w-full h-1 mt bg-slate-300'/> */}
        <div className='p-4 flex flex-row  items-center gap-4'>
            <div className='h-11 w-11 relative object-fill overflow-hidden'>
                {currentSong ? <Image placeholder="blur" blurDataURL={currentSong?.item.album.images[0].url} src={currentSong?.item.album.images[0].url} fill alt='song_img'/> :  <ThreeDotsLoading/>}
            </div>
            <div className={styles.artistInfo}>
                <div className='w-40'>
                    <p>{currentSong && clipText(currentSong?.item.name)}</p>
                    <p>By {currentSong?.item.album.artists[0].name}</p>
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

export default CurrentlyPlaying
