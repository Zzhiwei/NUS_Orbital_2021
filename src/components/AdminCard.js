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
import WorkIcon from '@material-ui/icons/Work';

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
            justifyContent: 'left',
            flexWrap: 'wrap',
            '& > *': {
              margin: theme.spacing(0.5),
            },
        },
        content: {
            display: "flex", 
            alignItems: "center", 
            flexWrap: "wrap",
            marginBottom: "10px"
        },
        link: {
            color: theme.palette.primary.main,
            textDecoration: "none",
        },
    }    
})

export default function AdminCard({id, title, author, location, schedule, education, proficiency, chips }) {
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
                        <Typography color="primary" variant="body1">
                        {title}
                        </Typography>
                    }
                    subheader={"by: " + author}                    
                />
                <CardContent>
                    <div className={classes.content} style={{marginTop: '-10px'}}>
                        <LocationOnIcon style={{marginRight: '8px'}}/>
                        {location}
                    </div>
                    <div className={classes.content}>
                        <DateRangeIcon style={{marginRight: '8px'}}/>
                        {schedule}
                    </div>
                    <div className={classes.content}>
                        <FaUserGraduate fontSize="large" style={{marginLeft: '2px', marginRight: '12px'}}/>
                        {education}
                    </div>
                    <div className={classes.content}>
                        <WorkIcon style={{marginRight: '8px'}}/>
                        {proficiency}
                    </div>
                    <div className={classes.chipStyle} style={{marginTop: '10px', marginBottom: '-15px'}}>
                        {chips && chips.map((tag, index) => {
                            return <Chip key={index} label={tag}/>
                        })}
                    </div>
                </CardContent>    
                <CardActions> 
                    <Grid  container justify="center">
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
  