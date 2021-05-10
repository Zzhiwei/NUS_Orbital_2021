import React from 'react';
import { AppBar, Button, Grid, makeStyles, Paper, Toolbar, Typography } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(theme => { 
    return {
        page: {        
            height: '100%',
            width: '100%',
            // {backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/background.jpeg'})`,
            // backgroundSize: 'cover',            
            // backgroundRepeat: 'no-repeat',
            // backgroundPosition: 'center center',        }
            paddingBottom: '37.5vh'
            
        },
        toolbar: theme.mixins.toolbar,
        appbar: {    
                       
        },
        title: {
            flexGrow: 1
        },
        rightPaper: {
            width: '300px',
            background: 'none'
        }
    }
});

function Layout(props) {
    const classes = useStyles();

    return (
        <div className={classes.page}>         
            <AppBar className={classes.appbar} color="" elevation={0}>                
                <Toolbar>
                    <Link to="/" style={{color: 'black'}}>
                    </Link>
                    <span style={{width: '10px'}}></span>
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
                    <Paper className={classes.rightPaper} elevation={0}>
                        <Grid container spacing={1}   alignContent="center" justify='flex-end'>
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
                            {/* {<Grid item>
                            <AccountCircleIcon />
                                
                            </Grid>} */}
                            
                            
                            
                        </Grid>
                    </Paper>
                    
                </Toolbar>                 
            </AppBar>    
            <div className={classes.toolbar}></div> 
            <div style={{height: '20px'}}></div>       
            {props.children}
        </div>         
    );
  }
  
  export default Layout;
  