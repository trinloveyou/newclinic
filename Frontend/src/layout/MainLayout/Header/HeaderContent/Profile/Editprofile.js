import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const EditProfile = () => {
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
        Edit Profile
      </Typography>
      <TextField
        label="Full Name"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Email"
        variant="outlined"
        margin="normal"
        fullWidth
      />
            <TextField
        label="Phone Number"
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

export default EditProfile;
