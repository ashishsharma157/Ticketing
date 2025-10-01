import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const OrderShow = ({order, currentUser}) => {

    const [timeLeft, setTimeLeft] = useState(0);
    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft/1000));
        };
        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);
        return () => {
            clearInterval(timerId);
        }
    }, [order]);
    if (timeLeft < 0) {
        return <div>Order Expired</div>;
    }

    const {doRequest, errors} = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id,

        },
        onSuccess: (payment) => Router.push('/orders')
    });
    // if (!order) {
    //     return <div>Loading...</div>;
    // }
    // return (
    //     <div>
    //         <h1>Order Details</h1>
    //         <p>Order ID: {order.id}</p>
    //         <p>Ticket Title: {order.ticket.title}</p>
    //         <p>Price: ${order.ticket.price}</p>
    //         <p>Status: {order.status}</p>
    //         <p>User ID: {order.userId}</p>
    //     </div>
    // );

    //const msLeft = new Date(order.expiresAt) - new Date();
    // if (msLeft < 0) {
    //     return <div>Order Expired</div>;
    // }
    return (<div> Time left to pay :  {timeLeft} seconds 
    <StripeCheckout 
        token={({id}) => doRequest({token: id})}
        stripeKey="pk_test_51NTuOxChd9BOnbqMs4C4RTcmvQqJsNdk49fSeRF8qiiM6Gc11wfvBLs9XtBcXryt0BIJKd6J78IlVODhldJ5VPEU00WWBxgM7O"
        amount={order.ticket.price * 100}
        email={currentUser.email}/>
    {errors}
    </div>);
}


OrderShow.getInitialProps = async (context, client, currentUser) => {
    const {orderId} = context.query;
    const {data} = await client.get(`/api/orders/${orderId}`);
    return {order: data};
}
export default OrderShow;