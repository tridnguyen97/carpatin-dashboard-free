import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Avatar, Box, Toolbar } from '@material-ui/core';
// import { Logo } from './logo';

export const Navbar = () => (
  <AppBar
    elevation={0}
    sx={{ backgroundColor: '#1e212a' }}
  >
    <Toolbar
      disableGutters
      sx={{
        alignItems: 'center',
        display: 'flex',
        minHeight: 64,
        px: 3,
        py: 1
      }}
    >
      <Box
        component={RouterLink}
        to="/"
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {/* <Logo /> */}
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Avatar
        alt="User"
        src="/static/user-chen_simmons.png"
      />
    </Toolbar>
  </AppBar>
);
