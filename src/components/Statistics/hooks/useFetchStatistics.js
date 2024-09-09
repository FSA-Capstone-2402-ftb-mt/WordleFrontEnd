import {apiURL} from "../../../hooks/api.js";

export async function fetchUserStats() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("authToken");
    const username = userData.username;

    try {
        const response = await fetch(`${apiURL}/stats/${username}/stats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Fetch request error`,error)
    }
};

export async function fetchGameStats() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("authToken");
    const username = userData.username;

    try {
        const response = await fetch(`${apiURL}/stats/${username}/games`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Fetch request error`,error)
    }
};

export async function fetchGuessStats() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("authToken");
    const username = userData.username;

    try {
        const response = await fetch(`${apiURL}/stats/${username}/guesses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Fetch request error`,error)
    }
}

export async function getLastPlayed() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const username = userData.username;
    const token = localStorage.getItem("authToken");
    try {
        const response = await fetch(`${apiURL}/game/data/${username}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok){
            throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        const result = await response.json();
        const fetchedLastPlayed = result.last_played
        console.log(result.last_played);
        console.log('fetchedLastPlayed:', fetchedLastPlayed)
        //need to use result.last_played
        // const last_played = result.last_played but I will need to see what the
        // return last_played
        return fetchedLastPlayed;
    } catch (e) {
        console.error('Failure to get last time played', e);
    }
}