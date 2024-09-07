import {Link} from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="home-container">
            <h1>Welcome to WordleGame!</h1>
            <p>Challenge your vocabulary and try to guess the word of the day. Play solo or compete against friends!</p>
            <div className="home-buttons">
                <Link to="/games" style={{ marginBottom: '10px', display: 'block' }}>Play Now</Link>
                <Link to="/friends" style={{ marginBottom: '10px', display: 'block' }}>Manage Friends</Link>
                <Link to="/statistics" style={{ marginBottom: '10px', display: 'block' }}>View Statistics</Link>
            </div>
        </div>
    );
};

export default HomePage;