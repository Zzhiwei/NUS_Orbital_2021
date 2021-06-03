import React, { useState, useEffect } from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom' 
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext'
import firebase from 'firebase/app';
import 'firebase/firestore';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import DateRangeIcon from '@material-ui/icons/DateRange';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { FaUserGraduate } from 'react-icons/fa'
import { PeopleAlt } from '@material-ui/icons';

const useStyles = makeStyles(theme => {
    return {
        root: {
            border: '1px solid grey',
            borderRadius: '20px'
        },
        avatar: {
            height: '50px',
            width: '50px',
            color: 'white',
            backgroundColor: theme.palette.primary.main
        },
        chipStyle: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '-15px',
            '& > *': {
              margin: theme.spacing(0.5),
            },
        },
        contentBox: {
            display: 'flex',
            marginTop: '-15px',
        },
        members: {
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '-10px'
        },
        content: {
            display: "flex", 
            alignItems: "center", 
            flexWrap: "wrap",
            marginBottom: "10px",
            marginLeft: "10px"
        },
        link: {
            color: theme.palette.primary.main,
            textDecoration: "none",
        },
        profileLink: {
            color: theme.palette.primary.main,
            textDecoration: "none",
            '&:hover':{
                textDecoration: "underline",
            },
        },
    }    
})

export default function PostCard({ authorId, id, title, author, current, total, location, schedule, education, chips }) {
    console.log("rendering postcard")
    const classes = useStyles();
    const { currentUser, currentUserData, setCurrentUserData } = useAuth()
    const userRef = currentUser ? db.collection("users").doc(currentUser.uid) : null
    const [profilePic, setProfilePic] = useState("")
    const [bookmarked, setBookmarked] = useState(false)
 
    useEffect(() => {
        if (currentUser && currentUserData && currentUserData.bookmarks) {
            setBookmarked(currentUserData.bookmarks.includes(id))
        }
    }, [])

    useEffect(async () => {
        const dataUrl = await db.collection('users').doc(authorId).get().then(res => res.data().profilePicture)
        setProfilePic(dataUrl)
    })
    
    const handleAddBookmark = async () => {
        await userRef.update({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(id)
        })
        setCurrentUserData({
            ...currentUserData,
            bookmarks: [...currentUserData.bookmarks, id]
        })
        setBookmarked(true)
    }

    const handleRemoveBookmark = async () => {
        await userRef.update({
            bookmarks: firebase.firestore.FieldValue.arrayRemove(id)
        })
        const bookmarks = [...currentUserData.bookmarks]
        const index  = bookmarks.indexOf(id)
        bookmarks.splice(index, 1)
        setCurrentUserData({
            ...currentUserData,
            bookmarks
        })
        setBookmarked(false)
    }

    const byline = (
        <Link className={classes.profileLink} to={`/profile/${authorId}`}>
            {`by: ${author}`}
        </Link>
    )

    const renderBookmark = () => {
        if (currentUser) {
            return (
                <Button size="small" color={bookmarked ? "secondary" : "primary"} onClick={bookmarked ? handleRemoveBookmark : handleAddBookmark}>
                    {bookmarked ? 'Remove from bookmarks' : 'Bookmark'}
                </Button>
            )
        }
    }

    return (

        <Card elevation={4} className={classes.root}>
            <CardHeader  
                avatar={
                    <Avatar src={profilePic} className={classes.avatar} >
                        <EmojiPeopleIcon fontSize="large"/>
                    </Avatar>
                }
                title={
                    <Typography variant="h5">
                        {title}
                    </Typography>
                }
                subheader={byline}                    
            />
            <CardContent>
                <div className={classes.contentBox}>
                    <div>
                        <div className={classes.content}>
                            <LocationOnIcon style={{marginLeft: '-0.5px', marginRight: '15px'}}/>
                            {location}
                        </div>
                        <div className={classes.content}>
                            <DateRangeIcon style={{marginRight: '15px'}}/>
                            {schedule}
                        </div>
                        <div className={classes.content}>
                            <FaUserGraduate fontSize="large" style={{marginLeft: '2px', marginRight: '19px'}}/>
                            {education}
                        </div>
                        <div className={classes.content}>
                            <PeopleAlt fontSize="default" style={{marginLeft: '0px', marginRight: '15px'}} />
                            {current} / {total}
                        </div>
                    </div>
                </div>
                <div className={classes.chipStyle}>
                    {chips && chips.map((tag, index) => {
                        return <Chip key={index} label={tag}/>
                    })}
                </div>
            </CardContent>   
            <CardActions> 
                <Grid container justify="center">
                    <Grid item>
                        <Link className={classes.link} to={'/viewpost/' + id} >
                            <Button size="small" color="primary">
                                View
                            </Button>
                        </Link>
                        {renderBookmark()}
                    </Grid>
                </Grid>
            </CardActions>                
        </Card>
    );
  }  