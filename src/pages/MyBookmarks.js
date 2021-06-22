import { Grid, makeStyles, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import BookmarkedCard from '../components/cards/BookmarkedCard';
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import PageHeader from '../components/PageHeader';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { useHistory }  from 'react-router-dom'
import firebase from 'firebase/app';

const useStyles = makeStyles((theme) => {
    return {        
        page: {
            marginTop: theme.spacing(3),
        },
        homeResults: {
            height: '100%',
            width: '80%',            
            margin: 'auto auto',
            padding: theme.spacing(5)
        },
        loading: {
            position: 'absolute',
            left: '50%',
            top: '50%',
        }
    }
});

export default function MyBookmarks() {
    console.log("render bookmarks")
    const classes = useStyles();
    const { currentUser, currentUserData } = useAuth()
    const [posts, setPosts] = useState([]);
    const [render, setRender] = useState(false)
    const history = useHistory()
    /*
        right now it is in working state but not efficient 
        since every deletions triggers another fetch action
        and for some reason mybookmarks is rendered three times
    */
    useEffect(() => {
        if (!currentUser) {
            return history.push('/login')
        }
        
        async function fetch() {
            let renderList = []
            for (const post of currentUserData.bookmarks) {
                const postData =  await  db.collection("posts").doc(post).get().then(res => res.data())
                if (postData) {
                    renderList.push({...postData, id: post})
                } else {
                    await db.collection("users").doc(currentUser.uid).update({
                        bookmarks: firebase.firestore.FieldValue.arrayRemove(post)
                    })
                } 
            }
            setPosts(renderList)
        }
        fetch()
        console.log("setting up posts")
        if (!render) {
            setRender(true)
        }
    }, [currentUser, currentUserData.bookmarks, history, render]) 


    const renderContent = () => {
        if (!render) {
            return <CircularProgress className={classes.loading}/>
        }
        return (
            <div className={classes.page}>
                <PageHeader 
                    title="My Bookmarks"
                    icon={<BookmarksIcon style={{fontSize: "28" }}/>}
                />        
                <div className={classes.homeResults}>
                    <Grid container spacing={4}>
                        {posts.map((data, index) => {
                                return ( 
                                <Grid item xs={12} md={6} key={index}>
                                    <BookmarkedCard data={data}/>
                                </Grid>
                            )})}
                    </Grid>
                </div>
            </div>
        )
    }

    return renderContent()
}

