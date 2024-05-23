import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, Grid } from '@mui/material';

// ใช้ภาพ Avatar สมมติ
import avatarImage from 'assets/images/users/avatar-1.png'; // ให้แน่ใจว่าเส้นทางถูกต้อง

const Viewprofile = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: '32px', // 4 * 8px = 32px
      }}
    >
      <Card sx={{ maxWidth: '800px', width: '100%', p: '32px' }}> {/* 4 * 8px = 32px */}
        <CardContent>
          <Grid container spacing={4} alignItems="center">
            <Grid item>
              <Avatar alt="John Doe" src={avatarImage} sx={{ width: '120px', height: '120px' }} />
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                John Doe
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                johndoe@example.com
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Username: johndoe
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Phone: 123-456-7890
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Viewprofile;
