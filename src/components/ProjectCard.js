import React, { useState } from 'react'
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
        border: {
            backgroundColor: theme.palette.secondary.main,
        }
    }    
})

function ProjectCard({ authorId, id, title, author, description, chips}) {
    const classes = useStyles();
    const { currentUser, currentUserData } = useAuth()
    const docRef = db.collection("users").doc(currentUser.uid)
    const [bookmarked, setBookmarked] = useState(currentUserData.bookmarks.includes(id))

    const handleAddBookmark = () => {
        docRef.update({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(id)
        })
        .then(() => {
            setBookmarked(true)
            alert("Post bookmarked")
            window.location.reload()
        })
    }
    
    const byline = (
        <Link to={`/profile/${authorId}`}>
            {`by: ${author}`}
        </Link>
    )

    const handleRemoveBookmark = () => {
        docRef.update({
            bookmarks: firebase.firestore.FieldValue.arrayRemove(id)
        })
        .then(() => {
            setBookmarked(false)
            alert("Post removed from bookmarks")
            window.location.reload()
        })      
    }

    return (
        <div>
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
                        {title}
                        </Typography>
                    }
                    subheader={byline}                    
                />
                <CardContent style={{}}>
                    
                    <Typography variant="body1" >
                        {description}
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
                            <Link className={classes.link} to={'/viewpost/' + id} /*target="_blank" rel="noopener noreferrer"*/>
                                <Button size="small" color="primary">
                                    View
                                </Button>
                            </Link>
                            <Button size="small" color="primary" onClick={bookmarked ? handleRemoveBookmark : handleAddBookmark}>
                                {bookmarked ? 'Remove from bookmarks' : 'Bookmark'}
                            </Button>
                        </Grid>
                    </Grid>
                        
                    
                </CardActions>                
                
            </Card>

        </div>
    );
  }
  
  export default ProjectCard;
  