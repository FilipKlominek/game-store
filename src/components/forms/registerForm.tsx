import {ChangeEvent, SyntheticEvent, useState} from 'react';

export function RegisterForm() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                'email': email,
                'password': password,
                'username': name
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(async response => await response.json());

        location.reload();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    <input className='m-2 p-2 bg-black border border-white' placeholder='username' type='text'
                           value={name} onChange={handleName}/>
                </label>
            </div>
            <div>
                <label>
                    <input className='m-2 p-2 bg-black border border-white' placeholder='email' required={true} type='email'
                           value={email} onChange={handleEmail}/>
                </label>
            </div>
            <div>
                <label>
                    <input className='m-2 p-2 bg-black border border-white' placeholder='password' minLength={8} required={true} type='password'
                           value={password} onChange={handlePassword}/>
                </label>
            </div>
            <div className='text-center'>
                <input className='m-2 p-2 bg-black border border-white hover:bg-gray-800' type='submit' value='submit'/>
            </div>

        </form>
    )
}