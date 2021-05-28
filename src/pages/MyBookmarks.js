import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import BookmarkedCard from '../components/BookmarkedCard';
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
    console.log("MYBOOKMARKS")
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
    useEffect(async () => {
        if (!currentUser) {
            return history.push('/login')
        }
        
        let renderList = []

        async function fetch() {
            for (const post of currentUserData.bookmarks) {
                const postData =  await  db.collection("posts").doc(post).get().then(res => res.data())
                renderList.push({...postData, id: post})
            }
        }
        await fetch()
        setPosts(renderList)
        setRender(true)
    }, [currentUserData.bookmarks]) 


    const renderContent = () => {
        if (!render) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <PageHeader 
                    title="My Bookmarks"
                    icon={<BookmarksIcon style={{fontSize: "28" }}/>}
                />        
                <div className={classes.homeResults}>
                    <Grid container spacing={3}>
                        {posts.map((data, index) => {
                                return ( 
                                <Grid item xs={12} md={6} key={index}>
                                    <BookmarkedCard
                                        id={data.id}
                                        title={data.title}
                                        author={data.name}
                                        authorId={data.author}
                                        description={data.description}
                                        chips={data.skills}
                                    />
                                </Grid>
                            )})}
                    </Grid>
                </div>
            </div>
        )
    }

    return renderContent()

}

