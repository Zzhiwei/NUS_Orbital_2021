import React, { useEffect, useState } from 'react'
import { Avatar, Card, CardContent, CardHeader, Chip, makeStyles, Typography, IconButton, Divider, Tooltip } from '@material-ui/core'
import { Link } from 'react-router-dom' 
import { db } from '../firebase'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import { useAuth } from '../contexts/AuthContext'
import 'firebase/firestore';
import firebase from 'firebase/app';
import DateRangeIcon from '@material-ui/icons/DateRange';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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
        delete: {
            '&:hover': {
                color: theme.palette.secondary.main
            }
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
    }    
})

export default function AdminCard({ data }) {

    const { id, title, timestamp, current, total, location, commitment, education, skills : chips } = data
    console.log("rendering admincard entitled " + data.title)
    const classes = useStyles();
    const { currentUser, currentUserData, setCurrentUserData } = useAuth()
    const userRef = currentUser ? db.collection("users").doc(currentUser.uid) : null
    const [hover, setHover] = useState(1)
    const [time, setTime] = useState('some time ago')

    const handleDelete = () => {
        db.collection('posts').doc(id).delete()
        userRef.update({
            posts: firebase.firestore.FieldValue.arrayRemove(id)
        }).then(() => {
            const posts = [...currentUserData.posts]
            const index = posts.indexOf(id)
            posts.splice(index, 1)
            console.log("deleted post")
            setCurrentUserData({
                ...currentUserData, 
                posts
            })
        })
    }

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
                        <Avatar src={currentUserData.profilePicture} className={classes.avatar} >
                            <EmojiPeopleIcon fontSize="large"/>
                        </Avatar>
                    }
                    title={
                        <Typography variant="h5">
                            {title}
                        </Typography>
                    }                 
                />
                {/*<Divider variant="middle" />*/}
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
                        <Link className={classes.link} to={'/editpost/' + id}>
                            <IconButton color="primary">
                                <Tooltip title="Edit Post">
                                    <EditIcon style={{fontSize: 22}}/>
                                </Tooltip>
                            </IconButton>
                        </Link>
                        <Link className={classes.link} to='/myposts'>
                            <IconButton className={classes.delete} onClick={handleDelete}>
                                <Tooltip title="Delete Post">
                                    <DeleteIcon style={{fontSize: 24}}/>
                                </Tooltip>
                            </IconButton>
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
  
  //export const MemoizedAdminCard = React.memo(AdminCard)