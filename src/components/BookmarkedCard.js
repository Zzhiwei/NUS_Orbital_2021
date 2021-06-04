import React, { useState, useEffect} from 'react'
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
            border: '1px solid rgba(0, 0, 0, .125)',
            borderRadius: '10px'
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
            marginTop: '-10px',
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

export default function BookmarkedCard({ authorId, id, title, author, current, total, location, start, end, education, chips }) {
    console.log("rendering bookmarkcards")
    const classes = useStyles();
    const { currentUser, currentUserData, setCurrentUserData } = useAuth()
    const [profilePic, setProfilePic] = useState("")
    const userRef = currentUser ? db.collection("users").doc(currentUser.uid) : null
    const [hover, setHover] = useState(1)

    useEffect(async () => {
        const dataUrl = await db.collection('users').doc(authorId).get().then(res => res.data().profilePicture)
        if (dataUrl) {
            setProfilePic(dataUrl)
        } else {
            setProfilePic(null)
        }
        
    }, [authorId])

    const handleRemoveBookmark = () => {
        userRef.update({
            bookmarks: firebase.firestore.FieldValue.arrayRemove(id)
        })
        .then(() => {
            const bookmarks = [...currentUserData.bookmarks]
            const index  = bookmarks.indexOf(id)
            bookmarks.splice(index, 1)
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

    //hoverEffect
    const handleHoverOn = () => {
        setHover(12)
    }

    const handleHoverOff = () => {
        setHover(1)
    }

    return (
        <Link className={classes.link} to={'/viewpost/' + id} >
        <Card 
            onMouseEnter={handleHoverOn}
            onMouseLeave={handleHoverOff}
            elevation={hover}
            className={classes.root}
        >
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
                        {start.toDate().toString().substring(4, 15) + ' - ' + end.toDate().toString().substring(4, 15)}
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
                <Grid  container justify="center">
                    <Grid item>
                        <Link to='/bookmarks' className={classes.link}>
                            <Button size="small" color="secondary" onClick={ handleRemoveBookmark }>
                                Remove from bookmarks
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </CardActions>                
        </Card>
        </Link>
    );
  }  