import {Inter} from 'next/font/google'
import {NavBar} from "@/components/layout/navBar";
import {GenreList} from "@/components/layout/genreList";
import {AddGenre} from "@/components/forms/addGenre";
import {useEffect, useState} from "react";
import {GameList} from "@/components/layout/gameList";
import {AddGame} from "@/components/forms/AddGame";
import Link from "next/link";

const inter = Inter({subsets: ['latin']})

export default function Home() {

    const [isAuthorised, setIsAuthorised] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('sessionToken') === null) {
            localStorage.setItem('sessionToken', '');
        }

        setIsAuthorised(localStorage.getItem('sessionToken') != '');
    }, []);

    function Genres() {
        if (!isAuthorised) {
            return <></>
        }
        return (
            <>
                <div className='flex flex-col items-center'>
                    <h2 className='text-4xl font-bold'>Genres</h2>
                    <AddGenre/>
                </div>
                <GenreList/>
            </>
        )
    }

    function Games() {
        if (!isAuthorised) {
            return (
                <div className='flex flex-col items-center'>
                    <span className='text-gray-400'><Link className='hover:text-white underline' href='/login'>Log in</Link> to view contents</span>
                </div>
            )
        }
        return (
            <>
                <div className='flex flex-col items-center'>
                    <h2 className='text-4xl font-bold mt-20'>Games</h2>
                    <AddGame/>
                </div>
                <GameList/>
            </>
        )
    }


    return (


        <>
            <NavBar/>
            <Genres/>
            <Games/>
        </>
    )
}
