//import buildClient from "../api/build-client";
import Link from "next/link";


const LandingPage = ({currentUser, tickets}) => {
    console.log("Tickets:", tickets);
    //console.log("Current User:", currentUser);
    return (
        <div>
            <h1>Tickets</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => {
                        return (
                            <tr key={ticket.id}>
                                <td>{ticket.title}</td>
                                <td>{ticket.price}</td>
                                <td>
                                    <Link href='/tickets/[ticketId]' as={`/tickets/${ticket.id}`}>
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

LandingPage.getInitialProps = async (context, client, currentUser) => {
    //const client = buildClient(context);
    //const { data } = await client.get('/api/users/currentuser');
    const {data} = await client.get('/api/tickets');
    return {tickets: data};

}
export default LandingPage;