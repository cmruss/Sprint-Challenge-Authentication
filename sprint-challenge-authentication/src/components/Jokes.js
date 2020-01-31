import React, { useState, useEffect } from 'react';
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
            <h4>jokes</h4>
            {jokes.map(item =>(
            <p>{`${item.joke}`}</p>
            ))}
        </div>
    );
};

export default Jokes;