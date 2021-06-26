import React, { useState } from 'react';
import { AppBar, Button, Grid, IconButton, makeStyles, Menu, MenuItem, Paper, Toolbar, Typography, Tooltip, Divider, Avatar, Container } from '@material-ui/core';
import { fade } from '@material-ui/core/styles'; 
import { Link, useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import ForumIcon from '@material-ui/icons/Forum';
import { useAuth } from '../contexts/AuthContext'
import logo from '../assets/Logo.png'

const useStyles = makeStyles(theme => { 
    return {
        toolbarHeight: theme.mixins.toolbar,        
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
        chat: {
            height: '25px',
            width: '25px',
        },
        chatButton: {
            paddingTop: '17px'
        },
        inactiveTab: {
            marginRight: 50,
            fontSize: 18,
            textTransform: 'none',
            '&:hover': {
                background: "#d9bda5"
            },
            '&::after': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '0.15rem',
                left: 0,
                bottom: 0,
                background: theme.palette.primary.main,
                transform: "scale(0,1)",
                transition: 'transform 0.5s ease'
            },
            '&:hover::after': {
                transform: "scale(1,1)"
            },
        },
        activeTab: {
            marginRight: 50,
            fontSize: 18,
            textTransform: 'none',
            '&:hover': {
                backgroundColor: "#d9bda5"
            },
            '&::after': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '0.15rem',
                left: 0,
                bottom: 0,
                background: theme.palette.primary.main,
            },
        },
        gutters: {
            padding: '0px'
        },
        appbar: {
            // backgroundColor: '#d9bda5',
            // backgroundColor: 'rgb(71, 135, 235)',
            height: '64px',
            backgroundImage: 'linear-gradient(to right, #d9bda5,  #eee7d7)'
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
        history.push(`/profile/${currentUser.uid}`)  
        // window.location.assign(`/profile/${currentUser.uid}`)
        handleMenuClose()
    }

    const handleMyPosts = () => {
        history.push('/home/myposts')
        handleMenuClose()
    }

    const handleMyBookmarks = () => {
        history.push('/home/bookmarks')
        handleMenuClose()
    }

    const handleMyChats = () => {
        history.push('/chat')
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
          <MenuItem onClick={handleMyPosts}>My Posts</MenuItem>
          <MenuItem onClick={handleMyBookmarks}>My Bookmarks</MenuItem>
          <MenuItem onClick={handleMyChats}>My chats</MenuItem>
          <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          
        </Menu>
    );
    
    const renderUserOptions = () => {
        if (currentUser) {
            return (
                <div >
                    
                    <Link to="/newpost">
                        <Tooltip title="Create a New Post">
                            <IconButton aria-label="show 4 new mails" color="primary">
                                <AddIcon fontSize="large"/>
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Link to="/chat">
                        <Tooltip title="Go to chats">
                            <IconButton className={classes.chatButton} aria-label="go to my chats" color="primary">
                                <ForumIcon className={classes.chat} />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Tooltip title="Open Menu">
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
                    </Tooltip>
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
        <div>
                    <AppBar  elevation={1}  className={classes.appbar} > 
                        <Container>
                            <Toolbar 
                                classes={{
                                gutters: classes.gutters
                                }}
                                style={{
                                    display: 'flex'
                                }}
                            >
                                <Link to="/" style={{textDecoration: 'none', display: 'flex', alignItems: 'center'}}>
                                    <img src={logo} style={{height: "54px"}} />
                                    {/* <Typography 
                                        // color="primary"
                                        variant='h4'
                                        style={{
                                            color: 'black'
                                        }}
                                    >
                                        partnerUp           
                                    </Typography>  */}
                                </Link>
                                
                                <span className={classes.title}></span>
                                {renderUserOptions()}
                            </Toolbar>    
                        </Container> 
                    </AppBar>    

                    {/* don't remove this, this pushes the content of the page down by height of appbar*/}
                    <div className={classes.toolbarHeight}></div>             
        
            {props.children}
        </div>
    );
  }
  
  export default Layout;
  