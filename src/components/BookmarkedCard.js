import React, { useState, useEffect} from 'react'
import { Avatar, Divider, Card,CardContent, CardHeader, Chip, makeStyles, Typography, IconButton, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom' 
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext'
import firebase from 'firebase/app';
import 'firebase/firestore';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import DateRangeIcon from '@material-ui/icons/DateRange';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import ScheduleIcon from '@material-ui/icons/Schedule';

const useStyles = makeStyles(theme => {
    return {
        root: {
            border: '1px solid rgba(0, 0, 0, .125)',
            borderRadius: '4px'
        },
        avatar: {
            height: '50px',
            width: '50px',
            color: 'white',
            backgroundColor: theme.palette.primary.main,
            //marginTop: "0px"
        },
        chipStyle: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: "-50px",
            marginBottom: '10px',
            '& > *': {
              margin: theme.spacing(0.5),
            },
        },
        contentBox: {
            display: 'flex',
            marginTop: '-5px',
        },
        content: {
            display: "flex", 
            alignItems: "center", 
            flexWrap: "wrap",
            marginBottom: "10px",
            marginLeft: "10px"
        },
        footerContent: {
            display: "flex", 
            alignItems: "center", 
            flexWrap: "wrap",
        },
        icon: {
            display: "flex", 
            flex: 1, 
            justifyContent: "flex-end", 
            position: "relative", 
            top: "-194px", 
            left: "14px"
        },
        footer: {
            display: "flex", 
            justifyContent:"space-between", 
            marginTop: "10px", 
            marginBottom: "-10px"
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

export default function BookmarkedCard({ data }) {

    const { author, id, title, timestamp, name, current, total, location, commitment, education, skills : chips } = data
    
    console.log("rendering bookmarkcard entitled " + data.title)
    const classes = useStyles();
    const { currentUser, currentUserData, setCurrentUserData } = useAuth()
    const [profilePic, setProfilePic] = useState("")
    const userRef = currentUser ? db.collection("users").doc(currentUser.uid) : null
    const [hover, setHover] = useState(1)
    const [time, setTime] = useState('some time ago')

    // db.collection("users").get().then(function(querySnapshot) {
    //     querySnapshot.forEach(async function(doc) {
    //         await db.collection("users").doc(doc.id).update({
    //             chats: []
    //         });
    //     });
    // });


    useEffect(async () => {
        const dataUrl = await db.collection('users').doc(author).get().then(res => res.data().profilePicture)
        if (dataUrl) {
            setProfilePic(dataUrl)
        } else {
            setProfilePic(null)
        }
        
    }, [author])

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
        <Link className={classes.profileLink} to={`/profile/${author}`}>
            {`by: ${name}`}
        </Link>
    )

    //hoverEffect
    const handleHoverOn = () => {
        setHover(12)
    }

    const handleHoverOff = () => {
        setHover(1)
    }

    useEffect(() => {
        const now = new Date()
        const timeStamp = timestamp.toDate()
        const secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
        if (secondsPast < 60) {
            setTime('<1 minute ago')
        }
        else if (secondsPast < 3600) {
            setTime('<1 hour ago')
        }
        else if (secondsPast <= 86400) {
            let hoursPast = parseInt(secondsPast / 3600)
            setTime(hoursPast == 1 ? hoursPast + ' hour ago' : hoursPast + ' hours ago')
        }
        else if (secondsPast <= 604800) {
            let daysPast = parseInt(secondsPast / 86400)
            setTime(daysPast == 1 ? daysPast + ' day ago' : daysPast +  ' days ago')
        } 
        else if (secondsPast <= 2419200) {
            let weeksPast = parseInt(secondsPast / 604800)
            setTime(weeksPast == 1 ? weeksPast + ' week ago' : weeksPast + ' weeks ago')
        } 
        else if (secondsPast <= 29030400) {
            let monthsPast = parseInt(secondsPast / 2419200)
            setTime(monthsPast == 1 ? monthsPast + ' month ago' : monthsPast + ' months ago')
        }
        else {
            setTime('>1 year ago')
        }
    }, [])

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
                        <EmojiPeopleIcon fontSize="large" />
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
                            <Tooltip title="Location">
                            <LocationOnIcon style={{marginLeft: '-0.5px', marginRight: '15px'}}/>
                            </Tooltip>
                            {location}
                        </div>
                        <div className={classes.content}>
                            <Tooltip title="Commitment Period">
                            <DateRangeIcon style={{marginRight: '15px'}}/>
                            </Tooltip>
                            {commitment}
                        </div>
                        <div className={classes.content}>
                            <Tooltip title="Education Level">
                            <SchoolRoundedIcon style={{marginRight: '15px'}}/>
                            </Tooltip>
                            {education}
                        </div>
                    </div>
                </div>
                <div className={classes.icon}>
                    <Link to="/bookmarks" className={classes.link}>
                        <Tooltip title="Remove from Bookmarks">
                        <IconButton color="primary" onClick={handleRemoveBookmark}>
                            <BookmarkIcon style={{fontSize: 28}} />
                        </IconButton>
                        </Tooltip>
                    </Link>
                </div>
                <div className={classes.chipStyle}>
                    {chips && chips.map((tag, index) => {
                        return <Chip key={index} label={tag}/>
                    })}
                </div>
                <Divider variant="middle" />
                <div className={classes.footer}>
                    <span className={classes.footerContent}>
                        <Tooltip title="Members">
                            <PeopleAltRoundedIcon style={{marginRight: '10px'}}/>
                        </Tooltip>
                        {current} / {total}
                    </span>
                    <span className={classes.footerContent}>
                        <Tooltip title="Last Update to Post">
                            <ScheduleIcon style={{marginRight: '7px'}}/>
                        </Tooltip>
                        Updated {time}
                    </span>
                </div>
            </CardContent>           
        </Card>
        </Link>
    );
  }  