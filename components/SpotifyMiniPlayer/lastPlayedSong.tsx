import { LastPlayedSong } from "@/spotify/SpotifyAPI"
import styles from "./player.module.scss"
import Image from "next/image"
import { clipText } from "@/utils/TextCliper"
import { BsSpotify } from "react-icons/bs"


const RecentlyPlayedSong: React.FC<{ lastPlayedSong: LastPlayedSong  | null | undefined }> = ({lastPlayedSong}) => {
  return (
    <div>
      <div className='flex flex-row items-start gap-20 justify-between pr-3 pl-3 pt-3'>
        <span className='flex gap-2 items-start text-sm text-green-400'><BsSpotify color='#1bd760' className='ml-1' size={"1.3em"} />Spotify</span>
        <p>{lastPlayedSong ? "Recently Played" : "Loading"}</p>
        </div>
        {/* <div className='w-full h-1 mt bg-slate-300'/> */}
        <div className='p-4 flex flex-row  items-center gap-4'>
            <div className='h-11 w-11 relative object-fill overflow-hidden'>
                {lastPlayedSong && <Image src={lastPlayedSong?.album.images[0].url} fill alt='song_img'/>}
            </div>
            <div className={styles.artistInfo}>
                <div className='w-40'>
                    <p>{lastPlayedSong ? clipText(lastPlayedSong.name) : "Fetching.."}</p>
                    <p>{lastPlayedSong && "By"}{lastPlayedSong ? clipText(lastPlayedSong.artists[0].name) : "Fetching.."}</p>
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

export default RecentlyPlayedSong