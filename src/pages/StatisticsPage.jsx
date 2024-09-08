import {Paper} from '@mui/material';
import StatsUser from "../components/Statistics/UserStats.jsx";
import GameStats from "../components/Statistics/GamesStats.jsx";
import GuessStats from "../components/Statistics/GuessesStats.jsx";

const StatisticsPage = () => {

    return (<div className="statistics-page">
        <Paper sx={{
            padding: 2,
            maxWidth: '1000px',
        }}>
            <StatsUser/>
            <GameStats/>
            <GuessStats/>
        </Paper>

    </div>);
};

export default StatisticsPage;