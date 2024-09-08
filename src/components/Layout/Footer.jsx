import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#f5f5f5',
                py: 3,
                px: 2,
                mt: 'auto',
                textAlign: 'center',
                borderTop: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                right: 0,
                bottom: 0,
                width: '100%',
                height: '0px',
            }}
        >
            <Typography variant="body2" color="textSecondary">
                © 2024 <strong>WordleGame</strong>. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
