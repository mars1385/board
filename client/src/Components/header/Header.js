import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  Typography,
  IconButton,
  MenuItem,
  MenuList,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { selectCurrentUser } from '../../Redux/user/userSelectors';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../Redux/user/userActions';
import { createStructuredSelector } from 'reselect';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  link: {
    color: '#000',
    textAlign: 'center',
    textDecoration: 'none',
  },
  auth: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  header: {
    background: 'transparent',
    boxShadow: 'none',
  },
  button: {
    margin: 5,
  },
}));

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    createStructuredSelector({
      currentUser: selectCurrentUser,
    })
  );

  const classes = useStyles();

  // --
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleLogoutUser = (event) => {
    dispatch(logoutUser());
    setOpen(false);
  };

  // --
  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.header}>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <Link className={classes.link} to='/'>
              My Board
            </Link>
          </Typography>
          {currentUser ? (
            <div className={classes.auth}>
              <Typography variant='subtitle2'>{`welcome ${currentUser.name}`}</Typography>
              <IconButton
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                onClick={handleToggle}
                color='inherit'>
                <AccountCircle />
              </IconButton>
              <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id='menu-list-grow'>
                          <MenuItem>
                            <Link
                              style={{ textAlign: 'center', textDecoration: 'none', color: 'inherit' }}
                              to='/projects'>
                              My Projects
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={() => handleLogoutUser()}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          ) : (
            <div>
              <Button className={classes.button} variant='outlined' color='secondary'>
                <Link className={classes.link} to='/login'>
                  Login
                </Link>
              </Button>
              <Button className={classes.button} variant='outlined' color='secondary'>
                <Link className={classes.link} to='/register'>
                  Register
                </Link>
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default React.memo(Header);
