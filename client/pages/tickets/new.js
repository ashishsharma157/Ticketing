import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const NewTicket=() => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');

    const {doRequest, errors} = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {
            title, 
            price
        },
        onSuccess: () => Router.push('/')
    });
    const onSubmit = async (e) => {
        e.preventDefault();
        await doRequest();
    }

    const onBlur = () => {
        const value = parseFloat(price);
        if(isNaN(value)){
            return;
        }
        setPrice(value.toFixed(2));
    }
    return (
        <div>
            <h1>Create a New Ticket</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}
                    
                    className="form-control" placeholder="Enter title" />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)}
                    onBlur={onBlur}
                    className="form-control" placeholder="Enter price" />
                </div>
                {errors}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default NewTicket;