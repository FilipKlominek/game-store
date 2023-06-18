import {Genre} from "@/Models/Genre";
import {useEffect, useState} from "react";

export function GenreList() {
    const handleDelete = async (id: number) => {
        console.log(id)
        const response = await fetch('http://localhost:3000/genres/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('sessionToken').toString(),
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(response => response.json().then(response => console.log(response))); // 500, Internal server error
        location.reload();
    }

    const [data, setData] = useState<Genre[]>([]);


    const getGenres = async () => {
        const result: Genre[] = [];

        const response = await fetch('http://localhost:3000/genres', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('sessionToken').toString(),
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(async (response) => {
            if (response.ok) {


                for (const i of await response.json()) {
                    result.push(new Genre(i.id, i.name));
                }

                setData(result);
            }
        });

    }

    useEffect(() => {
        getGenres()
    }, []);


    const genreList = data.map(genre =>
        <li key={genre.id} className='border-b flex justify-between'>
            <div>
            <button className='pb-3 pt-3 pl-1 pr-1 hover:bg-gray-800' onClick={() => handleDelete(genre.id)}>×
            </button>

                <span className='pb-3 pt-3 pl-1 pr-1 text-gray-400'>{genre.id}</span>
            </div>
                <span className='pb-3 pt-3 pl-1 pr-1'>{genre.name}</span>

        </li>
    );

    return (

        <div className='flex flex-col items-center'>
            <ul>
                {genreList}
            </ul>
        </div>

    )

}