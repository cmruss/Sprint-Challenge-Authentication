import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';

const Jokes = () => {
    const [jokes, setJokes] = useState([])

    useEffect(() => {
        axiosWithAuth()
            .get('/jokes')
            .then(response => {
                setJokes(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },[]);

    return(
        <div>
             <Link to='/'><span onClick={()=>localStorage.removeItem('token')}>logout</span></Link>
            <h4>jokes</h4>
            {jokes.map(item =>(
            <p key={item.id}>{`${item.joke}`}</p>
            ))}
        </div>
    );
};

export default Jokes;