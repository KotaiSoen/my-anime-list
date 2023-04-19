import Image from 'next/image'
import { Sedgwick_Ave_Display } from 'next/font/google';
import AddAnime from '@/COMPONENTS/add_anime';
import { useState } from 'react';

const sedgwick = Sedgwick_Ave_Display({
  weight: ["400"],
  subsets: ["latin"]
});

export default function Home() {

  const [anime, setAnime] = useState<string[]>([]);

  const setAnimeFunction = (animeName: string): void => {
    setAnime((prev) => [...prev, animeName])
  }

  return (
    <main>
        <div className='flex flex-col items-center mt-4'>
          <p className={`${sedgwick.className} text-4xl`}>My Anime List</p>
          <Image className='rounded-3xl mt-5' width={600} height={600} src="/akatsuki.jpeg" alt="Itachi" priority/>
          <p className={`${sedgwick.className} text-2xl mt-4`}>Stack up all the anime you will ever need</p>
        </div>
        <AddAnime setAnimeFunction={setAnimeFunction}/>
        <div>
          {anime?.map((anime) => {
            return (
              <p>{anime}</p>
            )
          })}
        </div>
    </main>
  )
}
