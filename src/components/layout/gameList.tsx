import {useEffect, useState} from "react";
import {Game} from "@/Models/Game";


export function GameList() {

    const [data, setData] = useState<Game[]>([]);

    const placeholder: Game[] = [new Game(0, 'game0', 60), new Game(1, 'game1', 20)];

    const getGames = async () => {
        const result: Game[] = [];

        const response = await fetch('http://localhost:3000/games', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('sessionToken').toString(),
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(async (response) => {
            if (response.ok) {


                for (const i of await response.json()) {
                    result.push(new Game(i.id, i.name, i.price, i.sale, i.publisher, i.developer, i.releaseDate, i.genres));
                }

                setData(result);
            }
        });

    }

    useEffect(() => {
        getGames()
    }, []);


    //data instead of placeholder, but there are no games
    const gameList = placeholder.map(game =>
        <li key={game.id} className='border-b flex justify-between'>
            <span className='pb-3 pt-3 pl-1 pr-1 text-gray-400'>{game.id}</span>
            <div className='flex'>
                <span className='pb-3 pt-3 pl-1 pr-1'>{game.name}</span>
                <span className='pb-3 pt-3 pl-1 pr-1'>{game.price},-</span>
            </div>

        </li>
    );

    return (

        <div className='flex flex-col items-center'>
            <ul>
                {gameList}
            </ul>
        </div>

    )
}