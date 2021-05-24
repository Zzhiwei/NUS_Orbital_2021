import React, { useState, useEffect } from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom' 
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext'
import firebase from 'firebase/app';
import 'firebase/firestore';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

const useStyles = makeStyles(theme => {
    return {
        root: {
            
        },
        avatar: {
            height: '50px',
            width: '50px',
            color: 'white',
            backgroundColor: theme.palette.primary.main
        },
        chipStyle: {
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
            '& > *': {
              margin: theme.spacing(0.5),
            },
        },
        link: {
            color: theme.palette.primary.main,
            textDecoration: "none",
        },
        profileLink: {
            color: theme.palette.primary.light,
            textDecoration: "none"
        },
        border: {
            backgroundColor: theme.palette.secondary.main,
        }
    }    
})

function ProjectCardTest({ hit }) {
    /*
    author=name
    id=firebase id
    authorId=author
    title=title
    description=description
    chips=skills
    */
    const classes = useStyles();
    const { currentUser, currentUserData } = useAuth()

    const byline = (
        <Link className={classes.profileLink} to={`/profile/${hit.author}`}>
            {`by: ${hit.name}`}
        </Link>
    )
    
    const chips = hit.skills

    return (
        
            <Card elevation={2} style={{border: '1px solid grey'}} className={classes.root}>
                <CardHeader  
                    className={classes.border}
                    avatar={
                        <Avatar className={classes.avatar} >
                            <EmojiPeopleIcon fontSize="large"/>
                        </Avatar>
                    }
                    title={
                        <Typography color="primary" variant="body1">
                        {hit.title}
                        </Typography>
                    }
                    subheader={byline}                    
                />
                <CardContent style={{}}>
                    
                    <Typography variant="body1" >
                        {hit.description}
                    </Typography>

                    <div className={classes.chipStyle} style={{marginTop: '10px'}}>
                        {chips && chips.map(tag => {
                            return <Chip label={tag}/>
                        })}
                    </div>
                </CardContent>    
                <CardActions  className={classes.border}> 
                    <Grid  container justify="center">
                        <Grid item>
                           
                        </Grid>
                    </Grid>
                        
                    
                </CardActions>                
                
            </Card>

        
    );
  }
  
  export default ProjectCardTest;
  