import Image from 'next/image'
import { Sedgwick_Ave_Display } from 'next/font/google';
import AddAnime from '@/COMPONENTS/add_anime';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

const sedgwick = Sedgwick_Ave_Display({
  weight: ["400"],
  subsets: ["latin"]
});

export default function Home() {

  interface Anime {
    id: string
    name: string
    userId: string
  }

  const [anime, setAnime] = useState<Anime[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const setAnimeFunction = async (animeName: string) => {
    const animeNames = anime.map(anime => {
      return anime.name.toLowerCase();
    })
    if(animeNames.includes(animeName.toLowerCase())) {
      alert('Anime already exists');
      return;
    }
    setLoading(true);
    const response = await fetch('/api/getPosts', {
      method: 'POST',
      body: JSON.stringify({ anime: animeName }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    setAnime((prev) => [...prev, data]);
    setLoading(false);
  }

  const getAnimes = async () => {
    setLoading(true)
    const response = await fetch('/api/getPosts');

    const data = await response.json();
    setAnime(data);
    setLoading(false);
  }

  const deleteAnime = async (id: string) => {
    setAnime(prev => prev.filter(anime => anime.id !== id));
    const response = await fetch(`/api/getPosts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();

  }

  useEffect(() => {
    getAnimes();
  }, [])

  return (
    <main>
      <div className='flex flex-col items-center mt-4'>
        <p className={`${sedgwick.className} text-4xl`}>My Anime List</p>
        <Image className='rounded-3xl mt-5' width={600} height={600} src="/akatsuki.jpeg" alt="Itachi" priority />
        <p className={`${sedgwick.className} text-2xl mt-4`}>Stack up all the anime you will ever need</p>
      </div>
      <AddAnime setAnimeFunction={setAnimeFunction} />
      {loading ?
        <div className='animate-spin w-10 h-10 bg-white mx-auto my-5'></div> :
        <div className='grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {anime?.map((anime, index) => {
            return (
              <div key={anime.id} className='flex w-fit items-center rounded-lg bg-black mt-8 p-2'>
                <p>{index + 1}.</p>
                <p className='mx-4'>{anime.name}</p>
                <button className='bg-gray-500 p-1 rounded' onClick={() => deleteAnime(anime.id)}>delete</button>
              </div>
            )
          })}
        </div>
      }
    </main>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: { session }
  }
}
