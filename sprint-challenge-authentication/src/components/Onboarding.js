import React from 'react';
import { Link } from 'react-router-dom';

const Onboarding = () => {

    return(
        <div>
            <Link to='/'>login</Link>
            <Link to='/register'>register</Link>
        </div>
    )
};

export default Onboarding;