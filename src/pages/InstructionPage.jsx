import React from 'react';

export default function InstructionPage() {
    return (
        <>
            <div>
                <h1>How to play Wordle</h1>
                <ol>
                    <li>Start by guessing any 5-letter word</li>
                    <li>After each guess the color of the tiles will change to show if the player use the correct or incorrect letter.</li>
                    <ul style={{
                       listStyle: "none", 
                       padding: 0, 
                    }}> 
                        <li>
                            <strong style={{
                                color: "green",
                                background: "black",
                            }}>
                                Green</strong>: The letter is in the correct position.</li>
                        <li>
                            <strong style={{
                                color: "yellow",
                                background: "black",
                            }}>
                                Yellow</strong>: The letter is in the word but in the wrong position.</li>
                        <li>
                            <strong style={{
                                color: "grey",
                                background: "black",
                            }}>
                                Gray</strong>: The letter is not in the word at all.</li>
                    </ul>
                    <li>Continue guessing until you correctly figured out the word or use up all six guesses.</li>
                </ol>
            </div>
        </>
    )
};
