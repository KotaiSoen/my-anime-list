import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosCloseCircleOutline } from 'react-icons/io'


export default function AddAnime({setAnimeFunction}: {setAnimeFunction: any}) {

    const [anime, setAnime] = useState('');

    const [addAnimeClicked, setAddAnimeClicked] = useState(false);

    const createAnime = (anime: string) => {
        setAnimeFunction(anime)
        setAddAnimeClicked(false);
        setAnime('');
    }

    const addAnime = () => {
        setAddAnimeClicked(true);
    }

    const closeAnime = () => {
        setAddAnimeClicked(false);
    }

    const handleInputChange = (event: any) => {
        setAnime(event.target.value);
    }

    return (
        <div>
            <button onClick={addAnime} className='border-white border-2 h-12 w-48 rounded-full flex justify-center items-center my-10'>
                <AiOutlinePlus />
                <p className='mx-1'>Add a new anime</p>
            </button>
            {addAnimeClicked && 
                <div className='flex items-center'>
                    <input value={anime} onChange={handleInputChange} className="bg-gray-200 text-black px-5 h-12 w-48 rounded-full flex justify-center items-center" type="text" />
                    <button onClick={() => createAnime(anime)} className='w-16 h-12 border-2 border-white ml-4 rounded-full'>Add</button>
                    <IoIosCloseCircleOutline className="cursor-pointer ml-4" size={30} onClick={closeAnime}/>
                </div>
            }
        </div>
    )
}