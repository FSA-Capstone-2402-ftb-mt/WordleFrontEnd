import {useEffect, useState} from "react";
import {fetchUserStats} from "./hooks/useFetchStatistics";
import {Paper, Typography, Box} from "@mui/material";

function StatsUser() {
    const [userStats, setUserStats] = useState([]);

    useEffect(() => {
        const stats = async () => {
            const res = await fetchUserStats();
            setUserStats(res);
        };
        stats();
    }, []);

    const date = new Date(userStats.join_date).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
    });

    return (
        <Box>
            <Typography variant="h3">{userStats.username}'s Stats</Typography>

            <Box
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
                gap={3}
                sx={{ marginTop: 3 }}
            >
                <Box>
                    <Paper elevation={1} sx={{ padding: 2, margin: '10px', width: '150px' }}>
                        <Typography variant="h6" align="center">{date}</Typography>
                        <Typography variant="body2" align="center">Joined Date</Typography>
                    </Paper>
                </Box>
                <Box>
                    <Paper elevation={1} sx={{ padding: 2, margin: '10px', width: '150px' }}>
                        <Typography variant="h6" align="center">{userStats.word_count}</Typography>
                        <Typography variant="body2" align="center">Words Solved</Typography>
                    </Paper>
                </Box>
                <Box>
                    <Paper elevation={1} sx={{ padding: 2, margin: '10px', width: '150px' }}>
                        <Typography variant="h6" align="center">{userStats.current_streak}</Typography>
                        <Typography variant="body2" align="center">Current Streak</Typography>
                    </Paper>
                </Box>
                <Box>
                    <Paper elevation={1} sx={{ padding: 2, margin: '10px', width: '150px' }}>
                        <Typography variant="h6" align="center">{userStats.max_streak}</Typography>
                        <Typography variant="body2" align="center">Max Streak</Typography>
                    </Paper>
                </Box>
                <Box>
                    <Paper elevation={1} sx={{ padding: 2, margin: '10px', width: '150px' }}>
                        <Typography variant="h6" align="center">{userStats.timed_score}</Typography>
                        <Typography variant="body2" align="center">Timed Score</Typography>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}

export default StatsUser;