import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [error, setError] = useState([]);
    const {doRequest, errors} = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email, 
            password
        },
        onSuccess: () => Router.push('/')});

    const onSubmit = async (e) => {
        e.preventDefault();
        await doRequest(); // Call the doRequest function from useRequest hook
        // setError([]); // Reset errors on new submission
        // try {
        // const response=await axios.post('/api/users/signup', {
        //     email, password
        // });
                
        // }
        // catch (err) {
            
        //     setError(err.response.data.errors || ['An unexpected error occurred']);
        // }

    }
    return (
        <form onSubmit={onSubmit}>
            <h1>Sign In</h1>
            <div className="form-group">
                <label htmlFor="username">Email Address</label>
                <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control"
                    id="username"
                    placeholder="Enter Email" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="form-control"
                    id="password"
                    placeholder="Enter Password" />
            </div>
            {errors}
         
            <button className='btn btn-primary' type="submit">Sign In</button>
        </form>
    );
}