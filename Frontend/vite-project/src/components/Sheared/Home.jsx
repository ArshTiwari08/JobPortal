function Home({ user }) {
    return (
        <div>
            {user ? <h1>Welcome User!</h1> : <h1>Please Login</h1>}
        </div>
    );
}

export default Home;