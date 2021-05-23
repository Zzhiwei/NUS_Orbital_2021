import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import PageHeader from '../components/PageHeader';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { useHistory }  from 'react-router-dom'


const useStyles = makeStyles((theme) => {
    return {
        homeResults: {
            height: '100%',
            width: '80%',            
            margin: 'auto auto',
            padding: theme.spacing(5)
        },
    }
});

export default function MyBookmarks() {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [toRender, setToRender] = useState([])
    const { currentUser, currentUserData } = useAuth()
    const bookmarks = currentUserData.bookmarks
    const history = useHistory()

    //if no user is logged in redirect to sign up
    if (!currentUser) {
        history.push('/login')
    }

    //sends query to backend when first mounting
    useEffect(() => {
        db.collection("posts").get()
        .then(snapShot => {
            setPosts(snapShot.docs
            .filter(doc => bookmarks.includes(doc.id))
            .map(doc => {return {...doc.data(), id: doc.id} }))
        })
    }, [bookmarks]) 

    //preparing posts to be rendered, also make get request to get info for each post
    const prepareRender = () => {
       const renderList = posts.map(post => (
            <Grid item xs={12} md={6} key={post.id}>
                <ProjectCard
                    key={post.timestamp}
                    id={post.id}
                    title={post.title}
                    author={post.name}
                    description={post.description}
                    chips={post.skills}
                />
            </Grid>  
        ))
        setToRender(renderList)
    }

    /*
    first render: posts got nth yet
    2nd render: triggerred by setPosts inside first async func
    3rd render: triggered by setToRender inside second async func
    */
    if (posts.length && !toRender.length) {
        prepareRender()
    }

    return (
        <>
            <PageHeader 
                title="My Bookmarks"
                icon={<BookmarksIcon style={{fontSize: "28" }}/>}
            />        
            <div className={classes.homeResults}>
                <Grid container spacing={3}>
                    { toRender }
                </Grid>
            </div>
        </>
    );

}

