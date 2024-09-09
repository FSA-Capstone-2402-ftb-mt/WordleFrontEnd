import {useEffect, useState} from 'react';
import {fetchGuessStats} from "./hooks/useFetchStatistics.js";
import {Box, Paper, Typography} from '@mui/material';
import {PieChart} from '@mui/x-charts/PieChart';
import {BarChart} from '@mui/x-charts/BarChart';

function GuessesStats() {
    const [guesses, setGuesses] = useState([]);

    useEffect(() => {
        const stats = async () => {
            const res = await fetchGuessStats();
            setGuesses(res);
        };
        stats();
    }, []);

    const totalGuesses = Object.values(guesses).reduce((acc, guess) => acc + (guess || 0), 0);

    function calculatePercentage(value, total) {
        return Math.round((value / total) * 100);
    }

    const guess_11 = calculatePercentage(guesses.guess_1 || 0, totalGuesses);
    const guess_22 = calculatePercentage(guesses.guess_2 || 0, totalGuesses);
    const guess_33 = calculatePercentage(guesses.guess_3 || 0, totalGuesses);
    const guess_44 = calculatePercentage(guesses.guess_4 || 0, totalGuesses);
    const guess_55 = calculatePercentage(guesses.guess_5 || 0, totalGuesses);
    const guess_66 = calculatePercentage(guesses.guess_6 || 0, totalGuesses);


    const pieData = [
        {
            value: guess_11,
            label: `1st Try: ${guess_11} %`,
        },
        {
            value: guess_22,
            label: `2nd Try: ${guess_22} %`,
        },
        {
            value: guess_33,
            label: `3rd Try: ${guess_33} %`,
        },
        {
            value: guess_44,
            label: `4th Try: ${guess_44} %`,
        },
        {
            value: guess_55,
            label: `5th Try: ${guess_55} %`,
        },
        {
            value: guess_66,
            label: `6th Try: ${guess_66} %`,
        },
    ];

    return (
        <Box sx={{padding: 1}}>
            <Typography variant="h6" gutterBottom>Guesses</Typography>
            {/* Main layout with side-by-side boxes for PieChart and BarChart */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                {/* PieChart section */}
                <Box display="flex" flexDirection="column" alignItems="start" sx={{width: '30%'}}>
                    <Paper elevation={2} sx={{padding: 1}}>
                        <Typography variant="subtitle1" gutterBottom>Percentages</Typography>
                        <PieChart
                            series={[
                                {
                                    data: pieData,
                                    innerRadius: 50,
                                    outerRadius: 140,
                                    paddingAngle: 0,
                                    cornerRadius: 25,
                                    startAngle: 0,
                                    endAngle: 360,
                                    cx: 150,
                                    cy: 150,
                                    highlightScope: {fade: 'global', highlight: 'item'},
                                    faded: {innerRadius: 30, additionalRadius: -30, color: 'gray'},
                                }
                            ]}
                            height={300}
                            width={300}
                            slotProps={{
                                legend: {hidden: true},
                            }}

                        />
                    </Paper>
                </Box>
                {/* BarChart section */}
                <Box display="flex" flexDirection="column" alignItems="end" sx={{width: '30%'}}>
                    <Paper elevation={2} sx={{padding: 1}}>
                        <Typography variant="subtitle1" gutterBottom>Distribution</Typography>
                        <BarChart
                            series={[{
                                data: [
                                    guesses.guess_1,
                                    guesses.guess_2,
                                    guesses.guess_3,
                                    guesses.guess_4,
                                    guesses.guess_5,
                                    guesses.guess_6
                                ]
                            }]}
                            yAxis={[{scaleType: 'band', data: ['1st', '2nd', '3rd', '4th', '5th', '6th',]}]}
                            barLabel="value"
                            bottomAxis={null}
                            height={300}
                            width={300}
                            layout={"horizontal"}
                        />
                    </Paper>
                </Box>
            </Box>
        </Box>
    )
}

export default GuessesStats;
