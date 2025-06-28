import buildClient from "../api/build-client";

const LandingPage = ({currentUser}) => {
    console.log("Current User:", currentUser);
    return currentUser ?
        <>
            <div>
                <h1>Welcome to the Home Page </h1>
                <p>This is the main entry point of our application.</p>
            </div>
        </> : <h1>You are not signed in</h1>
}

LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');
    return data;

}
export default LandingPage;