import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const Editpassword = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Edit Password
      </Typography>
      <TextField
        label="Current Password" // แก้ไข label เป็น "Current Password"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="New Password" // แก้ไข label เป็น "New Password"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default Editpassword;
