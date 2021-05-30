import React, { useState } from 'react';
import { AppBar, Button, Grid, IconButton, makeStyles, Menu, MenuItem, Paper, Toolbar, Typography, Tooltip, Divider, Avatar } from '@material-ui/core';
import { fade } from '@material-ui/core/styles'; 
import { Link, useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useAuth } from '../contexts/AuthContext'

const useStyles = makeStyles(theme => { 
    return {
        page: {        
            height: '100%',
            width: '100%',            
            paddingBottom: '10vh',
            // backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/campus.jpeg"})`,
            // backgroundRepeat: 'no-repeat',
            // backgroundSize: 'cover'
        },
        toolbar: theme.mixins.toolbar,        
        title: {
            flexGrow: 1,
            textDecoration: 'none',
        },
        rightPaper: {
            width: '230px',
            background: 'none'
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            border: '1px solid #4791db',
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto'
            }
        },                
        searchIcon: {
            color: '#4791db',
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        layoutAvatar: {
            height: '35px',
            width: '35px',
            backgroundColor: theme.palette.primary.main,
            color: "white"
        },
        notification: {
            height: '25px',
            width: '25px'
        }
    }    
});

function Layout(props) {    
    const classes = useStyles();        
    const { currentUser, currentUserData, logout } = useAuth()
    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState(false);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(false);
    };  

    const handleLogout = async () => {
        try {
            await logout()
            history.push('/login')
        } catch (e) {
            alert('failed to log out')
        }
    }
    
    const handleProfile = () => {
        //there's some issue with this when redirecting to your profile from other profile
        // history.push(`/profile/${currentUser.uid}`)  
        window.location.assign(`/profile/${currentUser.uid}`)
        handleMenuClose()
    }

    const handleMyPosts = () => {
        history.push('/myposts')
        handleMenuClose()
    }

    const handleMyBookmarks = () => {
        history.push('/bookmarks')
        handleMenuClose()
    }

    const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={'primary-search-account-menu'}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
          <MenuItem onClick={handleMyPosts}>My Posts</MenuItem>
          <MenuItem onClick={handleMyBookmarks}>My Bookmarks</MenuItem>
          <MenuItem onClick={handleMenuClose}>Notifications</MenuItem>
          <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          <MenuItem onClick={handleMenuClose}>Help</MenuItem>
        </Menu>
    );
    
    const renderLogin = () => {
        if (currentUser) {
            return (
                <div style={{marginRight: '50px'}}> 
                    <Link to="/newpost">
                        <Tooltip title="Create a New Post">
                            <IconButton aria-label="show 4 new mails" color="primary">
                                <AddIcon fontSize="large"/>
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <IconButton aria-label="show 17 new notifications" color="primary">
                    {/* <Badge badgeContent={17} color="secondary"> */}
                        <NotificationsIcon className={classes.notification} />
                    {/* </Badge> */}
                    </IconButton>
                    <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={'primary-search-account-menu'}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    >
                    <Avatar src={currentUserData.profilePicture} className={classes.layoutAvatar}/> 
                    </IconButton>
                    {renderMenu}
                  </div>
            )
                        
        } 
        return (            
            <Paper className={classes.rightPaper} elevation={0}>
                <Grid container spacing={1}   alignContent="center" justify='center'>
                    <Grid item>
                        <Divider orientation="vertical" />
                    </Grid>
                    <Grid item>
                        <Link to="/register" style={{textDecoration: 'none'}}>
                            <Button color="primary" style={{textTransform: 'none'}}>
                                <Typography variant='h6'>
                                    Sign Up
                                </Typography>                                        
                            </Button>    
                        </Link>
                    </Grid>
                    <Grid item>
                        <Divider orientation="vertical" />
                    </Grid>
                    <Grid item>
                        <Link to="/login" style={{textDecoration: 'none'}}>
                            <Button color="primary" style={{textTransform: 'none'}}>
                                <Typography variant='h6'>
                                    Login
                                </Typography>
                            </Button>    
                        </Link>
                    </Grid>
                </Grid>
            </Paper>
        );
    }

  
    return (
        <div className={classes.page}>         

            <AppBar color="default"  elevation={2}>                
                <Toolbar>                                      
                    {/* Website name */}
                    <a href="/" style={{textDecoration: 'none'}}>
                        <Typography 
                            color="primary"
                            variant='h4'
                        >
                            partnerUp           
                        </Typography> 
                    </a>
                    <span className={classes.title}></span>
                    {renderLogin()}
                    
                </Toolbar>                 
            </AppBar>    

            {/* don't remove this, this pushes the content of the page down by height of appbar*/}
            <div className={classes.toolbar}></div>             

            {props.children}
        </div>         
    );
  }
  
  export default Layout;
  