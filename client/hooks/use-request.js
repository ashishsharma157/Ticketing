import axios from "axios";
import { useState } from "react";

export default ({url, method, body, onSuccess}) => {
    const [errors, setErrors] = useState([]);

    const doRequest = async (props = {}) => {
        try {
            setErrors([]); // Reset errors on new request
            const response = await axios[method](url, body);
            if(onSuccess) {
                onSuccess(response.data);
            }
            return response.data;
        } catch (err) {
            setErrors(<div className="alert alert-danger">
                <h4>Opps...</h4>
                <ul className='my-0'>
                    {err.response && err.response.data && err.response.data.errors.map((error, index) => (
                        <li key={index}>{error.message}</li>
                    ))}
                </ul>
            </div>)

        }
    };

    return { doRequest, errors };
};