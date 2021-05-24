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

export default function PostCard({ hit }) {
    
    const classes = useStyles()
    const { currentUser } = useAuth()
    const docRef = db.collection("posts").doc(hit.objectID)
    const [bookmarked, setBookmarked] = useState(false)

    useEffect(() => {
        if (currentUser) {
            setBookmarked(hit.bookmarkedBy.includes(currentUser.uid))
        }
    }, [currentUser])

    const handleNotLoggedIn = () => {
        alert("Please log in to bookmark this post")
    }
    
    const handleAddBookmark = () => {
        docRef.update({
            bookmarkedBy: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
        })
        .then(() => {
            setBookmarked(true)
        })
    }

    const handleRemoveBookmark = () => {
        docRef.update({
            bookmarkedBy: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
        })
        .then(() => {
            setBookmarked(false)
        })      
    }

    const byline = (
        <Link className={classes.profileLink} to={`/profile/${hit.author}`}>
            {`by: ${hit.name}`}
        </Link>
    )

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
                        {hit.skills && hit.skills.map(tag => {
                            return <Chip label={tag}/>
                        })}
                    </div>
                </CardContent>    
                <CardActions  className={classes.border}> 
                    <Grid  container justify="center">
                        <Grid item>
                            <Link className={classes.link} to={'/viewpost/' + hit.objectID} /*target="_blank" rel="noopener noreferrer"*/>
                                <Button size="small" color="primary">
                                    View
                                </Button>
                            </Link>
                            <Button size="small" color="primary" onClick={currentUser ? (bookmarked ? handleRemoveBookmark : handleAddBookmark) : handleNotLoggedIn}>
                                {bookmarked ? 'Remove from bookmarks' : 'Bookmark'}
                            </Button>
                        </Grid>
                    </Grid>  
                </CardActions>                             
                
            </Card>

        
    );
  }