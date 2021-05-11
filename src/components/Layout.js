import React, { useState } from 'react';
import { AppBar, Button, Grid, InputBase, makeStyles, Paper, Toolbar, Typography } from '@material-ui/core';
import { fade } from '@material-ui/core/styles'; 
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
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
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '20ch',
                '&:focus': {
                width: '30ch',
                },
            }
        }
    }    
});

function Layout(props) {    
    const classes = useStyles();        

    // quickSearch feature not implemented for now

    // {const renderQuickSearch = () => {
    //     if (!(history.location.pathname === "/")) {
    //         return (
    //             <div className={classes.search}>
    //                 <div className={classes.searchIcon}>
    //                     <SearchIcon />
    //                 </div>
    //                 <form>
    //                     <InputBase
    //                         placeholder="Search…"
    //                         classes={{
    //                             root: classes.inputRoot,
    //                             input: classes.inputInput,
    //                         }}
    //                         autoComplete
    //                         inputProps={{ 'aria-label': 'search' }}
    //                     />
    //                 </form>
    //             </div>
    //         );
    //     }
    // }}

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

                    {/* search bar
                        uncontrolled as of now
                    */}
                    {/* {renderQuickSearch()} */}

                    {/* sign in sign up */}
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
                </Toolbar>                 
            </AppBar>    

            {/* don't remove this, this pushes the content of the page down by height of appbar*/}
            <div className={classes.toolbar}></div>             

            {props.children}
        </div>         
    );
  }
  
  export default Layout;
  