import React from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, Grid, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom' 
import { db } from '../firebase'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import { useAuth } from '../contexts/AuthContext'
import 'firebase/firestore';
import firebase from 'firebase/app';

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
        link: {
            color: theme.palette.primary.main,
            textDecoration: "none",
        },
    }    
})

export default function AdminCard({id, title, author, description, chips}) {
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
            posts.pop(id)
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
  