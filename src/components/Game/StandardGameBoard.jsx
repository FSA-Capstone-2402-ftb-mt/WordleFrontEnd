import React, {useEffect, useState} from "react";
import TileRow from './TileRow/TileRow';
import VirtualKeyboard from "./VirtualKeyboard/VirtualKeyboard.jsx";
import getCurrentDayOfYearEST from "./DateHandler";
import StopWatch from "./Stopwatch/Stopwatch";
import {Box, Button, Paper} from "@mui/material";
import { apiURL } from "../../hooks/api.js";
import { getLastPlayed } from "../Statistics/hooks/useFetchStatistics.js";
import SwitchLabels from "./SwitchLabels.jsx";

export default function StandardGameBoard({
                                              guessStatus,
                                              setGuessStatus,
                                              guessIndex,
                                              setGuessIndex,
                                              fullGuess,
                                              setFullGuess,
                                              WOTD,
                                              handleStart,
                                              setStartTimer,
                                              startTimer,
                                              pauseTimer,
                                              setPauseTimer,
                                              time,
                                              setTime
                                          }) {
    const [activeRow, setActiveRow] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [correctGuess, setCorrectGuess] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false)
    const[lastPlayed, setLastPlayed] = useState(null)
    const [timerEnabled, setTimerEnabled] = useState(false)
    const [toggleDisabled, setToggleDisabled] = useState(false);

    const currentDate = getCurrentDayOfYearEST();
    const localLastPlayed = localStorage.getItem('Last_played')
    
    const handleRowComplete = (rowIndex) => {
        //This correctly sets game over to True if you fail to get the correct guess after 5 guesses
        if (rowIndex === 5 && !correctGuess) {
            setGameOver(true)
        }
        if (rowIndex < 5) {
            setActiveRow(rowIndex + 1)
        }
    }
    let word = WOTD;
    
    //need to add last_played POST AND GET REQUEST
    //Backend stat database needs "username", "correctGuess" which is T/F, "attempts" = # of guesses it took, "word" = WOTD
    async function updateStats(correctGuess, attempts, word) {
        const userData = JSON.parse(localStorage.getItem("userData"));
        
        if(userData && userData.username){
            const username = userData.username;
            try {
                const last_played = getCurrentDayOfYearEST();
                // console.log("updated:",last_played);
                const response = await fetch(`${apiURL}/game/data/${username}/update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },
                    body: JSON.stringify({username: username, last_played: last_played})
                });
                const info = await response.json();
                console.log(info);
            } catch (error) {
                console.error('Failure to update last played date', error);
            }
            try {
                const response = await fetch(`${apiURL}/game/regular`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    },
                    body: JSON.stringify({username: username, correctGuess: correctGuess, attempts: attempts, word: word})
                });
                const info = await response.json();
                console.log(info);
            } catch (e) {
                console.error('Failure to update stats', e)
            }
        }else{
            console.error("no user data in local storage update stats")
        }
    }

//useEffect that runs UpdateStats when gameOver or activeRow changes
    useEffect((currentDate) => {
        if (gameOver) {
            updateStats(correctGuess, activeRow, word)
            setPauseTimer(true);
            localStorage.setItem('Last_played', currentDate)
        }
    }, [activeRow, gameOver])

    useEffect(()=>{
        if(activeRow > 0 || gameOver){
            setToggleDisabled(true);
        }
    },[activeRow, gameOver])

    const startGame = () => {
        setIsPlaying(true);
        setStartTimer(true);
        setPauseTimer(false);
        setToggleDisabled(true);
    }

    useEffect(() => {
        if (gameOver && timerEnabled) console.log("Final time:", time)
    }, [gameOver])

    useEffect(()=>{
        const userData = JSON.parse(localStorage.getItem("userData"));

        if(userData && userData.username){
            const username = userData.username;
            const fetchLastPLayed = async () =>{
                try{
                    const data = await getLastPlayed();
                    setLastPlayed(data)

                }catch(e){
                    console.error('Failed to fetch last played date',e)
                }
            }
            fetchLastPLayed();
        }else{
            console.error("Fetch last played has no user data in local storage")
        }
    },[])
    
    return (
        <Paper
        sx={{
            padding: '25px'
        }}
        >
            <div className="game-container">
                {lastPlayed === currentDate || localLastPlayed === currentDate ? (
                    <div className="overlay">
                        <h3>You have already played today! Come back tomorrow!</h3>
                    </div>
                ) : (    
                    <>
                    {!isPlaying && (
                    <div className="overlay" style={{ textAlign: 'center'}}>
                        <div style={{marginBottom: '20px'}}>
                            <SwitchLabels
                                timerEnabled={timerEnabled}
                                setTimerEnabled={setTimerEnabled}
                                disabled={toggleDisabled}
                                hide={toggleDisabled}
                            />
                        </div>
                        <div>
                            {timerEnabled && (
                                <Button 
                                    className="play-button" 
                                    onClick={startGame}
                                    disabled={!timerEnabled}
                                >
                                    Play Game & Start Timer!
                                </Button>
                            )}
                        </div>
                    </div>
                )}
                <Box className="timer-container">
                    {timerEnabled && (
                        <StopWatch
                            setStartTimer={setStartTimer}
                            startTimer={startTimer}
                            setPauseTimer={setPauseTimer}
                            pauseTimer={pauseTimer}
                            time={time}
                            setTime={setTime}
                        />
                    )}
                </Box>
                <div className={`game-board ${isPlaying ? '' : 'disabled'}`}>
                    {guessStatus.map((_, index) => (
                        <TileRow
                            key={index}
                            rowIndex={index}
                            active={index === activeRow}
                            activeRow={activeRow}
                            onRowComplete={handleRowComplete}
                            guessStatus={guessStatus}
                            setGuessStatus={setGuessStatus}
                            guessIndex={guessIndex}
                            setGuessIndex={setGuessIndex}
                            fullGuess={fullGuess}
                            setFullGuess={setFullGuess}
                            gameOver={gameOver}
                            setGameOver={setGameOver}
                            WOTD={WOTD}
                            setCorrectGuess={setCorrectGuess}
                            currentDate={currentDate}
                            handleStart={handleStart}
                        />))}
                    <VirtualKeyboard
                        guessStatus={guessStatus}
                        activeRow={activeRow}
                        fullGuess={fullGuess}
                    />
                </div>
                </>
                )}
            </div>
        </Paper>
    );
}
