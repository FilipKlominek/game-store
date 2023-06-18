import {Inter} from 'next/font/google'
import {NavBar} from "@/components/layout/navBar";
import {GenreList} from "@/components/layout/genres";
import {AddGenre} from "@/components/forms/addGenre";
import {useEffect, useState} from "react";

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
                    <h1 className='text-4xl font-bold'>Genres</h1>
                    <AddGenre/>
                </div>
                <GenreList/>
            </>
        )
    }

    return (


        <>
            <NavBar/>
            <Genres/>
        </>
    )
}
