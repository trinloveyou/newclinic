import { Box, useMediaQuery } from '@mui/material';

// project import
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
      {!matchesXs && <Notification />}
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </Box>
  );
};

export default HeaderContent;
