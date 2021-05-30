import React from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, Grid, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom' 
import { db } from '../firebase'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import { useAuth } from '../contexts/AuthContext'
import 'firebase/firestore';
import firebase from 'firebase/app';
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
    }     
})

export default function AdminCard({ id, title, current, total, location, schedule, education, chips }) {
    console.log("rendering admincard")
    const classes = useStyles();
    const { currentUser, currentUserData, setCurrentUserData } = useAuth()
    const userRef = currentUser ? db.collection("users").doc(currentUser.uid) : null

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

    return (
        <div>
            <Card elevation={4} className={classes.root}>
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
                                <PeopleAlt fontSize="medium" style={{marginLeft: '0px', marginRight: '15px'}} />
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
                            <Link className={classes.link} to={'/viewpost/' + id} /*target="_blank" rel="noopener noreferrer"*/>
                                <Button size="small" color="primary">
                                    View
                                </Button>
                            </Link>
                            <Link className={classes.link} to={'/editpost/' + id} /*target="_blank" rel="noopener noreferrer"*/>
                                <Button size="small" color="primary">
                                    Edit
                                </Button>
                            </Link>
                            <Button size="small" color="secondary" onClick={handleDelete}>
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </CardActions>                
            </Card>
        </div>
    );
  }
  