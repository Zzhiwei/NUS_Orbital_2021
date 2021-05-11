import React, { useState } from 'react';
import { AppBar, Badge, Button, Grid, IconButton, InputBase, makeStyles, Menu, MenuItem, Paper, Toolbar, Typography } from '@material-ui/core';
import { fade } from '@material-ui/core/styles'; 
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import history from '../history';



const useStyles = makeStyles(theme => { 
    return {
        page: {        
            height: '100%',
            width: '100%',            
            paddingBottom: '37.5vh'            
        },
        toolbar: theme.mixins.toolbar,        
        title: {
            flexGrow: 1
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
        }
    }    
});

function Layout(props) {    
    const classes = useStyles();        
    const [login, setLogin] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);


    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };  

    const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={'primary-search-account-menu'}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Account Setting</MenuItem>
          <MenuItem onClick={handleMenuClose}>Bookedmarked projects</MenuItem>
          <MenuItem onClick={handleMenuClose}>Notifications</MenuItem>
          <MenuItem onClick={handleMenuClose}>Log out</MenuItem>
          <MenuItem onClick={handleMenuClose}>Help</MenuItem>
        </Menu>
    );
    
    const renderLogin = () => {
        if (login) {
            return (
                <div style={{marginRight: '50px'}}> 
                    <IconButton aria-label="show 4 new mails" color="primary">
                        <AddIcon fontSize="large"/>
                    </IconButton>
                    <IconButton aria-label="show 17 new notifications" color="primary">
                    {/* <Badge badgeContent={17} color="secondary"> */}
                        <NotificationsIcon  />
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
                    <AccountCircle  color="primary" />
                    </IconButton>
                    {renderMenu}
                  </div>
            )
                        
        } 
        return (            
            <Paper className={classes.rightPaper} elevation={0}>
                <Grid container spacing={1}   alignContent="center" justify='center'>
                    <Grid item>
                        <Link to="/register" style={{textDecoration: 'none'}}>
                            <Button color="primary" >
                                <Typography variant='h6'>
                                    Sign Up
                                </Typography>                                        
                            </Button>    
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/login" style={{textDecoration: 'none'}}>
                            <Button color="primary" >
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
            <AppBar color="default" classes={{colorDefault: classes.appBarRoot}} elevation={2}>                
                <Toolbar>                                      
                    {/* Website name */}
                    <Link to="/" style={{color: 'black', textDecoration: 'none'}} >
                        <Typography 
                            color="primary"
                            variant='h4'
                            className={classes.title}                        
                        >
                            Team Tam           
                        </Typography> 
                    </Link>
                    <span className={classes.title}></span>

                    <Button onClick={() => {
                        setLogin(!login);  
                    }}>
                        toggle Login
                    </Button>
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
  