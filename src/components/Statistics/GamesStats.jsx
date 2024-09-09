import {useEffect, useState} from "react";
import {fetchGameStats} from "./hooks/useFetchStatistics";
import {Box, Paper, Typography} from "@mui/material";

function GameStats() {
    const [gameStats, setGameStats] = useState({});

    useEffect(() => {
        const stats = async () => {
            const res = await fetchGameStats();
            setGameStats(res);
        };
        stats();
    }, []);

    return (
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={3}>
            <Box>
                <Paper elevation={1} sx={{padding: 2, margin: '10px', width: '150px'}}>
                    <Typography variant="h6" align="center">{gameStats.regular_games}</Typography>
                    <Typography variant="body2" align="center">Normal Games</Typography>
                </Paper>
            </Box>
            <Box>
                <Paper elevation={1} sx={{padding: 2, margin: '10px', width: '150px'}}>
                    <Typography variant="h6" align="center">{gameStats.overall_games}</Typography>
                    <Typography variant="body2" align="center">Total Games</Typography>
                </Paper>
            </Box>
            <Box>
                <Paper elevation={1} sx={{padding: 2, margin: '10px', width: '150px'}}>
                    <Typography variant="h6" align="center">{gameStats.timed_games}</Typography>
                    <Typography variant="body2" align="center">Timed Games</Typography>
                </Paper>
            </Box>
        </Box>
    );
}

export default GameStats;
