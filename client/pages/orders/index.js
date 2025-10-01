import Link from "next/link"

const OrderIndex = ({orders}) => {
    return (
        <div>
            <h1>My Orders</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Ticket</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => {
                        return (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.ticket.title}</td>
                                <td>{order.ticket.price}</td>
                                <td>{order.status}</td>
                                <td>
                                    <Link href='/orders/[orderId]' as={`/orders/${order.id}`}>
                                        View
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

OrderIndex.getInitialProps = async (context, client, currentUser) => {
    const {data} = await client.get('/api/orders');
    return {orders: data};
}
export default OrderIndex;