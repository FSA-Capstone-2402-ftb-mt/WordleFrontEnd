import { useNavigate } from 'react-router-dom';
import { Button, Box, Paper, Typography } from '@mui/material';
import WordsTab from "../components/Admin/subcomponents/WordsTab.jsx";
import UsersTab from "../components/Admin/subcomponents/UsersTab.jsx";
import CalendarTab from "../components/Admin/CalendarTab.jsx";

export default function AdminDashboardPage() {

    return (
        <Paper sx={{ p: 1, borderRadius: 3, width: "1000px" }}>
            <Typography variant="h4" gutterBottom textAlign="center">
                Admin Dashboard
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Paper sx={{ flex: 1, mr: 2, p: 2 }}>
                    <Typography variant="h6" gutterBottom>Words Database</Typography>
                    <WordsTab />
                </Paper>
                <Paper sx={{ flex: 1, ml: 2, p: 2 }}>
                    <Typography variant="h6" gutterBottom>Users Database</Typography>
                    <UsersTab />
                </Paper>
            </Box>
            <Typography variant="h6" gutterBottom>Words of the days</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Box sx={{ flex: 1, maxWidth: '800px', p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CalendarTab />
                </Box>
            </Box>
        </Paper>
    );
}
