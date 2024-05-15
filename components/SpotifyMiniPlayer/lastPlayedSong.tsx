import { LastPlayedSong } from "@/spotify/SpotifyAPI"
import styles from "./player.module.scss"
import Image from "next/image"
import { clipText } from "@/utils/TextCliper"
import { BsSpotify } from "react-icons/bs"
import { FaHistory } from "react-icons/fa";
import { ThreeDotsLoading } from "../UI/Indicators/Loading"




const RecentlyPlayedSong: React.FC<{ lastPlayedSong: LastPlayedSong  | null | undefined }> = ({lastPlayedSong}) => {
  return (
    <div>

      <div className='flex flex-row items-start gap-20 justify-between pr-3 pl-3 pt-3'>
        <span className='flex gap-2 items-start text-sm text-green-400'>
        <BsSpotify color='#1bd760' className='ml-1' size={"1.3em"} />
          Spotify
        </span>
        <p>{lastPlayedSong ? "Recently Played" : "Loading"}</p>
        </div>
  
        <div className='p-4 flex flex-row  items-center gap-4'>
            <div className='h-11 w-11 relative object-fill overflow-hidden'>
                {lastPlayedSong ? 
                placeholder="blur" blurDataURL={lastPlayedSong?.album.images[0].url} 
                <Image src={lastPlayedSong?.album.images[0].url} fill alt='song_img'/> 
                : <ThreeDotsLoading/>
                }
            </div>
            <div className={styles.artistInfo}>
                <div className='w-40'>
                    <p>{lastPlayedSong ? 
                    clipText(lastPlayedSong.name) 
                    : "Fetching.."}</p>
                    <p>{lastPlayedSong && "By "}{lastPlayedSong 
                    ? clipText(lastPlayedSong.artists[0].name) 
                    : "Fetching.."}</p>
                </div>
                <div>
                  {lastPlayedSong && <FaHistory color="#1bd760"/>}
                </div>
            </div>
           
        </div>
    </div>
  )
}

export default RecentlyPlayedSong
