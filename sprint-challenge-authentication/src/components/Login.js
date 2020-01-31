
import React, {useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axiosWithAuth from '../utils/axiosWithAuth';

const Login = ( { values, errors, touched, status, ...props}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => 
            [...users, status]
        )
    }, [status]);

    return (
        <Form>
            <h4>login</h4>
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

const FormikLogin = withFormik({
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
        console.log(props)

        axiosWithAuth()
        .post('/auth/login', values)
        .then(response => {
            console.log(response)
            localStorage.setItem('token', response.data.token);
            alert('You have successfully logged in!')
            props.history.push('/jokes')
        })
        .catch(error => {
            console.log('No dice..', error.response);
        });
    }
})(withRouter(Login));

export default (FormikLogin);