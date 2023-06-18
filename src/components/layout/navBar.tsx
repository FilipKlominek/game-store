import Link from "next/link";
import {useEffect, useState} from "react";


export function NavBar() {

    const [email, setEmail] = useState('');

     useEffect(() => {

        if (localStorage.getItem('email') !== null) {
            // @ts-ignore
            setEmail(localStorage.getItem('email'));
        }

    }, [email]);

    const logout = () => {
        localStorage.removeItem('email');
        localStorage.setItem('sessionToken', '');
        location.reload();
    }

    function LogoutButton() {
        if (email != '') {
            return <button onClick={logout} className='p-4 hover:bg-gray-800' type='submit'>Logout</button>;
        } return <></>
    }

    return (
        <div className='flex justify-between'>
            <div className='flex items-center'>
                <Link className='p-4 hover:bg-gray-800' href='/'>Home</Link>
                <Link className='p-4 hover:bg-gray-800' href='/login'>Login</Link>
                <Link className='p-4 hover:bg-gray-800' href='/register'>Register</Link>
            </div>
            <div className='flex items-center'>
                {email}
                <LogoutButton/>
            </div>
        </div>
    )
}