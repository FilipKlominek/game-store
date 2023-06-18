import {Genre} from "@/Models/Genre";
import {useEffect, useState} from "react";
import {describe} from "node:test";
import Login from "@/pages/login";


export function GenreList() {
    const handleDelete = async (id: number) => {
        const response = await fetch('http://localhost:3000/genres/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('sessionToken').toString(),
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        location.reload();
    }



    interface StateProps {
        id: number;
        name: string;
    }

    const placeholder: Genre[] = [new Genre(0, 'genre0'), new Genre(1, 'genre1')]; //TODO: remove

    let data: Genre[] = [];


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

                data = result;

            } else console.log('not ok')
        });
        console.log(result)

    }

    getGenres()



    //TODO: data instead of placeholder
    const genreList = placeholder.map(genre =>
        <li key={genre.id} className='border-b flex justify-between'>
            <button className='pb-3 pt-3 pl-1 pr-1 hover:bg-gray-800' onClick={() => handleDelete(genre.id)}>×
            </button>
            <span className='pb-3 pt-3 pl-1 pr-1'>{genre.id}</span>
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