
import React, {useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Register = ({values, errors, touched, status, ...props}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => 
            [...users, status]
        )
    }, [status]);

    return (
        <Form>
            <h4>register</h4>
            <label>
                username
                <Field 
                    type='text'
                    name='username'
                />
                {touched.username && errors.username && (
                    <p className="errors">
                        {errors.username}
                    </p> 
                )}
            </label>
            <label>
                password
                <Field 
                    type='password'
                    name='password'
                />
                    {touched.password && errors.username && (
                    <p className="errors">
                        {errors.password}
                    </p> 
                )}
            </label>
            <button type='submit'>Submit</button>
        </Form>
    );
};

const FormikRegister = withFormik({
    mapPropsToValues({ username, password}) {
        return {
            username: username || '',
            password: password || '',
        };
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required().min(3),
        password: Yup.string().required().min(3)
    }),
    handleSubmit(values, {props, setStatus}){
        const first = axios.post('http://localhost:3300/api/auth/register', values)
        const second = axios.post('http://localhost:3300/api/auth/login', values)
        
        axios
        .all([first, second])
        .then(
            axios.spread((...responses) => {
            alert('Account successfully created!')
            localStorage.setItem('token', responses[1].data.token);
            props.history.push('/jokes')
            })
        )
        .catch(errors => {
            console.log('No dice..', errors);
        });
    }
})(Register);

export default FormikRegister