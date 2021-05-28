import React, { useState, useEffect} from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom' 
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext'
import firebase from 'firebase/app';
import 'firebase/firestore';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

const useStyles = makeStyles(theme => {
    return {
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
            textDecoration: "none",
            '&:hover':{
                textDecoration: "underline",
            },
        },
        border: {
            backgroundColor: theme.palette.secondary.main,
        },
    }    
})

export default function BookmarkedCard({  authorId, id, title, author, description, chips }) {
    console.log("rendering bookmarkcards")
    const classes = useStyles();
    const { currentUser, currentUserData, setCurrentUserData } = useAuth()
    const [profilePic, setProfilePic] = useState("")
    const userRef = currentUser ? db.collection("users").doc(currentUser.uid) : null

    useEffect(async () => {
        const dataUrl = await db.collection('users').doc(authorId).get().then(res => res.data().profilePicture)
        dataUrl && setProfilePic(dataUrl)
    }, [])

    const handleRemoveBookmark = () => {
        userRef.update({
            bookmarks: firebase.firestore.FieldValue.arrayRemove(id)
        })
        .then(() => {
            const bookmarks = [...currentUserData.bookmarks]
            bookmarks.pop(id)
            console.log("deleted bookmark")
            setCurrentUserData({
                ...currentUserData,
                bookmarks
            })
        })      
    }

    const byline = (
        <Link className={classes.profileLink} to={`/profile/${authorId}`}>
            {`by: ${author}`}
        </Link>
    )
    return (
        <div>
            <Card elevation={2} style={{border: '1px solid grey'}} className={classes.root}>
                <CardHeader  
                    className={classes.border}
                    avatar={
                        <Avatar src={profilePic} className={classes.avatar} >
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
                        {chips && chips.map((tag, index) => {
                            return <Chip key={index} label={tag}/>
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
                            <Button size="small" color="primary" onClick={ handleRemoveBookmark }>
                                Remove from bookmarks
                            </Button>
                        </Grid>
                    </Grid>
                </CardActions>                
            </Card>
        </div>
    );
  }  