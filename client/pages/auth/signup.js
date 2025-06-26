import { useState } from 'react';
import axios from 'axios';

export default () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError([]); // Reset errors on new submission
        try {
        const response=await axios.post('/api/users/signup', {
            email, password
        });
                //console.log('Response from server:', response.data);
        }
        catch (err) {
            //console.error('Error during signup:', err.response.data);
            setError(err.response.data.errors || ['An unexpected error occurred']);
        }

    }
    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
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
            {error.length > 0 && (
                <div className="alert alert-danger">
                    <ul className='my-0'>
                        {error.map((err, index) => (
                            <li key={index}>{err.message}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button className='btn btn-primary' type="submit">Sign Up</button>
        </form>
    );
}