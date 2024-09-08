import React, {useEffect, useState} from "react";
import {acceptFriendRequest, declineFriendRequest, deleteRequest, requestsList} from "./hooks/useFetchFriends.js";
import {Box, Button, Card, CardContent, Pagination, Paper, Typography} from '@mui/material';

export default function FriendReqContainer() {
    const [requests, setRequests] = useState({pending: [], accepted: [], rejected: []});
    const [receivedPage, setReceivedPage] = useState(1);
    const [rejectedPage, setRejectedPage] = useState(1);

    const fetchRequests = async () => {
        const data = await requestsList();
        if (data) {
            setRequests(data);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAcceptClick = async (user_username) => {
        await acceptFriendRequest(user_username);
        await fetchRequests();
    };

    const handleDeclineClick = async (user_username) => {
        await declineFriendRequest(user_username);
        await fetchRequests();
    };

    const handleDeleteRequestClick = async (user_username, friend_username) => {
        await deleteRequest(user_username, friend_username);
        await fetchRequests();
    };

    const {pending = [], rejected = []} = requests;

    const receivedRequests = pending.filter(req => req.request_type === "received");
    const rejectedRequests = rejected.filter(req => req.status === "rejected");

    const requestsPerPage = 3;
    const rejectedPerPage = 2;

    const paginatedReceivedRequests = receivedRequests.slice((receivedPage - 1) * requestsPerPage, receivedPage * requestsPerPage);
    const paginatedRejectedRequests = rejectedRequests.slice((rejectedPage - 1) * rejectedPerPage, rejectedPage * rejectedPerPage);

    return (
        <Paper sx={{
            padding: 2,
            width: '100%',
            maxWidth: '250px',
            margin: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '600px'
        }}>

            <Box sx={{
                height: '900px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '5px',
                marginBottom: '5px',
            }}>
                <Typography variant="h6">Pending Requests</Typography>
                {paginatedReceivedRequests.map((request, index) => (
                    <Card key={index} sx={{height: '80px'}}>
                        <CardContent
                            sx={{
                                padding: '0',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                justifyContent: 'space-between'
                            }}>
                            <Typography variant="body1" sx={{paddingTop: '5px'}}>
                                {request.user_username}
                            </Typography>
                            <Typography variant="body2">
                                {new Date(request.created_at).toLocaleString('en-US', {
                                    year: 'numeric',
                                    day: '2-digit',
                                    month: '2-digit',
                                })}
                            </Typography>
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                    paddingBottom: '5px'
                                }}>
                                <Button
                                    sx={{padding: '0px 5px', margin: 0}}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAcceptClick(request.user_username, request.friend_username)}
                                >
                                    Accept
                                </Button>
                                <Button
                                    sx={{padding: '0px 5px'}}
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDeclineClick(request.user_username, request.friend_username)}
                                >
                                    Decline
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
                <Pagination
                    sx={{display: 'flex', justifyContent: 'center'}}
                    count={Math.ceil(receivedRequests.length / requestsPerPage)}
                    page={receivedPage}
                    onChange={(event, value) => setReceivedPage(value)}
                />
            </Box>

            {/* Rejected Requests Section */}
            <Box sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <Typography variant="h5">Rejected Requests</Typography>
                {paginatedRejectedRequests.map((request, index) => (
                    <Card key={index} sx={{height: '80px'}}>
                        <CardContent
                            sx={{
                                padding: '0',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                justifyContent: 'space-between'
                            }}>
                            <Typography variant="body1" sx={{paddingTop: '5px'}}>
                                {/* Display user_username instead of friend_username for rejected requests */}
                                {request.user_username}
                            </Typography>
                            <Typography variant="body2">
                                {new Date(request.created_at).toLocaleString('en-US', {
                                    year: 'numeric',
                                    day: '2-digit',
                                    month: '2-digit',
                                })}
                            </Typography>
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                    paddingBottom: '5px'
                                }}>
                                <Button
                                    sx={{padding: '0px 5px'}}
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDeleteRequestClick(request.user_username, request.friend_username)}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
                <Pagination
                    sx={{display: 'flex', justifyContent: 'center'}}
                    count={Math.ceil(rejectedRequests.length / rejectedPerPage)}
                    page={rejectedPage}
                    onChange={(event, value) => setRejectedPage(value)}
                />
            </Box>
        </Paper>
    );
}
